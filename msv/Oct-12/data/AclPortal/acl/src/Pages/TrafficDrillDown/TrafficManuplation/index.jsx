import React, { useState, useEffect } from "react";
import {
  MainDivwithoutSidebar,
  MainDivwithoutSidebarInfluxgraph,
  TableStyle,
} from "../../../Components/GlobalStyles/main.styled.js";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { Button, Switch, Spin } from "antd";
import axios, { baseUrl } from "../../../utils/axios";
import Swal from "sweetalert2";
import {
  CopyOutlined,
  EnterOutlined,
  ReloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import "../../../index.css";

let excelData = [];

const index = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const data = queryParams.data; // Extract the data from the query parameters

  console.log(data);
  const [dataSource, setDataSource] = useState(excelData);
  const [resetDataSource, setResetDataSource] = useState([]);

  const [loading, setLoading] = useState(false);
  console.log(data);
  const parts = data.split("-,-");
  console.log(parts);
  const dataFormat = {
    router_ip: parts[2],
    interface: parts[1],
  };

  console.log(dataFormat);

  useEffect(() => {
    const serviceCalls = async () => {
      setLoading(true);

      try {
        const res = await axios.post(
          baseUrl + "/manipulation/community",
          dataFormat
        );
        excelData = res.data;
        setDataSource(excelData);
        setResetDataSource(res.data);
        setLoading(false);
        console.log(res.data.second);
      } catch (err) {
        console.log(err.response);
        setLoading(false);
      }
    };
    serviceCalls();
  }, []);
  useEffect(() => {
    setDataSource(dataSource);
  }, [dataSource]);
  const handleSwitchChange = (checked, key) => {
    const updatedData = dataSource.map((item) => {
      if (item.id === key) {
        return { ...item, check_box: checked ? 1 : 0 };
      }
      return item;
    });
    setDataSource(updatedData);
    console.log(updatedData);
  };

  const handleCopyDefaultStatus = () => {
    const updatedData = dataSource.map((item) => ({
      ...item,
      check_box: item.default_status,
    }));
    setDataSource(updatedData);
  };
  const handleCopySuggestedStatus = () => {
    const updatedData = dataSource.map((item) => ({
      ...item,
      check_box: item.suggested_status,
    }));
    setDataSource(updatedData);
  };
  const handleSaveToDefault = async () => {
    const data = {
      router_ip: parts[2],
      interface: parts[1],
      communities: dataSource,
    };

    try {
      (async () => {
        axios.post(baseUrl + "/manipulator/save", data).then((res) => {
          const updatedData = dataSource.map((item) => ({
            ...item,
            default_status: item.current_status,
          }));

          setDataSource(updatedData);
          setResetDataSource(updatedData);
        });
      })();
    } catch (err) {
      console.log(err.response);
    }
  };
  const openSweetAlert = (title, type, errors) => {
    console.log("Error-------->", errors);

    Swal.fire({
      title,
      type,
      allowOutsideClick: false,
    });
  };
  const Apply = async () => {
    const data = {
      router_ip: parts[2],
      interface: parts[1],
      community_set: parts[0],
      communities: dataSource,
    };

    try {
      (async () => {
        axios.post(baseUrl + "/manipulator/apply", data).then((res) => {
          const updatedData = dataSource.map((item) => ({
            ...item,
            current_status: item.check_box,
          }));

          setDataSource(updatedData);
          setResetDataSource(updatedData);
          openSweetAlert("Configration Sent to Device", "info");
        });
      })();
    } catch (err) {
      console.log(err.response);
    }
  };
  const ResetData = () => {
    setLoading(true);
    setDataSource(resetDataSource);
    setLoading(false);
  };
  const columns = [
    {
      title: "Community Name",
      dataIndex: "community_name",
      key: "community_name",
    },
    {
      title: "Community",
      dataIndex: "community",
      key: "community",
    },
    {
      title: "BGP",
      dataIndex: "bgp",
      key: "bgp",
      render: (text, record) =>
        text === "False" ? (
          <p
            style={{
              backgroundColor: "#FF2727",
              textAlign: "center",
              padding: "3px",
              color: "#fff",
              borderRadius: "8px",
            }}
          >
            {text}
          </p>
        ) : (
          <p
            style={{
              backgroundColor: "#6AE900",
              textAlign: "center",
              padding: "3px",
              color: "#fff",
              borderRadius: "8px",
            }}
          >
            {text}
          </p>
        ),
    },
    {
      title: "Netflow",
      dataIndex: "netflow",
      key: "netflow",
    },

    {
      title: "Current Status",
      dataIndex: "current_status",
      key: "current_status",
      render: (text, record) =>
        text === "0" ? (
          <p style={{ color: "#CD0000", padding: "3px", fontWeight: "bold" }}>
            {text}
          </p>
        ) : (
          <p style={{ color: "#3CBA00", padding: "3px", fontWeight: "bold" }}>
            {text}
          </p>
        ),
    },
    {
      title: "Default Status",
      dataIndex: "default_status",
      key: "default_status",
      render: (text, record) =>
        text === "0" ? (
          <p style={{ color: "#CD0000", padding: "3px", fontWeight: "bold" }}>
            {text}
          </p>
        ) : (
          <p style={{ color: "#3CBA00", padding: "3px", fontWeight: "bold" }}>
            {text}
          </p>
        ),
    },
    {
      title: "Suggested Status",
      dataIndex: "suggested_status",
      key: "suggested_status",
    },
    {
      title: "Enable",
      dataIndex: "check_box",
      key: "check_box",
      render: (text, record) => (
        <span>
          <Switch
            checked={record.check_box === 1}
            onChange={(checked) => handleSwitchChange(checked, record.id)}
          />
        </span>
      ),
    },
  ];
  const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "rowClassName1";
    } else {
      return "rowClassName2";
    }
  };
  return (
    <MainDivwithoutSidebar>
      <Spin spinning={loading}>
        <div
          className="flex justify-end mb-2"
          style={{ float: "right", marginBottom: "5px" }}
        >
          <Button
            type="primary"
            danger
            onClick={ResetData}
            style={{
              marginRight: "5px",
            }}
          >
            <ReloadOutlined /> Reset the Data
          </Button>
          <Button
            onClick={handleCopyDefaultStatus}
            style={{
              marginRight: "5px",
            }}
          >
            {" "}
            <CopyOutlined /> Copy Default
          </Button>
          <Button
            onClick={handleCopySuggestedStatus}
            style={{
              marginRight: "5px",
            }}
          >
            {" "}
            <CopyOutlined /> Copy Suggested
          </Button>
          <Button
            onClick={handleSaveToDefault}
            style={{
              marginRight: "5px",
              backgroundColor: "#7FBE42",
              color: "white",
            }}
          >
            {" "}
            <SaveOutlined /> Save to Default
          </Button>
          <Button onClick={Apply}>
            Apply <EnterOutlined />
          </Button>
        </div>
        <TableStyle
          rowClassName={rowClassName}
          dataSource={dataSource}
          columns={columns}
        />
      </Spin>
    </MainDivwithoutSidebar>
  );
};

export default index;

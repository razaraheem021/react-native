import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// import { Button, Checkbox, Form, Input, ConfigProvider, Table,Layout } from "antd";
import {
  MainDiv,
  TableStyle,
} from "../../../Components/GlobalStyles/main.styled.js";
import axios, { baseUrl } from "../../../utils/axios/index.jsx";

import { Button, Layout, notification, Spin } from "antd";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { columnSearch } from "../../../utils/index.jsx";

const { Content } = Layout;

let excelData = [];
let columnFilters = {};

const RouterFile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [managementIp, setManagementIp] = useState([]);
  const [loading, setLoading] = useState(false);
  let [dataSource, setDataSource] = useState(excelData);
  useEffect(() => {
    const getManagementIpsForAsync = async () => {
      setLoading(true);

      try {
        const res = await axios.get(baseUrl + "/getAllRouters");
        excelData = res.data;
        setDataSource(excelData);
        setRowCount(excelData.length);

        setLoading(false);
        console.log(res.data);
      } catch (err) {
        console.log(err.response);
        setLoading(false);
      }
    };
    getManagementIpsForAsync();
  }, []);

  const [searchText, setSearchText] = useState(null);
  const [searchedColumn, setSearchedColumn] = useState(null);
  //   const [management_ip, setmanagement_ip] = useState(location.state.management_ip);
  const [providerIpData, setProviderIpData] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  let getColumnSearchProps = columnSearch(
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn
  );

  // useEffect(() => {
  //   const serviceCalls = async () => {
  //     setLoading(true);

  //     try {
  //       const res = await axios.get(baseUrl + "/getManagementIpsForAsync");
  //       excelData = res.data;
  //       setDataSource(excelData);
  //       setRowCount(excelData.length);
  //       setLoading(false);
  //       console.log(res.data);
  //     } catch (err) {
  //       console.log(err.response);
  //       setLoading(false);
  //     }
  //   };
  //   serviceCalls();
  // }, []);

  // useEffect(() => {
  //     const serviceCalls = async () => {
  //       setLoading(true);

  //       try {
  //         const res = await axios.post(baseUrl + "/getProviderIpsFromRouter",{
  //           management_ip: management_ip,
  //         });
  //         console.log(res.data)
  //           setProviderIpData(res.data);

  //         setLoading(false);
  //         console.log(res.data);
  //       } catch (err) {
  //         console.log(err.response);
  //         setLoading(false);
  //       }
  //     };
  //     serviceCalls();
  //   }, []);

  const openSweetAlert = (title, type, errors) => {
    console.log("Error-------->", errors);

    Swal.fire({
      title,
      type,
      allowOutsideClick: false,
    });
  };

  const exportSeed = () => {
    jsonToExcel(dataSource);
    // setIsAlertOpen(false);
  };
  const openNotification = () => {
    notification.open({
      message: "File Exported Successfully",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const jsonToExcel = (snmpData) => {
    if (rowCount !== 0) {
      let wb = XLSX.utils.book_new();
      let binarysnmpData = XLSX.utils.json_to_sheet(snmpData);
      XLSX.utils.book_append_sheet(wb, binarysnmpData, "async_cmd_Runner");
      XLSX.writeFile(wb, "routers.xlsx");
      openNotification();
    } else {
      openSweetAlert("No Data Found!", "error");
    }
  };

  const columns = [
    {
      title: "Hostname",
      dataIndex: "host_name",
      key: "host_name",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ...getColumnSearchProps(
        "host_name",
        "Hostname",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
      ellipsis: true,
    },
    {
      title: "Management IP",
      dataIndex: "management_ip",
      key: "management_ip",
      render: (text, record) => (
        <span
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => {
            navigate("/bgp-collector/cmd", {
              state: {
                management_ip: text,
                hostname: record.host_name,
              },
            });
          }}
          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ...getColumnSearchProps(
        "management_ip",
        "Management IP",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ...getColumnSearchProps(
        "status",
        "Status",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
      ellipsis: true,
    },
  ];
  return (
    <MainDiv style={{ padding: "25px" }}>
      <Spin spinning={loading}>
        {/* <h3>Routers</h3> */}
        {/* <div style={{display:"flex",flexWrap:"wrap"}}>




{
    managementIp.map((item,index)=>{
        return(
            <RouterStyling
            key={index}
      onClick={() => {
        navigate("/async-cmd-runner/cmd", {
          state: {
            management_ip:item
          },
        });
    }}
     >{item}</RouterStyling>
        )
    })
}
  
        </div> */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Routers</h2>

          <Button
            onClick={exportSeed}
            // type="primary"
            style={{
              marginRight: "5px",
            }}
          >
            Export
          </Button>
        </div>
        <TableStyle
          style={{ marginTop: "10px" }}
          scroll={{ y: 500 }}
          dataSource={dataSource}
          columns={columns}
        />
      </Spin>
    </MainDiv>
  );
};

export default RouterFile;

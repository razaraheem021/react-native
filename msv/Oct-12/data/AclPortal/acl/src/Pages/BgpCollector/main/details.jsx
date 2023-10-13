import { Button, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import {
  MainDiv,
  TableStyle,
} from "../../../Components/GlobalStyles/main.styled.js";
import axios, { baseUrl } from "../../../utils/axios/index.jsx";
import { columnSearch } from "../../../utils/index.jsx";

let excelData = [];
let columnFilters = {};

const Index = () => {
  const location = useLocation();
  let [dataSource, setDataSource] = useState(excelData);
  const [searchText, setSearchText] = useState(null);
  const [searchedColumn, setSearchedColumn] = useState(null);
  const [rowCount, setRowCount] = useState(0);
  const [providerIp, setProviderIp] = useState(location?.state?.provider_ip);
  const [hostname, sethostname] = useState(location?.state?.hostname);
  const [Management_ip, setManagement_ip] = useState(
    location?.state?.management_ip
  );
  const [providerIpData, setProviderIpData] = useState("");
  const [loading, setLoading] = useState(false);
  //   const location = useLocation();
  console.log(providerIp, Management_ip);
  let getColumnSearchProps = columnSearch(
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn
  );

  useEffect(() => {
    const serviceCalls = async () => {
      setLoading(true);

      try {
        const res = await axios.post(baseUrl + "/getDataFromProviderIp", {
          provider_ip: providerIp,
          management_ip: Management_ip,
        });
        console.log(res.data);
        setDataSource(res.data);

        setLoading(false);
        console.log(res.data);
      } catch (err) {
        console.log(err.response);
        setLoading(false);
      }
    };
    serviceCalls();
  }, []);

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
      XLSX.writeFile(wb, "async_cmd_Runner.xlsx");
      openNotification();
    } else {
      openSweetAlert("No Data Found!", "error");
    }
  };

  const columns = [
    {
      title: "Network",
      dataIndex: "network",
      key: "network",
      render: (text, record) => (
        <span
        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ...getColumnSearchProps(
        "network",
        "Network",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
      ellipsis: true,
    },
    {
      title: "Community",
      dataIndex: "community",
      key: "community",
      render: (text, record) => (
        <span
        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ...getColumnSearchProps(
        "community",
        "Community",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
      ellipsis: true,
    },

    {
      title: "Creation Date",
      dataIndex: "creation_date",
      key: "creation_date",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ...getColumnSearchProps(
        "creation_date",
        "Creation Date",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
      ellipsis: true,
    },

    // {
    //   title: "Total Capacity",
    //   dataIndex: "total_capacity",
    //   key: "total_capacity",
    //   render: (text, record) => (
    //     <span
    //     // style={{ textAlign: "center", paddingTop: "16px" }}
    //     >
    //       {text}
    //     </span>
    //   ),

    //   ...getColumnSearchProps(
    //     "total_capacity",
    //     "Total Capacity",
    //     setRowCount,
    //     setDataSource,
    //     excelData,
    //     columnFilters
    //   ),
    //   ellipsis: true,
    // },
    // {
    //   title: "Utilization",
    //   dataIndex: "utilization",
    //   key: "utilization",
    //   render: (text, record) => (
    //     <span
    //     // style={{ textAlign: "center", paddingTop: "16px" }}
    //     >
    //       {text}
    //     </span>
    //   ),

    //   ...getColumnSearchProps(
    //     "utilization",
    //     "Utilization",
    //     setRowCount,
    //     setDataSource,
    //     excelData,
    //     columnFilters
    //   ),
    //   ellipsis: true,
    // },
  ];

  return (
    <MainDiv style={{ padding: "25px", height: "100%" }}>
      <Spin spinning={loading}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>
            {hostname} | {providerIp}
          </h2>

          <Button
            onClick={exportSeed}
            // type="primary"
            // style={{
            //   marginRight: "5px",
            // }}
          >
            Export
          </Button>
        </div>
        <div>
          <TableStyle
            //   style={{ margin: "0 auto",width:"70%" }}
            // scroll={{ x: 2500 }}
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      </Spin>
    </MainDiv>
  );
};

export default Index;

import { Button, Spin } from "antd";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import {
  MainDiv,
  TableStyle,
} from "../../../Components/GlobalStyles/main.styled.js";
import ModalComponent from "../../../Components/Modal";
import { columnSearch } from "../../../utils";
import axios, { baseUrl } from "../../../utils/axios";

let excelData = [];
let columnFilters = {};

const Utilisation = () => {
  let [dataSource, setDataSource] = useState(excelData);
  const [searchText, setSearchText] = useState(null);
  const [searchedColumn, setSearchedColumn] = useState(null);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

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
        const res = await axios.get(baseUrl + "/utilization_backhaul");
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
      XLSX.utils.book_append_sheet(wb, binarysnmpData, "snmp_collector");
      XLSX.writeFile(wb, "snmp_collector.xlsx");
      openNotification();
    } else {
      openSweetAlert("No Data Found!", "error");
    }
  };
  const columns = [
    //     {
    //       title: "Router IP",
    //       dataIndex: "router_ip",
    //       key: "router_ip",
    //       render: (text, record) => (
    //         <span
    //         //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
    //         >
    //           {text}
    //         </span>
    //       ),

    //       ...getColumnSearchProps(
    //         "router_ip",
    //         "Router IP",
    //         setRowCount,
    //         setDataSource,
    //         excelData,
    //         columnFilters
    //       ),
    //       ellipsis: true,
    //     },
    {
      title: "cable",
      dataIndex: "cable",
      key: "cable",
      render: (text, record) => (
        <span
        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "cable",
      //   "Cable",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    {
      title: "congestion",
      dataIndex: "congestion",
      key: "congestion",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "congestion",
      //   "Congestion",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    {
      title: "current_status",
      dataIndex: "current_status",
      key: "current_status",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "current_status",
      //   "Current Status",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    {
      title: "local_region",
      dataIndex: "local_region",
      key: "local_region",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "local_region",
      //   "Local Region",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },

    {
      title: "location",
      dataIndex: "location",
      key: "location",

      // ...getColumnSearchProps(
      //   "location",
      //   "Location",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "remote_pop",
      dataIndex: "remote_pop",
      key: "remote_pop",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
      // ...getColumnSearchProps(
      //   "remote_pop",
      //   "Remote Pop",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },

    {
      title: "utilization",
      dataIndex: "utilization",
      key: "utilization",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "utilization",
      //   "Utilization",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
  ];
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <MainDiv style={{ padding: "25px" }}>
      <Spin spinning={loading}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <h2>Backhaul</h2>
          </div>
          <div>
            <Button onClick={exportSeed} style={{ marginRight: "5px" }}>
              Export
            </Button>
            <Button onClick={handleOpenModal} style={{ marginRight: "5px" }}>
              Modal
            </Button>
          </div>
        </div>
        <TableStyle
          style={{ marginTop: "10px" }}
          scroll={{ x: 2200 }}
          dataSource={dataSource}
          columns={columns}
        />
      </Spin>
      <ModalComponent visible={modalVisible} onClose={handleCloseModal} />
    </MainDiv>
  );
};

export default Utilisation;

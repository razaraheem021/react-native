import { Button, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import {
  MainDivwithoutSidebar,
  TableStyle,
} from "../../Components/GlobalStyles/main.styled.js";
import ModalComponent from "../../Components/Modal";
import { columnSearch } from "../../utils";
import axios, { baseUrl } from "../../utils/axios";

let excelData = [];
let columnFilters = {};

const Utilisation = () => {
  const navigate = useNavigate();
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
        const res = await axios.get(baseUrl + "/manipulator");
        excelData = res.data;
        setDataSource(excelData);
        setRowCount(excelData.length);
        setLoading(false);
        console.log(res.data);
      } catch (err) {
        console.log(err.response);
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
  const dummyData = [
    {
      router_ip: "192.168.1.1",
      interface: "eth0",
      snmp_load: "50%",
      link: "Link A",
    },
    {
      router_ip: "192.168.1.2",
      interface: "eth1",
      snmp_load: "75%",
      link: "Link B",
    },
    {
      router_ip: "192.168.1.3",
      interface: "eth2",
      snmp_load: "90%",
      link: "Link C",
    },
    // Add more dummy data objects as needed
  ];

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
      title: "Host Name",
      dataIndex: "host_name",
      key: "router_ip",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "router_ip",
      //   "Router Ip",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    {
      title: "Interface",
      dataIndex: "interface",
      key: "interface",
      render: (text, record) => (
        <span
          style={{ textDecoration: "underline" }}
          onClick={() => {
            navigate("/traffic-manuplater/perticular-interface", {
              state: {
                interface: text,
                router_ip: record.router_ip,
                snmp_index: record.snmp_index,
                snmp_load: record.snmp_load,
              },
            });
          }}
          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "interface",
      //   "Interface",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },

    {
      title: "Snmp Load",
      dataIndex: "snmp_load",
      key: "snmp_load",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "snmp_load",
      //   "Snmp Load",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    //     {
    //       title: "Link",
    //       dataIndex: "link",
    //       key: "community_name",
    //       render: (text, record) => (
    //         <span
    //         // style={{ textAlign: "center", paddingTop: "16px" }}
    //         >
    //           {text}
    //         </span>
    //       ),

    //       ...getColumnSearchProps(
    //         "link",
    //         "Link",
    //         setRowCount,
    //         setDataSource,
    //         excelData,
    //         columnFilters
    //       ),
    //       ellipsis: true,
    //     },
  ];
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <MainDivwithoutSidebar>
      <Spin spinning={loading}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <h2>Trafffic Manipulator</h2>
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
          dataSource={dataSource}
          columns={columns}
        />
      </Spin>
      <ModalComponent visible={modalVisible} onClose={handleCloseModal} />
    </MainDivwithoutSidebar>
  );
};

export default Utilisation;

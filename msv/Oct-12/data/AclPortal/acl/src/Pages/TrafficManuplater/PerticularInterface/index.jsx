import { Button, Modal, Spin, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import {
  MainDivwithoutSidebar,
  TableStyle,
} from "../../../Components/GlobalStyles/main.styled.js";
import { columnSearch } from "../../../utils";
import axios, { baseUrl } from "../../../utils/axios";
import MultiLineGraph from "./MultiLineChart";

import {
  CopyOutlined,
  EnterOutlined,
  ExportOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

let excelData = [];
let columnFilters = {};

const Utilisation = () => {
  const Dummydata = [
    {
      key: "1",
      router_ip: "192.168.1.1",
      community: "Community 1",
      netflow: "Netflow 1",
      bgp: "BGP 1",
      current_db: 1,
      default_db: 1,
      suggested: 1,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "3",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "4",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "5",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    {
      key: "2",
      router_ip: "192.168.1.2",
      community: "Community 2",
      netflow: "Netflow 2",
      bgp: "BGP 2",
      current_db: 0,
      default_db: 1,
      suggested: 0,
    },
    // Add more dummy data as needed
  ];
  const location = useLocation();

  //   let [interfaceData, setInterface] = useState(location.state.interface);
  //   let [router_ip, setRouter_ip] = useState(location.state.router_ip);
  //   let [snmp_index, setSnmp_index] = useState(location.state.snmp_index);
  //   -------
  let [interfaceData, setInterface] = useState("");
  let [snmp_index, setSnmp_index] = useState("");
  let [router_ip, setRouter_ip] = useState("");
  let [dataSource, setDataSource] = useState(excelData);
  const [searchText, setSearchText] = useState(null);
  const [searchedColumn, setSearchedColumn] = useState(null);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modifiedCheckboxes, setModifiedCheckboxes] = useState({});
  const [checkboxSource, setCheckboxSource] = useState(""); // Add this state variable
  const [changedSwitches, setChangedSwitches] = useState({});
  const [graphData, setGraphData] = useState({});

  let getColumnSearchProps = columnSearch(
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn
  );

  useEffect(() => {
    const serviceCalls = async () => {
      // setLoading(true);
      const data = {
        interface: interfaceData,
        router_ip,
      };
      try {
        const res = await axios.post(
          baseUrl + "/manipulator/particular_interface",
          data
        );
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
    {
      title: "Community",
      dataIndex: "community",
      key: "community",
      render: (text, record) => (
        <span
          onClick={() => handleOpenModal(text)}
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "community",
      //   "Community",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    {
      title: "Community Name",
      dataIndex: "community_name",
      key: "community_name",
      render: (text, record) => <span>{text}</span>,

      // ...getColumnSearchProps(
      //   "community",
      //   "Community",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    {
      title: "Netflow",
      dataIndex: "netflow",
      key: "netflow",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "netflow",
      //   "Netflow",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    {
      title: "BGP",
      dataIndex: "bgp",
      key: "bgp",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "bgp",
      //   "BGP",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    {
      title: "Current Status",
      dataIndex: "current_db",
      key: "current_db",
      render: (text, record) => (
        <p
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </p>
      ),

      // ...getColumnSearchProps(
      //   "current_db",
      //   "Current Status",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    {
      title: "Default Status",
      dataIndex: "default_db",
      key: "default_db",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "default_db",
      //   "Default Status",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    {
      title: "Suggested Status",
      dataIndex: "suggested",
      key: "suggested",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "suggested",
      //   "Suggested Status",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    {
      title: "Checkbox",
      dataIndex: "checkbox",
      key: "checkbox",
      render: (text, record) => (
        //   <Checkbox
        //     checked={
        //       checkboxSource === "Default DB"
        //         ? record.default_db === 1
        //         : modifiedCheckboxes[record.key] === 1
        //     }
        //     onChange={(e) => handleCheckboxChange(e, record)}
        //   />
        //   <Checkbox
        //     checked={record.current_db === 1}
        //     onChange={(e) => handleCheckboxChange(e, record)}
        //   />
        <span>
          <Switch
            checked={record.current_db === 1}
            onChange={(checked) => handleCheckboxChange(checked, record)}
          />
        </span>
      ),
      // ...getColumnSearchProps(
      //   "checkbox",
      //   "Checkbox",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
  ];
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = (community) => {
    setModalVisible(true);
    const data = {
      interface: interfaceData,
      router_ip,
      snmp_index,
      community,
    };
    console.log(data);
    console.log(community);
    setGraphData(data);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  //   const handleCheckboxChange = (e, record) => {
  //     const { checked } = e.target;

  //     if (checkboxSource === "Default DB") {
  //       // If checkboxSource is "Default DB", update modifiedCheckboxes state accordingly
  //       setModifiedCheckboxes((prevState) => ({
  //         ...prevState,
  //         [record.key]: checked ? 1 : 0,
  //       }));

  //       // Update the checkbox value directly in the dataSource
  //       const updatedDataSource = dataSource.map((data) => {
  //         if (data.key === record.key) {
  //           return {
  //             ...data,
  //             current_db: checked ? 1 : 0,
  //           };
  //         }
  //         return data;
  //       });
  //       setDataSource(updatedDataSource);
  //     } else {
  //       // If checkboxSource is "Suggested", directly update the checkbox value in the dataSource
  //       const updatedDataSource = dataSource.map((data) => {
  //         if (data.key === record.key) {
  //           return {
  //             ...data,
  //             current_db: checked ? 1 : 0,
  //           };
  //         }
  //         return data;
  //       });
  //       setDataSource(updatedDataSource);
  //     }
  //   };

  //   const handleCheckboxChange = (checked, record) => {
  //     if (checkboxSource === "Default DB") {
  //       // If checkboxSource is "Default DB", update modifiedCheckboxes state accordingly
  //       setModifiedCheckboxes((prevState) => ({
  //         ...prevState,
  //         [record.key]: checked ? 1 : 0,
  //       }));

  //       // Update the checkbox value directly in the dataSource
  //       const updatedDataSource = dataSource.map((data) => {
  //         if (data.key === record.key) {
  //           return {
  //             ...data,
  //             current_db: checked ? 1 : 0,
  //           };
  //         }
  //         return data;
  //       });
  //       setDataSource(updatedDataSource);
  //     } else {
  //       // If checkboxSource is "Suggested", directly update the checkbox value in the dataSource
  //       const updatedDataSource = dataSource.map((data) => {
  //         if (data.key === record.key) {
  //           return {
  //             ...data,
  //             current_db: checked ? 1 : 0,
  //           };
  //         }
  //         return data;
  //       });
  //       setDataSource(updatedDataSource);
  //     }
  //   };

  //   const handleCheckboxChange = (checked, record) => {
  //     if (checkboxSource === "Default DB") {
  //       setModifiedCheckboxes((prevState) => ({
  //         ...prevState,
  //         [record.key]: checked ? 1 : 0,
  //       }));
  //     } else {
  //       const updatedDataSource = dataSource.map((data) => {
  //         if (data.key === record.key) {
  //           return {
  //             ...data,
  //             current_db: checked ? 1 : 0,
  //           };
  //         }
  //         return data;
  //       });
  //       setDataSource(updatedDataSource);
  //     }
  //     setChangedSwitches((prevState) => ({
  //       ...prevState,
  //       [record.key]: checked ? 1 : 0,
  //     }));
  //   };

  const handleCheckboxChange = (checked, record) => {
    if (checkboxSource === "Default DB") {
      setModifiedCheckboxes((prevState) => ({
        ...prevState,
        [record.key]: checked ? 1 : 0,
      }));
    } else {
      const updatedDataSource = dataSource.map((data) => {
        if (data.key === record.key) {
          return {
            ...data,
            current_db: checked ? 1 : 0,
          };
        }
        return data;
      });
      setDataSource(updatedDataSource);
    }

    setChangedSwitches((prevState) => ({
      ...prevState,
      [record.key]: checked ? 1 : 0,
    }));
  };

  const copyDefaultColumns = () => {
    const updatedDataSource = dataSource.map((data) => ({
      ...data,
      current_db: data.default_db, // Copy the value from "Default DB" column to "Checkbox" column
    }));

    setCheckboxSource("Default DB"); // Set checkboxSource to "Default DB"

    // Update modifiedCheckboxes state with the new values
    const modifiedCheckboxesData = {};
    updatedDataSource.forEach((data) => {
      modifiedCheckboxesData[data.key] = data.current_db;
    });
    setModifiedCheckboxes(modifiedCheckboxesData);

    setChangedSwitches(modifiedCheckboxesData); // Update changedSwitches with the new values

    setDataSource(updatedDataSource);
  };

  const copySuggestedColumns = () => {
    const updatedDataSource = dataSource.map((data) => ({
      ...data,
      current_db: data.suggested, // Copy the value from "Suggested" column to "Checkbox" column
    }));

    setCheckboxSource("Suggested"); // Set checkboxSource to "Suggested"

    // Update modifiedCheckboxes state with the new values
    const modifiedCheckboxesData = {};
    updatedDataSource.forEach((data) => {
      modifiedCheckboxesData[data.key] = data.current_db;
    });
    setModifiedCheckboxes(modifiedCheckboxesData);

    setChangedSwitches(modifiedCheckboxesData); // Update changedSwitches with the new values

    setDataSource(updatedDataSource);
  };

  const handleReset = () => {
    setModifiedCheckboxes({}); // Reset modifiedCheckboxes state to an empty object
    setDataSource(excelData); // Set the dataSource state to Dummydata
    setChangedSwitches({});
  };
  const applyChanges = () => {
    try {
      const data = {
        switches: changedSwitches,
      };
      console.log("--------->", dataSource);

      // Get the rows where the checkbox value has been changed
      // const changedRows = dataSource.filter((data) => {
      //   const key = data.key;
      //   const currentValue = data.current_db;
      //   const originalValue = excelData.find(
      //     (row) => row.key === key
      //   )?.current_db;
      //   return currentValue !== originalValue;
      // });
      // console.log("Changed Rows:", changedRows);

      // // Make the API call or perform the desired action with the changed rows' data
      // // ...

      // const res = axios.post(baseUrl + "/manipulator/apply", changedRows);
      // openSweetAlert("Configration Sent to Device", "info");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <MainDivwithoutSidebar>
      <Spin spinning={loading}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <h2>{interfaceData}</h2>
          </div>
          <div>
            <Button
              type="primary"
              onClick={exportSeed}
              style={{ marginRight: "5px" }}
            >
              <ExportOutlined /> Export
            </Button>
            <Button
              type="primary"
              style={{ marginRight: "5px" }}
              onClick={handleReset}
              danger
            >
              <ReloadOutlined /> Reset to Current
            </Button>
            <Button
              type="primary"
              style={{ marginRight: "5px" }}
              onClick={copyDefaultColumns}
            >
              <CopyOutlined /> Copy Default
            </Button>
            <Button
              type="primary"
              style={{ marginRight: "5px" }}
              onClick={copySuggestedColumns}
            >
              <CopyOutlined /> Copy Suggested
            </Button>
            <Button
              onClick={applyChanges}
              style={{
                marginRight: "5px",
                backgroundColor: "#6ab127",
                color: "white",
              }}
            >
              Apply <EnterOutlined />
            </Button>

            <Button onClick={handleOpenModal} style={{ marginRight: "5px" }}>
              Modal
            </Button>
          </div>
        </div>
        <TableStyle
          style={{ marginTop: "10px" }}
          //     scroll={{ x: 2200 }}
          dataSource={dataSource}
          columns={columns}
        />
      </Spin>
      {/* <ModalComponent visible={modalVisible} onClose={handleCloseModal} /> */}
      <Modal
        style={{ marginTop: "-20px" }}
        open={modalVisible}
        onCancel={handleCloseModal}
        width={800}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
      >
        <MultiLineGraph graphData={graphData} />
      </Modal>
    </MainDivwithoutSidebar>
  );
};

export default Utilisation;

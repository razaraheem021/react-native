import {
  EyeOutlined,
  DownloadOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  notification,
  Drawer,
} from "antd";
import "../../../index.css";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import {
  MainDivwithoutSidebar,
  TableStyle,
  MainDiv,
} from "../../../Components/GlobalStyles/main.styled.js";
import { columnSearch } from "../../../utils";
import axios, { baseUrl } from "../../../utils/axios";
import { saveAs } from "file-saver";
import "./main.css";

let excelData = [];
let columnFilters = {};
const { Option } = Select;
const Index = ({
  setSuccessfullyExecutedCmdsForConfiguration,
  setErrorCmdsForConfiguration,
  setQueuedCmdsForConfiguration,
}) => {
  let [dataSource, setDataSource] = useState(excelData);
  const [searchText, setSearchText] = useState(null);
  const [searchedColumn, setSearchedColumn] = useState(null);
  const [rowCount, setRowCount] = useState(0);
  const [command, setCommand] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [outputData, setOutputData] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCmdDetails, setIsModalOpenCmdDetails] = useState(false);
  const [options, setOptions] = useState([]);
  const [filters, setFilters] = useState({});

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const containerStyle = {
    position: "relative",
    height: "100%",
    overflow: "hidden",
  };

  const openSweetAlert = (title, type, errors) => {
    console.log("Error-------->", errors);

    Swal.fire({
      title,
      type,
      allowOutsideClick: false,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModalCmdDetails = (output) => {
    // setIsModalOpenCmdDetails(true);

    setOutputData(output);
    showDrawer();
  };
  const handleOkCmdDetails = () => {
    setIsModalOpenCmdDetails(false);
  };
  const handleCancelCmdDetails = () => {
    setIsModalOpenCmdDetails(false);
  };
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
        const res = await axios.get(
          baseUrl + "/asynccommandrunner/configurations"
        );
        excelData = res.data;

        // res.data.forEach((item) => {
        //   if (item.status === "Completed") {
        //     // successfullyExecutedCmds += successfullyExecutedCmds;
        //     setSuccessfullyExecutedCmdsForConfiguration((prev) => prev + 1);
        //   }
        //   if (item.status === "Error") {
        //     // successfullyExecutedCmds += successfullyExecutedCmds;
        //     setErrorCmdsForConfiguration((prev) => prev + 1);
        //   }
        //   if (item.status === "Queued") {
        //     // successfullyExecutedCmds += successfullyExecutedCmds;
        //     setQueuedCmdsForConfiguration((prev) => prev + 1);
        //   }
        // });

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

  useEffect(() => {
    const service = async () => {
      let successCount = 0;
      let errorCount = 0;
      let queuedCount = 0;
      const res = await axios.get(
        baseUrl + "/asynccommandrunner/configurations"
      );

      res.data.forEach((item) => {
        if (item.status === "Completed") {
          successCount++;
        }
        if (item.status === "Error") {
          errorCount++;
        }
        if (item.status === "Queued") {
          queuedCount++;
        }
      });

      setSuccessfullyExecutedCmdsForConfiguration(successCount);
      setErrorCmdsForConfiguration(errorCount);
      setQueuedCmdsForConfiguration(queuedCount);
    };
    service();
  }, []);

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
      title: "Hostname",
      dataIndex: "hostname",
      key: "hostname",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ellipsis: true,
    },
    {
      title: "Community Set",
      dataIndex: "community_set",
      key: "community_set",
      render: (text, record) => (
        <span
        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ellipsis: true,
    },

    {
      title: "Interface",
      dataIndex: "interface",
      key: "interface",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ellipsis: true,
    },
    {
      title: "Date/Time",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ellipsis: true,
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   align: "center",
    //   render: (text, record) => (
    //     <>
    //       {text === "Completed" ? (
    //         <div
    //           style={{
    //             textAlign: "center",
    //             backgroundColor: "#b5de93",
    //             margin: "0% 15%",
    //             padding: "2px",
    //             borderRadius: 10,
    //             fontWeight: 600,
    //           }}
    //         >
    //           <span
    //           // style={{ textAlign: "center", paddingTop: "16px" }}
    //           >
    //             {text}
    //           </span>
    //         </div>
    //       ) : null}
    //       {text === "Queue" ? (
    //         <div
    //           style={{
    //             textAlign: "center",
    //             backgroundColor: "#daea82",
    //             margin: "0% 15%",
    //             padding: "2px",
    //             borderRadius: 10,
    //             fontWeight: 600,
    //           }}
    //         >
    //           <span
    //           // style={{ textAlign: "center", paddingTop: "16px" }}
    //           >
    //             {text}
    //           </span>
    //         </div>
    //       ) : null}
    //       {text === "Error" ? (
    //         <div
    //           style={{
    //             textAlign: "center",
    //             backgroundColor: "#FFE9E9",
    //             margin: "0% 15%",
    //             padding: "2px",
    //             borderRadius: 10,
    //             fontWeight: 600,
    //           }}
    //         >
    //           <span>{text}</span>
    //         </div>
    //       ) : null}
    //     </>
    //   ),
    //   ellipsis: true,
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      filters: [
        { text: "Completed", value: "Completed" },
        { text: "Queue", value: "Queue" },
        { text: "Error", value: "Error" },
      ],
      onFilter: (value, record) => record.status === value,
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#000" : "#ffffff" }} />
      ),
      //  filterDropdown: ({
      //   setSelectedKeys,
      //   selectedKeys,
      //   confirm,
      //   clearFilters,
      // }) => (
      //   <div style={{ padding: 8 }}>
      //     <Input
      //       placeholder="Search the Status"
      //       value={selectedKeys[0]}
      //       onChange={(e) =>
      //         setSelectedKeys(e.target.value ? [e.target.value] : [])
      //       }
      //       onPressEnter={() => confirm()}
      //       style={{ marginBottom: 8, display: "block" }}
      //     />
      //     <Button
      //       type="primary"
      //       onClick={() => confirm()}
      //       icon={<SearchOutlined />}
      //     >
      //       Search
      //     </Button>
      //     <Button onClick={() => clearFilters()}>Reset</Button>
      //   </div>
      // ),
      // onFilter: (value, record) =>
      //   record["status"].toLowerCase().includes(value.toLowerCase()),
      // filteredValue: filters["status"], // Apply filter value
      // onFilterDropdownVisibleChange: (visible) => {
      //   if (visible) {
      //     // Focus the input when filter dropdown is opened
      //     setTimeout(() => {
      //       document.getElementById("status-filter").focus();
      //     }, 0);
      //   }
      // },
      // filterIcon: (filtered) => (
      //   <FilterOutlined style={{ color: filtered ? "#000" : "#ffffff" }} />
      // ),
      render: (text) => (
        <div
          style={{
            textAlign: "center",
            backgroundColor:
              text === "Completed"
                ? "#b5de93"
                : text === "Queue"
                ? "#daea82"
                : text === "Error"
                ? "#FFE9E9"
                : "",
            margin: "0% 15%",
            padding: "2px",
            borderRadius: 10,
            fontWeight: 600,
          }}
        >
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Output",
      dataIndex: "",
      key: "",
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: "center", cursor: "pointer" }}>
          <span>
            <EyeOutlined
              style={{ fontSize: "22px" }}
              onClick={() => showModalCmdDetails(record.output)}
            />
            <DownloadOutlined
              style={{ fontSize: "22px", marginLeft: "15px" }}
              onClick={() => {
                const file = new Blob([record.output], {
                  type: "text/plain;charset=utf-8",
                });
                saveAs(file, "configration.txt");
              }}
            />
          </span>
        </div>
      ),

      ellipsis: true,
    },
  ];

  return (
    <div style={{ padding: "15px" }}>
      <Spin spinning={loading}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            {/* <h2 style={ { fontSize: "22px", fontWeight: "bold", marginBottom: "10px" } }>Async Command Runner Configration</h2> */}
          </div>
          <div>
            {/* <Button onClick={ showModal } style={ { marginRight: "5px" } }>
              Add Command
            </Button> */}
          </div>
        </div>
        <div style={containerStyle}>
          <TableStyle
            rowClassName={() => "rowClassName1"}
            style={{ marginTop: "10px" }}
            //     scroll={{ x: 2200 }}
            dataSource={dataSource}
            columns={columns}
          />
          <Drawer
            title="Configuration Output"
            placement="left"
            closable={true}
            mask={false}
            onClose={onClose}
            width="60%"
            open={open}
            getContainer={false}
          >
            <>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <p>{command}</p>
                </Col>
                <Col span={12}>
                  <p>{timestamp}</p>
                </Col>
              </Row>
              <div
                style={{
                  height: "400px",
                  width: "100%",
                  overflowY: "auto",
                }}
              >
                <pre>{outputData}</pre>
              </div>
            </>
          </Drawer>
        </div>
      </Spin>
      {/* <Modal
        title="Configration Details"
        open={isModalOpenCmdDetails}
        onOk={handleOkCmdDetails}
        onCancel={handleCancelCmdDetails}
        footer={false}
        width={750}
      >
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <p>{command}</p>
          </Col>
          <Col span={12}>
            <p>{timestamp}</p>
          </Col>
        </Row>
        <div
          style={{
            height: "400px",
            width: "100%",
            overflowY: "auto",
          }}
        >
          <pre>{outputData}</pre>
        </div>
      </Modal> */}
    </div>
  );
};

export default Index;

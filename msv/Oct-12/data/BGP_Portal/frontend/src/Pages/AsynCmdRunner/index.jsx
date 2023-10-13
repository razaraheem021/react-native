import {
  EyeOutlined,
  DownloadOutlined,
  FilterOutlined,
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
// import { useForm } from "@ant-design/react-form";
import "./main.css";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import {
  MainDivwithoutSidebar,
  TableStyle,
} from "../../Components/GlobalStyles/main.styled.js";
import "../../index.css";

import { columnSearch } from "../../utils";
import axios, { baseUrl } from "../../utils/axios";
import { saveAs } from "file-saver";

import cardleft1 from "./assests/cardleft1.svg";
import cardleft2 from "./assests/cardleft2.svg";
import cardleft3 from "./assests/cardleft3.svg";
import completed from "./assests/completed.svg";
import error from "./assests/error.svg";
import queue from "./assests/queue.svg";
import Card from "../../Components/Card";

let errorCmds = 0;
let queuedCmds = 0;
let excelData = [];
let columnFilters = {};
const { Option } = Select;
const Index = ({
  setSuccessfullyExecutedCmds,
  setErrorCmds,
  setQueuedCmds,
  setDataSource,
  dataSource,
  loading,
  setLoading,
  rowCount,
  setRowCount,
  dataSourceFilter,
  filterCompletedShow,
  errorShow,
  queueShow,
}) => {
  // let [dataSource, setDataSource] = useState(excelData);
  const [searchText, setSearchText] = useState(null);
  const [searchedColumn, setSearchedColumn] = useState(null);
  // const [rowCount, setRowCount] = useState(0);
  const [command, setCommand] = useState("");
  const [hostname, setHostname] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [outputData, setOutputData] = useState("");
  // const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCmdDetails, setIsModalOpenCmdDetails] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
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
    // padding: 48,
    overflow: "hidden",
  };
  console.log(value, "value");
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(baseUrl + "/router");
        console.log(response.data, "response");
        setOptions(response.data);
        //   setOptions(["response.data", "dcsdcs", "acacac", "Ascasc"]);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);
  // const options = [];
  // for (let i = 10; i < 36; i++) {
  //   options.push({
  //     label: i.toString(36) + i,
  //     value: i.toString(36) + i,
  //   });
  // }
  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };

  const openSweetAlert = (title, type, errors) => {
    console.log("Error-------->", errors);

    Swal.fire({
      title,
      type,
      allowOutsideClick: false,
    });
  };
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Form values:", values);
    await axios
      .post(baseUrl + "/asynccommandrunner", values)
      .then((response) => {
        setLoading(false);
        setIsModalOpen(false);
        openSweetAlert(response?.data, "success");
        setValue("");
        form.resetFields();
        const promises = [];
        promises.push(
          axios
            .get(baseUrl + "/asynccommandrunner")
            .then((res) => {
              console.log("asynccommandrunner", res);
              // excelData = res.data;
              setDataSource(res.data);
              setRowCount(res.data.length);
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            })
        );
        setLoading(false);
        return Promise.all(promises);
      })
      .catch((err) => {
        openSweetAlert(response?.data, "error");
        console.log("error ==> " + err);
        setLoading(false);
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
  const showModalCmdDetails = (cmd, timeStamp, output, hostname) => {
    // setIsModalOpenCmdDetails(true);
    setCommand(cmd);
    setTimestamp(timeStamp);
    setOutputData(output);
    setHostname(hostname);
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

  // useEffect(() => {
  //   const serviceCalls = async () => {
  //     setLoading(true);

  //     try {
  //       const res = await axios.get(baseUrl + "/asynccommandrunner");
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

  useEffect(() => {
    const service = async () => {
      let successCount = 0;
      let errorCount = 0;
      let queuedCount = 0;
      const res = await axios.get(baseUrl + "/asynccommandrunner");

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

      setSuccessfullyExecutedCmds(successCount);
      setErrorCmds(errorCount);
      setQueuedCmds(queuedCount);
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
      title: "Command",
      dataIndex: "command",
      key: "command",
      render: (text, record) => (
        <span
        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "command",
      //   "Command",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
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

      // ...getColumnSearchProps(
      //   "device",
      //   "Device",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
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

      // ...getColumnSearchProps(
      //   "timestamp",
      //   "TimeStamp",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
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
    //           <span
    //           // style={{ textAlign: "center", paddingTop: "16px" }}
    //           >
    //             {text}
    //           </span>
    //         </div>
    //       ) : null}
    //     </>
    //   ),

    //   // ...getColumnSearchProps(
    //   //   "status",
    //   //   "Status",
    //   //   setRowCount,
    //   //   setDataSource,
    //   //   excelData,
    //   //   columnFilters
    //   // ),
    //   ellipsis: true,
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // align: "center",

      filters: [
        { text: "Completed", value: "Completed" },
        { text: "Queue", value: "Queue" },
        { text: "Error", value: "Error" },
      ],
      onFilter: (value, record) => record.status === value,
      filterIcon: (filtered) => (
        <FilterOutlined
          style={{ color: filtered ? "#000" : "#ffffff", marginRight: "7px" }}
        />
      ),
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
          <span
          // style={{ textAlign: "center", paddingTop: "16px" }}
          >
            <EyeOutlined
              style={{ fontSize: "22px" }}
              onClick={() => {
                showModalCmdDetails(
                  record.command,
                  record.timestamp,
                  record.output,
                  record.hostname
                );
              }}
            />
            <DownloadOutlined
              style={{ fontSize: "22px", marginLeft: "15px" }}
              onClick={() => {
                const file = new Blob([record.output], {
                  type: "text/plain;charset=utf-8",
                });
                saveAs(file, "file.txt");
              }}
            />
          </span>
        </div>
      ),
      // ...getColumnSearchProps(
      //   "",
      //   "Action",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
  ];
  const data = [
    {
      command: "show interfaces",
      device: "Router A",
      timestamp: "2023-06-20 10:30:00",
      status: "Completed",
    },
    {
      command: "show running-config",
      device: "Router B",
      timestamp: "2023-06-20 11:15:00",
      status: "Queue",
    },
    {
      command: "show ip route",
      device: "Router C",
      timestamp: "2023-06-20 12:00:00",
      status: "Error",
    }, // Add more data as needed
  ];

  return (
    <div style={containerStyle}>
      <div style={{ padding: "15px" }}>
        <Spin spinning={loading}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              {/* <h2 style={ { fontSize: "22px", fontWeight: "bold", marginBottom: "10px" } }>Async Command Runner</h2> */}
            </div>
            <div>
              {/* <Button onClick={exportSeed} style={{ marginRight: "5px" }}>
              Export
            </Button> */}
              <Button
                onClick={showModal}
                style={{
                  marginRight: "5px",
                  backgroundColor: "#0688BE",
                  paddingBottom: "5px",
                }}
              >
                Add Command
              </Button>
            </div>
          </div>
          {/* <div style={ { display: "flex" } }>

          <Card customColor="#66B127"
            content="34"
            contentTitle="Completed"
            customImgLeft={ cardleft1 }
            customImgRight={ completed }
          />   <Card customColor="#A30505"
            content="34"
            contentTitle="Error"
            customImgLeft={ cardleft2 }
            customImgRight={ error }
          />   <Card customColor="#CBC301"
            content="34"
            contentTitle="Queue"
            customImgLeft={ cardleft3 }
            customImgRight={ queue }
          />
        </div> */}
          {filterCompletedShow === false &&
          queueShow === false &&
          errorShow === false ? (
            <TableStyle
              rowClassName={() => "rowClassName1"}
              style={{ marginTop: "10px" }}
              //     scroll={{ x: 2200 }}
              dataSource={dataSource}
              columns={columns}
            />
          ) : (
            <TableStyle
              rowClassName={() => "rowClassName1"}
              style={{ marginTop: "10px" }}
              //     scroll={{ x: 2200 }}
              dataSource={dataSourceFilter}
              columns={columns}
            />
          )}
        </Spin>
        {/* <Modal
          title="Command Details"
          open={isModalOpenCmdDetails}
          onOk={handleOkCmdDetails}
          onCancel={handleCancelCmdDetails}
          footer={false}
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
              height: "200px",
              width: "100%",
              overflowY: "auto",
            }}
          >
            <pre>{outputData}</pre>
          </div>
        </Modal> */}

        <Drawer
          title="Command Output"
          placement="left"
          onClose={onClose}
          width="60%"
          mask={false}
          closable={true}
          open={open}
          getContainer={false}
        >
          <>
            <Row gutter={[8, 8]}>
              <Col span={7}>
                <p style={{ fontWeight: 500 }}>{hostname}</p>
              </Col>
              <Col span={7}>
                <p style={{ fontWeight: 500 }}>{command}</p>
              </Col>

              <Col span={10}>
                <p style={{ fontWeight: 500 }}>{timestamp}</p>
              </Col>
            </Row>
            <br />
            <div
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <pre>{outputData}</pre>
            </div>
          </>
        </Drawer>

        <Modal
          title=""
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <h2
            style={{
              background: "#7BB3FE",
              borderTopLeftRadius: "9px",
              borderTopRightRadius: "9px",
              fontSize: "18px",
              textAlign: "center",
              paddingTop: "8px",
              paddingBottom: "8px",
              fontWeight: 600,
              color: "white",
            }}
          >
            Add Command
          </h2>
          <Form
            form={form}
            onFinish={onFinish}
            style={{ marginTop: "15px", padding: "12px" }}
          >
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Form.Item
                  name="command"
                  label="Command"
                  rules={[{ required: true, message: "Please enter a value" }]}
                >
                  <Input
                    placeholder="Enter a value"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="device"
                  label="Device"
                  rules={[
                    { required: true, message: "Please select an option" },
                  ]}
                >
                  <Select mode="multiple" allowClear>
                    {options.map((option) => (
                      <Select.Option
                        key={option.router_ip}
                        value={option.router_ip}
                      >
                        {option.host_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item style={{ float: "right" }}>
              <Button
                // onClick={() => setIsModalOpen(false)}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
            <br />
            <br />
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Index;

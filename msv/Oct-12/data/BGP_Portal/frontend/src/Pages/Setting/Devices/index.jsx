import React, { useState, useEffect } from "react";
import {
  MainDiv,
  TableStyle,
} from "../../../Components/GlobalStyles/main.styled.js";
import up from "./assets/up.svg";
import down from "./assets/down.svg";

import {
  Input,
  Button,
  Modal,
  Form,
  Spin,
  Popconfirm,
  Radio,
  message,
} from "antd";
import device from "./assets/devices.svg";
import axios, { baseUrl } from "../../../utils/axios/index.jsx";

import Swal from "sweetalert2";
import { Switch } from "antd";

const Index = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataRowLength, setDataRowLength] = useState(0);
  const [username, setUsername] = useState("srv00047");
  // const [messageApi, contextHolder] = message;
  const [messageApi, contextHolder] = message.useMessage();
  // const [check, setCheck] = useState("");

  // const [bgColor, setBgColor]= useState({
  //   bg1:"",
  //   bg2:"",
  //   bg3:""
  // });
  const [selected, setSelected] = useState("dry_run");

  // const onChange = (checked) => {
  //   console.log(`switch to ${checked}`);
  //   setCheck(checked);
  // };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onFinish = async (values) => {
    console.log("Form submitted with values:", values);

    try {
      const user_id = 1;
      const response = await axios.post(baseUrl + "/add_credentials", {
        username: values.username,
        password: values.new_password,
        user_id: user_id,
      });
      messageApi.open({
        type: "success",
        content: "Credentials updated Successfully",
        className: "custom-class",
        style: {
          marginTop: "5vh",
        },
      });
      setIsModalVisible(false);
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form submission failed:", errorInfo);
  };

  useEffect(() => {
    const serviceCalls = async () => {
      setLoading(true);

      try {
        const res = await axios.get(baseUrl + "/setting/device");
        // excelData1Tab1 = res.data.first;
        setData(res.data);
        setDataRowLength(res.data.length);
        setLoading(false);
      } catch (err) {
        console.log(err.response);
        setLoading(false);
      }
    };

    const settingModeApiCall = async () => {
      await axios.get(baseUrl + "/manipulator/get-mode").then((res) => {
        setSelected(res.data.mode);
        console.log(res, "res data");
      });
    };
    settingModeApiCall();

    serviceCalls();
  }, []);

  const settingModeApiCall2 = async (value) => {
    const username = localStorage.getItem("bgp_username");
    await axios
      .post(baseUrl + "/manipulator/add-mode", {
        mode: value,
        username,
      })
      .then((res) => {
        message.success("Mode updated");
      });
  };

  const columns = [
    {
      title: "Hostname",
      dataIndex: "host_name",
      key: "host_name",
    },
    {
      title: "SSH Status",
      dataIndex: "ssh_status",
      key: "ssh_status",
      render: (_, record) => (
        <span>
          {record?.ssh_status === "up" ? (
            <div style={{ display: "flex", gap: 3 }}>
              <img src={up} alt="" /> {record?.ssh_status}
            </div>
          ) : record?.ssh_status === "down" ? (
            <div style={{ display: "flex", gap: 3 }}>
              <img src={down} alt="" /> {record?.ssh_status}
            </div>
          ) : (
            record?.ssh_status
          )}
        </span>
      ),
    },
    {
      title: "SSH Time Recorded",
      dataIndex: "ssh_time_recorded",
      key: "ssh_time_recorded",
    },
    {
      title: "SNMP Status",
      dataIndex: "snmp_status",
      key: "snmp_status",
      render: (_, record) => (
        <span>
          {record?.snmp_status === "up" ? (
            <div style={{ display: "flex", gap: 3 }}>
              <img src={up} alt="" /> {record?.snmp_status}
            </div>
          ) : (
            <>
              {record?.snmp_status === "N/A" ? (
                <div style={{ display: "flex", gap: 3 }}>
                  {record?.snmp_status}
                </div>
              ) : (
                <div style={{ display: "flex", gap: 3 }}>
                  <img src={down} alt="" /> {record?.snmp_status}
                </div>
              )}
            </>
          )}
        </span>
      ),
    },
    {
      title: "SNMP Time Recorded",
      dataIndex: "snmp_time_recorded",
      key: "snmp_time_recorded",
    },
    {
      title: "Netflow Last Packet Recieved",
      dataIndex: "netflow_last_packet_recieved",
      key: "netflow_last_packet_recieved",
    },
    {
      title: "Ip Address",
      dataIndex: "ip_address",
      key: "ip_address",
    },
  ];
  const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "rowClassName1";
    } else {
      return "rowClassName2";
    }
  };

  const changeBgColor = (id) => {
    if (id === "1") {
      bgColor.bg1 = "blue";
    } else if (id === "2") {
      bgColor.bg2 = "blue";
    } else {
      bgColor.bg3 = "blue";
    }
  };

  return (
    <MainDiv style={{ padding: "30px" }}>
      <Spin spinning={loading}>
        {contextHolder}
        <div style={{ display: "flex", marginTop: "-20px" }}>
          <img src={device} alt="" /> &nbsp;&nbsp;
          <p style={{ fontWeight: 700, fontSize: "20px" }}>Devices Status</p>
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "end" }}>
          {/* <p style={{ display: "flex", fontSize: "16px" }}>
            Row &nbsp;<b> {dataRowLength}</b>&nbsp;&nbsp; Col &nbsp;<b>2</b>
          </p> */}
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
              marginTop: "-40px",
            }}
          >
            <Radio.Group
              value={selected}
              onChange={(e) => {
                setSelected(e.target.value);
                settingModeApiCall2(e.target.value);
              }}
            >
              <Radio.Button
                style={{
                  backgroundColor:
                    selected === "dry_run" ? "#0688BE" : "transparent",
                  borderColor: "#0688BE",
                  color: selected === "dry_run" ? "white" : "",
                }}
                value="dry_run"
              >
                Dry Run
              </Radio.Button>
              <Radio.Button
                style={{
                  backgroundColor:
                    selected === "test" ? "#0688BE" : "transparent",
                  borderColor: "#0688BE",
                  color: selected === "test" ? "white" : "",
                }}
                value="test"
              >
                Test
              </Radio.Button>
              <Radio.Button
                style={{
                  backgroundColor:
                    selected === "live" ? "#0688BE" : "transparent",
                  borderColor: "#0688BE",
                  color: selected === "live" ? "white" : "",
                }}
                value="live"
              >
                Live
              </Radio.Button>
            </Radio.Group>
            &nbsp;&nbsp;
            <div>
              <Button
                onClick={() => {
                  setIsModalVisible(true);
                }}
              >
                Update Device Credentials
              </Button>
            </div>
          </div>
        </div>
        <TableStyle
          rowClassName={rowClassName}
          dataSource={data}
          columns={columns}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["10", data.length],
          }}
        />
      </Spin>
      <Modal
        title=""
        footer={null}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
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
          Update Device Credentials
        </h2>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ padding: "12px" }}
          initialValues={{
            username: "",
            new_password: "",
            confirm_password: "",
          }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="new_password"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            dependencies={["new_password"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("The two passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </MainDiv>
  );
};

export default Index;

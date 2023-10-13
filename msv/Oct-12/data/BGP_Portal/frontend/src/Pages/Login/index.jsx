import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Space,
  Spin,
} from "antd";
import {
  MainDivwithoutSidebar,
  MainDivwithoutSidebarInfluxgraph,
  TableStyle,
  MainDivLogin,
  LoginStyledInput,
  LoginPassStyledInput,
} from "../../Components/GlobalStyles/main.styled.js";
import { LockOutlined, UserOutlined, CloseOutlined } from "@ant-design/icons";

import Mobi from "./assets/mobi.svg";
import RightSideImg from "./assets/rightside.svg";
import Cisco from "./assets/cisco.svg";
import BGRight from "./assets/bgRight.svg";
import BGLeft1 from "./assets/bgLeft1.svg";
import BGLeft2 from "./assets/bgLeft2.svg";
import { useNavigate } from "react-router-dom";
import axios, { baseUrl } from "../../utils/axios";

const Index = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [pass, setPass] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Login Successful",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const getError = (error) => {
    return (
      <div
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "3px 10px 3px 10px",
          borderRadius: "7px",
          marginBottom: "10px",
        }}
      >
        {error}{" "}
        <a
          style={{ color: "white", float: "right" }}
          onClick={() => setErrors([])}
        >
          <CloseOutlined style={{ color: "white" }} />
        </a>
      </div>
    );
  };

  const onFinish = async (values) => {
    setLoading(true);
    let userData = {
      email: user,
      password: pass,
    };
    console.log(userData);
    await axios
      .post(`${baseUrl}/login`, userData)
      .then((res) => {
        const promises = [];
        console.log(res);

        if (res.status === 200) {
          localStorage.setItem("bgp_token", res.data["token"]);
          localStorage.setItem("bgp_username", res.data["user_name"]);

          success();
          navigate("/");
          // console.log(res.data);

          setLoading(false);
          return Promise.all(promises);
        } else {
          setLoading(false);
          let e = getError("incorrect username or password");
          message.error("Incorrect username or password");

          setErrors([e]);
        }
      })
      .catch((err) => {
        setLoading(false);
        let e = getError("incorrect username or password");
        message.error("Incorrect username or password");
        setErrors([e]);
        console.log(err);
      });
  };

  return (
    <Spin spinning={loading}>
      <MainDivLogin>
        <Row style={{ height: "99vh" }}>
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 12 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                padding: "40px",
                paddingLeft: "25px",
              }}
            >
              <div style={{ display: "block" }}>
                <div style={{ float: "left" }}>
                  <img src={Cisco} alt="" />
                </div>
                <div style={{ float: "right" }}>
                  <img src={Mobi} alt="" />
                </div>
                <br />
                <br />
                <br />
                <br />
                <p style={{ textAlign: "center" }}>
                  Welcome back. Please login to your account.{" "}
                </p>
                <br />

                <Form
                  style={{ marginLeft: "25px" }}
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                >
                  <p style={{ marginBottom: "4px" }}>Username</p>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                  >
                    <LoginStyledInput
                      value={user}
                      onChange={(e) => {
                        setUser(e.target.value);
                      }}
                      style={{
                        width: "300px",
                        color: "#9F9F9F",
                        padding: "10px",
                      }}
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Username or email"
                    />
                  </Form.Item>
                  <p style={{ marginBottom: "4px" }}>Password</p>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <LoginPassStyledInput
                      placeholder="Password"
                      value={pass}
                      onChange={(e) => {
                        setPass(e.target.value);
                      }}
                      style={{
                        width: "300px",
                        padding: "10px",
                        // backgroundColor: "black",
                      }}
                      prefix={
                        <LockOutlined
                          className="site-form-item-icon"
                          style={{ color: "#9F9F9F" }}
                        />
                      }
                    />
                  </Form.Item>
                  <br />
                  <Form.Item>
                    <button
                      style={{
                        width: "300px",
                        height: "44px",
                        backgroundColor: "#009bdb",
                        borderRadius: "6px",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Log in
                    </button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
          <Col
            xs={{ span: 0 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 12 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                backgroundColor: "#009BDB",
                backgroundImage: `url("${BGLeft1}")`,
                backgroundPosition: "bottom 0px right 10px",
                overflow: "hidden", // Add this line to fix the overflow issue
              }}
            >
              <div
                style={{
                  backgroundColor: "#009BDB",
                }}
              >
                <div
                  style={{
                    backgroundImage: `url("${BGRight}")`,
                    backgroundPosition: "bottom 0px right 10px",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img src={RightSideImg} alt="" style={{ maxWidth: "100%" }} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </MainDivLogin>
    </Spin>
  );
};

export default Index;

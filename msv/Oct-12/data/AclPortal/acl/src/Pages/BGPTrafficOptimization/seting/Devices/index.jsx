import React, { useState } from "react";
import {
  MainDiv,
  TableStyle,
} from "../../../Components/GlobalStyles/main.styled.js";
import { Form, Input, Select, Button, Modal } from "antd";

import device from "./assets/devices.svg";
import edit from "./assets/edit.svg";

import "../../../index.css";

const { Option } = Select;
// Generate dummy data
const generateDummyData = () => {
  const dummyData = [];
  for (let i = 1; i <= 6; i++) {
    dummyData.push({
      key: i,
      hostname: `Host${i}`,
      email: `email${i}@example.com`,
      lastLogin: `2023-08-${i}`,
      role: i % 2 === 0 ? "Admin" : "User",
    });
  }
  return dummyData;
};
const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(generateDummyData());
  const [roleFilter, setRoleFilter] = useState([]);
  const [formValues, setFormValues] = useState({
    hostname: "",
    email: "",
    role: "",
    password: "",
  });
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    resetForm();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      role: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form values:", formValues);
    setModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setFormValues({
      hostname: "",
      email: "",
      role: "",
      password: "",
    });
  };
  const columns = [
    {
      title: "Hostname",
      dataIndex: "hostname",
      key: "hostname",
    },
    {
      title: "Ip Address",
      dataIndex: "ip_address",
      key: "ip_address",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text) => (
        <>
          <div
            style={{
              display: "flex",
              gap: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={edit} alt="" />
          </div>
        </>
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
    <MainDiv style={{ padding: "20px" }}>
      <div style={{ display: "flex" }}>
        <img src={device} alt="" /> &nbsp;&nbsp;
        <p style={{ fontWeight: 700, fontSize: "20px" }}>User</p>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ display: "flex", fontSize: "16px" }}>
          Row &nbsp;<b> 12</b>&nbsp;&nbsp; Col &nbsp;<b>12</b>
        </p>
        {/* <div>
          <Button onClick={handleOpenModal}>Add User</Button>
        </div> */}
      </div>
      <TableStyle
        rowClassName={rowClassName}
        dataSource={data}
        columns={columns}
        onChange={(pagination, filters) => {
          if (filters.role) {
            setRoleFilter(filters.role);
          } else {
            setRoleFilter([]);
          }
        }}
      />
      {/* <Modal
        open={modalVisible}
        title="Registration Form"
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleFormSubmit}>
            Register
          </Button>,
        ]}
      >
        <form>
          <div>
            <label>Hostname</label>
            <Input
              name="hostname"
              value={formValues.hostname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <Input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Role</label>
            <Select
              name="role"
              value={formValues.role}
              onChange={handleSelectChange}
              required
            >
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </div>
          <div>
            <label>Password</label>
            <Input.Password
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </form>
      </Modal> */}
    </MainDiv>
  );
};

export default Index;

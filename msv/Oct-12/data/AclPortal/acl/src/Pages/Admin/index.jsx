import React, { useState } from "react";
import {
  MainDiv,
  TableStyle,
  MainDivwithoutSidebar,
} from "../../Components/GlobalStyles/main.styled.js";
import { Form, Input, Select, Button, Modal } from "antd";

import user from "./assets/user.svg";
import deleteUser from "./assets/del.svg";
import round from "./assets/round.svg";
import change_pasword from "./assets/change_password.svg";
import "../../index.css";

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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "User", value: "User" },
      ],
      filteredValue: roleFilter,
      onFilter: (value, record) => record.role.includes(value),

      render: (text, record) => (
        <>
          {text === "Admin" ? (
            <p
              style={{
                borderRadius: "4px",
                border: "1px solid #FE2323",
                background: "#FFC1C1",
                textAlign: "center",
              }}
            >
              {text}
            </p>
          ) : null}
          {text === "User" ? (
            <p
              style={{
                borderRadius: "4px",
                border: "1px solid #66B127",
                background: "#D0FFA8",
                textAlign: "center",
              }}
            >
              {text}
            </p>
          ) : null}
        </>
      ),
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
            <img src={change_pasword} alt="" />
            <img src={round} alt="" />
            <img src={deleteUser} alt="" />
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
    <MainDivwithoutSidebar>
      <div style={{ display: "flex" }}>
        <img src={user} alt="" /> &nbsp;&nbsp;
        <p style={{ fontWeight: 700, fontSize: "20px" }}>User</p>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ display: "flex", fontSize: "16px" }}>
          Row &nbsp;<b> 12</b>&nbsp;&nbsp; Col &nbsp;<b>12</b>
        </p>
        <div>
          <Button onClick={handleOpenModal}>Add User</Button>
        </div>
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
      <Modal
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
      </Modal>
    </MainDivwithoutSidebar>
  );
};

export default Index;

import React, { useState, useEffect } from "react";
import {
  MainDiv,
  TableStyle,
} from "../../../Components/GlobalStyles/main.styled.js";
import {
  Popconfirm,
  Input,
  Select,
  Button,
  Modal,
  message,
  Spin,
  Form,
} from "antd";
import Swal from "sweetalert2";

import { EditOutlined } from "@ant-design/icons";
import user from "./assets/user.svg";
import deleteUser from "./assets/del.svg";
import round from "./assets/round.svg";
import change_pasword from "./assets/Change_password.svg";
import "../../../index.css";
import axios, { baseUrl } from "../../../utils/axios";

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
      role: i % 2 === 0 ? "Admin" : "Member",
    });
  }
  return dummyData;
};
const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordUpdateModalVisible, setPasswordUpdateModalVisible] =
    useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(generateDummyData());
  const [roleFilter, setRoleFilter] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [dataSourceRowCount, setDataSourceRowCount] = useState(0);

  const [formValues, setFormValues] = useState({
    hostname: "",
    email: "",
    role: "Admin",
    password: "",
  });
  const [editFormData, setEditFormData] = useState({
    username: "",
    email: "",
    role: "Admin",
    password: "",
  });

  const [editModalVisible, setEditModalVisible] = useState(false);

  const openSweetAlert = (title, type, errors) => {
    console.log("Error-------->", errors);

    Swal.fire({
      title,
      type,
      allowOutsideClick: false,
    });
  };
  const handleEdit = (record) => {
    setEditFormData({
      username: record.username,
      email: record.email,
      role: record.user_type,
      password: "",
    });
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    //  console.log(editFormData)
    try {
      const response = await axios.put(baseUrl + `/update_user`, {
        username: editFormData.username,
        email: editFormData.email,
        user_type: editFormData.role,
      });

      if (response.status === 200) {
        // console.log('Data updated successfully:', response.data);

        openSweetAlert("Data updated successfully", "success");

        setEditModalVisible(false);

        fetchData();
      } else {
        // message.error('Failed to update data');
        openSweetAlert("Failed to update data", "error");
      }
    } catch (error) {
      console.error("Error submitting edited data:", error);
      // message.error('Error updating data');
      openSweetAlert("Error updating data", "error");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormValues((prevValues) => ({ ...prevValues, role: value }));
  };

  const api_call = async () => {
    const response = await axios.post(baseUrl + "/add_new_user", {
      username: formValues.hostname,
      email: formValues.email,
      user_type: formValues.role,
      password: formValues.password,
    });

    if (response.status === 200) {
      fetchData();
      // message.success("User Added Successfully");
      openSweetAlert("User Added Successfully", "success");

      setModalVisible(false);
      setFormValues({
        hostname: "",
        email: "",
        role: "",
        password: "",
      });
    } else {
      // message.error("Error");
      openSweetAlert("Error", "error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      api_call();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseUrl + "/get_all_user_data");
      setDataSource(response.data);
      setDataSourceRowCount(response.data.legth);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
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
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "User Type",
      dataIndex: "user_type",
      key: "user_type",
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "Member", value: "Member" },
      ],
      filteredValue: roleFilter,
      onFilter: (value, record) => record.role.includes(value),

      render: (text, record) => (
        <>
          {text === "Admin" ? (
            <span
              style={{
                borderRadius: "4px",
                // border: "1px solid #FE2323",
                background: "#FFC1C1",
                textAlign: "center",
              }}
            >
              &nbsp;&nbsp;&nbsp; {text} &nbsp;&nbsp;&nbsp;
            </span>
          ) : null}
          {text === "Member" ? (
            <span
              style={{
                borderRadius: "4px",
                // border: "1px solid #66B127",
                background: "#D0FFA8",
                textAlign: "center",
              }}
            >
              &nbsp; {text} &nbsp;&nbsp;
            </span>
          ) : null}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <>
          <div
            style={{
              display: "flex",
              gap: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* BGPTr@fic123 */}
            {record.email != "admin@mobily.com.sa" ? (
              <>
                <EditOutlined
                  style={{ color: "#009BDB", fontSize: "20px" }}
                  onClick={() => handleEdit(record)}
                />

                <Popconfirm
                  title="User Delete"
                  description="Are you sure to delete this user?"
                  onConfirm={() => {
                    // console.log(record);
                    axios
                      .delete(baseUrl + "/user/" + record.id)
                      .then((resp) => {
                        // message.success("User Deleted");
                        openSweetAlert("User Deleted Successfully", "success");

                        fetchData();
                      })
                      .catch((err) => {});
                  }}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                >
                  <img src={deleteUser} alt="" />
                </Popconfirm>
                <img
                  src={change_pasword}
                  alt=""
                  onClick={() => {
                    setPasswordUpdateModalVisible(true);
                    setSelectedEmail(record.email);
                  }}
                />
              </>
            ) : (
              <></>
            )}
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
    <MainDiv style={{ padding: "30px" }}>
      <Spin spinning={loading}>
        <div style={{ display: "flex", marginTop: "-20px" }}>
          <img src={user} alt="" /> &nbsp;&nbsp;
          <p style={{ fontWeight: 700, fontSize: "20px" }}>User</p>
        </div>
        {/* <br /> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "-20px",
          }}
        >
          <p style={{ display: "flex", fontSize: "16px" }}></p>
          <div>
            <Button style={{ marginBottom: "10px" }} onClick={handleOpenModal}>
              Add User
            </Button>
          </div>
        </div>
        <TableStyle
          rowClassName={rowClassName}
          dataSource={dataSource}
          columns={columns}
          onChange={(pagination, filters) => {
            if (filters.role) {
              setRoleFilter(filters.role);
            } else {
              setRoleFilter([]);
            }
          }}
        />
      </Spin>
      <Modal
        open={modalVisible}
        title=""
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ marginRight: "10px" }}
            onClick={handleSubmit}
          >
            Register
          </Button>,
          <br />,
          <br />,
        ]}
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
          Registration Form
        </h2>
        <form onSubmit={handleSubmit} style={{ padding: "12px" }}>
          <div>
            <label>Name</label>
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
              style={{ width: "100%" }}
              name="role"
              value={formValues.role}
              onChange={handleSelectChange}
              required
            >
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Member">Member</Select.Option>
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
      <Modal
        open={passwordUpdateModalVisible}
        title="Password Update"
        onCancel={() => {
          setPasswordUpdateModalVisible(false);
        }}
        footer={null}
      >
        <Form name="basic" onFinish={(data) => {}}>
          <Form.Item name="new_password">
            <Input.Password placeholder="New Password" />
          </Form.Item>

          <Form.Item name="confirm_password">
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={editModalVisible}
        title="Edit User"
        onCancel={() => setEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleEditSubmit}>
            Update
          </Button>,
        ]}
      >
        <form onSubmit={handleEditSubmit}>
          <div>
            <label>Name</label>
            <Input
              name="username"
              value={editFormData.username}
              onChange={(e) =>
                setEditFormData({ ...editFormData, username: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Email</label>
            <Input
              type="email"
              name="email"
              value={editFormData.email}
              onChange={(e) =>
                setEditFormData({ ...editFormData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Role</label>
            <Select
              style={{ width: "100%" }}
              name="role"
              value={editFormData.role}
              onChange={(value) =>
                setEditFormData({ ...editFormData, role: value })
              }
              required
            >
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Member">Member</Select.Option>
            </Select>
          </div>
        </form>
      </Modal>
    </MainDiv>
  );
};

export default Index;

import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Collapse,
  Spin,
  Space,
  message,
  Popconfirm,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { MainDivwithoutSidebar } from "../../../Components/GlobalStyles/main.styled.js";
import Swal from "sweetalert2";
import { columnSearch } from "../../../utils";

import axios, { baseUrl } from "../../../utils/axios";
import "../main.css";

const { Option } = Select;

let excelData = [];
let columnFilters = {};

const CustomPopconfirm = ({ confirm, record, DryDeleteTransection }) => (
  <>
    <span style={{ marginTop: "-7px", fontWeight: "bold" }}>
      Are you sure you want to delete this transaction?
    </span>
    <br />
    <br />
    <div>
      <Button
        style={{ backgroundColor: "green" }}
        onClick={(e) => DryDeleteTransection(e, record)}
      >
        Dry Delete
      </Button>
      <Button
        style={{ backgroundColor: "red", marginLeft: 8 }}
        onClick={(e) => confirm(e, record)}
      >
        Delete
      </Button>
      <br />
      <br />
    </div>
  </>
);

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sorValue, setSorValue] = useState("");
  const [deleteTransectionPayload, SetDeleteTransectionPayload] = useState({});
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const showModalDelete = () => {
    setIsModalOpenDelete(true);
  };
  const handleOkDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const [data, setData] = useState({});
  const [editForm] = Form.useForm();
  const [dataSource, setDataSource] = useState(excelData);
  const [dataSourceLoadinf, setDataSourceLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [serviceTypes, setServiceTypes] = useState([]);
  const [isModalOpenDryRun, setIsModalOpenDryRun] = useState(false);
  const [IsConfig, setIsConfig] = useState(false);
  const [dryRun, setDryRun] = useState("");
  const [dryRunLoading, setDryRunLoading] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [ipv4Prefix, setIpv4Prefix] = useState("");
  const [ipv6Prefix, setIpv6Prefix] = useState("");
  const [sor, setSor] = useState("");
  const [region, setRegion] = useState("Eastern");
  const [otherRegion, setOtherRegion] = useState("");
  const [action, setAction] = useState("dry-run");
  const [searchText, setSearchText] = useState(null);
  const [searchedColumn, setSearchedColumn] = useState(null);
  const [rowCount, setRowCount] = useState(0);

  const openSweetAlert = (title, type, errors) => {
    console.log("Error-------->", errors);

    Swal.fire({
      title,
      type,
      allowOutsideClick: false,
    });
  };
  let getColumnSearchProps = columnSearch(
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn
  );
  const showModalDryRun = () => {
    setIsModalOpenDryRun(true);
  };
  const handleOkDryRun = () => {
    setIsModalOpenDryRun(false);
  };
  const handleCancelDryRun = () => {
    setIsModalOpenDryRun(false);
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleEditModalOk = () => {
    editForm.validateFields().then((values) => {
      const serviceName = editFormData.serviceName;
      const customerData = data[serviceName] || [];
      const newData = [...customerData];

      // Find the index of the edited row
      const index = newData.findIndex(
        (item) => item.ipv6_prefix === editFormData.ipv6_prefix
      );

      if (index > -1) {
        newData[index] = { ...editFormData, ...values };
        const newDataCopy = [...newData]; // Create a shallow copy of the array
        setData({
          ...data,
          [serviceName]: newDataCopy,
        });
        setEditModalVisible(false);
        setEditFormData({});
      }
    });
  };

  const handleEditModalCancel = () => {
    editForm.resetFields();
    setEditModalVisible(false);
    setEditFormData({});
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    console.log(data);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (editModalVisible) {
      editForm.setFieldsValue(editFormData); // Update the initial values
    }
  }, [editFormData, editModalVisible]);

  useEffect(() => {
    async function fetchServiceTypes() {
      try {
        const response = await axios.get(baseUrl + "/allAclApiServiceName");
        setServiceTypes(response.data);
      } catch (error) {
        console.error("Error fetching service types:", error);
      }
    }

    fetchServiceTypes();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setDataSourceLoading(true);

    try {
      const response = await axios.get(baseUrl + "/transection_data");
      excelData = response.data.merged_data;
      setDataSource(excelData);
      setRowCount(response.data.merged_data.length);
      setDataSourceLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataSourceLoading(false);
    }
  };

  const columnsAcl = [
    {
      title: "Service Name",
      dataIndex: "acl-service-name",
      key: "acl-service-name",
      ...getColumnSearchProps(
        "acl-service-name",
        "Service Name",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
    },
    {
      title: "Customer Name",
      dataIndex: "customer-name",
      key: "customer-name",
      ...getColumnSearchProps(
        "customer-name",
        "Customer Name",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
      ellipsis: true,
    },
    {
      title: "IPv4 Prefix",
      dataIndex: "ipv4-prefix",
      key: "ipv4-prefix",
      ...getColumnSearchProps(
        "ipv4-prefix",
        "IPV4 Prefix",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
    },
    {
      title: "IPv6 Prefix",
      dataIndex: "ipv6-prefix",
      key: "ipv6-prefix",
      ...getColumnSearchProps(
        "ipv6-prefix",
        "IPV6 Prefix",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
    },
    {
      title: "Date/Time",
      dataIndex: "date-and-time",
      key: "date-and-time",
      ...getColumnSearchProps(
        "date-and-time",
        "Date/Time",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      ...getColumnSearchProps(
        "region",
        "Region",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
    },
    {
      title: "Sequence Number",
      dataIndex: "sequence-number",
      key: "sequence-number",
      ...getColumnSearchProps(
        "sequence-number",
        "Sequence Number",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
    },
    {
      title: "Sor",
      dataIndex: "sor",
      key: "sor",
      ...getColumnSearchProps(
        "sor",
        "Sor",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
    },
    {
      title: "Trans Status",
      dataIndex: "trans-status",
      key: "trans-status",
      render: (text, record) => (
        <div
          style={{
            textAlign: "center",
            backgroundColor:
              text === "committed"
                ? "#b5de93"
                : text === "Queue"
                ? "#daea82"
                : text === "deleted"
                ? "#FFE9E9"
                : "",
            margin: "0% 5%",
            padding: "2px 8px",
            borderRadius: 10,
            fontWeight: 600,
          }}
        >
          {text}
        </div>
      ),
      ...getColumnSearchProps(
        "trans-status",
        "Trans Status",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (text, record) => {
        if (record["trans-status"] === "committed") {
          const matchingRows = dataSource.filter(
            (row) => row["sor"] === record["sor"]
          );
          console.log(matchingRows);
          if (matchingRows.length <= 1) {
            return (
              <Popconfirm
                title={
                  <CustomPopconfirm
                    confirm={confirm}
                    record={record}
                    DryDeleteTransection={DryDeleteTransection}
                  />
                }
                // description="Are you sure to delete this transaction?"
                // onConfirm={(e) => confirm(e, record)}
                // onCancel={cancel}
                // okText="Yes"
                okButtonProps={{ style: { display: "none" } }}
                cancelText="Cancel"
              >
                <Button type="primary" danger style={{ width: "auto" }}>
                  Delete
                </Button>
              </Popconfirm>
            );
          }
        }
        return null;
      },
    },
  ];

  const confirm = (e, record) => {
    console.log(e);
    showModalDelete();
    SetDeleteTransectionPayload({
      service_name: record["acl-service-name"],
      customer_name: record["customer-name"],
      sequence_number: record["sequence-number"],
      trans_status: record["trans-status"],
      region: record["region"],
      date_and_time: record["date-and-time"],
      ipv6_prefix: record["ipv6-prefix"],
      ipv4_prefix: record["ipv4-prefix"],
      logged_in_user: record["logged-in-user"],
    });
  };

  const cancel = (e) => {
    console.log(e);
  };

  const DryDeleteTransection = async (e, record) => {
    const payload = {
      service_name: record["acl-service-name"],
      customer_name: record["customer-name"],
      sequence_number: record["sequence-number"],
    };

    try {
      const res = await axios.post(
        baseUrl + "/dry_delete_transaction_data",
        payload
      );

      if (res.status === 200) {
        openSweetAlert(res.data, "info");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const DeleteTransection = async () => {
    const payload = { ...deleteTransectionPayload, sor: sorValue };

    try {
      const res = await axios.post(
        baseUrl + "/delete_transection_data",
        payload
      );

      if (res.status === 200) {
        setIsModalVisible(false);
        openSweetAlert(res.data.message, "info");
        fetchData();
        SetDeleteTransectionPayload({});
        setIsModalOpenDelete(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    if (serviceName) {
      const formData = {
        acl_service_name: serviceName,
        customer_name: customerName,
        ipv4_prefix: ipv4Prefix,
        ipv6_prefix: ipv6Prefix,
        sor,
        region: `${region === "otherRegion" ? otherRegion : region}`,
        action,
      };

      if (action === "commit") {
        setIsConfig(true);
        try {
          const response = await axios.post(baseUrl + "/createAcl", formData);
          console.log("Response", response);
          setIsConfig(false);

          openSweetAlert(response.data, "info");

          fetchData();
          setIsModalVisible(false);

          setServiceName("");
          setCustomerName("");
          setIpv4Prefix("");
          setIpv6Prefix("");
          setSor("");
          setRegion("Eastern");
          setAction("dry-run");
        } catch (error) {
          console.error("Error fetching service types:", error);
          setIsConfig(false);
        }
      } else if (action === "dry-run") {
        showModalDryRun(true);
        setIsConfig(true);
        setDryRunLoading(true);
        try {
          const response = await axios.post(baseUrl + "/createAcl", formData);
          console.log("Response", response);
          setDryRun(response.data);
          setIsConfig(false);
          setDryRunLoading(false);
        } catch (error) {
          console.error("Error fetching service types:", error);
          setIsConfig(false);
          setDryRunLoading(false);
        }
      }
    } else {
      alert("kindly fill all the required fields");
    }
  };

  const handleReset = () => {
    setServiceName("");
    setCustomerName("");
    setIpv4Prefix("");
    setIpv6Prefix("");
    setSor("");
    setRegion("Eastern");
    setAction("dry-run");
  };

  return (
    <MainDivwithoutSidebar>
      <Spin spinning={IsConfig}>
        <Spin spinning={dataSourceLoadinf}>
          <div style={{ margin: "0px 15px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700 }}>
              Customer Onboarding
            </h2>

            <Button
              type="primary"
              onClick={showModal}
              style={{ float: "right" }}
            >
              Add
            </Button>
            <br />
            <br />
            <Modal
              title=""
              open={isModalVisible}
              onOk={handleModalOk}
              onCancel={handleModalCancel}
              footer={false}
              width={400}
            >
              <div>
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
                  Add New Customer ACL
                </h2>
                <div
                  style={{
                    padding: "10px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    <label>
                      <span style={{ color: "red" }}>*</span>Service Name:
                    </label>
                    <br />
                    <Select
                      value={serviceName}
                      onChange={(value) => setServiceName(value)}
                      required
                      style={{ width: "100%", marginBottom: "8px" }}
                    >
                      {serviceTypes.map((type, index) => (
                        <Option key={index} value={type}>
                          {type}
                        </Option>
                      ))}
                    </Select>

                    <label>
                      <span style={{ color: "red" }}>*</span>Customer Name:
                    </label>
                    <Input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      style={{ marginBottom: "8px" }}
                    />

                    <label>IPV4 Prefix:</label>
                    <Input
                      value={ipv4Prefix}
                      style={{ marginBottom: "8px" }}
                      onChange={(e) => setIpv4Prefix(e.target.value)}
                    />

                    <label>IPV6 Prefix:</label>
                    <Input
                      value={ipv6Prefix}
                      style={{ marginBottom: "8px" }}
                      onChange={(e) => setIpv6Prefix(e.target.value)}
                    />

                    <label>
                      <span style={{ color: "red" }}>*</span>SOR:
                    </label>
                    <Input
                      value={sor}
                      style={{ marginBottom: "8px" }}
                      onChange={(e) => setSor(e.target.value)}
                      required
                    />

                    <label>
                      <span style={{ color: "red" }}>*</span>Region:
                    </label>
                    <Select
                      value={region}
                      style={{ marginBottom: "8px", width: "100%" }}
                      onChange={(value) => {
                        setRegion(value);
                      }}
                    >
                      <Option value="Eastern">Eastern</Option>
                      <Option value="Western">Western</Option>
                      <Option value="Central">Central</Option>
                      <Option value="otherRegion">Other</Option>
                    </Select>

                    {region === "otherRegion" ? (
                      <>
                        <label>
                          <span style={{ color: "red" }}>*</span>Other Region:
                        </label>
                        <Input
                          required
                          value={otherRegion}
                          style={{ marginBottom: "8px" }}
                          onChange={(e) => setOtherRegion(e.target.value)}
                        />
                      </>
                    ) : null}
                    <label>Action:</label>
                    <br />
                    <Select
                      value={action}
                      style={{ marginBottom: "8px", width: "100%" }}
                      onChange={(value) => setAction(value)}
                    >
                      <Option value="dry-run">Dry Run</Option>
                      <Option value="commit">Commit</Option>
                    </Select>

                    <br />
                    <div style={{ textAlign: "center" }}>
                      <Button type="primary" danger onClick={handleReset}>
                        Reset
                      </Button>{" "}
                      &nbsp;&nbsp;
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
            <Modal
              title="Edit Entry"
              open={editModalVisible}
              onOk={handleEditModalOk}
              onCancel={handleEditModalCancel}
              maskClosable={false}
            ></Modal>

            <Modal
              open={isModalOpenDryRun}
              onOk={handleOkDryRun}
              onCancel={handleCancelDryRun}
              width={750}
              maskClosable={false}
              footer={false}
              style={{ padding: "15px" }}
            >
              <div
                style={{
                  paddingLeft: "15px",
                  fontWeight: "bolder",
                  fontSize: "16px",
                }}
              >
                Dry Run Output
              </div>
              <div
                style={{ height: "400px", overflowY: "auto", padding: "15px" }}
              >
                {dryRun === "" ? (
                  <Spin spinning={dryRunLoading}>
                    <pre>No Difference Found in the given Config</pre>
                  </Spin>
                ) : (
                  <pre>{dryRun}</pre>
                )}
                <Button
                  type="primary"
                  danger
                  onClick={handleOkDryRun}
                  style={{
                    position: "absolute",
                    bottom: "15px",
                    right: "15px",
                  }}
                >
                  Close
                </Button>
              </div>
            </Modal>
            <Table
              dataSource={dataSource}
              columns={columnsAcl}
              scroll={{ x: "max-content" }}
              pagination={false}
              rowKey="sequence-number"
            />
          </div>
          <Modal
            title=""
            open={isModalOpenDelete}
            onOk={handleOkDelete}
            onCancel={handleCancelDelete}
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
              Delete Transaction
            </h2>
            <div style={{ padding: "12px" }}>
              <form onSubmit={DeleteTransection}>
                <input
                  style={{
                    width: "96%",
                    padding: "10px",
                    borderRadius: "5px",
                    outline: "none",
                    border: "1px solid silver",
                  }}
                  type="text"
                  placeholder="Please provide the CRQ delete reference"
                  value={sorValue}
                  onChange={(e) => setSorValue(e.target.value)}
                  required
                />
                <br />
                <br />
                <button
                  type="submit"
                  style={{
                    float: "right",
                    marginTop: "5px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                >
                  Delete
                </button>
              </form>
            </div>
            <br />
            <br />
          </Modal>
        </Spin>
      </Spin>
    </MainDivwithoutSidebar>
  );
};

export default App;

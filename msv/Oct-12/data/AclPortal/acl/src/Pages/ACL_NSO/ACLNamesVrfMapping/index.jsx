// import React, { useState, useEffect } from "react";
// import { Input, Select, Button } from "antd";
// import {
//   MainDivwithoutSidebar,
//   MainDivwithoutSidebarInfluxgraph,
//   TableStyle,
//   MainTableFailedDevicesTitle,
//   MainTableFailedDevices,
// } from "../../../Components/GlobalStyles/main.styled.js";
// const Index = () => {
//   const [aclServiceNames, setAclServiceNames] = useState([]);
//   const [selectedAclService, setSelectedAclService] = useState("");
//   const [selectedIpType, setSelectedIpType] = useState("");
//   const [IPv4AddressSource, setIPv4AddressSource] = useState("");
//   const [IPv4AddressDestination, setIPv4AddressDestination] = useState("");
//   const [IPv6AddressSource, setIPv6AddressSource] = useState("");
//   const [IPv6AddressDestination, setIPv6AddressDestination] = useState("");

//   useEffect(() => {
//     // Simulate fetching ACL service names from an API
//     // axios.get("your-api-endpoint").then((response) => {
//     //   setAclServiceNames(response.data);
//     // });
//   }, []);

//   const handleIpTypeChange = (value) => {
//     setSelectedIpType(value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission logic here
//     console.log("Form submitted!");
//     console.log("Selected ACL Service:", selectedAclService);
//     console.log("Selected IP Type:", selectedIpType);
//   };
//   const handleReset = () => {
//     setIPv4AddressSource("");
//     setIPv4AddressDestination("");
//     setIPv6AddressSource("");
//     setIPv6AddressDestination("");
//     setSelectedAclService("");
//   };
//   return (
//     <MainDivwithoutSidebar>
//       <div style={{ display: "grid", placeItems: "center", minHeight: "80vh" }}>
//         <div
//           style={{
//             padding: "20px",
//             width: "380px",

//             borderRadius: "8px",
//             border: "1px solid #009BDB",
//             background: "#FFF",
//             boxShadow: "3px 4px 24px 0px rgba(0, 0, 0, 0.06)",
//           }}
//         >
//           <h3 style={{ fontSize: "26px", fontWeight: 600 }}>
//             ACL Names VRF Mapping
//           </h3>
//           <br />
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label>ACL Service name:</label>
//               <br />
//               <Select
//                 value={selectedAclService}
//                 onChange={(value) => setSelectedAclService(value)}
//                 style={{ width: "100%" }}
//               >
//                 {aclServiceNames.map((name) => (
//                   <Option key={name} value={name}>
//                     {name}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//             <br />
//             <div>
//               <label>IP Type:</label>
//               <br />
//               <Select
//                 value={selectedIpType}
//                 onChange={handleIpTypeChange}
//                 style={{ width: "100%" }}
//               >
//                 <Option value="ipv4">IPv4</Option>
//                 <Option value="ipv6">IPv6</Option>
//               </Select>
//             </div>
//             {selectedIpType === "ipv4" && (
//               <div>
//                 <br />
//                 <label>IPv4 Address Source:</label>
//                 <br />
//                 <Input
//                   value={IPv4AddressSource}
//                   onChange={() => setIPv4AddressSource(e.target.value)}
//                   style={{ width: "100%" }}
//                 />
//               </div>
//             )}

//             {selectedIpType === "ipv4" && (
//               <div>
//                 <br />
//                 <label>IPv4 Address IPV6 Prefix:</label>
//                 <br />
//                 <Input
//                   value={IPv4AddressDestination}
//                   onChange={() => setIPv4AddressDestination(e.target.value)}
//                   style={{ width: "100%" }}
//                 />
//               </div>
//             )}
//             {selectedIpType === "ipv6" && (
//               <div>
//                 <br />
//                 <label>IPv6 Address Source:</label>
//                 <br />
//                 <Input
//                   value={IPv6AddressSource}
//                   onChange={() => setIPv6AddressSource(e.target.value)}
//                   style={{ width: "100%" }}
//                 />
//               </div>
//             )}
//             {selectedIpType === "ipv6" && (
//               <div>
//                 <br />
//                 <label>IPv6 Address IPV6 Prefix:</label>
//                 <br />
//                 <Input
//                   value={IPv6AddressDestination}
//                   onChange={() => setIPv4AddressDestination(e.target.value)}
//                   style={{ width: "100%" }}
//                 />
//               </div>
//             )}
//             <br />
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 marginTop: "20px",
//                 gap: 10,
//               }}
//             >
//               <Button
//                 type="primary"
//                 danger
//                 onClick={handleReset}
//                 style={{ width: "50%" }}
//               >
//                 Reset
//               </Button>
//               <Button type="primary" htmlType="submit" style={{ width: "50%" }}>
//                 Submit
//               </Button>
//             </div>
//             <br />
//             <br />
//           </form>
//         </div>
//       </div>
//     </MainDivwithoutSidebar>
//   );
// };

// export default Index;

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
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import {
  MainDivwithoutSidebar,
  MainDivwithoutSidebarInfluxgraph,
  TableStyle,
  MainTableFailedDevicesTitle,
  MainTableFailedDevices,
} from "../../../Components/GlobalStyles/main.styled.js";
import Swal from "sweetalert2";

import axios, { baseUrlofAcl } from "../../../utils/axios/Acl.jsx";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Panel } = Collapse;

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [activePanelKey, setActivePanelKey] = useState(null);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [isModalOpenDryRun, setIsModalOpenDryRun] = useState(false);
  const [dryRun, setDryRun] = useState("");

  const openSweetAlert = (title, type, errors) => {
    console.log("Error-------->", errors);

    Swal.fire({
      title,
      type,
      allowOutsideClick: false,
    });
  };

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
  const handlePanelChange = (key) => {
    setActivePanelKey(key);
  };

  const showEditModal = (record) => {
    setEditFormData(record);
    setEditModalVisible(true);
  };

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
        // editForm.resetFields(); // Reset the form fields
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
    console.log(form);
    console.log(data);
    form.validateFields().then((values) => {
      const serviceName = values.serviceName;
      const customerData = data[serviceName] || [];
      const newData = [...customerData, values];

      setData({
        ...data,
        [serviceName]: newData,
      });

      // form.resetFields();
      // setIsModalVisible(false);
    });
  };

  const handleModalCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "IPV4 Prefix",
      dataIndex: "ipv4_prefix",
      key: "ipv4_prefix",
    },
    {
      title: "IPV6 Prefix",
      dataIndex: "ipv6_prefix",
      key: "ipv6_prefix",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  useEffect(() => {
    if (editModalVisible) {
      editForm.setFieldsValue(editFormData); // Update the initial values
    }
  }, [editFormData, editModalVisible]);
  useEffect(() => {
    async function fetchServiceTypes() {
      try {
        const response = await axios.get(
          baseUrlofAcl + "/allAclApiServiceName"
        );
        setServiceTypes(response.data);
      } catch (error) {
        console.error("Error fetching service types:", error);
      }
    }

    fetchServiceTypes();
  }, []);
  const [dataSource, setDataSource] = useState([]);
  const [dataSourceLoadinf, setDataSourceLoading] = useState(false);
  const [filters, setFilters] = useState({});
  useEffect(() => {
    setDataSourceLoading(true);
    fetchData();
    setDataSourceLoading(false);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(baseUrlofAcl + "/onboarding"); // Adjust the URL if needed

      setDataSource(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleFilterChange = (columnKey, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnKey]: value,
    }));
  };

  const columnsAcl = [
    {
      title: "ACL Service Name",
      dataIndex: "acl-service-name",
      key: "acl-service-name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search ACL Service Name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()}>Reset</Button>
        </div>
      ),
      onFilter: (value, record) =>
        record["acl-service-name"].toLowerCase().includes(value.toLowerCase()),
      filteredValue: filters["acl-service-name"], // Apply filter value
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // Focus the input when filter dropdown is opened
          setTimeout(() => {
            document.getElementById("acl-service-name-filter").focus();
          }, 0);
        }
      },
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
    {
      title: "Access List Name",
      dataIndex: "access-list-name",
      key: "access-list-name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search ACL access-list-name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()}>Reset</Button>
        </div>
      ),
      onFilter: (value, record) =>
        record["access-list-name"].toLowerCase().includes(value.toLowerCase()),
      filteredValue: filters["access-list-name"], // Apply filter value
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // Focus the input when filter dropdown is opened
          setTimeout(() => {
            document.getElementById("access-list-name-filter").focus();
          }, 0);
        }
      },
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
    // {
    //   title: "Sequence Number",
    //   dataIndex: "sequence-number",
    //   key: "sequence-number",
    //   filterDropdown: ({
    //     setSelectedKeys,
    //     selectedKeys,
    //     confirm,
    //     clearFilters,
    //   }) => (
    //     <div style={{ padding: 8 }}>
    //       <Input
    //         placeholder="Search ACL sequence-number"
    //         value={selectedKeys[0]}
    //         onChange={(e) =>
    //           setSelectedKeys(e.target.value ? [e.target.value] : [])
    //         }
    //         onPressEnter={() => confirm()}
    //         style={{ marginBottom: 8, display: "block" }}
    //       />
    //       <Button
    //         type="primary"
    //         onClick={() => confirm()}
    //         icon={<SearchOutlined />}
    //       >
    //         Search
    //       </Button>
    //       <Button onClick={() => clearFilters()}>Reset</Button>
    //     </div>
    //   ),
    //   onFilter: (value, record) =>
    //     record["sequence-number"].toLowerCase().includes(value.toLowerCase()),
    //   filteredValue: filters["sequence-number"], // Apply filter value
    //   onFilterDropdownVisibleChange: (visible) => {
    //     if (visible) {
    //       // Focus the input when filter dropdown is opened
    //       setTimeout(() => {
    //         document.getElementById("sequence-number-filter").focus();
    //       }, 0);
    //     }
    //   },
    //   filterIcon: (filtered) => (
    //     <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    //   ),
    // },
    {
      title: "Customer Name",
      dataIndex: "customer-name",
      key: "customer-name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search ACL customer-name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()}>Reset</Button>
        </div>
      ),
      onFilter: (value, record) =>
        record["customer-name"].toLowerCase().includes(value.toLowerCase()),
      filteredValue: filters["customer-name"], // Apply filter value
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // Focus the input when filter dropdown is opened
          setTimeout(() => {
            document.getElementById("customer-name").focus();
          }, 0);
        }
      },
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
    {
      title: "VRF Name",
      dataIndex: "vrf-name",
      key: "vrf-name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search ACL Vrf Name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()}>Reset</Button>
        </div>
      ),
      onFilter: (value, record) =>
        record["vrf-name"].toLowerCase().includes(value.toLowerCase()),
      filteredValue: filters["vrf-name"], // Apply filter value
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // Focus the input when filter dropdown is opened
          setTimeout(() => {
            document.getElementById("vrf-name-filter").focus();
          }, 0);
        }
      },
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
    {
      title: "IPv4 Prefix",
      dataIndex: "ipv4-prefix",
      key: "ipv4-prefix",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search ACL ipv4-prefix"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()}>Reset</Button>
        </div>
      ),
      onFilter: (value, record) =>
        record["ipv4-prefix"].toLowerCase().includes(value.toLowerCase()),
      filteredValue: filters["ipv4-prefix"], // Apply filter value
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // Focus the input when filter dropdown is opened
          setTimeout(() => {
            document.getElementById("ipv4-prefix-filter").focus();
          }, 0);
        }
      },
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
    {
      title: "IPv6 Prefix",
      dataIndex: "ipv6-prefix",
      key: "ipv6-prefix",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search ACL ipv6-prefix"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()}>Reset</Button>
        </div>
      ),
      onFilter: (value, record) =>
        record["ipv6-prefix"].toLowerCase().includes(value.toLowerCase()),
      filteredValue: filters["ipv6-prefix"], // Apply filter value
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // Focus the input when filter dropdown is opened
          setTimeout(() => {
            document.getElementById("ipv6-prefix-filter").focus();
          }, 0);
        }
      },
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
  ];
  const handleSubmit = async (values) => {
    console.log(form);
    console.log(data);
    form.validateFields().then((values) => {
      const serviceName = values.serviceName;
      const customerData = data[serviceName] || [];
      const newData = [...customerData, values];

      setData({
        ...data,
        [serviceName]: newData,
      });

      setIsModalVisible(false);
    });
    const dictionaryResponse = {
      acl_service_name: values.serviceName,
      customer_name: values.customerName,
      ipv4_prefix: values.ipv4_prefix,
      ipv6_prefix: values.ipv6_prefix,
      action: values.action,
    };

    console.log(dictionaryResponse);

    if (values.action === "commit") {
      try {
        const response = await axios.post(
          baseUrlofAcl + "/createAcl",
          dictionaryResponse
        );
        console.log("Response", response);
        openSweetAlert(response.data, "info");
        form.resetFields();
      } catch (error) {
        console.error("Error fetching service types:", error);
      }
    } else if (values.action === "dry-run") {
      showModalDryRun(true);
      try {
        const response = await axios.post(
          baseUrlofAcl + "/createAcl",
          dictionaryResponse
        );
        console.log("Response", response);
        setDryRun(response.data);
      } catch (error) {
        console.error("Error fetching service types:", error);
      }
    }
  };
  return (
    <MainDivwithoutSidebar>
      <div style={{ margin: "0px 15px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700 }}>
          Customer Onboarding
        </h2>

        <Button type="primary" onClick={showModal} style={{ float: "right" }}>
          Add
        </Button>
        <br />
        <br />
        <Modal
          title="Add Entry"
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          footer={false}
        >
          <Form onFinish={handleSubmit} form={form} layout="vertical">
            <Form.Item
              name="serviceName"
              label="Service Name"
              rules={[
                { required: true, message: "Please select a service type" },
              ]}
            >
              <Select>
                {serviceTypes.map((type, index) => (
                  <Option key={index} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
              {/* <Select placeholder="Select an action">
                <Option value="dry-run">Dry Run</Option>
                <Option value="commit">Commit</Option>
              </Select> */}
            </Form.Item>
            <Form.Item
              name="customerName"
              label="Customer Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ipv4_prefix"
              label="IPV4 Prefix"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ipv6_prefix"
              label="IPV6 Prefix"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="action"
              label="Action"
              rules={[{ required: true, message: "Please select an action" }]}
            >
              <Select placeholder="Select an action">
                <Option value="dry-run">Dry Run</Option>
                <Option value="commit">Commit</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {/* <Collapse
          accordion
          activeKey={activePanelKey}
          onChange={handlePanelChange}
        >
          {Object.keys(data).map((serviceName, i) => (
            <Panel
              header={serviceName}
              key={i}
              style={{
                background:
                  activePanelKey !== null && activePanelKey == i
                    ? "linear-gradient(180deg, #DCF3FD 0%, rgba(255, 255, 255, 0.00) 100%)"
                    : "transparent",

                transition: "background-color 0.3s",
              }}
            >
              <Table
                columns={[
                  ...columns,
                  {
                    title: "Edit",
                    dataIndex: "edit",
                    render: (_, record) => (
                      <Button
                        type="link"
                        onClick={() => showEditModal(record)}
                        icon={<EditOutlined />}
                      >
                        Edit
                      </Button>
                    ),
                  },
                ]}
                dataSource={data[serviceName]}
                pagination={false}
                rowKey={(record) => record.ipv6_prefix}
              />
            </Panel>
          ))}
        </Collapse> */}
        <Modal
          title="Edit Entry"
          open={editModalVisible}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          maskClosable={false}
        >
          {/* Edit form fields */}
          <Form form={editForm} layout="vertical">
            <Form.Item
              name="serviceName"
              label="Service Name"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="type1">Type 1</Option>
                <Option value="type2">Type 2</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="customerName"
              label="Customer Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ipv4_prefix"
              label="IPV4 Prefix"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ipv6_prefix"
              label="IPV6 Prefix"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="action"
              label="Action"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Dry Run Output"
          open={isModalOpenDryRun}
          onOk={handleOkDryRun}
          onCancel={handleCancelDryRun}
          width={750}
          maskClosable={false}
          footer={[
            <Button type="primary" danger onClick={handleOkDryRun}>
              Close
            </Button>,
          ]}
        >
          <div style={{ height: "400px", overflowY: "auto" }}>
            {dryRun === "" ? (
              <pre>No Difference Found in the given Config</pre>
            ) : (
              <pre>{dryRun}</pre>
            )}
          </div>
        </Modal>
        <Spin spinning={dataSourceLoadinf}>
          <Table dataSource={dataSource} columns={columnsAcl} />
        </Spin>
      </div>
    </MainDivwithoutSidebar>
  );
};

export default App;

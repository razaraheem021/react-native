import React, { useState, useEffect } from "react";
import {
  Collapse,
  Tabs,
  Table,
  Select,
  Input,
  Button,
  Modal,
  Space,
  Row,
  Col,
  message,
  Spin,
} from "antd";
import axios, { baseUrl } from "../../../utils/axios";
import { v4 as uuidv4 } from "uuid";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { MainDivwithoutSidebar } from "../../../Components/GlobalStyles/main.styled.js";
import FormData from "./form";
import Services from "./assets/services.svg";
import Swal from "sweetalert2";
import "../main.css";
import Collapseable from "../Collapseable";

import Site from "./assets/site.svg";

const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Option } = Select;

const sections = [
  { key: "section1", title: "Section 1", devices: ["device1", "device2"] },
  { key: "section2", title: "Section 2", devices: ["device3", "device4"] },
];

const devicesData = {
  device1: [
    {
      key: "device1_tab1",
      tabKey: "1",
      data: [
        {
          key: "row1",
          name: "Row 1 1",
          description: "Description 1 1",
        },
      ],
    },
    {
      key: "device1_tab2",
      tabKey: "2",
      data: [
        {
          key: "row1",
          name: "Row 1 2",
          description: "Description 1 2",
        },
      ],
    },
  ],
  device2: [
    {
      key: "device2_tab1",
      tabKey: "1",
      data: [
        {
          key: "row1",
          name: "Row 2 1",
          description: "Description 2 1",
        },
      ],
    },
    {
      key: "device2_tab2",
      tabKey: "2",
      data: [
        {
          key: "row1",
          name: "Row 2 2",
          description: "Description 2 2",
        },
      ],
    },
  ],
  device3: [
    {
      key: "device3_tab1",
      tabKey: "1",
      data: [
        {
          key: "row1",
          name: "Row 3 1",
          description: "Description 3 1",
        },
      ],
    },
    {
      key: "device3_tab2",
      tabKey: "2",
      data: [
        {
          key: "row1",
          name: "Row 3 2",
          description: "Description 3 2",
        },
      ],
    },
  ],
  device4: [
    {
      key: "device4_tab1",
      tabKey: "1",
      data: [
        {
          key: "row1",
          name: "Row 4 2",
          description: "Description 4 1",
        },
      ],
    },
    {
      key: "device4_tab2",
      tabKey: "2",
      data: [
        {
          key: "row1",
          name: "Row 4 2",
          description: "Description 4 2",
        },
      ],
    },
  ],
};

const generateTabData = (deviceKey, tabKey) => {
  return (
    devicesData[deviceKey]?.find((tab) => tab.tabKey === tabKey)?.data || []
  );
};

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Description", dataIndex: "description", key: "description" },
];

const NestedCollapseWithTabs = () => {
  const [activeCollapseKey, setActiveCollapseKey] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownOptionsSites, setDropdownOptionsSites] = useState([]);
  const [dropdownOptionsDevice, setDropdownOptionsDevice] = useState([]);
  const [dropdownOptionsVrf, setDropdownOptionsVrf] = useState([]);
  const [dropdownOptionsAcl, setDropdownOptionsAcl] = useState([]);
  const [allSelectedValues, setAllSelectedValues] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    acl: undefined,
    vrf: undefined,
  });
  const [nestedTabDropdownInstances, setNestedTabDropdownInstances] = useState(
    {}
  );
  const [serviceName, setServicename] = useState("");
  const [availability, setAvailability] = useState(null);
  const [outputData, setOutputData] = useState({});
  const [selectedSites, setSelectedSites] = useState("");
  const [isVerified, setIsVerfied] = useState("");
  const [selectedDeviceName, setSelectedDeviceName] = useState("");

  const [tabDropdownValues, setTabDropdownValues] = useState({});
  const [formValues, setFormValues] = useState({
    inputField: "",
    verifyButton: false,
    tabs: [],
  });
  const [activeTab, setActiveTab] = useState(null);
  const [newOutput, setNewOutput] = useState({});

  const [isModalVisibleServiceName, setIsModalVisibleServiceName] =
    useState(false);
  const [deleteServiceName, setDeleteServiceName] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  useEffect(() => {
    fetchData();
    console.log("first--------");
  }, []);
  const LoadData = async () => {
    const res = await axios.get(baseUrl + "/service_mapping_data");
    console.log(res.data);
    setDataSource(res.data);
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseUrl + "/test"); // Adjust the URL if needed

      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
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
        <FilterOutlined style={{ color: filtered ? "#000" : "#ffffff" }} />
      ),
    },
    {
      title: "Site Name",
      dataIndex: "site-name",
      key: "site-name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search ACL Site Name"
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
        record["site-name"].toLowerCase().includes(value.toLowerCase()),
      filteredValue: filters["site-name"], // Apply filter value
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // Focus the input when filter dropdown is opened
          setTimeout(() => {
            document.getElementById("site-name-filter").focus();
          }, 0);
        }
      },
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#000" : "#ffffff" }} />
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
            placeholder="Search ACL Access List Name"
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
        <FilterOutlined style={{ color: filtered ? "#000" : "#ffffff" }} />
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
    //         placeholder="Search ACL Sequence Name"
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
        <FilterOutlined style={{ color: filtered ? "#000" : "#ffffff" }} />
      ),
    },
  ];

  const showModalServiceName = () => {
    setIsModalVisibleServiceName(true);
  };
  const [loadDataStatus, setLoadDataStatus] = useState(false);
  const handleOkDeleteServiceName = async () => {
    // Perform the delete operation based on the serviceName
    console.log(`Deleting service: ${deleteServiceName}`);
    // Add your delete logic here

    setIsModalVisibleServiceName(false);

    try {
      const response = await axios.post(
        baseUrl + "/deleteAclApiServiceNameRequest",
        {
          service_name: deleteServiceName,
        }
      );
      openSweetAlert(response.data, "info");
      setLoadDataStatus(!loadDataStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelServiceName = () => {
    setIsModalVisibleServiceName(false);
  };

  const handleInputChangeServiceName = (event) => {
    setDeleteServiceName(event.target.value);
  };

  const openSweetAlert = (title, type, errors) => {
    console.log("Error-------->", errors);

    Swal.fire({
      title,
      type,
      allowOutsideClick: false,
    });
  };

  const SiteNames = async () => {
    try {
      const response = await axios.get(baseUrl + "/aclApiSiteName");
      // console.log("Site Names Response:", response.data);

      // Assuming the response.data is already a JSON object
      const dataArray = response.data;

      if (Array.isArray(dataArray)) {
        setDropdownOptionsSites(dataArray);
      } else {
        // console.log("Response data is not an array:", dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeviceNames = async () => {
    try {
      const response = await axios.post(baseUrl + "/aclApiSiteDeviceList", {
        site_name: selectedSites,
      });
      // console.log("Device Names Response:", response.data);

      // Assuming the response.data is already a JSON object
      const dataArray = response.data;

      if (Array.isArray(dataArray)) {
        setDropdownOptionsDevice(dataArray);
      } else {
        // console.log("Response data is not an array:", dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (selectedSites) {
      DeviceNames();
    }
  }, [selectedSites]);
  const vrfNames = async () => {
    try {
      const response = await axios.post(baseUrl + "/aclApiVrfList", {
        device_name: selectedDeviceName,
      });
      // console.log("Vrf Names Response:", response.data);

      // Assuming the response.data is already a JSON object
      const dataArray = response.data;

      if (Array.isArray(dataArray)) {
        setDropdownOptionsVrf(dataArray);
      } else {
        // console.log("Response data is not an array:", dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const aclNames = async () => {
    try {
      const response = await axios.post(baseUrl + "/aclApiDeviceList", {
        device_name: selectedDeviceName,
      });
      // console.log("Acl Names Response:", response.data);

      // Assuming the response.data is already a JSON object
      const dataArray = response.data;

      if (Array.isArray(dataArray)) {
        setDropdownOptionsAcl(dataArray);
      } else {
        // console.log("Response data is not an array:", dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (selectedDeviceName) {
  //     aclNames();
  //   }
  // }, [selectedDeviceName]);

  useEffect(() => {
    if (selectedDeviceName) {
      vrfNames();
      aclNames();
    }
  }, [selectedDeviceName]);

  useEffect(() => {
    SiteNames();
  }, []);

  useEffect(() => {
    // console.log(nestedTabDropdownInstances);
  }, [nestedTabDropdownInstances]);
  const handleCollapseChange = (key) => {
    setActiveCollapseKey(key);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddNestedTabDropdown = (tabKey) => {
    // setOutputData((prevOutputData) => [...prevOutputData, selectedValues])

    setNestedTabDropdownInstances((prevInstances) => ({
      ...prevInstances,
      [tabKey]: (prevInstances[tabKey] || 0) + 1,
    }));
  };
  const handleTabChange = (activeKey) => {
    setActiveTab(activeKey);
    // console.log(activeKey);

    // if (activeKey !== activeTab) {
    //   // Check if the selected tab has changed
    //   setNestedTabDropdownInstances({});
    //   setTabDropdownValues({});
    // }
  };
  const dropdownOptions = ["Option 1", "Option 2", "Option 3"];
  // const dropdownOptionsSites = ["Site 1", "Site 2", "Site 3"];
  // const dropdownOptionsDevice = ["Device 1", "Device 2", "Device 3"];
  // const dropdownOptionsAcl = ["ACL 1", "ACL 2", "ACL 3"];
  // const dropdownOptionsVrf = ["VRF 1", "VRF 2", "VRF 3"];

  const handleSelectionChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
    // console.log(selectedValues);
    let devicesData = [];
    for (let item of selectedValues) {
      // devicesData[item] = {};
      devicesData.push({
        "site-name": item,
        devices: [],
        "site-done": [],
      });
    }
    setOutputData(devicesData);
    setNewOutput((prevData) => ({
      ...prevData,
      sites: devicesData,
    }));

    // setTabDropdownValues({});
    // setNestedTabDropdownInstances({});
  };

  useEffect(() => {
    // console.log(outputData);
    // console.log(selectedValues);
    if (selectedValues.acl !== undefined && selectedValues.vrf !== undefined) {
      // setAllSelectedValues((prevOutputData) => [
      //   ...prevOutputData,
      //   selectedValues,
      // ]);
      // allSelectedValues.push(selectedValues);
    }
  }, [outputData, selectedValues]);
  // useEffect(() => {
  //   console.log(allSelectedValues);
  //   const copiedObject = Object.assign({}, newOutput);
  //   console.log("copiedObject", copiedObject);
  //   for (let item of copiedObject.sites) {
  //     if (item["site-name"] == parentTab) {
  //       for (let device in item["devices"]) {
  //         if (device["device-name"] == selectedDeviceName) {
  //           device["access-list"] = allSelectedValues;
  //         }
  //       }
  //     }
  //   }
  // }, [selectedValues]);

  ////--------------------------------------
  const [nestedTab, setNestedTab] = useState("");
  useEffect(() => {
    console.log(selectedValues);
    if (selectedValues.vrf !== undefined && selectedValues.acl !== undefined) {
      const copiedObject = { ...newOutput }; // Using spread syntax for shallow copy
      // console.log("copiedObject", copiedObject);
      // console.log(allSelectedValues);
      if (copiedObject.sites) {
        for (let item of copiedObject.sites) {
          console.log("Item", item["site-name"], " Selected", nestedTab);
          if (item["site-name"] == nestedTab) {
            for (let device of item["devices"]) {
              console.log(
                "Item - name:",
                device["device-name"],
                device["device-name"].length,
                " Selected",
                selectedDeviceName,
                selectedDeviceName.length
              );
              // const firstDashIndex = selectedDeviceName.indexOf("-");
              // const result =
              //   firstDashIndex !== -1
              //     ? selectedDeviceName.substring(firstDashIndex + 1)
              //     : selectedDeviceName;
              if (device["device-name"] == selectedDeviceName) {
                console.log("Enter here: ", selectedValues);
                device["access-lists"].push({
                  "access-list-name": selectedValues.acl,
                  "vrf-name": selectedValues.vrf,
                  "sequence-number": 18000010,
                });
                setSelectedValues({ acl: undefined, vrf: undefined });
              }
            }
          }
        }
        setNewOutput(copiedObject);
        console.log(copiedObject);
      }
    }
  }, [selectedValues]);

  // const handleTabDropdownChange = (parentTab, selectedValue) => {
  //   console.log(parentTab);

  //   const newTabKey = `${parentTab}-${selectedValue}`;
  //   // setOutputData((prevData) => {
  //   //   if (prevData[parentTab]) {
  //   //     return {
  //   //       ...prevData,
  //   //       [parentTab]: {
  //   //         ...prevData[parentTab],
  //   //         [selectedValue]: selectedValue,
  //   //       },
  //   //     };
  //   //   } else {
  //   //     return {
  //   //       ...prevData,
  //   //       [parentTab]: {
  //   //         [selectedValue]: selectedValue,
  //   //       },
  //   //     };
  //   //   }
  //   // });
  //   setOutputData((prevData) => ({
  //     ...prevData,
  //     [parentTab]: selectedValue.reduce((acc, value) => {
  //       acc[value] = {};
  //       return acc;
  //     }, {}),
  //   }));
  //   setNestedTabDropdownInstances((prevKeys) => ({
  //     ...prevKeys,
  //     [newTabKey]: true,
  //   }));
  //   setTabDropdownValues((prevValues) => ({
  //     ...prevValues,
  //     [newTabKey]: {
  //       acl: "",
  //       vrf: "",
  //     },
  //   }));
  // };
  const handleTabDropdownChange = (parentTab, selectedValue) => {
    const newTabKey = `${parentTab}-${selectedValue}`;
    // console.log(parentTab);
    // console.log(allSelectedValues);
    setNestedTab(parentTab);
    const copiedObject = Object.assign({}, newOutput);
    for (let item of copiedObject.sites) {
      if (item["site-name"] == parentTab) {
        for (let device in selectedValue) {
          if (!item["site-done"].includes(selectedValue[device])) {
            item["site-done"].push(selectedValue[device]);
            item["devices"].push({
              "device-name": selectedValue[device],
              "access-lists": [],
            });
          }
        }
      }
    }
    setNewOutput(copiedObject);

    // console.log(nestedTabDropdownInstances);
    setOutputData((prevData) => ({
      ...prevData,
      [parentTab]: selectedValue.reduce((acc, value) => {
        const newTabKey = `${value}`;
        acc[value] = allSelectedValues;
        return acc;
      }, {}),
    }));
    setNestedTabDropdownInstances((prevKeys) => ({
      ...prevKeys,
      [newTabKey]: true,
    }));
    setTabDropdownValues((prevValues) => ({
      ...prevValues,
      [newTabKey]: {
        acl: "",
        vrf: "",
      },
    }));
    // setTabDropdownValues((prevValues) => ({
    //   ...prevValues,
    //   [newTabKey]: {
    //     acl: "",
    //     vrf: "",
    //   },
    // }));
  };
  const handleNestedTabDropdownChange = (
    nestedTabKey,
    fieldType,
    selectedValue
  ) => {
    // console.log("------------------first--------------------");
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [fieldType]: selectedValue,
    }));

    // console.log("------------------second--------------------");
    setTabDropdownValues((prevValues) => ({
      ...prevValues,
      [nestedTabKey]: {
        ...prevValues[nestedTabKey],
        [fieldType]: selectedValue,
      },
    }));
  };

  const handleInputChange = async (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewOutput((prevValue) => ({ ...prevValue, "service-name": newValue }));

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));

    try {
      // Call the API and send the input string to the endpoint
      const response = await axios.post(baseUrl + "/aclApiServiceName", {
        service_name: newValue, // Adjust the field name as needed
      });

      // Assuming the response data contains the new output
      console.log(response.data);
      setIsVerfied(response.data.status);
    } catch (error) {
      console.error("Error calling the API:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(newOutput);
    try {
      const res = await axios.post(baseUrl + "/create_acl_metadata", newOutput);
      openSweetAlert(res.data, "info");
      console.log(res.data);
      setActiveCollapseKey(null);
      setIsModalVisible(false);
      setSelectedOptions([]);
      setDropdownOptionsSites([]);
      setDropdownOptionsDevice([]);
      setDropdownOptionsVrf([]);
      setDropdownOptionsAcl([]);
      setAllSelectedValues([]);
      setSelectedValues({
        acl: undefined,
        vrf: undefined,
      });
      setNestedTabDropdownInstances({});
      setOutputData({});
      setSelectedSites("");
      setSelectedDeviceName("");
      setTabDropdownValues({});
      setFormValues({
        inputField: "",
        verifyButton: false,
        tabs: [],
      });
      setActiveTab(null);
      setNewOutput({});
    } catch (e) {
      console.log(e);
    }
  };
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  return (
    <MainDivwithoutSidebar>
      <div style={{ margin: "0px 0px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, marginLeft: "10px" }}>
          Service Mapping
        </h2>
        <FormData
          isModalVisible={isModalVisible1}
          setIsModalVisible={setIsModalVisible1}
          siteApiData={dropdownOptionsSites}
          loadDataStatus={loadDataStatus}
          setLoadDataStatus={setLoadDataStatus}
        />

        <div style={{ float: "right" }}>
          <Button type="primary" danger onClick={showModalServiceName}>
            Delete
          </Button>{" "}
          &nbsp;&nbsp;
          <Button type="primary" onClick={() => setIsModalVisible1(true)}>
            Add
          </Button>
        </div>
        <br />
        <br />
        {/* <Collapse
          accordion
          onChange={handleCollapseChange}
          activeKey={activeCollapseKey}
        >
          {sections?.map((section) => (
            <Panel
              key={section.key}
              header={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "10px",
                    background:
                      activeCollapseKey !== null &&
                      activeCollapseKey.includes(section.key)
                        ? "linear-gradient(180deg, #DCF3FD 0%, rgba(255, 255, 255, 0.00) 100%)"
                        : "transparent",
                    // activeCollapseKey === section.key
                    //   ? "#f0f0f0"
                    //   : "transparent",
                    transition: "background-color 0.3s",
                  }}
                >
                  <img src={Services} alt={section.title} /> &nbsp;&nbsp;
                  <span className="section-title">{section.title}</span>
                </div>
              }
            >
              <Collapse accordion>
                {section.devices?.map((deviceKey) => (
                  <Panel
                    header={
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          padding: "10px",
                          background:
                            activeCollapseKey !== null &&
                            activeCollapseKey.includes(section.key)
                              ? "linear-gradient(180deg, #DCF3FD 0%, rgba(255, 255, 255, 0.00) 100%)"
                              : "transparent",
                          transition: "background-color 0.3s",
                        }}
                      >
                        <img src={Site} alt={section.title} /> &nbsp;&nbsp;
                        <span className="section-title">{deviceKey}</span>
                      </div>
                    }
                    key={deviceKey}
                  >
                    <Tabs>
                      {devicesData[deviceKey]??.map((tab) => (
                        <TabPane tab={`Device ${tab.tabKey}`} key={tab.tabKey}>
                          <Table dataSource={tab.data} columns={columns} />
                        </TabPane>
                      ))}
                    </Tabs>
                  </Panel>
                ))}
              </Collapse>
            </Panel>
          ))}
        </Collapse> */}
        <Modal
          title="Add New Service Mapping"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <form onSubmit={handleSubmit}>
            <div
              style={{
                width: "100%",
                marginTop: "10px",
              }}
            >
              <Space>
                <Input
                  style={{
                    width: "470px",
                  }}
                  type="text"
                  placeholder="Service Name"
                  name="inputField"
                  value={formValues.inputField}
                  onChange={handleInputChange}
                />
                {/* <Button
                    type="primary"
                    name="verifyButton"
                    onClick={() =>
                      handleInputChange({
                        target: { name: "verifyButton", checked: true },
                      })
                    }
                  >
                    Verify
                  </Button> */}
              </Space>
              {isVerified && (
                <span
                  style={{
                    color: isVerified === "Verified" ? "#66B127" : "#f00",
                    fontWeight: "bold",
                  }}
                >
                  &nbsp;&nbsp; {isVerified}
                </span>
              )}
            </div>
            <br />
            <Select
              mode="multiple"
              style={{ width: "100%", marginTop: "-8px" }}
              placeholder="Select Site"
              onChange={handleSelectionChange}
            >
              {dropdownOptionsSites?.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
            <br />
            <Tabs
              activeKey={activeTab}
              onChange={() => {
                handleTabChange();
                // console.log(activeTab);
              }}
              style={{
                paddingLeft: "5px",
                marginTop: "8px",
              }}
            >
              {selectedOptions?.map((value) => (
                <TabPane tab={`${value}`} key={value}>
                  <div
                    onClick={() => {
                      // console.log(value);
                      setSelectedSites(value);
                      DeviceNames();
                    }}
                  >
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Select Device"
                      onChange={(selectedValue) =>
                        handleTabDropdownChange(value, selectedValue)
                      }
                    >
                      {dropdownOptionsDevice?.map((option) => (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <br />
                  <Tabs>
                    {Object.keys(nestedTabDropdownInstances)?.map((tabKey) => {
                      const [parentTabValue, nestedTabValue] =
                        tabKey.split("-");
                      if (parentTabValue === value) {
                        // console.log(nestedTabValue);
                        // console.log(parentTabValue);
                        // console.log(parentTabValue);
                        const firstDashIndex = tabKey.indexOf("-");
                        const result =
                          firstDashIndex !== -1
                            ? tabKey.substring(firstDashIndex + 1)
                            : tabKey;
                        // console.log(result);

                        const parts = result.split(",");
                        const lastPart = parts[parts.length - 1];
                        // console.log(lastPart);
                        return (
                          <TabPane
                            tab={parentTabValue + " , " + lastPart}
                            key={tabKey}
                          >
                            {/* Nested Tab Content */}
                            {Array.from(
                              {
                                length: nestedTabDropdownInstances[tabKey] || 0,
                              },
                              (_, index) => {
                                const nestedTabKey = `${tabKey}-${index}`;
                                return (
                                  <div
                                    key={index}
                                    onClick={() => {
                                      // console.log("Device Name", tabKey);
                                      const parts = tabKey.split(",");
                                      const lastPart = parts[parts.length - 1];
                                      console.log("Device Name", lastPart);

                                      const part2 = lastPart.split("-");
                                      const firstWord = part2[0].trim();
                                      console.log(firstWord);
                                      if (
                                        dropdownOptionsSites.includes(firstWord)
                                      ) {
                                        console.log(
                                          "--------------------------------"
                                        );
                                        part2.shift();
                                        const newString = part2
                                          .join("-")
                                          .trim();
                                        console.log(newString);
                                        setSelectedDeviceName(newString);
                                      }

                                      // const parts = tabKey.split("-");

                                      // if (parts.length >= 2) {
                                      //   const devicePart = parts[1];
                                      //   const devices = devicePart.split(",");
                                      //   const lastDevice =
                                      //     devices[devices.length - 1];
                                      //   console.log("Device Name", lastDevice);
                                      //   setSelectedDeviceName(lastDevice);
                                      // }
                                    }}
                                  >
                                    <Row>
                                      <Col span={10}>
                                        <Select
                                          style={{
                                            width: "100%",
                                            paddingRight: "10px",
                                          }}
                                          placeholder="Select ACL"
                                          // onChange={(selectedValue) => {
                                          //   handleNestedTabDropdownChange(
                                          //     nestedTabKey,
                                          //     "acl",
                                          //     selectedValue
                                          //   );
                                          // }}
                                          onChange={(selectedValue) =>
                                            handleNestedTabDropdownChange(
                                              nestedTabKey,
                                              "acl",
                                              selectedValue
                                            )
                                          }
                                        >
                                          {dropdownOptionsAcl?.map((option) => (
                                            <Option key={option} value={option}>
                                              {option}
                                            </Option>
                                          ))}
                                        </Select>
                                      </Col>
                                      <Col span={10}>
                                        <Select
                                          style={{
                                            width: "100%",
                                          }}
                                          placeholder="Select VRF"
                                          onChange={(selectedValue) => {
                                            handleNestedTabDropdownChange(
                                              nestedTabKey,
                                              "vrf",
                                              selectedValue
                                            );
                                            setSelectedDeviceName(nestedTabKey);
                                          }}
                                        >
                                          {dropdownOptionsVrf?.map((option) => (
                                            <Option key={option} value={option}>
                                              {option}
                                            </Option>
                                          ))}
                                        </Select>
                                      </Col>
                                      <Col span={2}>
                                        {index ===
                                          nestedTabDropdownInstances[tabKey] -
                                            1 && (
                                          <Button
                                            type="dashed"
                                            onClick={() =>
                                              handleAddNestedTabDropdown(tabKey)
                                            }
                                          >
                                            Add
                                          </Button>
                                        )}
                                      </Col>
                                    </Row>
                                  </div>
                                );
                              }
                            )}
                          </TabPane>
                        );
                      } else {
                        return null; // Return null for other parentTab values
                      }
                    })}
                  </Tabs>
                </TabPane>
              ))}
            </Tabs>
            <div style={{ float: "right", marginTop: "8px" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
            <br />
            <br />
          </form>
        </Modal>

        <Modal
          title=""
          open={isModalVisibleServiceName}
          onOk={handleOk}
          onCancel={handleCancelServiceName}
          footer={[
            <Button key="back" onClick={handleCancelServiceName}>
              Cancel
            </Button>,
            <Button
              key="Delete"
              type="danger"
              style={{ marginRight: "10px" }}
              onClick={handleOkDeleteServiceName}
            >
              Submit
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
            Delete Service
          </h2>
          <div style={{ padding: "10px" }}>
            <p>Enter the service name to delete:</p>
            <Input
              type="text"
              placeholder="Service Name"
              value={deleteServiceName}
              onChange={(e) => setDeleteServiceName(e.target.value)}
            />
            <br />
          </div>
        </Modal>
      </div>
      <Spin spinning={loading}>
        <Collapseable loadDataStatus={loadDataStatus} />
        {/* <Table
        style={{ marginLeft: "10px" }}
        dataSource={data}
        columns={columnsAcl}
      /> */}
      </Spin>
    </MainDivwithoutSidebar>
  );
};

export default NestedCollapseWithTabs;

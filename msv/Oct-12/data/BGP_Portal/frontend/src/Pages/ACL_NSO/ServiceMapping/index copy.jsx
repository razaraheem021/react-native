// import React, { useState, useEffect } from "react";
// import { Input, Select, Button, Row, Col } from "antd";
// import axios from "axios";

// const { Option } = Select;
// import {
//   MainDivwithoutSidebar,
//   MainDivwithoutSidebarInfluxgraph,
//   TableStyle,
//   MainTableFailedDevicesTitle,
//   MainTableFailedDevices,
// } from "../../../Components/GlobalStyles/main.styled.js";

// const Index = () => {
//   const [aclService, setAclService] = useState("");
//   const [siteOptions, setSiteOptions] = useState([]);
//   const [selectedSite, setSelectedSite] = useState("");
//   const [deviceOptions, setDeviceOptions] = useState([]);
//   const [selectedDevice, setSelectedDevice] = useState("");
//   const [accessNameType, setAccessNameType] = useState("ipv4");
//   const [accessNames, setAccessNames] = useState([]);
//   const [vrfNames, setVrfNames] = useState([]);

//   useEffect(() => {
//     // Fetch ACL services and populate the first dropdown
//     const fetchAclServices = async () => {
//       const res = await axios.get("your_api_url_for_acl_services");
//       // Assuming the response data is an array of ACL services
//       const aclServices = res.data;
//       setAclService(aclServices[0]); // Set default ACL service
//     };

//     fetchAclServices();
//   }, []);

//   useEffect(() => {
//     // Fetch site options based on selected ACL service
//     const fetchSiteOptions = async () => {
//       if (aclService) {
//         const res = await axios.get(`your_api_url_for_sites/${aclService}`);
//         // Assuming the response data is an array of site options
//         setSiteOptions(res.data);
//       }
//     };

//     fetchSiteOptions();
//   }, [aclService]);

//   useEffect(() => {
//     // Fetch device options based on selected site
//     const fetchDeviceOptions = async () => {
//       if (selectedSite) {
//         const res = await axios.get(`your_api_url_for_devices/${selectedSite}`);
//         // Assuming the response data is an array of device options
//         setDeviceOptions(res.data);
//       }
//     };

//     fetchDeviceOptions();
//   }, [selectedSite]);

//   useEffect(() => {
//     // Fetch access names based on access name type and populate the dropdown
//     const fetchAccessNames = async () => {
//       const res = await axios.get(
//         `your_api_url_for_access_names/${accessNameType}`
//       );
//       // Assuming the response data is an array of access names
//       setAccessNames(res.data);
//     };

//     fetchAccessNames();
//   }, [accessNameType]);

//   useEffect(() => {
//     // Fetch VRF names based on selected device
//     const fetchVrfNames = async () => {
//       if (selectedDevice) {
//         const res = await axios.get(
//           `your_api_url_for_vrf_names/${selectedDevice}`
//         );
//         // Assuming the response data is an array of VRF names
//         setVrfNames(res.data);
//       }
//     };

//     fetchVrfNames();
//   }, [selectedDevice]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//   };

//   const handleReset = () => {
//     // Reset form fields here
//   };

//   return (
//     <MainDivwithoutSidebar>
//       <div style={{ display: "grid", placeItems: "center", minHeight: "80vh" }}>
//         <div
//           style={{
//             padding: "20px",
//             width: "800px",

//             borderRadius: "8px",
//             border: "1px solid #009BDB",
//             background: "#FFF",
//             boxShadow: "3px 4px 24px 0px rgba(0, 0, 0, 0.06)",
//           }}
//         >
//           <h3 style={{ fontSize: "26px", fontWeight: 600 }}>Create an ACL</h3>
//           <br />
//           <form onSubmit={handleSubmit}>
//             <Row gutter={[16, 16]}>
//               <Col span={4}>
//                 <label style={{ marginRight: "10px" }}>ACL Service:</label>
//               </Col>
//               <Col span={8}>
//                 <Select
//                   value={aclService}
//                   onChange={setAclService}
//                   style={{ width: "100%" }}
//                 >
//                   {/* Render ACL service options */}
//                 </Select>
//               </Col>
//               <Col span={4}>
//                 <label style={{ marginRight: "10px" }}>Access Name Type:</label>
//               </Col>
//               <Col span={8}>
//                 <Select
//                   style={{ width: "100%" }}
//                   value={accessNameType}
//                   onChange={setAccessNameType}
//                 >
//                   <Option value="ipv4">IPv4</Option>
//                   <Option value="ipv6">IPv6</Option>
//                 </Select>
//               </Col>
//             </Row>
//             <br />

//             <Row gutter={[16, 16]}>
//               <Col span={4}>
//                 <label style={{ marginRight: "10px" }}>Site:</label>
//               </Col>
//               <Col span={8}>
//                 <Select
//                   value={selectedSite}
//                   onChange={setSelectedSite}
//                   style={{ width: "100%" }}
//                 >
//                   {/* Render site options */}
//                 </Select>
//               </Col>

//               <Col span={4}>
//                 <label style={{ marginRight: "10px" }}>Device:</label>
//               </Col>
//               <Col span={8}>
//                 <Select
//                   style={{ width: "100%" }}
//                   value={selectedDevice}
//                   onChange={setSelectedDevice}
//                 >
//                   {/* Render device options */}
//                 </Select>
//               </Col>
//             </Row>
//             <br />

//             <Row gutter={[16, 16]}>
//               <Col span={4}>
//                 <label style={{ marginRight: "10px" }}>Access Names:</label>
//               </Col>
//               <Col span={8}>
//                 <Select
//                   style={{ width: "100%" }}
//                   mode="multiple"
//                   value={accessNames}
//                 >
//                   {/* Render access name options based on access name type */}
//                 </Select>
//               </Col>

//               <Col span={4}>
//                 <label style={{ marginRight: "10px" }}>VRF Names:</label>
//               </Col>
//               <Col span={8}>
//                 <Select
//                   style={{ width: "100%" }}
//                   mode="multiple"
//                   value={vrfNames}
//                 >
//                   {/* Render VRF name options */}
//                 </Select>
//               </Col>
//             </Row>
//             <br />
//             <Row>
//               <Col span={24}>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "flex-end",
//                     gap: 10,
//                   }}
//                 >
//                   <Button type="primary" danger onClick={handleReset}>
//                     Reset
//                   </Button>
//                   <Button type="primary" htmlType="submit">
//                     Submit
//                   </Button>
//                 </div>
//               </Col>
//             </Row>
//             <br />
//           </form>
//         </div>
//       </div>
//     </MainDivwithoutSidebar>
//   );
// };

// export default Index;

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
} from "antd";
import axios, { baseUrlofAcl } from "../../../utils/axios/Acl.jsx";

import {
  MainDivwithoutSidebar,
  MainDivwithoutSidebarInfluxgraph,
  TableStyle,
  MainTableFailedDevicesTitle,
  MainTableFailedDevices,
} from "../../../Components/GlobalStyles/main.styled.js";

import Services from "./assets/services.svg";
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
  const [outputData, setOutputData] = useState({});
  const [selectedSites, setSelectedSites] = useState("");
  const [selectedDeviceName, setSelectedDeviceName] = useState("");

  const [tabDropdownValues, setTabDropdownValues] = useState({});
  const [formValues, setFormValues] = useState({
    inputField: "",
    verifyButton: false,
    tabs: [],
  });
  const [activeTab, setActiveTab] = useState(null);

  const SiteNames = async () => {
    try {
      const response = await axios.get(baseUrlofAcl + "/aclApiSiteName");
      console.log("Site Names Response:", response.data);

      // Assuming the response.data is already a JSON object
      const dataArray = response.data;

      if (Array.isArray(dataArray)) {
        setDropdownOptionsSites(dataArray);
      } else {
        console.log("Response data is not an array:", dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeviceNames = async () => {
    try {
      const response = await axios.post(
        baseUrlofAcl + "/aclApiSiteDeviceList",
        {
          site_name: selectedSites,
        }
      );
      console.log("Device Names Response:", response.data);

      // Assuming the response.data is already a JSON object
      const dataArray = response.data;

      if (Array.isArray(dataArray)) {
        setDropdownOptionsDevice(dataArray);
      } else {
        console.log("Response data is not an array:", dataArray);
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
      const response = await axios.post(baseUrlofAcl + "/aclApiVrfList", {
        device_name: selectedDeviceName,
      });
      console.log("Vrf Names Response:", response.data);

      // Assuming the response.data is already a JSON object
      const dataArray = response.data;

      if (Array.isArray(dataArray)) {
        setDropdownOptionsVrf(dataArray);
      } else {
        console.log("Response data is not an array:", dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const aclNames = async () => {
    try {
      const response = await axios.post(baseUrlofAcl + "/aclApiDeviceList", {
        device_name: selectedDeviceName,
      });
      console.log("Acl Names Response:", response.data);

      // Assuming the response.data is already a JSON object
      const dataArray = response.data;

      if (Array.isArray(dataArray)) {
        setDropdownOptionsAcl(dataArray);
      } else {
        console.log("Response data is not an array:", dataArray);
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
    console.log(nestedTabDropdownInstances);
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
    console.log(activeKey);

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
    console.log(selectedValues);
    let devicesData = {};
    for (let item of selectedValues) {
      devicesData[item] = {};
    }
    setOutputData(devicesData);

    // setTabDropdownValues({});
    // setNestedTabDropdownInstances({});
  };

  useEffect(() => {
    console.log(outputData);
    console.log(selectedValues);
    if (selectedValues.acl !== undefined && selectedValues.vrf !== undefined) {
      setAllSelectedValues((prevOutputData) => [
        ...prevOutputData,
        selectedValues,
      ]);
    }
  }, [outputData, selectedValues]);
  useEffect(() => {
    console.log(allSelectedValues);
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
    console.log(parentTab);
    console.log(selectedValue);

    console.log(nestedTabDropdownInstances);

    // setOutputData((prevData) => {
    //   if (prevData[parentTab]) {
    //     return {
    //       ...prevData,
    //       [parentTab]: {
    //         ...prevData[parentTab],
    //         [selectedValue]: selectedValue,
    //       },
    //     };
    //   } else {
    //     return {
    //       ...prevData,
    //       [parentTab]: {
    //         [selectedValue]: selectedValue,
    //       },
    //     };
    //   }
    // });
    ////----------------------------------------------------------------

    // data
    // setOutputData((prevData) => ({
    //   ...prevData,
    //   [parentTab]: selectedValue.reduce((acc, value) => {
    //     acc[value] = {};
    //     return acc;
    //   }, {}),
    // }));
    // setNestedTabDropdownInstances((prevKeys) => ({
    //   ...prevKeys,
    //   [newTabKey]: true,
    // }));
    // setTabDropdownValues((prevValues) => ({
    //   ...prevValues,
    //   [newTabKey]: {
    //     acl: "",
    //     vrf: "",
    //   },
    // }));

    // ------------------------------------------
    // setOutputData((prevData) => ({
    //   ...prevData,
    //   [parentTab]: selectedValue.reduce((acc, value) => {
    //     acc[value] = {
    //       acl: "",
    //       vrf: "",
    //     };

    //     // Set nestedTabDropdownInstances and tabDropdownValues here
    //     const newTabKey = `${value}`;
    //     return {
    //       ...acc,
    //       [newTabKey]: {
    //         acl: "",
    //         vrf: "",
    //       },
    //     };
    //   }, {}),
    // }));

    // setNestedTabDropdownInstances((prevKeys) => ({
    //   ...prevKeys,
    //   [newTabKey]: true,
    // }));
    // setTabDropdownValues((prevValues) => ({
    //   ...prevValues,
    //   [newTabKey]: {
    //     acl: "",
    //     vrf: "",
    //   },
    // }));

    // -------------------------------------------------------------------
    setOutputData((prevData) => ({
      ...prevData,
      [parentTab]: selectedValue.reduce((acc, value) => {
        const newTabKey = `${value}`;
        acc[value] = allSelectedValues;

        // setNestedTabDropdownInstances((prevKeys) => ({
        //   ...prevKeys,
        //   [newTabKey]: true,
        // }));
        // setTabDropdownValues((prevValues) => ({
        //   ...prevValues,
        //   [newTabKey]: {
        //     acl: "",
        //     vrf: "",
        //   },
        // }));

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
    console.log("------------------first--------------------");
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [fieldType]: selectedValue,
    }));

    console.log("------------------second--------------------");
    setTabDropdownValues((prevValues) => ({
      ...prevValues,
      [nestedTabKey]: {
        ...prevValues[nestedTabKey],
        [fieldType]: selectedValue,
      },
    }));
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Collected Form Values:", {
      service_name: formValues.inputField,
      verifyButton: formValues.verifyButton,
      sites: selectedOptions,
      devices: tabDropdownValues,
      output: outputData,
    });

    // Add your logic for processing the form values here
  };

  return (
    <MainDivwithoutSidebar>
      <div style={{ margin: "0px 15px" }}>
        <div style={{ float: "right" }}>
          <Button type="primary" onClick={showModal}>
            Add
          </Button>
        </div>
        <br />
        <br />
        <Collapse
          accordion
          onChange={handleCollapseChange}
          activeKey={activeCollapseKey}
        >
          {sections.map((section) => (
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
                      {devicesData[deviceKey]?.map((tab) => (
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
        </Collapse>
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
                <Space.Compact>
                  <Input
                    style={{
                      width: "400px",
                    }}
                    type="text"
                    placeholder="Input Field"
                    name="inputField"
                    value={formValues.inputField}
                    onChange={handleInputChange}
                  />
                  <Button
                    type="primary"
                    name="verifyButton"
                    onClick={() =>
                      handleInputChange({
                        target: { name: "verifyButton", checked: true },
                      })
                    }
                  >
                    Verify
                  </Button>
                </Space.Compact>
              </Space>
            </div>
            <br />
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select options"
              onChange={handleSelectionChange}
            >
              {dropdownOptionsSites.map((option) => (
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
                console.log(activeTab);
              }}
              style={{
                paddingLeft: "5px",
                marginTop: "8px",
              }}
            >
              {selectedOptions.map((value) => (
                <TabPane tab={`${value}`} key={value}>
                  <div
                    onClick={() => {
                      console.log(value);
                      setSelectedSites(value);
                      DeviceNames();
                    }}
                  >
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Select something"
                      onChange={(selectedValue) =>
                        handleTabDropdownChange(value, selectedValue)
                      }
                    >
                      {dropdownOptionsDevice.map((option) => (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <br />
                  <Tabs>
                    {Object.keys(nestedTabDropdownInstances).map((tabKey) => {
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
                        console.log(result);

                        const parts = result.split(",");
                        const lastPart = parts[parts.length - 1];
                        console.log(lastPart);
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
                                      setSelectedDeviceName(lastPart);

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
                                          {dropdownOptionsAcl.map((option) => (
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
                                          {dropdownOptionsVrf.map((option) => (
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
      </div>
    </MainDivwithoutSidebar>
  );
};

export default NestedCollapseWithTabs;

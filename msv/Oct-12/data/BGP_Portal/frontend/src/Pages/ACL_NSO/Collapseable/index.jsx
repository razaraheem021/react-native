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
import Services from "./assets/services.svg";
import Site from "./assets/site.svg";
import { aclData } from "./data";
import axios, { baseUrl } from "../../../utils/axios";

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
  {
    title: "Sequence Number",
    dataIndex: "sequence-number",
    key: "sequence-number",
  },
  { title: "IPV4 Prefix", dataIndex: "ipv4-prefix", key: "ipv4-prefix" },
];

const NestedCollapseWithTabs = ({ loadDataStatus }) => {
  const [dataSource, setDataSource] = useState([]);
  const [activeCollapseKey, setActiveCollapseKey] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [nestedTabDropdownInstances, setNestedTabDropdownInstances] = useState(
    {}
  );
  const [outputData, setOutputData] = useState({});

  const [tabDropdownValues, setTabDropdownValues] = useState({});
  const [formValues, setFormValues] = useState({
    inputField: "",
    verifyButton: false,
    tabs: [],
  });
  const [activeTab, setActiveTab] = useState(null);

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
    setNestedTabDropdownInstances((prevInstances) => ({
      ...prevInstances,
      [tabKey]: (prevInstances[tabKey] || 0) + 1,
    }));
  };
  const handleTabChange = (activeKey) => {
    setActiveTab(activeKey);
    // if (activeKey !== activeTab) {
    //   // Check if the selected tab has changed
    //   setNestedTabDropdownInstances({});
    //   setTabDropdownValues({});
    // }
  };
  const dropdownOptions = ["Option 1", "Option 2", "Option 3"];
  const dropdownOptionsSites = ["Site 1", "Site 2", "Site 3"];
  const dropdownOptionsDevice = ["Device 1", "Device 2", "Device 3"];
  const dropdownOptionsAcl = ["ACL 1", "ACL 2", "ACL 3"];
  const dropdownOptionsVrf = ["VRF 1", "VRF 2", "VRF 3"];

  const handleSelectionChange = (selectedValues) => {
    setSelectedOptions(selectedValues);

    let devicesData = {};
    for (let item of selectedValues) {
      devicesData[item] = {};
    }
    setOutputData(devicesData);

    // setTabDropdownValues({});
    // setNestedTabDropdownInstances({});
  };

  useEffect(() => {
    console.log(nestedTabDropdownInstances);
  }, [nestedTabDropdownInstances]);
  const LoadData = async () => {
    const res = await axios.get(baseUrl + "/service_mapping_data");
    console.log(res.data);
    setDataSource(res.data);
  };
  useEffect(() => {
    LoadData();
  }, [loadDataStatus]);
  const handleTabDropdownChange = (parentTab, selectedValue) => {
    const newTabKey = `${parentTab}-${selectedValue}`;
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
    setOutputData((prevData) => ({
      ...prevData,
      [parentTab]: selectedValue.reduce((acc, value) => {
        acc[value] = {};
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
  };

  const handleNestedTabDropdownChange = (
    nestedTabKey,
    fieldType,
    selectedValue
  ) => {
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
    <div style={{ margin: "0px 15px" }}>
      {/* <br />
      <br />
      <br />
      <div style={{ float: "right" }}>
        <Button type="primary" onClick={showModal}>
          Add
        </Button>
      </div>
      <br />
      <br /> */}
      <Collapse
        accordion
        onChange={handleCollapseChange}
        activeKey={activeCollapseKey}
      >
        {dataSource.map((acl) => (
          <Panel
            key={acl["acl-service-name"]}
            header={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "10px",
                  background:
                    // activeCollapseKey !== null &&
                    // activeCollapseKey.includes(acl["acl-service-name"])
                    // ?
                    "linear-gradient(180deg, #DCF3FD 0%, rgba(255, 255, 255, 0.00) 100%)",
                  // : "transparent",
                  transition: "background-color 0.3s",
                }}
              >
                <img src={Services} alt={acl["acl-service-name"]} />{" "}
                &nbsp;&nbsp;
                <span className="section-title">
                  ACL Service:&nbsp;&nbsp;{acl["acl-service-name"]}
                </span>
              </div>
            }
          >
            <Collapse accordion>
              {acl.sites?.map((site) => (
                <Panel
                  key={site["site-name"]}
                  header={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "10px",
                        background:
                          activeCollapseKey !== null &&
                          activeCollapseKey.includes(site["site-name"])
                            ? "linear-gradient(180deg, #DCF3FD 0%, rgba(255, 255, 255, 0.00) 100%)"
                            : "transparent",
                        transition: "background-color 0.3s",
                      }}
                    >
                      <img src={Site} alt={site["site-name"]} /> &nbsp;&nbsp;
                      <span className="section-title">
                        Site:&nbsp;&nbsp;{site["site-name"]}
                      </span>
                    </div>
                  }
                >
                  <Collapse accordion>
                    {site.devices?.map((device) => (
                      <Panel
                        key={device["device-name"]}
                        header={
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                              padding: "10px",
                              background:
                                activeCollapseKey !== null &&
                                activeCollapseKey.includes(
                                  device["device-name"]
                                )
                                  ? "linear-gradient(180deg, #DCF3FD 0%, rgba(255, 255, 255, 0.00) 100%)"
                                  : "transparent",
                              transition: "background-color 0.3s",
                            }}
                          >
                            <img src={Site} alt={device["device-name"]} />{" "}
                            &nbsp;&nbsp;
                            <span className="section-title">
                              Device:&nbsp;&nbsp;{device["device-name"]}
                            </span>
                          </div>
                        }
                      >
                        <Collapse accordion>
                          {device["access-lists"]?.map((accessList) => (
                            <Panel
                              key={accessList["access-list-name"]}
                              header={
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    padding: "10px",
                                    background:
                                      activeCollapseKey !== null &&
                                      activeCollapseKey.includes(
                                        accessList["access-list-name"]
                                      )
                                        ? "linear-gradient(180deg, #DCF3FD 0%, rgba(255, 255, 255, 0.00) 100%)"
                                        : "transparent",
                                    transition: "background-color 0.3s",
                                  }}
                                >
                                  <img
                                    src={Site}
                                    alt={accessList["access-list-name"]}
                                  />
                                  &nbsp;&nbsp;
                                  <span className="section-title">
                                    Access List:&nbsp;&nbsp;
                                    {accessList["access-list-name"]} | Vrf
                                    Name:&nbsp;&nbsp;
                                    {accessList["vrf-name"]}
                                  </span>
                                </div>
                              }
                            >
                              <Tabs>
                                {accessList["customers"]?.map((customer) => (
                                  <TabPane
                                    tab={`${customer["customer-name"]}`}
                                    key={customer["customer-name"]}
                                  >
                                    <Table
                                      dataSource={customer["ip-prefixes"]}
                                      columns={columns}
                                    />
                                  </TabPane>
                                ))}
                              </Tabs>
                            </Panel>
                          ))}
                        </Collapse>
                      </Panel>
                    ))}
                  </Collapse>
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
            onChange={handleTabChange}
            style={{
              paddingLeft: "5px",
              marginTop: "8px",
            }}
          >
            {selectedOptions.map((value) => (
              <TabPane tab={`${value}`} key={value}>
                <div>
                  {/* <h3>Dropdown in Tab</h3> */}
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
                    const [parentTabValue, nestedTabValue] = tabKey.split("-");
                    if (parentTabValue === value) {
                      return (
                        <TabPane
                          tab={parentTabValue + " , " + nestedTabValue}
                          key={tabKey}
                        >
                          {/* Nested Tab Content */}
                          {Array.from(
                            { length: nestedTabDropdownInstances[tabKey] || 0 },
                            (_, index) => {
                              const nestedTabKey = `${tabKey}-${index}`;
                              return (
                                <div key={index}>
                                  <Row>
                                    <Col span={10}>
                                      <Select
                                        style={{
                                          width: "100%",
                                          paddingRight: "10px",
                                        }}
                                        placeholder="Select ACL"
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
                                        onChange={(selectedValue) =>
                                          handleNestedTabDropdownChange(
                                            nestedTabKey,
                                            "vrf",
                                            selectedValue
                                          )
                                        }
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
  );
};

export default NestedCollapseWithTabs;

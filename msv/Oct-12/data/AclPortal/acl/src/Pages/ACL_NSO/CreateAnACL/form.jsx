import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tabs,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios, { baseUrlofAcl } from "../../../utils/axios/Acl.jsx";
import Swal from "sweetalert2";

const { TabPane } = Tabs;
const Index = ({ siteApiData, isModalVisible, setIsModalVisible }) => {
  const [isVerfied, setIsVerified] = useState(false);
  // Data to be displayed states
  const [serviceName, setServiceName] = useState("");
  const [sites, setSites] = useState(
    siteApiData.map((str) => ({ value: str, label: str }))
  );
  const [device, setDevice] = useState({});
  const [acl, setAcl] = useState({});
  const [vrf, setVrf] = useState({});

  // Tab States
  const [siteTabSelected, setSiteTabSelected] = useState("");
  const [deviceTabSelected, setDeviceTabSelected] = useState("");

  const [selectedSites, setSelectedSites] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState({});
  const [tableData, setTableData] = useState({});

  const openSweetAlert = (title, type, errors) => {
    console.log("Error-------->", errors);

    Swal.fire({
      title,
      type,
      allowOutsideClick: false,
    });
  };

  // const [output, setOutput] = useState({"service-name": "", "sites": []})
  useEffect(() => {
    setSites(siteApiData.map((str) => ({ value: str, label: str })));
  }, [siteApiData]);
  useEffect(() => {
    (async () => {
      if (selectedSites.length > 0) {
        const site = selectedSites[selectedSites.length - 1];
        // Device API call
        //
        //
        const response = await axios.post(
          baseUrlofAcl + "/aclApiSiteDeviceList",
          {
            site_name: site,
          }
        );
        const dataArray = response.data;
        const devices = dataArray.map((str) => ({ value: str, label: str }));
        //
        //
        setDevice((prevState) => ({
          ...prevState,
          [site]: devices,
        }));
      }
    })();
  }, [selectedSites]);

  useEffect(() => {
    setDeviceTabSelected(-1);
  }, [siteTabSelected]);

  useEffect(() => {
    (async () => {
      if (selectedDevice[siteTabSelected] !== undefined) {
        const device_selected = selectedDevice[siteTabSelected];
        const device = device_selected[device_selected.length - 1];
        // ACL API call
        //
        //
        const response = await axios.post(baseUrlofAcl + "/aclApiDeviceList", {
          device_name: device,
        });
        const dataArray = response.data;

        const acl_data = dataArray.map((str) => ({ value: str, label: str }));
        //
        //
        setAcl((prevState) => ({
          ...prevState,
          [device]: acl_data,
        }));
        // VRF API call
        //
        //
        const responseVrf = await axios.post(baseUrlofAcl + "/aclApiVrfList", {
          device_name: device,
        });
        // console.log("Vrf Names Response:", response.data);

        // Assuming the response.data is already a JSON object
        const dataArrayVrf = responseVrf.data;

        const vrf_data = dataArrayVrf.map((str) => ({
          value: str,
          label: str,
        }));
        //
        //
        setVrf((prevState) => ({
          ...prevState,
          [device]: vrf_data,
        }));
      }
    })();
  }, [selectedDevice]);

  return (
    <Modal
      open={isModalVisible}
      footer={null}
      closable={false}
      onCancel={() => setIsModalVisible(false)}
      width={600}
      title="Add New Service Mapping"
    >
      <Input
        placeholder="Service Name"
        value={serviceName}
        status={serviceName === "" ? "" : isVerfied ? "success" : "error"}
        onChange={(event) => {
          (async () => {
            const response = await axios.post(
              baseUrlofAcl + "/aclApiServiceName",
              {
                service_name: event.target.value, // Adjust the field name as needed
              }
            );
            setIsVerified(response.data.status === "Already in use");
          })();
          setServiceName(event.target.value);
        }}
      />
      {serviceName !== "" ? (
        <h3
          style={
            isVerfied
              ? {
                  color: "red",
                  fontSize: 14,
                  paddingLeft: "5px",
                  fontWeight: 700,
                  marginTop: "10px",
                }
              : {
                  color: "green",
                  fontSize: 14,
                  paddingLeft: "5px",
                  fontWeight: 700,
                  marginTop: "10px",
                }
          }
        >
          {isVerfied ? "Already in use" : ""}
        </h3>
      ) : (
        <>
          <br />
          <br />
        </>
      )}
      <Select
        placeholder="Select Sites"
        mode="multiple"
        style={{ width: "100%" }}
        value={selectedSites}
        onChange={(value) => {
          setSelectedSites(value);
        }}
        options={sites}
      />
      <br />
      <br />
      <Tabs
        activeKey={siteTabSelected}
        onChange={(key) => setSiteTabSelected(key)}
      >
        {selectedSites.map((site) => (
          <TabPane tab={site} key={site}>
            <Select
              placeholder="Select Devices"
              mode="multiple"
              style={{ width: "100%" }}
              onChange={(value) => {
                setSelectedDevice((prevState) => ({
                  ...prevState,
                  [site]: value,
                }));
              }}
              options={device[site]}
            />
            <br />
            <br />
            <Tabs
              activeKey={deviceTabSelected}
              onChange={(key) => setDeviceTabSelected(key)}
            >
              {selectedDevice[site]?.map((device) => (
                <TabPane tab={device} key={device}>
                  <Form
                    onFinish={(data) => {
                      setTableData((prevData) => {
                        if (prevData.hasOwnProperty(device)) {
                          return {
                            ...prevData,
                            [device]: [...prevData[device], data],
                          };
                        } else {
                          return {
                            ...prevData,
                            [device]: [data],
                          };
                        }
                      });
                    }}
                  >
                    <Row>
                      <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                        <Form.Item
                          name="acl"
                          rules={[
                            {
                              required: true,
                              message: "Please select acl",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select Acl"
                            style={{ width: "95%" }}
                            options={acl[device]}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                        <Form.Item
                          name="vrf"
                          rules={[
                            {
                              required: true,
                              message: "Please select vrf",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select VRF"
                            style={{ width: "95%" }}
                            options={vrf[device]}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                        <Form.Item>
                          <Button type="primary" block htmlType="submit">
                            Add
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                  <br />
                  <br />
                  <Table
                    dataSource={tableData[device]}
                    columns={[
                      {
                        title: "ACL",
                        dataIndex: "acl",
                        render: (item) => {
                          return <>{item}</>;
                        },
                      },
                      {
                        title: "VRF",
                        dataIndex: "vrf",
                        render: (item) => {
                          return <>{item}</>;
                        },
                      },
                      {
                        title: "Manage",
                        width: 100,
                        render: (item, record) => {
                          return (
                            <>
                              <DeleteOutlined
                                onClick={() => {
                                  const filtered = tableData[device].filter(
                                    (obj) =>
                                      obj.acl !== record.acl &&
                                      obj.vrf !== record.vrf
                                  );
                                  console.log(filtered);
                                  setTableData((prevState) => ({
                                    ...prevState,
                                    [device]: filtered,
                                  }));
                                }}
                              />
                            </>
                          );
                        },
                      },
                    ]}
                    scroll={{ y: 300 }}
                  />
                </TabPane>
              ))}
            </Tabs>
          </TabPane>
        ))}
      </Tabs>
      <br />
      <br />
      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "5px" }}
      >
        <Button
          type={"primary"}
          onClick={async () => {
            const output = {
              "service-name": serviceName,
              sites: [],
            };
            for (let site in selectedSites) {
              site = selectedSites[site];
              const site_object = {
                "site-name": site,
                devices: [],
              };
              if (selectedDevice[site] !== undefined) {
                for (let device in selectedDevice[site]) {
                  device = selectedDevice[site][device];
                  const device_object = {
                    "device-name": device,
                    "access-lists": [],
                  };
                  if (tableData[device] !== undefined) {
                    for (let object in tableData[device]) {
                      object = tableData[device][object];
                      device_object["access-lists"].push({
                        "access-list-name": object.acl,
                        "vrf-name": object.vrf,
                        "sequence-number": 10831232,
                      });
                    }
                  }
                  site_object.devices.push(device_object);
                }
              }
              output.sites.push(site_object);
            }
            console.log(output);
            try {
              const res = await axios.post(
                baseUrlofAcl + "/create_acl_metadata",
                output
              );
              openSweetAlert(res.data, "info");
              setServiceName("");
              setDevice({});
              setAcl({});
              setVrf({});
              setSiteTabSelected("");
              setDeviceTabSelected("");

              setSelectedSites([]);
              setSelectedDevice({});
              setTableData({});
              setIsModalVisible(false);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default Index;

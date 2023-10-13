import { Button, Drawer, Spin, Switch, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  MainDivwithoutSidebar,
  TableStyle,
} from "../../../Components/GlobalStyles/main.styled.js";
import axios, { baseUrl } from "../../../utils/axios";
import ReactEcharts from "echarts-for-react";
import {
  CopyOutlined,
  EnterOutlined,
  ReloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { saveAs } from "file-saver";

const excelData = [];
const AntdTableExample = () => {
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [selectedRecordDetails, setSelectedRecordDetails] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  //     const data = [
  //       {
  //         id: 1,
  //         router_ip: "John",
  //         interface: "Doe",
  //         snmp_load: "D0oe",
  //         details: [
  //           {
  //             id: 1,
  //             key: "231",
  //             community: 25,
  //             netflow: "New York",
  //             bgp: "BGP 1",
  //             current_status: 1,
  //             default_status: 1,
  //             suggested_status: 1,
  //             checkbox: 1,
  //           },
  //           {
  //             id: 2,
  //             community: 5,
  //             key: "34",
  //             netflow: "New York",
  //             bgp: "BGP 1",
  //             current_status: 1,
  //             default_status: 1,
  //             suggested_status: 1,
  //             checkbox: 1,
  //           },
  //         ],
  //       },
  //       {
  //         id: 5,
  //         router_ip: "Jn",
  //         interface: "Doe",
  //         snmp_load: "D0oe",
  //         details: [
  //           {
  //             id: 7,
  //             key: "1",
  //             community: 255,
  //             netflow: "New",
  //             bgp: "BGP 21",
  //             current_status: 0,
  //             default_status: 0,
  //             suggested_status: 1,
  //             checkbox: 0,
  //           },
  //           {
  //             id: 5,
  //             key: "2",
  //             community: 54,
  //             netflow: "York",
  //             bgp: "BGP 14",
  //             current_status: 1,
  //             default_status: 1,
  //             suggested_status: 1,
  //             checkbox: 1,
  //           },
  //         ],
  //       },
  //     ];

  //
  let [interfaceData, setInterface] = useState("");
  let [snmp_index, setSnmp_index] = useState("");
  let [router_ip, setRouter_ip] = useState("");
  let [selectedRouter_ip, setselectedRouter_ip] = useState("");
  let [selectedInterface, setSelectedInterface] = useState("");
  let [selectedCommunity, setSelectedCommunity] = useState("");
  let [selectedHostname, setSelectedHostname] = useState("");
  const [activeKey, setActiveKey] = useState("");
  let [show, setShow] = useState(false);
  let [dataSource, setDataSource] = useState(excelData);
  let [resetData, setResetData] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [searchedColumn, setSearchedColumn] = useState(null);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [savetoDefaultloading, setSavetoDefaultloading] = useState(false);
  const [graphLoading, setGraphLoading] = useState(false);
  const [applyloading, setApplyloading] = useState(false);
  const [modifiedCheckboxes, setModifiedCheckboxes] = useState({});
  const [checkboxSource, setCheckboxSource] = useState(""); // Add this state variable
  const [selectedId, setselectedId] = useState(""); // Add this state variable
  const [changedSwitches, setChangedSwitches] = useState({});
  const [graphData, setGraphData] = useState({});
  const [option, setOptions] = useState({});
  const [netflowGraphData, setNetflowGraphData] = useState({});
  const [snmpgraphData, setSnmpGraphData] = useState({});
  const [graphOption, setGraphOption] = useState({});
  const [snmpGraphOption, setSnmpGraphOption] = useState({});
  const [netflowGraphOption, setNetflowGraphOption] = useState({});
  const [highlightedRow, setHighlightedRow] = useState(null);

  //   const data = {
  // "2023-07-16 09:00": 0.08,
  // "2023-07-16 10:00": 0.08,
  // "2023-07-16 11:00": 0.03,
  // "2023-07-16 12:00": 0.05,
  // "2023-07-16 13:00": 2.46,
  // "2023-07-16 14:00": 0.11,
  // "2023-07-16 15:00": 0.05,
  // "2023-07-16 16:00": 0.55,
  // "2023-07-16 17:00": 0.04,
  // "2023-07-16 18:00": 0.1,
  // "2023-07-16 19:00": 0.28,
  // "2023-07-16 20:00": 0.01,
  // "2023-07-16 21:00": 0.03,
  // "2023-07-16 22:00": 0.29,
  // "2023-07-16 23:00": 0.02,
  // "2023-07-17 00:00": 0.1,
  // "2023-07-17 01:00": 0.18,
  // "2023-07-17 02:00": 0.05,
  // "2023-07-17 03:00": 0.06,
  // "2023-07-17 04:00": 29.22,
  // "2023-07-17 05:00": 0.4,
  // "2023-07-17 06:00": 0.12,
  // "2023-07-17 07:00": 0.03,
  // "2023-07-17 08:00": 0,
  // "2023-07-17 08:29": 0
  // }
  //   const xAxisData = Object.keys(data);
  //   const seriesData = Object.values(data);

  //   const option={
  //     xAxis: {
  //       type: "category",
  //       data: xAxisData,
  //     },
  //     yAxis: {
  //       type: "value",
  //     },
  //     series: [
  //       {
  //         type: "line",
  //         data: seriesData,
  //       },
  //     ],
  //   };
  //    useEffect(() => {
  //   }, [graphData, netflowGraphData, snmpgraphData])

  const items = [
    {
      key: "netflow",
      label: `Netflow`,
      // children: `Content of Tab Pane 1`,
    },
    {
      key: "snmp",
      label: `Snmp`,
      // children: `Content of Tab Pane 2`,
    },
    {
      key: "currentstatus",
      label: `Netflow Community`,

      disabled: !selectedCommunity,
      // children: `Content of Tab Pane 3`,
    },
  ];
  const onChange = (key) => {
    console.log(key);
    setActiveKey(key);
  };
  const fetchGraphData = async () => {
    const data2 = {
      router_ip: selectedRouter_ip,
      community: selectedCommunity,
      interface: selectedInterface,
    };
    setGraphLoading(true);
    try {
      const response = await axios.post(
        baseUrl + `/analytics/community/netflow`,
        data2
      );
      // Assuming the response contains the data for the graph
      setGraphData(response.data);
      setGraphLoading(false);
    } catch (error) {
      console.error("Error fetching graph data:", error);
      setGraphLoading(false);
    }
  };
  const NetflowGraphData = async () => {
    const data = {
      router_ip: selectedRouter_ip,
      interface: selectedInterface,
      community: selectedCommunity,
    };
    setGraphLoading(true);
    const data2 = {
      router_ip: selectedRouter_ip,
      interface: selectedInterface,
    };

    try {
      if (selectedCommunity === "") {
        const response = await axios.post(
          baseUrl + `/analytics/hostname/netflow`,
          data2
        );
        // Assuming the response contains the data for the graph
        setGraphData(response.data);
        setGraphLoading(false);
      }
      // else {
      //   const response = await axios.post(
      //     baseUrl + `/analytics/community/netflow`,
      //     data
      //   );
      //   // Assuming the response contains the data for the graph
      //   setGraphData(response.data);
      // }
    } catch (error) {
      console.error("Error fetching graph data:", error);
      setGraphLoading(false);
    }
  };
  const SnmpGraphData = async () => {
    const data2 = {
      router_ip: selectedRouter_ip,
      interface: selectedInterface,
    };
    setGraphLoading(true);

    try {
      const response = await axios.post(
        baseUrl + `/analytics/hostname/snmp`,
        data2
      );
      setGraphData(response.data);
      setGraphLoading(false);
    } catch (error) {
      console.error("Error fetching graph data:", error);
      setGraphLoading(false);
    }
  };

  useEffect(() => {
    const xAxisData = Object.keys(graphData);
    const seriesData = Object.values(graphData);

    const option_new = {
      color: ["#009BDB"],
      xAxis: {
        type: "category",
        data: xAxisData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          type: "line",
          data: seriesData,
        },
      ],
    };
    setOptions(option_new);
  }, [graphData]);

  useEffect(() => {
    if (activeKey === "netflow") {
      NetflowGraphData();
    } else if (activeKey === "snmp") {
      SnmpGraphData();
    } else if (activeKey === "currentstatus") {
      fetchGraphData();
    }
  }, [activeKey, selectedRecordId]);
  useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);
  const openSweetAlert = (title, type, errors) => {
    console.log("Error-------->", errors);

    Swal.fire({
      title,
      type,
      allowOutsideClick: false,
    });
  };
  const columns = [
    {
      title: "Host Name",
      dataIndex: "host_name",
      key: "host_name",
      render: (text, record) => (
        <div
          className={selectedRecordId === record.id ? "highlighted-name" : ""}
          onClick={() =>
            handleNameClick(record.id, record.router_ip, record.interface, text)
          }
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            padding: "3px",
            backgroundColor:
              selectedRecordId === record.id ? "" : "transparent",
            textDecoration: "underline",
          }}
        >
          <span>{text}</span>
        </div>
      ),

      ellipsis: true,
    },
    {
      title: "Router IP",
      dataIndex: "router_ip",
      key: "router_ip",
      render: (text, record) => <span>{text}</span>,

      ellipsis: true,
    },
    {
      title: "Interface",
      dataIndex: "interface",
      key: "interface",
      render: (text, record) => <span>{text}</span>,

      ellipsis: true,
    },
    {
      title: "Interface Type",
      dataIndex: "type",
      key: "type",
      render: (text, record) => <span>{text}</span>,
      ellipsis: true,
    },
    {
      title: "Community Set",
      dataIndex: "community_set",
      key: "community_set",
      width: 300,
      render: (text, record) => <span>{text}</span>,

      ellipsis: true,
    },
    {
      title: "SNMP Load",
      dataIndex: "snmp_load",
      key: "snmp_load",
      render: (text, record) => <span>{text}</span>,

      ellipsis: true,
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(baseUrl + "/manipulation");
        setDataSource(res.data);
        setResetData(res.data);
        setRowCount(res.data.length);
      } catch (err) {
        console.log("Error:", err.response);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //   =========================== otpimise code
  useEffect(() => {
    if (selectedRecordDetails) {
      const selectedData = dataSource.find((data) => data.id === selectedId.id);
      if (selectedData) {
        setSelectedRecordDetails(selectedData.details);
        setselectedId(selectedData);
      }
    }
  }, [dataSource]);

  const detailsColumns = [
    {
      title: "Community",
      dataIndex: "community",
      key: "community",

      render: (text, record) => (
        <span
          onClick={() => showGraph(text)}
          className={highlightedRow === text ? "highlighted-community" : ""}
          //     style={{
          //       textDecoration: "underline",
          //       cursor: "pointer",highlighted-community
          //       fontWeight: highlightedRow === text ? "bold" : "normal",
          //       backgroundColor: highlightedRow === text ? "#0f0" : "transparent",
          //     }}
        >
          {text}
        </span>
      ),

      ellipsis: true,
    },
    {
      title: "Community Name",
      dataIndex: "community_name",
      key: "community_name",
      width: 250,
      render: (text, record) => (
        <span style={{ textDecoration: "underline", cursor: "pointer" }}>
          {text}
        </span>
      ),

      ellipsis: true,
    },
    {
      title: "Netflow",
      dataIndex: "netflow",
      key: "netflow",
      render: (text, record) => <span>{text}</span>,

      ellipsis: true,
    },
    {
      title: "BGP",
      dataIndex: "bgp",
      key: "bgp",
      render: (text, record) => <span>{text}</span>,

      ellipsis: true,
    },
    {
      title: "Current Status",
      dataIndex: "current_status",
      key: "current_status",
      render: (text, record) => <span>{text}</span>,

      ellipsis: true,
    },
    {
      title: "Default Status",
      dataIndex: "default_status",
      key: "default_status",
      render: (text, record) => <span>{text}</span>,

      ellipsis: true,
    },
    {
      title: "Suggested Status",
      dataIndex: "suggested_status",
      key: "suggested_status",
      render: (text, record) => <span>{text}</span>,

      ellipsis: true,
    },
    {
      title: "Checkbox",
      dataIndex: "switch",
      key: "switch",
      render: (text, detail) => {
        console.log("123   ", text);
        return (
          <Switch
            //     onClick={() => console.log(detail)}
            checked={detail.switch === 1 ? true : false}
            onChange={(checked) => handleCheckboxChange(checked, detail.id)}
          />
        );
      },
    },
  ];
  const showGraph = (communityName) => {
    setActiveKey("currentstatus");
    setHighlightedRow(communityName);

    setSelectedCommunity(communityName);
    fetchGraphData();
  };
  //   const handleNameClick = (recordId, routerIp, interfaceName, hostname) => {
  //     setShow(true);
  //     setActiveKey("");
  //     setSelectedHostname(hostname);
  //     setHighlightedRow(null);

  //     if (activeKey === "") {
  //       setActiveKey("netflow");
  //     }
  //     setSelectedInterface(interfaceName);
  //     setselectedRouter_ip(routerIp);

  //     setSelectedCommunity("");
  //     const selectedRecord = dataSource.find((record) => record.id === recordId);
  //     setSelectedRecordId(recordId);
  //     setselectedId(selectedRecord);
  //     setSelectedRecordDetails(selectedRecord.details);
  //     setDrawerVisible(true);
  //     //     fetchGraphData();
  //     console.log(selectedInterface);
  //     console.log(selectedRouter_ip);
  //   };

  const handleNameClick = (recordId, routerIp, interfaceName, hostname) => {
    setShow(true);
    setSelectedCommunity("");

    //     setActiveKey((prevActiveKey) =>
    //       prevActiveKey === "" ? "netflow" : prevActiveKey
    //     );
    if (selectedCommunity === "") {
      setActiveKey("netflow");
    } else {
      setActiveKey("currentstatus");
    }
    setSelectedHostname(hostname);
    setHighlightedRow(null);
    setSelectedInterface(interfaceName);
    setselectedRouter_ip(routerIp);

    const selectedRecord = dataSource.find((record) => record.id === recordId);
    setSelectedRecordId(recordId);
    setselectedId(selectedRecord);
    setSelectedRecordDetails(selectedRecord.details);
    setDrawerVisible(true);
    console.log(selectedInterface);
    console.log(selectedRouter_ip);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setGraphData({});
    setGraphOption({});
    setShow(false);
    setSelectedHostname("");
    setSelectedInterface("");
    setselectedRouter_ip("");
    setSelectedCommunity("");
    setSelectedRecordId(null);
    setSelectedRecordDetails([]);
  };
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = (community) => {
    setModalVisible(true);
    const data = {
      interface: interfaceData,
      router_ip,
      snmp_index,
      community,
    };
    console.log(data);
    console.log(community);
    setGraphData(data);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleCheckboxChange = (checked, record) => {
    if (checkboxSource === "default_status") {
      console.log("----------------");
      setModifiedCheckboxes((prevState) => ({
        ...prevState,
        [record.switch]: checked ? 1 : 0,
      }));
    } else {
      console.log(dataSource);
      console.log(selectedId.id);

      const updatedDataSource = dataSource.map((data) => {
        if (data.id === selectedId.id) {
          console.log(data);
          return {
            ...data,
            details: data.details.map((detail) => {
              if (detail.id === record) {
                console.log(detail);
                return {
                  ...detail,
                  switch: checked ? 1 : 0,
                };
              }
              return detail;
            }),
          };
        }
        return data;
      });
      console.log(updatedDataSource);
      setDataSource(updatedDataSource);
    }

    setChangedSwitches((prevState) => ({
      ...prevState,
      [record.switch]: checked ? 1 : 0,
    }));
  };

  const copyDefaultColumns = () => {
    const updatedData = dataSource.map((item) => {
      const updatedDetails = item.details.map((detail) => ({
        ...detail,
        switch: detail.default_status,
      }));

      return {
        ...item,
        details: updatedDetails,
      };
    });
    console.log(updatedData);
    setDataSource(updatedData);
  };
  const copySuggestedColumns = () => {
    const updatedData = dataSource.map((item) => {
      const updatedDetails = item.details.map((detail) => ({
        ...detail,
        switch: detail.suggested_status,
      }));

      return {
        ...item,
        details: updatedDetails,
      };
    });
    console.log(updatedData);
    setDataSource(updatedData);
  };
  const saveToDefaut = async () => {
    setSavetoDefaultloading(true);

    try {
      (async () => {
        axios.post(baseUrl + "/manipulator/save", selectedId).then((res) => {
          const updatedResetData = resetData.map((item) => {
            if (item.id === selectedId.id) {
              const updatedResetDetails = item.details.map((detail) => ({
                ...detail,
                default_status: detail.current_status,
              }));

              return {
                ...item,
                details: updatedResetDetails,
              };
            } else {
              return item;
            }
          });
          setResetData(updatedResetData);

          const updatedData = dataSource.map((item) => {
            if (item.id === selectedId.id) {
              const updatedDetails = item.details.map((detail) => ({
                ...detail,
                default_status: detail.current_status,
              }));

              return {
                ...item,
                details: updatedDetails,
              };
            } else {
              return item;
            }
          });
          console.log(updatedData);
          setDataSource(updatedData);
          setSavetoDefaultloading(false);
        });
      })();
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleReset = () => {
    setModifiedCheckboxes({});
    setDataSource(resetData);
    setChangedSwitches({});
  };
  const applyChanges = () => {
    setApplyloading(true);
    try {
      (async () => {
        axios.post(baseUrl + "/manipulator/apply", selectedId).then((res) => {
          const updatedData = dataSource.map((item) => {
            const updatedDetails = item.details.map((detail) => ({
              ...detail,
              current_status: detail.switch,
            }));

            return {
              ...item,
              details: updatedDetails,
            };
          });
          console.log(updatedData);
          setDataSource(updatedData);
          setResetData(updatedData);
          setApplyloading(false);
          openSweetAlert("Configration Sent to Device", "info");
        });
      })();
    } catch (err) {
      console.log(err.response);
    }
  };
  const containerStyle = {
    position: "relative",
    height: 650,
    padding: 20,
    //     overflow: "hidden",
    textAlign: "center",
    overflowY: "auto",
  };
  return (
    <MainDivwithoutSidebar>
      <style>
        {`
        .highlighted-name {
         background-color: #009BDB;
  color: white;
  font-weight: bold;
    transform: scale(1.52);
  transition: transform 0.3s ease-in-out;
  margin-left:18%;
        }
        .highlighted-community {
         background-color: #009BDB;
  color: white;
  font-weight: bold;
    transform: scale(1.82);
  transition: transform 0.3s ease-in-out;
        }
      `}
      </style>
      <Spin spinning={loading}>
        <Spin spinning={applyloading}>
          <Spin spinning={savetoDefaultloading}>
            <div style={containerStyle}>
              <h2
                style={{
                  textAlign: "left",
                  margin: "20px 0px",
                  marginTop: "30px",
                }}
              >
                Traffic Maniplation
              </h2>
              <div>
                <TableStyle
                  dataSource={dataSource}
                  columns={columns}
                  rowKey="id"
                />
              </div>
              <Drawer
                style={{ marginTop: "0px" }}
                placement="right"
                width="80%"
                //   closable={false}
                onClose={closeDrawer}
                open={drawerVisible}
                getContainer={false}
                mask={false}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "4px",
                    marginTop: "-4px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h2>{interfaceData}</h2>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      style={{ marginRight: "5px" }}
                      onClick={handleReset}
                      danger
                    >
                      <ReloadOutlined /> Reset to Current
                    </Button>
                    <Button
                      type="primary"
                      style={{ marginRight: "5px" }}
                      onClick={copyDefaultColumns}
                    >
                      <CopyOutlined /> Copy Default
                    </Button>
                    <Button
                      style={{
                        marginRight: "5px",
                        backgroundColor: "#7FBE42",
                        color: "white",
                      }}
                      onClick={saveToDefaut}
                    >
                      <SaveOutlined /> Save to Default
                    </Button>
                    <Button
                      type="primary"
                      style={{ marginRight: "5px" }}
                      onClick={copySuggestedColumns}
                    >
                      <CopyOutlined /> Copy Suggested
                    </Button>
                    <Button
                      onClick={applyChanges}
                      style={{
                        marginRight: "5px",
                        backgroundColor: "#6ab127",
                        color: "white",
                      }}
                    >
                      Apply <EnterOutlined />
                    </Button>
                  </div>
                </div>
                <div className="drawer-content">
                  <TableStyle
                    dataSource={selectedRecordDetails}
                    columns={detailsColumns}
                    rowKey="id"
                    scroll={{
                      y: 500,
                    }}
                    pagination={false}
                  />
                </div>
              </Drawer>
            </div>
          </Spin>
        </Spin>
      </Spin>
      {show ? (
        <Spin spinning={graphLoading}>
          <div style={{ display: "flex", marginTop: "12px" }}>
            {/* <Tabs
            defaultActiveKey={activeKey}
            tabPosition="left"
            style={{ height: 220 }}
            items={[
              {
                label: "Netflow",
                key: "netflow",
                disabled: false,
                children: (
                  <>
                    <ReactEcharts
                      option={netflowGraphOption}
                      style={{ height: "400px" }}
                    />
                  </>
                ),
              },
              {
                label: "SNMP",
                key: "snmp",
                disabled: false,
                children: (
                  <>
                    <ReactEcharts
                      option={snmpGraphOption}
                      style={{ height: "400px" }}
                    />
                  </>
                ),
              },
              {
                label: "Current Status",
                key: "currentstatus",
                disabled: false,
                children: (
                  <>
                    <ReactEcharts
                      option={graphOption}
                      style={{ height: "400px" }}
                    />
                  </>
                ),
              },
            ]}
            onTabChange={setActiveKey}
          /> */}
            <Tabs
              defaultActiveKey={activeKey}
              tabPosition="left"
              style={{ height: 220 }}
              items={items}
              onChange={onChange}
            />
            <div style={{ width: "100%", height: "500px" }}>
              <h2 style={{ textAlign: "center" }}>
                {selectedHostname} {selectedInterface} {selectedCommunity}
              </h2>
              <ReactEcharts option={option} style={{ height: "400px" }} />
            </div>
          </div>
        </Spin>
      ) : (
        <></>
      )}
    </MainDivwithoutSidebar>
  );
};

export default AntdTableExample;

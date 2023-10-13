import { Drawer, Spin, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import {
  MainDivwithoutSidebar,
  TableStyle,
} from "../../../Components/GlobalStyles/main.styled.js";
import axios, { baseUrl } from "../../../utils/axios";

let excelData = [];

const Modified = () => {
  let [dataSource, setDataSource] = useState(excelData);
  let [loading, setLoading] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [selectedRecordDetails, setSelectedRecordDetails] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [secondDrawerVisible, setSecondDrawerVisible] = useState(false);
  const [selectedHost, setSelectedHost] = useState(null); // State for the selected
  const [selectedAge, setSelectedAge] = useState(null); // State for the selected
  const [detailsFilters, setDetailsFilters] = useState({
    interfaces: [],
    utilization: [],
  });
  const [thirdTableFilters, setThirdTableFilters] = useState({
    link_type: [],
    location: [],
  });
  const [selectedTab, setSelectedTab] = useState("");
  const [selected, setSelected] = useState("transit");

  const onChange = (key) => {
    console.log(key);
    setSelectedTab(key);
    setSelected(key);
  };
  const items = [
    {
      key: "transit",
      label: `Transit`,
      // children: `Content of Tab Pane 1`,
    },
    {
      key: "peering",
      label: `Peering`,
      // children: `Content of Tab Pane 2`,
    },
    {
      key: "backhaul",
      label: `Backhaul`,
      // children: `Content of Tab Pane 3`,
    },
  ];
  useEffect(() => {
    const serviceCalls = async () => {
      setLoading(true);
      try {
        const res = await axios.get(baseUrl + "/utilization");
        excelData = res.data;
        setDataSource(excelData);
        setRowCount(excelData.length);
        setLoading(false);
        console.log(res.data);
      } catch (err) {
        console.log(err.response);
        setLoading(false);
      }
    };
    serviceCalls();
  }, []);

  // data format
  const data = [
    {
      id: 1,
      hostname: "John",
      utilization: "Doe",
      interfaces: [
        { id: 5, interfaces: "interface 1", utilization: "10 GB" },
        { id: 6, interfaces: "interface 2", utilization: "10 GB" },
        { id: 8, interfaces: "interface 3", utilization: "10 GB" },
      ],
      transit: [
        {
          id: 9,
          interfaces: "interface 1",
          region: "Region 1",
          provider: "Provider 1",
          circuit_id: "12345",
          submarine: "Submarine 1",
          location: "Location 1",
          current_utilization: "50%",
          interface_bw: "100 Mbps",
          current_status: "Active",
          congestion: "Low",
        },
      ],
      peering: [
        {
          id: 10,
          name: "Interface 1",
          location: "New York",
          current_status: "up",
          current_utilization: "25",
          cable: "25",
          congestion: "Low",
          interfaces: "interface 1",
        },
        {
          id: 11,
          name: "Interface 2",
          location: "London",
          current_status: "up",
          current_utilization: "30",
          cable: "30",
          congestion: "Medium",
          interfaces: "interface 1",
        },
        // Add more details here if needed
      ],
      backhaul: [
        {
          id: 12,
          interfaces: "interface 1",
          cable: "Cable 1",
          congestion: "Low",
          current_status: "up",
          local_region: "Region 1",
          location: "Location 1",
          remote_pop: "POP 1",
          utilization: "25",
          name: "Interface 2",
        },
        {
          id: 13,
          cable: "Cable 2",
          congestion: "Medium",
          current_status: "up",
          local_region: "Region 2",
          location: "Location 2",
          remote_pop: "POP 2",
          utilization: "30",
          name: "Interface 2",
          interfaces: "interface 2",
        },
        // Add more details here if needed
      ],
    },
    // Add more data here if needed
  ];

  // transit columns
  const columns = [
    {
      title: "hostname",
      dataIndex: "hostname",
      key: "hostname",
      render: (text, record) => (
        <div
          className={selectedRecordId === record.id ? "highlighted-name" : ""}
          onClick={() => handleNameClick(record)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            padding: "3px",
            // backgroundColor:
            //   selectedRecordId === record.id ? "yellow" : "transparent",
          }}
        >
          <span>{text}</span>
        </div>
      ),

      ellipsis: true,
    },
    {
      title: "utilization",
      dataIndex: "utilization",
      key: "utilization",
      render: (text, record) => <span>{text}</span>,

      ellipsis: true,
    },
  ];
  const transitColumns = [
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      render: (text, record) => (
        <div
          className={selectedRecordId === record.id ? "highlighted-name" : ""}
          onClick={() => handleNameClick(record.id)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            padding: "3px",
            // backgroundColor:
            //   selectedRecordId === record.id ? "yellow" : "transparent",
          }}
        >
          <span>{text}</span>
        </div>
      ),

      ellipsis: true,
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ellipsis: true,
    },
    {
      title: "Circuit ID",
      dataIndex: "circuit_id",
      key: "circuit_id",
      render: (text, record) => <span>{text}</span>,

      ellipsis: true,
    },
    {
      title: "Submarine",
      dataIndex: "submarine",
      key: "submarine",
      render: (text, record) => <span>{text}</span>,

      ellipsis: true,
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
      render: (text, record) => <span>{text}</span>,

      ellipsis: true,
    },

    {
      title: "Current Utilization",
      dataIndex: "current_utilization",
      key: "current_utilization",

      ellipsis: true,
      render: (text, record) => <span>{text}</span>,
    },
    {
      title: "Interface BW",
      dataIndex: "interface_bw",
      key: "interface_bw",
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
      title: "Congestion",
      dataIndex: "congestion",
      key: "congestion",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ellipsis: true,
    },
  ];
  const interfacesColumns = [
    {
      title: "interfaces",
      dataIndex: "interfaces",
      key: "interfaces",
      render: (text, record) => (
        <div
          //     className={selectedAge === text ? "highlighted-age" : ""}
          //     onClick={() => handleAgeClick(text)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            padding: "3px",
          }}
        >
          <span>{text}</span>
        </div>
      ),

      ellipsis: true,
    },
    {
      title: "Utilization",
      dataIndex: "utilization",
      key: "utilization",
      render: (text, record) => <span>{text}</span>,

      ellipsis: true,
    },
  ];

  const peeringColumns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div
          className={selectedAge === text ? "highlighted-age" : ""}
          onClick={() => handleAgeClick(text)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            padding: "3px",
          }}
        >
          {text}
        </div>
      ),

      // ...getColumnSearchProps(
      //   "name",
      //   "Name",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "location",
      //   "Location",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },

    {
      title: "current_status",
      dataIndex: "current_status",
      key: "current_status",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "current_status",
      //   "Current Status",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },

    {
      title: "Current Utilization",
      dataIndex: "current_utilization",
      key: "current_utilization",

      // ...getColumnSearchProps(
      //   "current_utilization",
      //   "Current Utilization",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "cable",
      dataIndex: "cable",
      key: "cable",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
      // ...getColumnSearchProps(
      //   "cable",
      //   "Cable",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },

    {
      title: "congestion",
      dataIndex: "congestion",
      key: "congestion",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "congestion",
      //   "Congestion",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
  ];

  const backhaulColumns = [
    {
      title: "cable",
      dataIndex: "cable",
      key: "cable",
      render: (text, record) => <span>{text}</span>,

      // ...getColumnSearchProps(
      //   "cable",
      //   "Cable",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    {
      title: "congestion",
      dataIndex: "congestion",
      key: "congestion",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "congestion",
      //   "Congestion",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    {
      title: "current_status",
      dataIndex: "current_status",
      key: "current_status",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "current_status",
      //   "Current Status",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
    {
      title: "local_region",
      dataIndex: "local_region",
      key: "local_region",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "local_region",
      //   "Local Region",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },

    {
      title: "location",
      dataIndex: "location",
      key: "location",

      // ...getColumnSearchProps(
      //   "location",
      //   "Location",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "remote_pop",
      dataIndex: "remote_pop",
      key: "remote_pop",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
      // ...getColumnSearchProps(
      //   "remote_pop",
      //   "Remote Pop",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },

    {
      title: "utilization",
      dataIndex: "utilization",
      key: "utilization",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      // ...getColumnSearchProps(
      //   "utilization",
      //   "Utilization",
      //   setRowCount,
      //   setDataSource,
      //   excelData,
      //   columnFilters
      // ),
      ellipsis: true,
    },
  ];
  const handleNameClick = (record) => {
    const recordId = record.id;
    setSecondDrawerVisible(false);
    setSelectedAge(null);
    setSelectedRecordId(recordId);
    const selectedRecord = excelData.find((record) => record.id === recordId);
    setSelectedRecordDetails(selectedRecord.interfaces);
    setSelectedHost(record.hostname);
    setDrawerVisible(true);
  };
  const handleInterfaceClick = (recordId) => {
    setSecondDrawerVisible(true);
    setSelectedAge(null);
    setSelectedRecordId(recordId);
    const selectedRecord = excelData.find((record) => record.id === recordId);
    setSelectedRecordDetails(selectedRecord.transit);
    setDrawerVisible(true);
  };

  const handleAgeClick = (name) => {
    setSelectedAge(name);
    setSecondDrawerVisible(true);
    setSelectedTab(selected);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedRecordId(null);
    setSelectedRecordDetails([]);
  };

  const closeSecondDrawer = () => {
    setSecondDrawerVisible(false);
    setSelectedAge(null);
  };

  return (
    <MainDivwithoutSidebar>
      <style>
        {`
        .highlighted-name {
          background-color: #009BDB;
          color: white;
          font-weight:bold;
        }
        .highlighted-age {
          background-color: #009BDB;
          color: white;
          font-weight:bold;

        }
      `}
      </style>
      <Spin spinning={loading}>
        <h2>Utilization</h2>
        <div>
          <TableStyle
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
        </div>
        <Drawer
          style={{ marginTop: "52px" }}
          placement="right"
          width="80%"
          onClose={closeDrawer}
          visible={drawerVisible}
          getContainer={false}
          mask={false}
        >
          <div className="drawer-content">
            <TableStyle
              dataSource={selectedRecordDetails}
              columns={interfacesColumns}
            />
          </div>
        </Drawer>
        <Drawer
          style={{ marginTop: "52px" }}
          placement="right"
          width="60%"
          onClose={closeSecondDrawer}
          //   closable={false}
          visible={secondDrawerVisible}
          getContainer={false}
          mask={false}
        >
          {/* <div className="drawer-header">
          <button
            onClick={closeDrawer}
            style={{
              borderRadius: "50%",
              padding: "5px",
              border: "none",
              outline: "none",
              cursor: "pointer",
              marginLeft: "-20px",
              //   backgroundColor: "black",
              zIndex: 1000,
              fontSize: "20px",
              marginTop: "-25px",
            }}
          >
            X
          </button>
        </div> */}
          <Tabs
            defaultActiveKey={selectedTab}
            items={items}
            onChange={onChange}
          />
          {selectedTab ? (
            <div
              className="drawer-content"
              //   style={{ marginTop: "-15px" }}
            >
              {/* {selectedAge && (
              <Table
                dataSource={data
                  .flatMap((record) => record.selectedTab) // Flatten the peering from all records
                  .filter((record) => record.interfaces === selectedAge)} // Filter based on selected name
                columns={
                  selectedTab === "transit"
                    ? transitColumns
                    : null || selectedTab === "peering"
                    ? peeringColumns
                    : null || selectedTab === "backhaul"
                    ? backhaulColumns
                    : null
                }
              />
            )} */}
              {selectedAge && (
                <Table
                  dataSource={excelData
                    .flatMap((record) => record[selectedTab])
                    .filter((record) => record.interfaces === selectedAge)}
                  columns={
                    selectedTab === "transit"
                      ? transitColumns
                      : selectedTab === "peering"
                      ? peeringColumns
                      : selectedTab === "backhaul"
                      ? backhaulColumns
                      : null
                  }
                />
              )}
            </div>
          ) : null}
        </Drawer>
      </Spin>
    </MainDivwithoutSidebar>
  );
};

export default Modified;

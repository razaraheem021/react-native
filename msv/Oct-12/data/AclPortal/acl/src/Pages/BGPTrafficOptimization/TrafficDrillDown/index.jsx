import React, { useState, useEffect } from "react";
import { Tabs, Table, Drawer, Spin, Button, Dropdown, Menu, Input } from "antd";

import up from "./assests/up.svg";
import down from "./assests/down.svg";

import {
  MainDivwithoutSidebar,
  MainDivwithoutSidebarInfluxgraph,
  MainTableFailedDevices,
  MainTableFailedDevicesTitle,
  TableStyle,
} from "../../../Components/GlobalStyles/main.styled.js";
import { SelectOutlined, FilterOutlined } from "@ant-design/icons";
import axios, { baseUrl } from "../../../utils/axios";
import { saveAs } from "file-saver";
import Card from "../../../Components/Card";
const { Column } = Table;
import { Link } from "react-router-dom";
import queryString from "query-string";
import cardleft5 from "./assests/cardleft1.svg";
import cardright1 from "./assests/cardright1.svg";
import cardright2 from "./assests/cardright2.svg";
import cardright3 from "./assests/cardright3.svg";
import cardright4 from "./assests/cardright4.svg";
import cardright5 from "./assests/cardright5.svg";
import cardleft2 from "./assests/cardleft2.svg";
import cardleft3 from "./assests/cardleft3.svg";
import cardleft4 from "./assests/cardleft4.svg";
import "../../../index.css";
// const data = 'dsdv';

// // Convert the data into a query string
// const queryParams = queryString.stringify({ data });

let excelData1Tab1 = [];
let excelData2Tab1 = [];
let excelData3Tab1 = [];
let excelData1Tab2 = [];
let excelData2Tab2 = [];
let excelData3Tab2 = [];
let pageSizeTable1Tab1 = 0;
let pageSizeTable2Tab1 = 0;
let pageSizeTable3Tab1 = 0;
let pageSizeTable1Tab2 = 0;
let pageSizeTable2Tab2 = 0;
let pageSizeTable3Tab2 = 0;
let totalLowCongestion = 0;
let totalNormalCongestion = 0;
let totalHighCongestion = 0;
let totalLowCongestionForCommunity = 0;
let totalHighCongestionForCommunity = 0;

const Index = () => {
  const [firstDrawerVisible, setFirstDrawerVisible] = useState(false);
  const [secondDrawerVisible, setSecondDrawerVisible] = useState(false);
  const [firstDrawersecondTabVisible, setFirstDrawerSecondTabVisible] =
    useState(false);
  const [secondDrawersecondTabVisible, setSecondDrawersecondTabVisible] =
    useState(false);
  const [filteredDatatable2tab1, setFilteredDatatable2tab1] = useState([]);
  const [filteredDatatable2tab2, setFilteredDatatable2tab2] = useState([]);
  const [filteredDatatable3tab2, setFilteredDatatable3tab2] = useState([]);
  const [filteredDatatable3tab1, setFilteredDatatable3tab1] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [selectedRouterIp, setSelectedRouterIp] = useState("");
  const [selectedRouterIpForTab2, setSelectedRouterIpForTab2] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData2, setLoadingData2] = useState(false);

  const [cardClick, setCardClick] = useState(false);

  const [highConjestionCardClick, setHighConjestionCardClick] = useState(false);
  const [lowConjestionCardClick, setLowConjestionCardClick] = useState(false);
  const [normalConjestionCardClick, setNormalConjestionCardClick] =
    useState(false);

  const [
    highConjestionCardClickForCommunity,
    setHighConjestionCardClickForCommunity,
  ] = useState(false);
  const [
    lowConjestionCardClickForCommunity,
    setLowConjestionCardClickForCommunity,
  ] = useState(false);

  const [dataSourceTable1Tab1, setDataSourceTable1Tab1] = useState([]);
  const [dataSourceTable2Tab1, setDataSourceTable2Tab1] = useState([]);
  const [dataSourceTable3Tab1, setDataSourceTable3Tab1] = useState([]);
  const [dataSourceTable1Tab2, setDataSourceTable1Tab2] = useState([]);
  const [dataSourceTable2Tab2, setDataSourceTable2Tab2] = useState([]);
  const [dataSourceTable3Tab2, setDataSourceTable3Tab2] = useState([]);

  const [permDataSourceTable2Tab1, setPermDataSourceTable2Tab1] = useState([]);
  const [permDataSourceTable2Tab1DataSet, setPermDataSourceTable2Tab1DataSet] =
    useState([]);
  const [permDataSourceTable3Tab2DataSet, setPermDataSourceTable3Tab2DataSet] =
    useState([]);

  const [permDataSourceTable3Tab1, setPermDataSourceTable3Tab1] = useState([]);
  const [permDataSourceTable2Tab2, setPermDataSourceTable2Tab2] = useState([]);
  const [permDataSourceTable3Tab2, setPermDataSourceTable3Tab2] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDatatab2, setFilteredDatatab2] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [showAll, setShowAll] = useState(false);
  const pageSize = showAll ? 100000 : 10;

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  // Use a large number for pageSize when showing all rows
  // const handleFilterChange = (filters) => {
  //   setSelectedFilters(filters);
  //   setSearchText('');
  // };
  const [selectedFilters, setSelectedFilters] = useState([]);
  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  useEffect(() => {
    console.log("Test", dataSourceTable2Tab1);
  }, [dataSourceTable2Tab1]);

  useEffect(() => {
    const serviceCalls = async () => {
      // setLoading(true);

      try {
        const res = await axios.get(baseUrl + "/utilization/device");
        // excelData1Tab1 = res.data.first;
        setDataSourceTable1Tab1(res.data.first);
        pageSizeTable1Tab1 = res.data.first.length;

        //  if (data && data.first && Array.isArray(res.data.first)) {
        // res.data.first.forEach((item) => {
        //   totalLowCongestion += item.low_congestion;
        // });
        // res.data.first.forEach((item) => {
        //   totalNormalCongestion += item.normal_congestion;
        // });
        // res.data.first.forEach((item) => {
        //   totalHighCongestion += item.high_congestion;
        // });
        //  }

        // excelData2Tab1 = res.data.second;
        setPermDataSourceTable2Tab1(res.data.second);
        setPermDataSourceTable2Tab1DataSet(res.data.second);
        pageSizeTable2Tab1 = res.data.second.length;
        // excelData3Tab1 = ;
        setPermDataSourceTable3Tab1(res.data.third);
        pageSizeTable3Tab1 = res.data.third.length;
        setLoading(false);
        console.log(res.data.second);
      } catch (err) {
        console.log(err.response);
        setLoading(false);
      }
    };
    serviceCalls();
  }, []);
  const [highConj, setHighConj] = useState(0);
  const [lowConj, setLowConj] = useState(0);
  const [normalConj, setNormalConj] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(baseUrl + "/utilization/device");
      const { first } = res.data;

      let totalLowConj = 0;
      let totalNormalConj = 0;
      let totalHighConj = 0;

      first.forEach((item) => {
        totalLowConj += item.low_congestion;
        totalNormalConj += item.normal_congestion;
        totalHighConj += item.high_congestion;
      });

      setLowConj(totalLowConj);
      setNormalConj(totalNormalConj);
      setHighConj(totalHighConj);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const serviceCalls = async () => {
      // setLoadingData2(true);

      try {
        const res = await axios.get(baseUrl + "/utilization/community");
        // excelData1Tab2 = res.data.first;
        setDataSourceTable1Tab2(res.data.first);
        pageSizeTable1Tab2 = res.data.first.length;

        // excelData2Tab2 = res.data.second;
        setPermDataSourceTable2Tab2(res.data.second);
        // pageSizeTable2Tab2 = res.data.second.length;
        res.data.second.forEach((item) => {
          totalLowCongestionForCommunity += item.low_congestion;
        });
        res.data.second.forEach((item) => {
          totalHighCongestionForCommunity += item.high_congestion;
        });
        // excelData3Tab2 = res.data.third;
        setPermDataSourceTable3Tab2(res.data.third);
        // pageSizeTable3Tab2 = res.data.first.third;
        setPermDataSourceTable3Tab2DataSet(res.data.third);

        setLoadingData2(false);
        console.log(res.data.second);
      } catch (err) {
        console.log(err.response);
        setLoadingData2(false);
      }
    };
    serviceCalls();
  }, []);

  const showFirstDrawer = () => {
    setFirstDrawerVisible(true);
    setSelectedRowsecondcolumnsfirsttab(null);
  };

  const showSecondDrawer = () => {
    // setSelectedRowData(record);
    setSecondDrawerVisible(true);
    // setSelectedRow1(null)
  };

  const closeFirstDrawer = () => {
    setFirstDrawerVisible(false);
    setSelectedRow1(null);
  };

  const closeSecondDrawer = () => {
    setSecondDrawerVisible(false);
    setSelectedRowsecondcolumnsfirsttab(null);
  };
  const showFirstDrawerSecondTab = () => {
    setFirstDrawerSecondTabVisible(true);
  };

  const showSecondDrawerSecondTab = () => {
    setSecondDrawersecondTabVisible(true);
  };

  const closeFirstDrawerSecondTab = () => {
    setFirstDrawerSecondTabVisible(false);
    setSelectedRow(null);
  };

  const closeSecondDrawerSecondTab = () => {
    setSecondDrawersecondTabVisible(false);
    setSelectedRowsecondcolumnsSecondtab(null);
  };
  const filterSecondTableDatatab1 = (record) => {
    console.log(record);

    const filteredDataa = permDataSourceTable2Tab1.filter(
      (item) => item.prev_id === record.id
    );
    console.log(filteredDataa);
    pageSizeTable2Tab1 = filteredDataa.length;

    setDataSourceTable2Tab1(filteredDataa);
  };
  const filterSecondTableDatatab2 = (record) => {
    console.log(record);

    const filteredDataa = permDataSourceTable2Tab2.filter(
      (item) => item.prev_id === record.id
    );
    console.log(filteredDataa);
    pageSizeTable2Tab2 = filteredDataa.length;
    setDataSourceTable2Tab2(filteredDataa);
  };
  const filterThirdTableDatatab2 = (record) => {
    const filteredDataa = permDataSourceTable3Tab2.filter(
      (item) => item.prev_id === record.id
    );
    console.log(filteredDataa);
    pageSizeTable3Tab2 = filteredDataa.length;
    setDataSourceTable3Tab2(filteredDataa);
  };
  const filterthirdTableDatatab1 = (record) => {
    const filteredDataa = permDataSourceTable3Tab1.filter(
      (item) => item.prev_id === record.id
    );
    console.log(filteredDataa);
    pageSizeTable3Tab1 = filteredDataa.length;

    setDataSourceTable3Tab1(filteredDataa);
  };
  const onChange = (key) => {
    console.log(key);
    setSelectedRowsecondcolumnsSecondtab(null);
    setSelectedRow(null);
    setSelectedRow1(null);
    setSelectedRowsecondcolumnsfirsttab(null);

    setFirstDrawerVisible(false);
    setSecondDrawerVisible(false);
    setFirstDrawerSecondTabVisible(false);
    setSecondDrawersecondTabVisible(false);
  };
  const [selectedRow, setSelectedRow] = useState(null);
  const [
    selectedRowsecondcolumnsSecondtab,
    setSelectedRowsecondcolumnsSecondtab,
  ] = useState(null);
  const [selectedRow1, setSelectedRow1] = useState(null);
  const [
    selectedRowsecondcolumnsfirsttab,
    setSelectedRowsecondcolumnsfirsttab,
  ] = useState(null);

  const firstcolumnsfirsttab = [
    {
      title: "Host Name",
      dataIndex: "hostname",
      key: "hostname",
      render: (text, record) => (
        <span
          onClick={() => {
            setSelectedRow1(record.key);
            filterSecondTableDatatab1(record);
            showFirstDrawer();
            setSelectedRouterIp(record.router_ip);
          }}
          style={{
            zIndex: record.key === selectedRow1 ? 9999 : "auto",
            backgroundColor: record.key === selectedRow1 ? "#0688BE" : "",
            color: record.key === selectedRow1 ? "#fff" : "#000",
            padding: record.key === selectedRow1 ? "12px" : "0px",
            margin: record.key === selectedRow1 ? "-3%" : "0px",
            fontSize: record.key === selectedRow1 ? "20px" : "14px",
            fontWeight: record.key === selectedRow1 ? "bold" : "normal",
            transform: record.key === selectedRow1 ? "scale(1.2)" : "scale(1)", // Use string values for transform
          }}
          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Interface Down",
      dataIndex: "interface_down",
      key: "interface_down",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "High Congestion",
      dataIndex: "high_congestion",
      key: "high_congestion",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Normal Congestion",
      dataIndex: "normal_congestion",
      key: "normal_congestion",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Low Congestion",
      dataIndex: "low_congestion",
      key: "low_congestion",
      render: (text, record) => (
        <span
          onClick={() => {
            showSecondDrawer();
          }}
          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Router IP",
      dataIndex: "router_ip",
      key: "router_ip",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
  ];

  const thirdcolumnsfirsttab = [
    {
      title: "Community Name",
      dataIndex: "community_name",
      key: "community_name",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Community",
      dataIndex: "community",
      key: "community",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },

    {
      title: "Netflow",
      dataIndex: "netflow",
      key: "netflow",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
  ];

  const firstcolumnsSecondtab = [
    {
      title: "Community Name",
      dataIndex: "community_name",
      key: "community_name",
      render: (text, record) => (
        <span
          onClick={() => {
            showFirstDrawerSecondTab();
            setSelectedRow(record.key); // Set the selected row when the cell is clicked
          }}
          style={{
            backgroundColor: record.key === selectedRow ? "#0688BE" : "",
            color: record.key === selectedRow ? "#fff" : "#000",
            padding: record.key === selectedRow ? "12px" : "0px",
            margin: record.key === selectedRow ? "-3%" : "0px",
            fontSize: record.key === selectedRow ? "20px" : "14px",
            fontWeight: record.key === selectedRow ? "bold" : "normal",
            transform: record.key === selectedRow ? "scale(1.8)" : "scale(1)", // Use string values for transform
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      render: (text, record) => <span>{text}</span>,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            type="text"
            placeholder="Search region"
            value={selectedKeys[0]}
            // style={ { backgroundColor: "#0f0" } }
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90 }}
            >
              OK
            </Button>
            <Button
              onClick={() => clearFilters()}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </div>
        </div>
      ),
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.region.toLowerCase().includes(value.toLowerCase()),
      // onFilterDropdownVisibleChange: (visible) => {
      //   if (visible) {
      //     setSelectedFilters(selectedKeys);
      //   }
      // },

      // render: (text, record) => {
      //   const filters = selectedFilters;
      //   const activeFilters = filters.length > 0;

      //   return (
      //     <Dropdown
      //       overlay={
      //         <Menu>
      //           <Menu.Item>
      //             <input
      //               type="text"
      //               placeholder="Search region"
      //               value={searchText}
      //               // onChange={ (e) => setSearchText(e.target.value) }
      //               onChange={(values) => handleFilterChange(values)}
      //             />
      //           </Menu.Item>
      //         </Menu>
      //       }
      //       visible={activeFilters}
      //       trigger={["click"]}
      //       onVisibleChange={() => {}}
      //     >
      //       <div style={{ cursor: "pointer" }}>
      //         {text} {activeFilters ? <FilterOutlined /> : null}
      //       </div>
      //     </Dropdown>
      //   );
      // },
    },
    {
      title: "Community",
      dataIndex: "community",
      key: "community",
      render: (text, record) => (
        <span
        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },

    {
      title: "Netflow",
      dataIndex: "netflow",
      key: "netflow",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
  ];
  const secondcolumnsSecondtab = [
    {
      title: "Host Name",
      dataIndex: "hostname",
      key: "hostname",
      render: (text, record) => (
        <span
          onClick={() => {
            showSecondDrawerSecondTab();
            setSelectedRouterIpForTab2(record.router_ip);

            setSelectedRowsecondcolumnsSecondtab(record.key);
          }}
          style={{
            backgroundColor:
              record.key === selectedRowsecondcolumnsSecondtab ? "#0688BE" : "",
            color:
              record.key === selectedRowsecondcolumnsSecondtab
                ? "#fff"
                : "#000",
            padding:
              record.key === selectedRowsecondcolumnsSecondtab ? "12px" : "0px",
            margin:
              record.key === selectedRowsecondcolumnsSecondtab ? "-3%" : "0px",
            fontSize:
              record.key === selectedRowsecondcolumnsSecondtab
                ? "20px"
                : "14px",
            fontWeight:
              record.key === selectedRowsecondcolumnsSecondtab
                ? "bold"
                : "normal",
            transform:
              record.key === selectedRowsecondcolumnsSecondtab
                ? "scale(1.8)"
                : "scale(1)", // Use string values for transform
          }}
          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Netflow",
      dataIndex: "netflow",
      key: "netflow",
      render: (text, record) => <span>{text}</span>,
    },
    {
      title: "High Congestion",
      dataIndex: "high_congestion",
      key: "high_congestion",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },

    {
      title: "Interface Down",
      dataIndex: "interface_down",
      key: "interface_down",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },

    {
      title: "Low Congestion",
      dataIndex: "low_congestion",
      key: "low_congestion",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    // {
    //   title: 'ssh_status',
    //   dataIndex: 'ssh_status',
    //   key: 'ssh_status',
    //   render: (text, record) => (
    //     <span

    //     //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
    //     >
    //       { text }
    //     </span>
    //   ),
    // },
    {
      title: "Router IP",
      dataIndex: "router_ip",
      key: "router_ip",
      render: (text, record) => (
        <span
          onClick={() => {
            setSelectedRouterIpForTab2(record.router_ip);
          }}
          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
  ];
  const secondcolumnsfirsttab = [
    {
      title: "Interface",
      dataIndex: "interface",
      key: "interface",
      render: (text, record) => (
        <span
          onClick={() => {
            showSecondDrawer();
            setSelectedRowsecondcolumnsfirsttab(record.key);
          }}
          style={{
            backgroundColor:
              record.key === selectedRowsecondcolumnsfirsttab ? "#0688BE" : "",
            color:
              record.key === selectedRowsecondcolumnsfirsttab ? "#fff" : "#000",
            padding:
              record.key === selectedRowsecondcolumnsfirsttab ? "12px" : "0px",
            margin:
              record.key === selectedRowsecondcolumnsfirsttab ? "-3%" : "0px",
            fontSize:
              record.key === selectedRowsecondcolumnsfirsttab ? "20px" : "14px",
            fontWeight:
              record.key === selectedRowsecondcolumnsfirsttab
                ? "bold"
                : "normal",
            transform:
              record.key === selectedRowsecondcolumnsfirsttab
                ? "scale(1.8)"
                : "scale(1)", // Use string values for transform
          }}
          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Community Set",
      dataIndex: "community_set",
      key: "community_set",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Congestion",
      dataIndex: "congestion",
      key: "congestion",
      render: (text, record) => (
        <>
          {text === "High" && (
            <p
              style={{
                borderRadius: "8px",
                border: "1px solid #A30505",
                background: "#FFCFCF",
                padding: "3px",
                textAlign: "center",
                fontWeight: 500,
              }}
              onClick={() => {
                showSecondDrawer();
              }}
              //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
            >
              {text}
            </p>
          )}
          {text === "Normal" && (
            <p
              style={{
                borderRadius: "8px",
                border: "1px solid #CBC301",
                background: "#FFFBDB",
                padding: "3px",
                textAlign: "center",
                fontWeight: 500,
              }}
              onClick={() => {
                showSecondDrawer();
              }}
              //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
            >
              {text}
            </p>
          )}
          {text === "Low" && (
            <p
              style={{
                borderRadius: "8px",
                border: "1px solid #66B127",
                background: "#EFFFE1",
                padding: "3px",
                textAlign: "center",
                fontWeight: 500,
              }}
              onClick={() => {
                showSecondDrawer();
              }}
              //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
            >
              {text}
            </p>
          )}
        </>
      ),
    },
    {
      title: "Interface Type",
      dataIndex: "interface_type",
      key: "interface_type",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Netflow",
      dataIndex: "netflow",
      key: "netflow",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Snmp Load",
      dataIndex: "snmp_load",
      key: "snmp_load",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span>
          {text === "up" ? (
            <div style={{ display: "flex", gap: 3 }}>
              <img src={up} alt="" /> {text}
            </div>
          ) : (
            <div style={{ display: "flex", gap: 3 }}>
              <img src={down} alt="" /> {text}
            </div>
          )}
        </span>
      ),
    },
    {
      title: "Manage",
      dataIndex: "",
      key: "",
      render: (text, record) => (
        <span
          onClick={() => {
            // showSecondDrawer()
            const data = record.community_set;
            const data2 = record.interface;
            const data3 = selectedRouterIp;

            // Convert the data into a query string
            const queryParams = queryString.stringify({ data });

            console.log(data, data2, data3);
            window.open(
              `/bgp-traffic-optimization/traffic-manipulation?${queryParams}-,-${data2}-,-${data3}`,
              "_blank",
              "noopener noreferrer"
            );
          }}
          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          <SelectOutlined />
        </span>
      ),
    },
  ];
  const thirdcolumnsSecondtab = [
    {
      title: "Interface",
      dataIndex: "interface",
      key: "interface",
      render: (text, record) => (
        <span
          onClick={() => {
            showSecondDrawer();
          }}
          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Community Set",
      dataIndex: "community_set",
      key: "community_set",
      render: (text, record) => (
        <span
        // onClick={ () => {
        //   showFirstDrawer()
        // }
        // }
        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Congestion",
      dataIndex: "congestion",
      key: "congestion",
      render: (text, record) => (
        <span

        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },

    {
      title: "Interface Type",
      dataIndex: "interface_type",
      key: "interface_type",
      render: (text, record) => (
        <span
          onClick={() => {
            showSecondDrawer();
          }}
          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Netflow",
      dataIndex: "netflow",
      key: "netflow",
      render: (text, record) => (
        <span
          onClick={() => {
            showSecondDrawer();
          }}
          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Snmp Load",
      dataIndex: "snmp_load",
      key: "snmp_load",
      render: (text, record) => (
        <span
          onClick={() => {
            showSecondDrawer();
          }}
          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span
          onClick={() => {
            showSecondDrawer();
          }}
          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Manage",
      dataIndex: "",
      key: "",

      render: (text, record) => (
        <span
          onClick={() => {
            // showSecondDrawer()
            const data = record.community_set;
            const data2 = record.interface;
            const data3 = selectedRouterIpForTab2;

            // Convert the data into a query string
            const queryParams = queryString.stringify({ data });

            console.log(data, data2, data3);
            window.open(
              `/bgp-traffic-optimization/traffic-manipulation?${queryParams}-,-${data2}-,-${data3}`,
              "_blank",
              "noopener noreferrer"
            );
          }}
          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          <SelectOutlined />
        </span>
      ),
    },
  ];
  const handleShowAllClick = () => {
    setShowAll(!showAll);
  };
  const items = [
    {
      key: "1",
      label: `Device Centric`,
      children: (
        <>
          <Table
            // rowClassName={rowClassName}
            pagination={{
              showSizeChanger: true, // To allow users to change pageSize from the table footer
              pageSizeOptions: ["10", `${pageSizeTable1Tab1}`],
            }}
            dataSource={dataSourceTable1Tab1}
            columns={firstcolumnsfirsttab}
          />
        </>
      ),
    },
    {
      key: "2",
      label: `Community Centric`,
      children: (
        <>
          <Table
            // rowClassName={rowClassName}
            pagination={{
              showSizeChanger: true, // To allow users to change pageSize from
              pageSizeOptions: ["10", `${pageSizeTable1Tab2}`],
            }}
            dataSource={dataSourceTable1Tab2}
            columns={firstcolumnsSecondtab}
            onRow={(record) => ({
              onClick: () => {
                filterSecondTableDatatab2(record);
              },
            })}
          />
          ;
        </>
      ),
    },
  ];

  const containerStyle = {
    position: "relative",
    height: "100%",
    padding: 20,
    overflow: "auto",
    textAlign: "center",
    overflowY: "auto",
  };

  const [tableName, setTableName] = useState("Device Centric");
  const showTable = (myDataTable) => {
    if (myDataTable === "Device Centric") {
      setTableName("Device Centric");
    } else if (myDataTable === "Community Centric") {
      setTableName("Community Centric");
    }
    // else if (myDataTable === "DCM") {
    //   setTableName("DCM");
    // } else if (myDataTable === "NCM") {
    //   setTableName("NCM");
    // }
  };
  const FilterHighCongestionDataOnClick = () => {
    setHighConjestionCardClick(!highConjestionCardClick);
    setLowConjestionCardClick(false);
    setNormalConjestionCardClick(false);
    // if (!highConjestionCardClick) {
    //   const filtered = dataSourceTable2Tab1.filter(
    //     (item) => item.high_congestion > 0
    //   );
    //   console.log("filtered item: " + filtered);

    //   setFilteredData(filtered);

    //   const filteredTable2Tab1 = permDataSourceTable2Tab1DataSet.filter(
    //     (item) => item.congestion == "High"
    //   );
    //   console.log(filteredTable2Tab1);

    //   setPermDataSourceTable2Tab1(filteredTable2Tab1);
    // } else {
    //   setPermDataSourceTable2Tab1(permDataSourceTable2Tab1DataSet);
    // }

    if (!highConjestionCardClick) {
      const filtered = dataSourceTable1Tab1.filter(
        (item) => item.high_congestion > 0
      );

      console.log("filtered item: " + filtered);
      setFilteredData(filtered);

      const filteredTable2Tab1 = permDataSourceTable2Tab1DataSet.filter(
        (item) => item.congestion == "High"
      );
      console.log(filteredTable2Tab1);

      setPermDataSourceTable2Tab1(filteredTable2Tab1);
    } else {
      setPermDataSourceTable2Tab1(permDataSourceTable2Tab1DataSet);
    }
  };
  const FilterHighCongestionDataForCommunityOnClick = () => {
    setHighConjestionCardClickForCommunity(
      !highConjestionCardClickForCommunity
    );
    setLowConjestionCardClickForCommunity(false);
    if (!highConjestionCardClickForCommunity) {
      const filtered = dataSourceTable2Tab2.filter(
        (item) => item.high_congestion > 0
      );
      console.log("filtered item: " + filtered);

      setFilteredDatatab2(filtered);

      const filteredTable3Tab2 = permDataSourceTable3Tab2DataSet.filter(
        (item) => item.congestion == "High"
      );
      console.log(filteredTable3Tab2);

      setPermDataSourceTable3Tab2(filteredTable3Tab2);
    } else {
      setPermDataSourceTable3Tab2(permDataSourceTable3Tab2DataSet);
    }
  };
  const FilterLowCongestionDataOnClick = () => {
    setLowConjestionCardClick(!lowConjestionCardClick);
    setHighConjestionCardClick(false);
    setNormalConjestionCardClick(false);
    if (!lowConjestionCardClick) {
      const filtered = dataSourceTable1Tab1.filter(
        (item) => item.low_congestion > 0
      );

      console.log("filtered item: " + filtered);
      setFilteredData(filtered);

      const filteredTable2Tab1 = permDataSourceTable2Tab1DataSet.filter(
        (item) => item.congestion == "Low"
      );
      console.log(filteredTable2Tab1);

      setPermDataSourceTable2Tab1(filteredTable2Tab1);
    } else {
      setPermDataSourceTable2Tab1(permDataSourceTable2Tab1DataSet);
    }
  };
  const FilterNormalCongestionDataOnClick = () => {
    setNormalConjestionCardClick(!normalConjestionCardClick);
    setHighConjestionCardClick(false);
    setLowConjestionCardClick(false);
    if (!normalConjestionCardClick) {
      const filtered = dataSourceTable1Tab1.filter(
        (item) => item.normal_congestion > 0
      );

      console.log("filtered item: " + filtered);
      setFilteredData(filtered);

      const filteredTable2Tab1 = permDataSourceTable2Tab1DataSet.filter(
        (item) => item.congestion == "Normal"
      );
      console.log(filteredTable2Tab1);

      setPermDataSourceTable2Tab1(filteredTable2Tab1);
    } else {
      setPermDataSourceTable2Tab1(permDataSourceTable2Tab1DataSet);
    }
  };
  const FilterLowCongestionDataForCommunityOnClick = () => {
    setLowConjestionCardClickForCommunity(!lowConjestionCardClickForCommunity);
    setHighConjestionCardClickForCommunity(false);
    if (!lowConjestionCardClickForCommunity) {
      const filtered = dataSourceTable2Tab2.filter(
        (item) => item.low_congestion > 0
      );

      console.log("filtered item: " + filtered);
      setFilteredDatatab2(filtered);

      const filteredTable3Tab2 = permDataSourceTable3Tab2DataSet.filter(
        (item) => item.congestion == "Low"
      );
      console.log(filteredTable3Tab2);

      setPermDataSourceTable3Tab2(filteredTable3Tab2);
    } else {
      setPermDataSourceTable3Tab2(permDataSourceTable3Tab2DataSet);
    }
  };

  const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "rowClassName1";
    } else {
      return "rowClassName2";
    }
  };

  return (
    <MainDivwithoutSidebar>
      <Spin spinning={loading}>
        <Spin spinning={loadingData2}>
          <div style={containerStyle}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex" }}>
                  {tableName === "Device Centric" ? (
                    <>
                      {/* <div>
                        <Card
                          customColor="#66B127"
                          content="34"
                          contentTitle="Total traffic"
                          customImgLeft={cardleft1}
                          customImgRight={cardright1}
                        />
                      </div>

                      <Card
                        customColor="#D33E34"
                        content="34"
                        contentTitle="Down links"
                        customImgLeft={cardleft2}
                        customImgRight={cardright2}
                      /> */}
                      <div
                        style={{
                          transform: highConjestionCardClick
                            ? "scale(1.08)"
                            : "scale(1)",
                        }}
                        onClick={FilterHighCongestionDataOnClick}
                      >
                        <Card
                          content={highConj}
                          contentTitle="High Utilization"
                          customImgLeft={cardleft3}
                          customImgRight={cardright3}
                          customColor="#F40000"
                          customBgColor={
                            "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                          }
                          contentTitleColor={cardClick ? "#F40000" : "#C1BCBC"}
                        />
                      </div>
                      <div
                        style={{
                          transform: normalConjestionCardClick
                            ? "scale(1.08)"
                            : "scale(1)",
                        }}
                        onClick={FilterNormalCongestionDataOnClick}
                      >
                        <Card
                          customColor="#F48400"
                          customBgColor={
                            "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                          }
                          content={normalConj}
                          contentTitle="Normal Utilization"
                          contentTitleColor={cardClick ? "#F48400" : "#C1BCBC"}
                          customImgLeft={cardleft4}
                          customImgRight={cardright4}
                        />
                      </div>
                      <div
                        style={{
                          transform: lowConjestionCardClick
                            ? "scale(1.08)"
                            : "scale(1)",
                        }}
                        onClick={FilterLowCongestionDataOnClick}
                      >
                        <Card
                          customColor="#66B127"
                          customBgColor={
                            "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                          }
                          content={lowConj}
                          contentTitle="Low Utilization"
                          contentTitleColor={cardClick ? "#66B127" : "#C1BCBC"}
                          customImgLeft={cardleft5}
                          customImgRight={cardright5}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* <div>
                        <Card
                          customColor="#66B127"
                          content="34"
                          contentTitle="Total traffic"
                          customImgLeft={cardleft1}
                          customImgRight={cardright1}
                        />
                      </div>

                      <Card
                        customColor="#D33E34"
                        content="34"
                        contentTitle="Down links"
                        customImgLeft={cardleft2}
                        customImgRight={cardright2}
                      /> */}
                      <div
                        onClick={FilterHighCongestionDataForCommunityOnClick}
                      >
                        <Card
                          content={totalHighCongestionForCommunity}
                          contentTitle="High congestion"
                          customImgLeft={cardleft3}
                          customImgRight={cardright3}
                          customColor="#F40000"
                          customBgColor={
                            highConjestionCardClickForCommunity
                              ? "#ddd"
                              : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                          }
                          contentTitleColor={cardClick ? "#F40000" : "#C1BCBC"}
                        />
                      </div>
                      <div onClick={FilterLowCongestionDataForCommunityOnClick}>
                        <Card
                          customColor="#F48400"
                          customBgColor={
                            lowConjestionCardClickForCommunity
                              ? "#ddd"
                              : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                          }
                          content={totalLowCongestionForCommunity}
                          contentTitle="Low congestion"
                          contentTitleColor={cardClick ? "#F48400" : "#C1BCBC"}
                          customImgLeft={cardleft4}
                          customImgRight={cardright4}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  height: "45px",
                  marginTop: "50px",
                }}
              >
                <MainTableFailedDevices
                  active={"Device Centric" === tableName}
                  onClick={() => showTable("Device Centric")}
                >
                  <div style={{ display: "flex" }}>
                    {/* <img src={ dcmN } alt="" style={ { marginLeft: "10px" } } /> */}
                    <MainTableFailedDevicesTitle
                      active={"Device Centric" === tableName}
                      style={{
                        width: "150px",

                        // paddingLeft: "20px",
                        // paddingTop: "10px",
                        // padding: "12px"
                      }}
                    >
                      Device Centric
                    </MainTableFailedDevicesTitle>
                  </div>
                </MainTableFailedDevices>

                <MainTableFailedDevices
                  active={"Community Centric" === tableName}
                  style={{ borderTopRightRadius: "8px" }}
                  onClick={() => showTable("Community Centric")}
                >
                  <div style={{ display: "flex" }}>
                    {/* <img src={ dcmN } alt="" style={ { marginLeft: "10px" } } /> */}
                    <MainTableFailedDevicesTitle
                      active={"Community Centric" === tableName}
                      style={{
                        width: "150px",
                        // paddingLeft: "20px",
                        // paddingTop: "10px",
                      }}
                    >
                      Community Centric
                    </MainTableFailedDevicesTitle>
                  </div>
                </MainTableFailedDevices>
              </div>
            </div>
            <br />

            {tableName === "Device Centric" ? (
              <div>
                <>
                  {lowConjestionCardClick === false &&
                  highConjestionCardClick === false &&
                  normalConjestionCardClick === false ? (
                    <Table
                      rowClassName={rowClassName}
                      pagination={{
                        showSizeChanger: true, // To allow users to change pageSize from the table footer
                        pageSizeOptions: ["10", `${pageSizeTable1Tab1}`],
                      }}
                      dataSource={dataSourceTable1Tab1}
                      columns={firstcolumnsfirsttab}
                      onRow={(record) => ({
                        onClick: () => {
                          filterSecondTableDatatab1(record);
                        },
                      })}
                    />
                  ) : (
                    <Table
                      rowClassName={rowClassName}
                      pagination={{
                        showSizeChanger: true, // To allow users to change pageSize from the table footer
                        pageSizeOptions: ["10", `${pageSizeTable1Tab1}`],
                      }}
                      dataSource={filteredData}
                      columns={firstcolumnsfirsttab}
                      onRow={(record) => ({
                        onClick: () => {
                          filterSecondTableDatatab1(record);
                        },
                      })}
                    />
                  )}
                </>
              </div>
            ) : null}
            {tableName === "Community Centric" ? (
              <div>
                <>
                  <Table
                    rowClassName={rowClassName}
                    pagination={{
                      showSizeChanger: true, // To allow users to change pageSize from
                      pageSizeOptions: ["10", `${pageSizeTable1Tab2}`],
                    }}
                    dataSource={dataSourceTable1Tab2}
                    columns={firstcolumnsSecondtab}
                    onRow={(record) => ({
                      onClick: () => {
                        filterSecondTableDatatab2(record);
                      },
                    })}
                  />
                  ;
                </>
              </div>
            ) : null}

            <Drawer
              title=""
              placement="right"
              onClose={closeFirstDrawer}
              open={firstDrawerVisible}
              width="80%"
              mask={false}
              closable={true}
              style={{ marginTop: "50px" }}
            >
              <Table
                rowClassName={rowClassName}
                pagination={{
                  showSizeChanger: true, // To allow users to change pageSize from the table footer
                  pageSizeOptions: ["10", `${pageSizeTable2Tab1}`],
                }}
                dataSource={dataSourceTable2Tab1}
                columns={secondcolumnsfirsttab}
                onRow={(record) => ({
                  onClick: () => {
                    filterthirdTableDatatab1(record);
                  },
                })}
              />
              ;
            </Drawer>
            <Drawer
              title=""
              placement="right"
              closable={true}
              style={{ marginTop: "50px" }}
              onClose={closeSecondDrawer}
              open={secondDrawerVisible}
              width="60%"
              mask={false}
            >
              <Table
                rowClassName={rowClassName}
                pagination={{
                  showSizeChanger: true, // To allow users to change pageSize from the table footer
                  pageSizeOptions: ["10", `${pageSizeTable3Tab1}`],
                }}
                dataSource={dataSourceTable3Tab1}
                columns={thirdcolumnsfirsttab}
              />
              ;
            </Drawer>
            <Drawer
              title=""
              placement="right"
              onClose={closeFirstDrawerSecondTab}
              open={firstDrawersecondTabVisible}
              width="80%"
              mask={false}
              closable={true}
              style={{ marginTop: "50px" }}
            >
              {lowConjestionCardClickForCommunity === false &&
              highConjestionCardClickForCommunity === false ? (
                <Table
                  rowClassName={rowClassName}
                  dataSource={dataSourceTable2Tab2}
                  columns={secondcolumnsSecondtab}
                  pagination={{
                    showSizeChanger: true, // To allow users to change pageSize from the table footer
                    pageSizeOptions: ["10", `${pageSizeTable2Tab2}`],
                  }}
                  onRow={(record) => ({
                    onClick: () => {
                      filterThirdTableDatatab2(record);
                    },
                  })}
                />
              ) : (
                <Table
                  rowClassName={rowClassName}
                  dataSource={filteredDatatab2}
                  columns={secondcolumnsSecondtab}
                  pagination={{
                    showSizeChanger: true, // To allow users to change pageSize from the table footer
                    pageSizeOptions: ["10", `${pageSizeTable2Tab2}`],
                  }}
                  onRow={(record) => ({
                    onClick: () => {
                      filterThirdTableDatatab2(record);
                    },
                  })}
                />
              )}
              ;
            </Drawer>
            <Drawer
              title=""
              placement="right"
              closable={true}
              style={{ marginTop: "50px" }}
              onClose={closeSecondDrawerSecondTab}
              open={secondDrawersecondTabVisible}
              width="60%"
              mask={false}
            >
              <Table
                rowClassName={rowClassName}
                pagination={{
                  showSizeChanger: true, // To allow users to change pageSize from the table footer
                  pageSizeOptions: ["10", `${pageSizeTable3Tab2}`],
                }}
                dataSource={dataSourceTable3Tab2}
                columns={thirdcolumnsSecondtab}
              />
              ;
            </Drawer>
          </div>
        </Spin>
      </Spin>
    </MainDivwithoutSidebar>
  );
};

export default Index;

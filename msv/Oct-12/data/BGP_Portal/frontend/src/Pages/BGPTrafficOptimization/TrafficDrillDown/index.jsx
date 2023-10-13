import React, { useEffect, useState } from "react";
import { Button, Drawer, Input, Spin, Table } from "antd";

import up from "./assests/up.svg";
import down from "./assests/down.svg";
import central from "./assests/region_central.svg";
import eastren from "./assests/region_eastren.svg";
import westren from "./assests/region_westren.svg";

import {
  MainDivwithoutSidebar,
  MainTableFailedDevices,
  MainTableFailedDevicesTitle,
} from "../../../Components/GlobalStyles/main.styled.js";
import { FilterOutlined, SelectOutlined } from "@ant-design/icons";
import axios, { baseUrl } from "../../../utils/axios";
import Card from "../../../Components/Card";
import DeviceCentricCard from "../../../Components/DeviceCentricCard";
import queryString from "query-string";
import cardleft5 from "./assests/cardleft1.svg";
import cardright3 from "./assests/cardright3.svg";
import cardright4 from "./assests/cardright4.svg";
import cardright5 from "./assests/cardright5.svg";
import cardleft3 from "./assests/cardleft3.svg";
import cardleft4 from "./assests/cardleft4.svg";
import { TableStyle } from "../../../Components/GlobalStyles/main.styled.js";
import "../../../index.css";

const { Column } = Table;
// const data = 'dsdv';

// // Convert the data into a query string
// const queryParams = queryString.stringify({ data });

let pageSizeTable1Tab1 = 0;
let pageSizeTable2Tab1 = 0;
let pageSizeTable3Tab1 = 0;
let pageSizeTable1Tab2 = 0;
let pageSizeTable2Tab2 = 0;
let pageSizeTable3Tab2 = 0;
let totalLowCongestion = 0;
let totalNormalCongestion = 0;
let totalHighCongestion = 0;
let totalDownLinks = 0;
let totalUpLinks = 0;
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
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [hostnameTab1, setHostnameTab1] = useState("");
  const [hostnameTab2, setHostnameTab2] = useState("");
  const [selectedRouterIpForTab2, setSelectedRouterIpForTab2] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData2, setLoadingData2] = useState(false);

  const [cardClick, setCardClick] = useState(false);

  const [highConjestionCardClick, setHighConjestionCardClick] = useState(false);
  const [lowConjestionCardClick, setLowConjestionCardClick] = useState(false);
  const [downStatusClick, setDownStatusClick] = useState(false);
  const [upStatusClick, setUpStatusClick] = useState(false);
  const [normalConjestionCardClick, setNormalConjestionCardClick] =
    useState(false);

  const [
    centralRegionCardClickForCommunity,
    setCentralRegionCardClickForCommunity,
  ] = useState(false);
  const [
    easternRegionCardClickForCommunity,
    setEasternRegionCardClickForCommunity,
  ] = useState(false);
  const [
    westernRegionCardClickForCommunity,
    setWesternRegionCardClickForCommunity,
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
  const [permDataSourceTable1Tab2, setPermDataSourceTable1Tab2] = useState([]);
  const [permDataSourceTable2Tab2, setPermDataSourceTable2Tab2] = useState([]);
  const [permDataSourceTable3Tab2, setPermDataSourceTable3Tab2] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDatatab2, setFilteredDatatab2] = useState([]);

  const [showAll, setShowAll] = useState(false);
  const pageSize = showAll ? 100000 : 10;

  useEffect(() => {
    console.log(filteredData, "ttttt");
  }, [filteredData]);

  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    console.log("Test", dataSourceTable2Tab1);
  }, [dataSourceTable2Tab1]);

  useEffect(() => {
    const serviceCalls = async () => {
      setLoading(true);

      try {
        const res = await axios.get(baseUrl + "/utilization/device");
        // excelData1Tab1 = res.data.first;
        setDataSourceTable1Tab1(res.data.first);
        console.log(res.data.interface_down, "res dataaa");
        pageSizeTable1Tab1 = res.data.first.length;

        //  if (data && data.first && Array.isArray(res.data.first)) {
        res.data.first.forEach((item) => {
          totalLowCongestion += item.low_congestion;
        });
        res.data.first.forEach((item) => {
          totalNormalCongestion += item.normal_congestion;
        });
        res.data.first.forEach((item) => {
          totalHighCongestion += item.high_congestion;
          totalDownLinks += item.interface_down;
          totalUpLinks += item.interface_up;
        });
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
  useEffect(() => {
    const serviceCalls = async () => {
      setLoadingData2(true);

      try {
        const res = await axios.get(baseUrl + "/utilization/community");
        // excelData1Tab2 = res.data.first;
        setDataSourceTable1Tab2(res.data.first);
        pageSizeTable1Tab2 = res.data.first.length;
        setPermDataSourceTable1Tab2(res.data.first);

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
    setSecondDrawerVisible(false);
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
    setSecondDrawersecondTabVisible(false);
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
    console.log(filteredDataa, "mee");
    pageSizeTable2Tab1 = filteredDataa.length;
    // filteredDataa.map((data) => {
    //   data.status === "down"
    //     ? // return console.log(data, "data");
    //       setDataSourceTable2Tab1(data)
    //     : setDataSourceTable2Tab1("");
    // });
    // console.log(temp, "temp");
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
    console.log(filteredDataa, "filtered data down links");
    pageSizeTable3Tab2 = filteredDataa.length;
    setDataSourceTable3Tab2(filteredDataa);
    // setDataSourceTable1Tab1(filteredDataa);
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
        <div
          onClick={() => {
            setSelectedRow1(record.key);
            setHostnameTab1(record.hostname);
            filterSecondTableDatatab1(record);
            showFirstDrawer();
            setSelectedRouterIp(record.router_ip);
            setSecondDrawerVisible(false);
          }}
          style={{
            display: "block",
            zIndex: record.key === selectedRow1 ? 9999 : "auto",
            backgroundColor: record.key === selectedRow1 ? "#0688BE" : "",
            color: record.key === selectedRow1 ? "#fff" : "#000",
            padding: record.key === selectedRow1 ? "12px" : "0px",
            margin: record.key === selectedRow1 ? "-3%" : "0px",
            fontSize: record.key === selectedRow1 ? "20px" : "14px",
            fontWeight: record.key === selectedRow1 ? "bold" : "normal", // transform:
            //   record.key === selectedRow1 ? "scale(1.2)" : "scale(1)", // Use string values for transform
          }}
        >
          {text}
        </div>
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
      title: "Interface Up",
      dataIndex: "interface_up",
      key: "interface_up",
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
        <div
          onClick={() => {
            showFirstDrawerSecondTab();
            setSelectedRow(record.key); // Set the selected row when the cell is clicked
            setSecondDrawersecondTabVisible(false);
          }}
          style={{
            display: "block",
            backgroundColor: record.key === selectedRow ? "#0688BE" : "",
            color: record.key === selectedRow ? "#fff" : "#000",
            padding: record.key === selectedRow ? "12px" : "0px",
            margin: record.key === selectedRow ? "-3%" : "0px",
            fontSize: record.key === selectedRow ? "20px" : "14px",
            fontWeight: record.key === selectedRow ? "bold" : "normal", // transform: record.key === selectedRow ? "scale(1.8)" : "scale(1)", // Use string values for transform
          }}
        >
          {text}
        </div>
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
        record.region.toLowerCase().includes(value.toLowerCase()), // onFilterDropdownVisibleChange: (visible) => {
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
        <div
          onClick={() => {
            showSecondDrawerSecondTab();
            setSelectedRouterIpForTab2(record.router_ip);

            setSelectedRowsecondcolumnsSecondtab(record.key);
          }}
          style={{
            display: "block",
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
                : "normal", // transform:
            //   record.key === selectedRowsecondcolumnsSecondtab
            //     ? "scale(1.8)"
            //     : "scale(1)", // Use string values for transform
          }}
        >
          {text}
        </div>
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
    }, // {
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
        <div
          onClick={() => {
            showSecondDrawer();
            setSelectedRowsecondcolumnsfirsttab(record.key);
          }}
          style={{
            display: "block",
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
                : "normal", // transform:
            //   record.key === selectedRowsecondcolumnsfirsttab
            //     ? "scale(1.8)"
            //     : "scale(1)", // Use string values for transform
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Community Set",
      dataIndex: "community_set",
      key: "community_set",
      render: (text, record) =>
        text !== "" ? (
          <span

          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
          >
            {text}
          </span>
        ) : (
          <span

          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
          >
            N/A
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
                paddingBottom: "2px",
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
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
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
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
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
      render: (text, record) =>
        record.community_set !== "" ? (
          <a
            href={`traffic-manipulation?${record.community_set}-,-${record.interface}-,-${selectedRouterIp}-,-${hostnameTab1}`}
            // style={{cursor: "pointer"}}
            // onClick={() => {
            //     // showSecondDrawer()
            //     const data = record.community_set;
            //     const data2 = record.interface;
            //     const data3 = selectedRouterIp;

            //     // Convert the data into a query string
            //     const queryParams = queryString.stringify({data});
            //     window.location.href = `traffic-drill-down/traffic-manipulation?${queryParams}-,-${data2}-,-${data3}`;
            // }}
          >
            <SelectOutlined />
          </a>
        ) : (
          "N/A"
        ),
    },
  ];

  useEffect(() => {
    console.log(link1);
  }, [link1]);

  const thirdcolumnsSecondtab = [
    {
      title: "Interface",
      dataIndex: "interface",
      key: "interface",
      render: (text, record) => (
        <div
          onClick={() => {
            showSecondDrawer();
          }}
        >
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Community Set",
      dataIndex: "community_set",
      key: "community_set",
      render: (text, record) =>
        text !== "" ? <span>{text}</span> : <span>N/A</span>,
    },
    {
      title: "Congestion",
      dataIndex: "congestion",
      key: "congestion",
      render: (text, record) => <span>{text}</span>,
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

      render: (text, record) =>
        record.community_set !== "" ? (
          // <div
          //     // style={{cursor: "pointer"}}
          //     // onClick={() => {
          //     //     // showSecondDrawer()
          //     //     const data = record.community_set;
          //     //     const data2 = record.interface;
          //     //     const data3 = selectedRouterIpForTab2;

          //     //     // Convert the data into a query string
          //     //     const queryParams = queryString.stringify({data});

          //     //     console.log(data, data2, data3);
          //     //     // window.open(
          //     //     //   `/traffic-drill-down/traffic-manipulation?${queryParams}-,-${data2}-,-${data3}`,
          //     //     //   // "_blank",
          //     //     //   "noopener noreferrer"
          //     //     // );
          //     //     window.location.href = `/traffic-drill-down/traffic-manipulation?${queryParams}-,-${data2}-,-${data3}`;

          //     // }}
          // >
          <a
            href={`traffic-manipulation?${record.community_set}-,-${record.interface}-,-${selectedRouterIpForTab2}`}
          >
            <SelectOutlined />
          </a>
        ) : (
          // </div >
          "N/A"
        ),
    },
  ];
  const handleShowAllClick = () => {
    setShowAll(!showAll);
  };

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

  const FilterHighCongestionDataOnClick = (index) => {
    console.log(index, "index");
    setCardClick(index);
    if (index === 0) {
      setHighConjestionCardClick(!highConjestionCardClick);
      setLowConjestionCardClick(false);
      setNormalConjestionCardClick(false);
      setDownStatusClick(false);
      setUpStatusClick(false);
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
    } else if (index === 1) {
      setCardClick(index);
      setNormalConjestionCardClick(!normalConjestionCardClick);
      setHighConjestionCardClick(false);
      setLowConjestionCardClick(false);
      setDownStatusClick(false);
      setUpStatusClick(false);
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
    } else if (index === 2) {
      setCardClick(index);

      setLowConjestionCardClick(!lowConjestionCardClick);
      setHighConjestionCardClick(false);
      setNormalConjestionCardClick(false);
      setDownStatusClick(false);
      setUpStatusClick(false);
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
    } else if (index === 3) {
      setCardClick(index);

      setUpStatusClick(!upStatusClick);
      setLowConjestionCardClick(false);
      setHighConjestionCardClick(false);
      setNormalConjestionCardClick(false);
      setDownStatusClick(false);

      if (!upStatusClick) {
        const filtered = dataSourceTable1Tab1.filter(
          (item) => item.interface_up > 0
        );
        // const filtered = dummyDataSource.filter((item) => item);

        console.log("filtered item: " + filtered);
        setFilteredData(filtered);

        const filteredTable2Tab1 = permDataSourceTable2Tab1DataSet.filter(
          (item) => item.status == "up"
        );
        console.log(filteredTable2Tab1);
        // const filteredTable2Tab1 = dummyDataSource.filter(
        //   (item) => item.status == "up"
        // );
        // console.log(filteredTable2Tab1);

        setPermDataSourceTable2Tab1(filteredTable2Tab1);
      } else {
        setPermDataSourceTable2Tab1(permDataSourceTable2Tab1DataSet);
      }
    } else {
      setCardClick(index);
      setDownStatusClick(!downStatusClick);
      setLowConjestionCardClick(false);
      setHighConjestionCardClick(false);
      setNormalConjestionCardClick(false);
      setUpStatusClick(false);

      if (!downStatusClick) {
        console.log(!downStatusClick, "hdufhuh");
        // const filtered = dataSourceTable1Tab1.filter(
        //   (item) => item.interface_down > 0
        // );
        const filtered = dataSourceTable1Tab1.filter((item) => {
          return item.interface_down > 0;
        });
        // const ab = filtered.map((item, index) => console.log(item, "uuuu"));

        // console.log("filtered item: " + filteredd);

        setFilteredData(filtered);

        const filteredTable2Tab1 = permDataSourceTable2Tab1DataSet.filter(
          (item) => item.status == "down"
        );
        // console.log(filteredTable2Tab1, "down");
        // setFilteredData(filteredTable2Tab1);

        setPermDataSourceTable2Tab1(filteredTable2Tab1);
      } else {
        setPermDataSourceTable2Tab1(permDataSourceTable2Tab1DataSet);
      }
    }

    // setHighConjestionCardClick(!highConjestionCardClick);
    // setLowConjestionCardClick(false);
    // setNormalConjestionCardClick(false);
    // setDownStatusClick(false);
    // setUpStatusClick(false);

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

    // if (!highConjestionCardClick) {
    //   const filtered = dataSourceTable1Tab1.filter(
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
  };
  const FilterCentralRegionDataForCommunityOnClick = () => {
    setCentralRegionCardClickForCommunity(!centralRegionCardClickForCommunity);
    setWesternRegionCardClickForCommunity(false);
    setEasternRegionCardClickForCommunity(false);
    if (!centralRegionCardClickForCommunity) {
      // const filtered = dataSourceTable2Tab2.filter(
      //   (item) => item.high_congestion > 0
      // );
      // console.log("filtered item: " + filtered);

      // setFilteredDatatab2(filtered);

      const filteredTable1Tab2 = dataSourceTable1Tab2.filter(
        (item) => item.region == "Central"
      );
      console.log(filteredTable1Tab2);

      setPermDataSourceTable1Tab2(filteredTable1Tab2);
    } else {
      setPermDataSourceTable1Tab2(permDataSourceTable1Tab2);
    }
  };
  const FilterEasternRegionDataForCommunityOnClick = () => {
    setEasternRegionCardClickForCommunity(!easternRegionCardClickForCommunity);
    setCentralRegionCardClickForCommunity(false);
    setWesternRegionCardClickForCommunity(false);
    if (!easternRegionCardClickForCommunity) {
      // const filtered = dataSourceTable2Tab2.filter(
      //   (item) => item.high_congestion > 0
      // );
      // console.log("filtered item: " + filtered);

      // setFilteredDatatab2(filtered);

      const filteredTable1Tab2 = dataSourceTable1Tab2.filter(
        (item) => item.region == "Eastern"
      );
      console.log(filteredTable1Tab2);

      setPermDataSourceTable1Tab2(filteredTable1Tab2);
    } else {
      setPermDataSourceTable1Tab2(permDataSourceTable1Tab2);
    }
  };
  const FilterWesternRegionDataForCommunityOnClick = () => {
    setWesternRegionCardClickForCommunity(!westernRegionCardClickForCommunity);
    setCentralRegionCardClickForCommunity(false);
    setEasternRegionCardClickForCommunity(false);
    if (!westernRegionCardClickForCommunity) {
      // const filtered = dataSourceTable2Tab2.filter(
      //   (item) => item.high_congestion > 0
      // );
      // console.log("filtered item: " + filtered);

      // setFilteredDatatab2(filtered);

      const filteredTable1Tab2 = dataSourceTable1Tab2.filter(
        (item) => item.region == "Western"
      );
      console.log(filteredTable1Tab2);

      setPermDataSourceTable1Tab2(filteredTable1Tab2);
    } else {
      setPermDataSourceTable1Tab2(permDataSourceTable1Tab2);
    }
  };
  // const FilterLowCongestionDataOnClick = () => {
  //   setLowConjestionCardClick(!lowConjestionCardClick);
  //   setHighConjestionCardClick(false);
  //   setNormalConjestionCardClick(false);
  //   setDownStatusClick(false);
  //   setUpStatusClick(false);
  //   if (!lowConjestionCardClick) {
  //     const filtered = dataSourceTable1Tab1.filter(
  //       (item) => item.low_congestion > 0
  //     );

  //     console.log("filtered item: " + filtered);
  //     setFilteredData(filtered);

  //     const filteredTable2Tab1 = permDataSourceTable2Tab1DataSet.filter(
  //       (item) => item.congestion == "Low"
  //     );
  //     console.log(filteredTable2Tab1);

  //     setPermDataSourceTable2Tab1(filteredTable2Tab1);
  //   } else {
  //     setPermDataSourceTable2Tab1(permDataSourceTable2Tab1DataSet);
  //   }
  // };

  // const FilterStatusDownDataOnClick = () => {
  //   setDownStatusClick(!downStatusClick);
  //   setLowConjestionCardClick(false);
  //   setHighConjestionCardClick(false);
  //   setNormalConjestionCardClick(false);
  //   setUpStatusClick(false);

  //   if (!downStatusClick) {
  //     const filtered = dataSourceTable1Tab1.filter(
  //       (item) => item.interface_down > 0
  //     );

  //     console.log("filtered item: " + filtered);
  //     setFilteredData(filtered);

  //     const filteredTable2Tab1 = permDataSourceTable2Tab1DataSet.filter(
  //       (item) => item.status == "down"
  //     );
  //     console.log(filteredTable2Tab1);

  //     setPermDataSourceTable2Tab1(filteredTable2Tab1);
  //   } else {
  //     setPermDataSourceTable2Tab1(permDataSourceTable2Tab1DataSet);
  //   }
  // };
  // const FilterStatusUpDataOnClick = () => {
  //   setUpStatusClick(!upStatusClick);
  //   setLowConjestionCardClick(false);
  //   setHighConjestionCardClick(false);
  //   setNormalConjestionCardClick(false);
  //   setDownStatusClick(false);

  //   if (!upStatusClick) {
  //     // const filtered = dataSourceTable1Tab1.filter(
  //     //   (item) => item.interface_down > 0
  //     // );

  //     // console.log("filtered item: " + filtered);
  //     // setFilteredData(filtered);

  //     const filteredTable2Tab1 = permDataSourceTable2Tab1DataSet.filter(
  //       (item) => item.status == "up"
  //     );
  //     console.log(filteredTable2Tab1);

  //     setPermDataSourceTable2Tab1(filteredTable2Tab1);
  //   } else {
  //     setPermDataSourceTable2Tab1(permDataSourceTable2Tab1DataSet);
  //   }
  // };

  // const FilterNormalCongestionDataOnClick = () => {
  //   setNormalConjestionCardClick(!normalConjestionCardClick);
  //   setHighConjestionCardClick(false);
  //   setLowConjestionCardClick(false);
  //   setDownStatusClick(false);
  //   setUpStatusClick(false);
  //   if (!normalConjestionCardClick) {
  //     const filtered = dataSourceTable1Tab1.filter(
  //       (item) => item.normal_congestion > 0
  //     );

  //     console.log("filtered item: " + filtered);
  //     setFilteredData(filtered);

  //     const filteredTable2Tab1 = permDataSourceTable2Tab1DataSet.filter(
  //       (item) => item.congestion == "Normal"
  //     );
  //     console.log(filteredTable2Tab1);

  //     setPermDataSourceTable2Tab1(filteredTable2Tab1);
  //   } else {
  //     setPermDataSourceTable2Tab1(permDataSourceTable2Tab1DataSet);
  //   }
  // };
  // const FilterLowCongestionDataForCommunityOnClick = () => {
  //   setLowConjestionCardClickForCommunity(!lowConjestionCardClickForCommunity);
  //   setHighConjestionCardClickForCommunity(false);
  //   if (!lowConjestionCardClickForCommunity) {
  //     const filtered = dataSourceTable2Tab2.filter(
  //       (item) => item.low_congestion > 0
  //     );

  //     console.log("filtered item: " + filtered);
  //     setFilteredDatatab2(filtered);

  //     const filteredTable3Tab2 = permDataSourceTable3Tab2DataSet.filter(
  //       (item) => item.congestion == "Low"
  //     );
  //     console.log(filteredTable3Tab2);

  //     setPermDataSourceTable3Tab2(filteredTable3Tab2);
  //   } else {
  //     setPermDataSourceTable3Tab2(permDataSourceTable3Tab2DataSet);
  //   }
  // };
  const cards = [1, 2, 3, 4, 5];
  const defaultColors = ["#474d59", "#474d59", "#474d59", "#474d59", "#474d59"]; // Default colors for each index
  const clickColors = [
    "#F40000",
    "rgb(244, 132, 0)",
    "rgb(102, 177, 39)",
    "rgb(102, 177, 39)",
    "#F40000",
  ]; // Click colors for each index
  // const contentTitleColor = cardClick === index ? clickColors[index] : defaultColors[index];
  return (
    <MainDivwithoutSidebar>
      <div style={containerStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
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
                  {cards.map((card, index) => {
                    return (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "start",
                          }}
                        >
                          <div
                            className="card_div"
                            style={{
                              transform:
                                highConjestionCardClick && index === 0
                                  ? "scale(1.08)"
                                  : normalConjestionCardClick && index === 1
                                  ? "scale(1.08)"
                                  : lowConjestionCardClick && index === 2
                                  ? "scale(1.08)"
                                  : downStatusClick && index === 4
                                  ? "scale(1.08)"
                                  : upStatusClick && index === 3
                                  ? "scale(1.08)"
                                  : "scale(1)",
                            }}
                            onClick={() =>
                              FilterHighCongestionDataOnClick(index)
                            }
                          >
                            <DeviceCentricCard
                              className={`centeric_card card-${index}`}
                              content={
                                index === 0
                                  ? totalHighCongestion
                                  : index === 1
                                  ? totalNormalCongestion
                                  : index === 2
                                  ? totalLowCongestion
                                  : index === 3
                                  ? totalUpLinks
                                  : totalDownLinks
                              }
                              contentTitle={
                                index === 0
                                  ? "High Congestion"
                                  : index === 1
                                  ? "Normal Congestion"
                                  : index === 2
                                  ? "Low Congestion"
                                  : index === 3
                                  ? "Up Links"
                                  : "Down Links"
                              }
                              // customImgLeft={cardleft3}
                              customImgTop={
                                index === 0 || index === 4
                                  ? cardright3
                                  : index === 1
                                  ? cardright4
                                  : index === 2 || index === 3
                                  ? cardright5
                                  : ""
                              }
                              customColor={
                                index === 0
                                  ? "#F40000"
                                  : index === 1
                                  ? "rgb(244, 132, 0)"
                                  : index === 2
                                  ? "rgb(102, 177, 39)"
                                  : index === 3
                                  ? "rgb(102, 177, 39)"
                                  : "#F40000"
                              }
                              customBgColor={
                                cardClick === index
                                  ? index === 0 || index === 4
                                    ? "#ffe3e3"
                                    : index === 1
                                    ? "#fcecd9"
                                    : index === 2 || index === 3
                                    ? "#e6fcd2"
                                    : ""
                                  : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                              }
                              // contentTitleColor={
                              //   cardClick === 0 ? "#F40000" : "#2d2f3d"
                              // }
                              contentTitleColor={
                                cardClick === index
                                  ? clickColors[index]
                                  : defaultColors[index]
                              }
                            />
                          </div>
                        </div>
                      </>
                    );
                  })}
                  {/* <div
                    style={{
                      transform: highConjestionCardClick
                        ? "scale(1.08)"
                        : "scale(1)",
                    }}
                    onClick={FilterHighCongestionDataOnClick}
                  >
                    <DeviceCentricCard
                      content={totalHighCongestion}
                      contentTitle="High Congestion"
                      // customImgLeft={cardleft3}
                      customImgTop={cardright3}
                      customColor={"#F40000"}
                      customBgColor={
                        highConjestionCardClick
                          ? "#CEEDFF"
                          : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                      }
                      contentTitleColor={cardClick ? "#F40000" : "#C1BCBC"}
                    />
                  </div> */}
                  {/* <div
                    style={{
                      transform: normalConjestionCardClick
                        ? "scale(1.08)"
                        : "scale(1)",
                    }}
                    onClick={FilterNormalCongestionDataOnClick}
                  >
                    <DeviceCentricCard
                      customColor="#F48400"
                      customBgColor={
                        normalConjestionCardClick
                          ? "#CEEDFF"
                          : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                      }
                      content={totalNormalCongestion}
                      contentTitle="Normal Congestion"
                      contentTitleColor={cardClick ? "#F48400" : "#C1BCBC"}
                      // customImgTop={cardleft4}
                      customImgTop={cardright4}
                    />
                  </div> */}
                  {/* <div
                    style={{
                      transform: lowConjestionCardClick
                        ? "scale(1.08)"
                        : "scale(1)",
                    }}
                    onClick={FilterLowCongestionDataOnClick}
                  >
                    <DeviceCentricCard
                      contentTitle="Low Congestion"
                      customColor="#66B127"
                      customBgColor={
                        lowConjestionCardClick
                          ? "#CEEDFF"
                          : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                      }
                      content={totalLowCongestion}
                      contentTitleColor={cardClick ? "#66B127" : "#2d2f3d"}
                      // customImgLeft={cardleft5}
                      customImgTop={cardright5}
                    />
                  </div> */}
                  {/* <div
                    style={{
                      transform: upStatusClick ? "scale(1.08)" : "scale(1)",
                    }}
                    onClick={FilterStatusUpDataOnClick}
                  >
                    <DeviceCentricCard
                      contentTitle="Up Links"
                      customColor="#66B127"
                      customBgColor={
                        upStatusClick
                          ? "#CEEDFF"
                          : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                      }
                      content={totalUpLinks}
                      contentTitleColor={cardClick ? "#66B127" : "#C1BCBC"}
                      // customImgLeft={cardleft5}
                      customImgTop={cardright5}
                    />
                  </div> */}
                  {/* <div
                    style={{
                      transform: downStatusClick ? "scale(1.08)" : "scale(1)",
                    }}
                    onClick={FilterStatusDownDataOnClick}
                  >
                    <DeviceCentricCard
                      contentTitle="Down Links"
                      content={totalDownLinks}
                      // customImgLeft={cardleft3}
                      customImgTop={cardright3}
                      customColor={"#F40000"}
                      customBgColor={
                        downStatusClick
                          ? "#CEEDFF"
                          : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                      }
                      contentTitleColor={cardClick ? "#F40000" : "#C1BCBC"}
                    />
                  </div> */}
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
                    style={{
                      transform: centralRegionCardClickForCommunity
                        ? "scale(1.08)"
                        : "scale(1)",
                    }}
                    onClick={FilterCentralRegionDataForCommunityOnClick}
                  >
                    <DeviceCentricCard
                      content={dataSourceTable1Tab2.length === 0 ? "0" : "105"}
                      contentTitle="Central"
                      // customImgLeft={cardleft3}
                      customImgTop={central}
                      customColor="#F40000"
                      customBgColor={
                        centralRegionCardClickForCommunity
                          ? "#CEEDFF"
                          : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                      }
                      contentTitleColor={
                        centralRegionCardClickForCommunity
                          ? "#F40000"
                          : "#C1BCBC"
                      }
                    />
                  </div>
                  <div
                    style={{
                      transform: westernRegionCardClickForCommunity
                        ? "scale(1.08)"
                        : "scale(1)",
                    }}
                    onClick={FilterWesternRegionDataForCommunityOnClick}
                  >
                    <DeviceCentricCard
                      contentTitle="Western"
                      content={dataSourceTable1Tab2.length === 0 ? "0" : "136"}
                      customColor="#66B127"
                      customBgColor={
                        westernRegionCardClickForCommunity
                          ? "#CEEDFF"
                          : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                      }
                      contentTitleColor={
                        westernRegionCardClickForCommunity
                          ? "#66B127"
                          : "#C1BCBC"
                      }
                      // customImgLeft={cardleft5}
                      customImgTop={westren}
                    />
                  </div>
                  <div
                    style={{
                      transform: easternRegionCardClickForCommunity
                        ? "scale(1.08)"
                        : "scale(1)",
                    }}
                    onClick={FilterEasternRegionDataForCommunityOnClick}
                  >
                    <DeviceCentricCard
                      customColor="#F48400"
                      customBgColor={
                        easternRegionCardClickForCommunity
                          ? "#CEEDFF"
                          : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                      }
                      content={dataSourceTable1Tab2.length === 0 ? "0" : "67"}
                      contentTitle="Eastern"
                      contentTitleColor={
                        easternRegionCardClickForCommunity
                          ? "#F48400"
                          : "#C1BCBC"
                      }
                      // customImgLeft={cardleft4}
                      customImgTop={eastren}
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
              // marginTop: "90px",
              // marginBottom: "20px",
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
                    width: "150px", // paddingLeft: "20px",
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
              normalConjestionCardClick === false &&
              upStatusClick === false &&
              downStatusClick === false ? (
                <TableStyle
                  rowClassName={() => "rowClassName1"}
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
                  loading={{ indicator: <Spin />, spinning: loading }}
                />
              ) : (
                <TableStyle
                  rowClassName={() => "rowClassName1"}
                  pagination={{
                    showSizeChanger: true, // To allow users to change pageSize from the table footer
                    pageSizeOptions: ["2", `${pageSizeTable1Tab1}`],
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
            {centralRegionCardClickForCommunity === false &&
            easternRegionCardClickForCommunity === false &&
            westernRegionCardClickForCommunity === false ? (
              <TableStyle
                rowClassName={() => "rowClassName1"}
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
                loading={{ indicator: <Spin />, spinning: loadingData2 }}
              />
            ) : (
              <TableStyle
                rowClassName={() => "rowClassName1"}
                pagination={{
                  showSizeChanger: true, // To allow users to change pageSize from
                  pageSizeOptions: ["10", `${pageSizeTable1Tab2}`],
                }}
                dataSource={permDataSourceTable1Tab2}
                columns={firstcolumnsSecondtab}
                onRow={(record) => ({
                  onClick: () => {
                    filterSecondTableDatatab2(record);
                  },
                })}
                loading={{ indicator: <Spin />, spinning: loadingData2 }}
              />
            )}
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
            rowClassName={() => "rowClassName1"}
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
            rowClassName={() => "rowClassName1"}
            pagination={{
              showSizeChanger: true, // To allow users to change pageSize from the table footer
              pageSizeOptions: ["10", `${pageSizeTable3Tab1}`],
            }}
            dataSource={dataSourceTable3Tab1}
            columns={thirdcolumnsfirsttab}
          />
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
          <Table
            rowClassName={() => "rowClassName1"}
            dataSource={dataSourceTable2Tab2}
            columns={secondcolumnsSecondtab}
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ["10", `${pageSizeTable2Tab2}`],
            }}
            onRow={(record) => ({
              onClick: () => {
                filterThirdTableDatatab2(record);
              },
            })}
          />
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
            rowClassName={() => "rowClassName1"}
            pagination={{
              showSizeChanger: true, // To allow users to change pageSize from the table footer
              pageSizeOptions: ["10", `${pageSizeTable3Tab2}`],
            }}
            dataSource={dataSourceTable3Tab2}
            columns={thirdcolumnsSecondtab}
          />
        </Drawer>
      </div>
    </MainDivwithoutSidebar>
  );
};

export default Index;

import { Button, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import {
  MainDiv,
  TableStyle,
} from "../../../Components/GlobalStyles/main.styled.js";
import axios, { baseUrl } from "../../../utils/axios";
import { columnSearch } from "../../../utils/index.jsx";

let excelData = [];
let columnFilters = {};

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let [dataSource, setDataSource] = useState(excelData);
  const [searchText, setSearchText] = useState(null);
  const [searchedColumn, setSearchedColumn] = useState(null);
  const [management_ip, setmanagement_ip] = useState(
    location.state.management_ip
  );
  const [hostname, setHostname] = useState(location.state.hostname);
  const [providerIpData, setProviderIpData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  let getColumnSearchProps = columnSearch(
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn
  );

  // useEffect(() => {
  //   const serviceCalls = async () => {
  //     setLoading(true);

  //     try {
  //       const res = await axios.get(baseUrl + "/getManagementIpsForAsync");
  //       excelData = res.data;
  //       setDataSource(excelData);
  //       setRowCount(excelData.length);
  //       setLoading(false);
  //       console.log(res.data);
  //     } catch (err) {
  //       console.log(err.response);
  //       setLoading(false);
  //     }
  //   };
  //   serviceCalls();
  // }, []);
  //   useEffect(() => {
  //     const handleBackButton = () => {
  //       // Check if you are on a specific route and perform the desired action
  //       if (navigate.location.pathname === "/async-cmd-runner/cmd") {
  //         // Do something when the back button is pressed on Page 2
  //         navigate("/async-cmd-runner/cmd"); // Navigate to a specific route
  //       }
  //     };

  //     window.addEventListener("popstate", handleBackButton);

  //     return () => {
  //       window.removeEventListener("popstate", handleBackButton);
  //     };
  //   }, [navigate]);
  useEffect(() => {
    const serviceCalls = async () => {
      setLoading(true);

      try {
        const res = await axios.post(baseUrl + "/getProviderIpsFromRouter", {
          management_ip: management_ip,
        });
        console.log(res);
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

  const openSweetAlert = (title, type, errors) => {
    console.log("Error-------->", errors);

    Swal.fire({
      title,
      type,
      allowOutsideClick: false,
    });
  };

  const exportSeed = () => {
    jsonToExcel(dataSource);
    // setIsAlertOpen(false);
  };
  const openNotification = () => {
    notification.open({
      message: "File Exported Successfully",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const jsonToExcel = (snmpData) => {
    if (rowCount !== 0) {
      let wb = XLSX.utils.book_new();
      let binarysnmpData = XLSX.utils.json_to_sheet(snmpData);
      XLSX.utils.book_append_sheet(wb, binarysnmpData, "async_cmd_Runner");
      XLSX.writeFile(wb, "provider_ips.xlsx");
      openNotification();
    } else {
      openSweetAlert("No Data Found!", "error");
    }
  };

  const columns = [
    {
      title: "Link Name",
      dataIndex: "interface",
      key: "interface",
      render: (text, record) => (
        <span
        //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ...getColumnSearchProps(
        "interface",
        "Link Name",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
      ellipsis: true,
    },
    {
      title: "Peer IP",
      dataIndex: "provider_ip",
      key: "provider_ip",
      render: (text, record) => (
        <span
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => {
            navigate("/bgp-collector/detail", {
              state: {
                provider_ip: text,
                management_ip: management_ip,
                hostname: hostname,
              },
            });
          }}
          //   style={{ textAlign: "left", marginLeft: "12px", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ...getColumnSearchProps(
        "provider_ip",
        "Peer IP",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
      ellipsis: true,
    },
    {
      title: "Utilization",
      dataIndex: "utilization",
      key: "utilization",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ...getColumnSearchProps(
        "utilization",
        "Utilization",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span
        // style={{ textAlign: "center", paddingTop: "16px" }}
        >
          {text}
        </span>
      ),

      ...getColumnSearchProps(
        "status",
        "Status",
        setRowCount,
        setDataSource,
        excelData,
        columnFilters
      ),
      ellipsis: true,
    },
    // }
    // {
    //   title: "Upload",
    //   dataIndex: "upload",
    //   key: "upload",
    //   render: (text, record) => (
    //     <span
    //     // style={{ textAlign: "center", paddingTop: "16px" }}
    //     >
    //       {text}
    //     </span>
    //   ),

    //   ...getColumnSearchProps(
    //     "upload",
    //     "Upload",
    //     setRowCount,
    //     setDataSource,
    //     excelData,
    //     columnFilters
    //   ),
    //   ellipsis: true,
    // },

    // {
    //   title: "Total Capacity",
    //   dataIndex: "total_capacity",
    //   key: "total_capacity",
    //   render: (text, record) => (
    //     <span
    //     // style={{ textAlign: "center", paddingTop: "16px" }}
    //     >
    //       {text}
    //     </span>
    //   ),

    //   ...getColumnSearchProps(
    //     "total_capacity",
    //     "Total Capacity",
    //     setRowCount,
    //     setDataSource,
    //     excelData,
    //     columnFilters
    //   ),
    //   ellipsis: true,
    // },
    // {
    //   title: "Utilization",
    //   dataIndex: "utilization",
    //   key: "utilization",
    //   render: (text, record) => (
    //     <span
    //     // style={{ textAlign: "center", paddingTop: "16px" }}
    //     >
    //       {text}
    //     </span>
    //   ),

    //   ...getColumnSearchProps(
    //     "utilization",
    //     "Utilization",
    //     setRowCount,
    //     setDataSource,
    //     excelData,
    //     columnFilters
    //   ),
    //   ellipsis: true,
    // },
  ];

  return (
    <MainDiv style={{ padding: "15px" }}>
      <Spin spinning={loading} style={{ height: "100vh" }}>
        {/* <h3>Management IP</h3> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>{hostname}</h2>

          <Button
            onClick={exportSeed}
            // type="primary"
            style={{
              marginRight: "5px",
            }}
          >
            Export
          </Button>
        </div>
        <TableStyle
          style={{ marginTop: "10px" }}
          scroll={{ y: 500 }}
          dataSource={dataSource}
          columns={columns}
        />
        {/* <div style={{display:"flex",flexWrap:"wrap"}}>
{
    providerIpData.map((item,index)=>{
        return(
            <RouterStyling
            key={index}
    //   onClick={() => {
    //     navigate("/async-cmd-runner/cmd", {
    //       state: {
    //        router:item
    //       },
    //     });
    // }}
    onClick={() => {
        navigate("/async-cmd-runner/detail", {
          state: {
            provider_ip: item,
            management_ip:management_ip
          },
        });
    }}
     >{item}</RouterStyling>
        )
    })
}
  
        </div> */}
      </Spin>
    </MainDiv>
  );
};

export default Index;

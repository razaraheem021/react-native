// import React, { useState } from "react";
// import {
//   MainDivwithoutSidebar,
//   TableStyle,
// } from "../../Components/GlobalStyles/main.styled.js";

// const AntdTableExample = () => {
//   const [selectedRecordId, setSelectedRecordId] = useState(null);
//   const data = [
//     {
//       id: 1,
//       name: "John",
//       lastName: "Doe",
//       details: [
//         { id: 1, age: 25, city: "New York", shoud: "Yes" },
//         { id: 2, age: 30, city: "London", shoud: "No" },
//         // Add more details here if needed
//       ],
//     },
//     {
//       id: 2,
//       name: "Jane",
//       lastName: "Smith",
//       details: [
//         { id: 3, age: 28, city: "Paris", shoud: "Yes" },
//         { id: 4, age: 35, city: "Tokyo", shoud: "No" },
//         // Add more details here if needed
//       ],
//     },
//     // Add more data here if needed
//   ];

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text, record) => (
//         <div
//           className={selectedRecordId === record.id ? "highlighted-name" : ""}
//           onClick={() => handleNameClick(record.id)}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             cursor: "pointer",
//             padding: "3px",
//             // border:
//             //   selectedRecordId === record.id
//             //     ? "2px solid yellow"
//             //     : "1px solid #e8e8e8",
//             // borderRadius: "4px",
//             backgroundColor:
//               selectedRecordId === record.id ? "yellow" : "transparent",
//           }}
//         >
//           <span>{text}</span>
//           {selectedRecordId === record.id && (
//             <div
//               style={{
//                 position: "absolute",
//                 top: "-100%",
//                 left: 150,
//                 zIndex: 1,
//                 background: "white",
//                 boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
//                 padding: "16px",
//                 width: "88vw",
//               }}
//             >
//               <TableStyle
//                 style={{
//                   width: "100%",
//                 }}
//                 dataSource={record.details}
//                 columns={detailsColumns}
//               />
//             </div>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: "Last Name",
//       dataIndex: "lastName",
//       key: "lastName",
//     },
//   ];

//   const detailsColumns = [
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//     },
//     {
//       title: "City",
//       dataIndex: "city",
//       key: "city",
//     },
//     {
//       title: "Should",
//       dataIndex: "shoud",
//       key: "shoud",
//     },
//   ];

//   const handleNameClick = (recordId) => {
//     setSelectedRecordId(selectedRecordId === recordId ? null : recordId);
//   };

//   return (
//     <MainDivwithoutSidebar>
//       <style>
//         {`
//         .highlighted-name {
//           background-color: yellow;
//           color: red;
//         }
//       `}
//       </style>
//       <div>
//         <TableStyle dataSource={data} columns={columns} pagination={false} />
//       </div>
//     </MainDivwithoutSidebar>
//   );
// };

// export default AntdTableExample;

// working with 2 tables

// import { Drawer } from "antd";
// import React, { useState } from "react";
// import {
//   MainDivwithoutSidebar,
//   TableStyle,
// } from "../../Components/GlobalStyles/main.styled.js";

// const AntdTableExample = () => {
//   const [selectedRecordId, setSelectedRecordId] = useState(null);
//   const [selectedRecordDetails, setSelectedRecordDetails] = useState([]);
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const data = [
//     {
//       id: 1,
//       name: "John",
//       lastName: "Doe",
//       details: [
//         { id: 1, age: 25, city: "New York", shoud: "Yes" },
//         { id: 2, age: 30, city: "London", shoud: "No" },
//         // Add more details here if needed
//       ],
//     },
//     {
//       id: 2,
//       name: "Jane",
//       lastName: "Smith",
//       details: [
//         { id: 3, age: 28, city: "Paris", shoud: "Yes" },
//         { id: 4, age: 35, city: "Tokyo", shoud: "No" },
//         // Add more details here if needed
//       ],
//     },
//     // Add more data here if needed
//   ];

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text, record) => (
//         <div
//           className={selectedRecordId === record.id ? "highlighted-name" : ""}
//           onClick={() => handleNameClick(record.id)}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             cursor: "pointer",
//             padding: "3px",
//             backgroundColor:
//               selectedRecordId === record.id ? "yellow" : "transparent",
//           }}
//         >
//           <span>{text}</span>
//         </div>
//       ),
//     },
//     {
//       title: "Last Name",
//       dataIndex: "lastName",
//       key: "lastName",
//     },
//   ];

//   const detailsColumns = [
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//     },
//     {
//       title: "City",
//       dataIndex: "city",
//       key: "city",
//     },
//     {
//       title: "Shoud",
//       dataIndex: "shoud",
//       key: "shoud",
//     },
//   ];

//   const handleNameClick = (recordId) => {
//     setSelectedRecordId(recordId);
//     const selectedRecord = data.find((record) => record.id === recordId);
//     setSelectedRecordDetails(selectedRecord.details);
//     setDrawerVisible(true);
//   };

//   const closeDrawer = () => {
//     setDrawerVisible(false);
//     setSelectedRecordId(null);
//     setSelectedRecordDetails([]);
//   };

//   return (
//     <MainDivwithoutSidebar>
//       <style>
//         {`
//         .highlighted-name {
//           background-color: yellow;
//           color:red;
//         }
//       `}
//       </style>
//       <div>
//         <TableStyle dataSource={data} columns={columns} pagination={false} />
//       </div>
//       <Drawer
//         style={{ marginTop: "52px" }}
//         placement="right"
//         width="80%"
//         //   closable={false}
//         onClose={closeDrawer}
//         open={drawerVisible}
//         getContainer={false}
//         mask={false}
//       >
//         {/* <div className="drawer-header">
//           <button
//             onClick={closeDrawer}
//             style={{
//               borderRadius: "50%",
//               padding: "5px",
//               border: "none",
//               outline: "none",
//               cursor: "pointer",
//               marginLeft: "-35px",
//               backgroundColor: "black",
//               zIndex: 1000,
//             }}
//           >
//             <CloseOutlined style={{ color: "#333" }} />
//           </button>
//         </div> */}
//         <div className="drawer-content">
//           <TableStyle
//             dataSource={selectedRecordDetails}
//             columns={detailsColumns}
//           />
//           {/* <button onClick={closeDrawer}>Close</button> */}
//         </div>
//       </Drawer>
//     </MainDivwithoutSidebar>
//   );
// };

// export default AntdTableExample;

import { Button, Drawer, Input, Table } from "antd";
import React, { useState } from "react";
import {
  MainDivwithoutSidebar,
  TableStyle,
} from "../../Components/GlobalStyles/main.styled.js";

let excelData = [];

const AntdTableExample = () => {
  let [dataSource, setDataSource] = useState(excelData);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [selectedRecordDetails, setSelectedRecordDetails] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [secondDrawerVisible, setSecondDrawerVisible] = useState(false);
  const [selectedAge, setSelectedAge] = useState(null); // State for the selected
  const [detailsFilters, setDetailsFilters] = useState({
    interfaces: [],
    utilization: [],
  });
  const [thirdTableFilters, setThirdTableFilters] = useState({
    link_type: [],
    location: [],
  });

  //    useEffect(() => {
  //      const serviceCalls = async () => {
  //        setLoading(true);

  //        try {
  //          const res = await axios.get(baseUrl + "/asynccommandrunner");
  //          excelData = res.data;
  //          setDataSource(excelData);
  //          setRowCount(excelData.length);
  //          setLoading(false);
  //          console.log(res.data);
  //        } catch (err) {
  //          console.log(err.response);
  //          setLoading(false);
  //        }
  //      };
  //      serviceCalls();
  //    }, []);

  const data = [
    {
      id: 1,
      hostname: "John",
      utilization: "Doe",
      interfaces: [
        { id: 1, interfaces: "25", utilization: "New York" },
        { id: 2, interfaces: "30", utilization: "London" },
        // Add more details here if needed
      ],
      links: [
        {
          id: 1,
          link_type: "Attribute 1",
          location: "Value 1",
          utilization: 25,
          status: "up",
          interfaces: "25",
        },
        {
          id: 2,
          link_type: "Attribute 2",
          location: "Value 1",
          utilization: 25,
          status: "up",
          interfaces: "25",
        },
        //   { id: 2, link_type: "Attribute 2", value: "Value 2", interfaces: 25 },
        // Add more third table data here if needed
      ],
    },
    {
      id: 2,
      hostname: "John",
      utilization: "Doe",
      interfaces: [
        { id: 2, interfaces: "5", utilization: "New York" },
        { id: 3, interfaces: "0", utilization: "London" },
        // Add more details here if needed
      ],
      links: [
        {
          id: 1,
          link_type: "Attribute 1",
          location: "Value 1",
          utilization: 25,
          status: "up",
          interfaces: "5",
        },
        {
          id: 2,
          link_type: "Attribute 2",
          location: "Value 1",
          utilization: 25,
          status: "up",
          interfaces: "0",
        },
        //   { id: 2, link_type: "Attribute 2", value: "Value 2", interfaces: 25 },
        // Add more third table data here if needed
      ],
    },
    //     {
    //       id: 2,
    //       name: "Jane",
    //       lastName: "Smith",
    //       details: [
    //         { id: 3, age: 28, city: "Paris", shoud: "Yes" },
    //         { id: 4, age: 35, city: "Tokyo", shoud: "No" },
    //         // Add more details here if needed
    //       ],
    //       thirdTableData: [
    //         { id: 3, attribute: "Attribute 3", value: "Value 3", age: 28 },
    //         { id: 4, attribute: "Attribute 4", value: "Value 4", age: 28 },
    //         // Add more third table data here if needed
    //       ],
    //     },
    // Add more data here if needed
  ];
  //   const data = [
  //     {
  //       id: 1,
  //       name: "John",
  //       lastName: "Doe",
  //       details: [
  //         { id: 1, age: 25, city: "New York", shoud: "Yes" },
  //         { id: 2, age: 30, city: "London", shoud: "No" },
  //         // Add more details here if needed
  //       ],
  //       thirdTableData: [
  //         { id: 1, attribute: "Attribute 1", value: "Value 1", age: 25 },
  //         { id: 2, attribute: "Attribute 2", value: "Value 2", age: 25 },
  //         // Add more third table data here if needed
  //       ],
  //     },
  //     {
  //       id: 2,
  //       name: "Jane",
  //       lastName: "Smith",
  //       details: [
  //         { id: 3, age: 28, city: "Paris", shoud: "Yes" },
  //         { id: 4, age: 35, city: "Tokyo", shoud: "No" },
  //         // Add more details here if needed
  //       ],
  //       thirdTableData: [
  //         { id: 3, attribute: "Attribute 3", value: "Value 3", age: 28 },
  //         { id: 4, attribute: "Attribute 4", value: "Value 4", age: 28 },
  //         // Add more third table data here if needed
  //       ],
  //     },
  //     // Add more data here if needed
  //   ];

  //   const columns = [
  //     {
  //       title: "Name",
  //       dataIndex: "name",
  //       key: "name",
  //       render: (text, record) => (
  //         <div
  //           className={selectedRecordId === record.id ? "highlighted-name" : ""}
  //           onClick={() => handleNameClick(record.id)}
  //           style={{
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "space-between",
  //             cursor: "pointer",
  //             padding: "3px",
  //             backgroundColor:
  //               selectedRecordId === record.id ? "yellow" : "transparent",
  //           }}
  //         >
  //           <span>{text}</span>
  //         </div>
  //       ),
  //     },
  //     {
  //       title: "Last Name",
  //       dataIndex: "lastName",
  //       key: "lastName",
  //     },
  //   ];

  //   const detailsColumns = [
  //     {
  //       title: "Age",
  //       dataIndex: "age",
  //       key: "age",
  //       render: (text, record) => (
  //         <div
  //           className={selectedAge === text ? "highlighted-age" : ""}
  //           onClick={() => handleAgeClick(text)}
  //         >
  //           {text}
  //         </div>
  //       ),
  //     },
  //     {
  //       title: "City",
  //       dataIndex: "city",
  //       key: "city",
  //     },
  //     {
  //       title: "Shoud",
  //       dataIndex: "shoud",
  //       key: "shoud",
  //     },
  //   ];

  //   const thirdTableColumns = [
  //     {
  //       title: "Attribute",
  //       dataIndex: "attribute",
  //       key: "attribute",
  //     },
  //     {
  //       title: "Value",
  //       dataIndex: "value",
  //       key: "value",
  //     },
  //   ];
  const columns = [
    {
      title: "hostname",
      dataIndex: "hostname",
      key: "hostname",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search hostname"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <div>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
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
      onFilter: (value, record) =>
        record.hostname.toLowerCase().includes(value.toLowerCase()),
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
    },
    {
      title: "utilization",
      dataIndex: "utilization",
      key: "utilization",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search last name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <div>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
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
      onFilter: (value, record) =>
        record.utilization.toLowerCase().includes(value.toLowerCase()),
    },
    // Add more columns with filterDropdown and onFilter for each column
  ];
  const detailsColumns = [
    {
      title: "Interface",
      dataIndex: "interfaces",
      key: "interfaces",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search interfaces"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <div>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
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
      onFilter: (value, record) => record.interfaces.toString().includes(value),
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
    },
    {
      title: "utilization",
      dataIndex: "utilization",
      key: "utilization",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search utilization"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <div>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
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
      onFilter: (value, record) =>
        record.utilization.toLowerCase().includes(value.toLowerCase()),
    },
  ];

  const thirdTableColumns = [
    {
      title: "link_type",
      dataIndex: "link_type",
      key: "link_type",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search link_type"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <div>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
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
      onFilter: (value, record) =>
        record.link_type.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search location"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <div>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
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
      onFilter: (value, record) =>
        record.location.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "utilization",
      dataIndex: "utilization",
      key: "utilization",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search location"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <div>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
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
      onFilter: (value, record) =>
        record.utilization.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search location"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <div>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
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
      onFilter: (value, record) =>
        record.status.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "utilization",
      dataIndex: "utilization",
      key: "utilization",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search location"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <div>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
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
      onFilter: (value, record) =>
        record.utilization.toLowerCase().includes(value.toLowerCase()),
    },
  ];
  const handleNameClick = (recordId) => {
    setSecondDrawerVisible(false);
    setSelectedAge(null);
    setSelectedRecordId(recordId);
    const selectedRecord = data.find((record) => record.id === recordId);
    setSelectedRecordDetails(selectedRecord.interfaces);
    setDrawerVisible(true);
  };

  const handleAgeClick = (interfaces) => {
    setSelectedAge(interfaces);
    setSecondDrawerVisible(true);
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

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const containerStyle = {
    position: "relative",
    height: 400,
    padding: 20,
    overflow: "hidden",
    textAlign: "center",
    //     background: token.colorFillAlter,
    //     border: `1px solid ${token.colorBorderSecondary}`,
    //     borderRadius: token.borderRadiusLG,
  };

  return (
    <MainDivwithoutSidebar>
      <style>
        {`
     .highlighted-name {
  background-color: #009BDB;
  color: white;
  font-weight: bold;
    transform: scale(1.82);
  transition: transform 0.3s ease-in-out;
  margin-left:29%;
// border-left:2px solid #DAF4FF;
}
     .highlighted-name-not-selected {
  background-color: #FFFFFF;
  color: #E3E1E1;
border-left:2px solid #009BDB;
}



        .highlighted-age {
          background-color: #009BDB;
  color: white;
  font-weight: bold;
    transform: scale(1.82);
  transition: transform 0.3s ease-in-out;
  margin-left:29%;

        }
      `}
      </style>
      <div style={containerStyle}>
        <div>
          <TableStyle dataSource={data} columns={columns} pagination={false} />
        </div>
        <Drawer
          style={{ marginTop: "0px" }}
          placement="right"
          width="80%"
          onClose={closeDrawer}
          getContainer={false}
          mask={false}
          closable={false}
          open={drawerVisible}
        >
          <div className="drawer-content">
            <TableStyle
              dataSource={selectedRecordDetails}
              columns={detailsColumns}
            />
          </div>
        </Drawer>
        <Drawer
          style={{ marginTop: "0px" }}
          placement="right"
          width="60%"
          onClose={closeSecondDrawer}
          closable={false}
          open={secondDrawerVisible}
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
          <div
            className="drawer-content"
            //   style={{ marginTop: "-15px" }}
          >
            {selectedAge && (
              <Table
                dataSource={data
                  .flatMap((record) => record.links) // Flatten the links from all records
                  .filter((record) => record.interfaces === selectedAge)} // Filter based on selected interfaces
                columns={thirdTableColumns}
              />
            )}
          </div>
        </Drawer>
      </div>
    </MainDivwithoutSidebar>
  );
};

export default AntdTableExample;

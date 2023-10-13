// import React, { useState } from "react";
// import { TableStyle, MainDiv } from "../../Components/GlobalStyles/main.styled";
// import { Button, Radio, Space, Divider } from "antd";
// import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
// const data = [
//   {
//     key: "1",
//     name: "John Doe",
//     age: 30,
//     address: "123 Main St",
//   },
//   {
//     key: "2",
//     name: "Jane Smith",
//     age: 28,
//     address: "456 Elm St",
//   },
//   {
//     key: "3",
//     name: "Bob Johnson",
//     age: 35,
//     address: "789 Oak St",
//   },
//   {
//     key: "1",
//     name: "John Doe",
//     age: 30,
//     address: "123 Main St",
//   },
//   {
//     key: "2",
//     name: "Jane Smith",
//     age: 28,
//     address: "456 Elm St",
//   },
//   {
//     key: "3",
//     name: "Bob Johnson",
//     age: 35,
//     address: "789 Oak St",
//   },
//   {
//     key: "2",
//     name: "Jane Smith",
//     age: 28,
//     address: "456 Elm St",
//   },
//   {
//     key: "3",
//     name: "Bob Johnson",
//     age: 35,
//     address: "789 Oak St",
//   },
//   // Add more rows as needed
// ];

// const columns = [
//   {
//     title: "MSR-IP",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "IP Address",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "Current Path",
//     dataIndex: "address",
//     key: "address",
//   },
//   {
//     title: "Delay",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "Need Optimization",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "Comment",
//     dataIndex: "address",
//     key: "address",
//   },
//   {
//     title: "Optimized Route IP",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "Optimized Delay",
//     dataIndex: "address",
//     key: "address",
//   },
//   // Add more columns as needed
// ];

// const LatencyOptimizationPage = () => {
//   const [size, setSize] = useState("large");
//   const rowClassName = (record, index) => {
//     if (index % 2 === 0) {
//       return "rowClassName1";
//     } else {
//       return "rowClassName2";
//     }
//   };
//   return (
//     <MainDiv style={{ padding: "20px 30px" }}>
//       <div>
//         <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
//           <Button type="primary" icon={<UploadOutlined />} size={size}>
//             Upload
//           </Button>
//           <Button type="primary" size={size}>
//             Start
//           </Button>
//           <Button type="primary" icon={<DownloadOutlined />} size={size}>
//             Download
//           </Button>
//         </div>
//         <TableStyle
//           rowClassName={rowClassName}
//           dataSource={data}
//           columns={columns}
//           pagination={{
//             showSizeChanger: true,
//             pageSizeOptions: ["3", data.length],
//           }}
//         />
//       </div>
//     </MainDiv>
//   );
// };

// export default LatencyOptimizationPage;
import React, { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "../BGPTrafficOptimization/side_bar";
import Sidebar2 from "./side_bar";
import {
  Button,
  Checkbox,
  Form,
  Input,
  ConfigProvider,
  Table,
  Layout,
} from "antd";

const { Content } = Layout;
const LatencyOptimizationPage = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    // setCollapsed(!collapsed);
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "0 0 auto", position: "fixed", height: "100vh" }}>
        <Sidebar2 collapsed={collapsed} onCollapse={toggleSidebar} />
      </div>
      <div style={{ flex: "1 1 auto", marginLeft: "197px", overflowY: "auto" }}>
        <Content>
          <Outlet />
        </Content>
      </div>
    </div>
  );
};

export default LatencyOptimizationPage;

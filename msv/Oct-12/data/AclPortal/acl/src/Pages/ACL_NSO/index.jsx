import React, { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "./side_bar";
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
const Dashboard = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    // setCollapsed(!collapsed);
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "0 0 auto", position: "fixed", height: "100vh" }}>
        <Sidebar collapsed={collapsed} onCollapse={toggleSidebar} />
      </div>
      <div style={{ flex: "1 1 auto", marginLeft: "180px", overflowY: "auto" }}>
        <Content>
          <Outlet />
        </Content>
      </div>
    </div>
  );
};

export default Dashboard;

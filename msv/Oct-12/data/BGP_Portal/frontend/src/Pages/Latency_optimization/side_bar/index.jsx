import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./styles/main.css";

import { CompassOutlined } from "@ant-design/icons";
import {
  SidebarMainMenuSection,
  SidebarMenuItem,
  SidebarSection,
} from "../../../Components/GlobalStyles/main.styled.js";
// const { Sider } = Layout;
// const { SubMenu } = Menu;

const Sidebar2 = ({ collapsed, onCollapse }) => {
  const { pathname } = useLocation();
  return (
    <>
      <SidebarSection collapsed={collapsed} onCollapse={onCollapse}>
        <SidebarMainMenuSection
          // theme="light"
          mode="inline"
          defaultSelectedKeys={[pathname]}
        >
          <SidebarMenuItem
            key="/latency-optimization/traffic-drill-down2"
            icon={<CompassOutlined />}
            mainloc={pathname === "/latency-optimization/traffic-drill-down2"}
            //  className="custom-menu-item"
          >
            <NavLink to="/latency-optimization/traffic-drill-down2">
              Traffic DrillDown
            </NavLink>
          </SidebarMenuItem>
          <SidebarMenuItem
            key="/latency-optimization/analytics"
            icon={<CompassOutlined />}
            mainloc={pathname === "/latency-optimization/analytics"}
          >
            <NavLink to="/latency-optimization/analytics">Analytics</NavLink>
          </SidebarMenuItem>
        </SidebarMainMenuSection>
      </SidebarSection>
    </>
  );
};

export default Sidebar2;

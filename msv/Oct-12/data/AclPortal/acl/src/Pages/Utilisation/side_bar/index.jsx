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

const Sidebar = ({ collapsed, onCollapse }) => {
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
            key="/utilization/transit"
            icon={<CompassOutlined />}
            mainloc={pathname === "/utilization/transit"}
            //  className="custom-menu-item"
          >
            <NavLink to="/utilization/transit">Transit</NavLink>
          </SidebarMenuItem>
          <SidebarMenuItem
            key="/utilization/peering"
            icon={<CompassOutlined />}
            mainloc={pathname === "/utilization/peering"}
            //  className="custom-menu-item"
          >
            <NavLink to="/utilization/peering">Peering</NavLink>
          </SidebarMenuItem>
          <SidebarMenuItem
            key="/utilization/backhaul"
            icon={<CompassOutlined />}
            mainloc={pathname === "/utilization/backhaul"}
            //  className="custom-menu-item"
          >
            <NavLink to="/utilization/backhaul">Backhaul</NavLink>
          </SidebarMenuItem>
          {/* <SidebarMenuItem
            key="/bgp-collector/cmd"
            icon={<CompassOutlined />}
            //  className="custom-menu-item"
          >
            <NavLink to="/bgp-collector/cmd">Command Runner</NavLink>
          </SidebarMenuItem>
          <SidebarMenuItem
            key="/bgp-collector/detail"
            icon={<HourglassOutlined />}
            //  className="custom-menu-item"
          >
            <NavLink to="/bgp-collector/detail">Output</NavLink>
          </SidebarMenuItem> */}
          {/* <Menu.Item key="3" icon={<UploadOutlined />}>
          <NavLink to="/option2">Option 2</NavLink>
        </Menu.Item>
        <Menu.Item key="13" icon={<UploadOutlined />}>
          <NavLink to="/option2">Option 2</NavLink>
        </Menu.Item>
        <Menu.Item key="32" icon={<UploadOutlined />}>
          <NavLink to="/option2">Option 2</NavLink>
        </Menu.Item>
        <SubMenu key="sub1" icon={<DownOutlined />} title="Submenu 1">
          <Menu.Item key="4">
            <NavLink to="/submenuoption1">Submenu option 1</NavLink>
          </Menu.Item>
          <Menu.Item key="5">
            <NavLink to="/submenuoption2">Submenu option 2</NavLink>
          </Menu.Item>
          <Menu.Item key="6">
            <NavLink to="/submenuoption3">Submenu option 3</NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<DownOutlined />} title="Submenu 2">
          <SubMenu key="sub3" icon={<DownOutlined />} title="Submenu 3">
            <Menu.Item key="7">Submenu option 1</Menu.Item>
            <Menu.Item key="8">Submenu option 2</Menu.Item>
            <Menu.Item key="9">Submenu option 3</Menu.Item>
          </SubMenu>
          <Menu.Item key="10">Submenu option 1</Menu.Item>
          <Menu.Item key="11">Submenu option 2</Menu.Item>
          <Menu.Item key="12">Submenu option 3</Menu.Item>
        </SubMenu> */}
        </SidebarMainMenuSection>
      </SidebarSection>
    </>
  );
};

export default Sidebar;

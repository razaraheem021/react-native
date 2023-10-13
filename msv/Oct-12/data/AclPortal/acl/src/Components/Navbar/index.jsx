import {
  BellOutlined,
  MenuOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  List,
  Menu,
  Popover,
  Typography,
  Switch,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import socketIOClient from "socket.io-client";
import styled from "styled-components";
import { ThemeContext } from "../../ThemeContext";
import Logo from "./assets/ciscoLogo.png";
import LogoBGP from "./assets/logobgp.svg";
import MobilyLogo from "./assets/mobilyLogo.png";
import profile from "./assets/profile.png";

import { baseUrl } from "../../utils/axios/index.jsx";
import {
  NavbarStyledMenu,
  NavbarStyling2,
  NavbarStyling,
} from "../GlobalStyles/main.styled.js";

const { Text } = Typography;

const StyledMenu = styled(Menu)`
  background-color: #009bdb;
  display: flex;
  justify-content: center;

  /* color: ${(props) =>
    props.mainloc ? "#fff !important" : "#000 !important"}; */
  padding-bottom: 1px !important;
`;
const StyledLink = styled(Link)`
  /* color: ${(props) =>
    props.mainloc ? "#fff !important" : "#333 !important"}; */
  color: ${({ theme }) => theme.color.fontColor} !important;
  font-weight: ${(props) => (props.mainloc ? "bold" : "normal")};
  padding-top: 30px;
`;
const MenuStyledLink = styled(Menu.Item)`
  background-color: ${(props) =>
    props.mainloc ? "#009BDB4D !important" : "transparent !important"};
  width: 180px;
  text-align: center;
`;
const ToggleButton = styled.button`
  /* Style your toggle button here */
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #009bdb;
  color: #fff;
  border: none;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;

  &.cross-icon {
    transform: rotate(180deg);
    transition: transform 0.3s;
  }
`;
const Navbar = () => {
  const location = useLocation();
  const { pathname } = useLocation();
  const themeContext = useContext(ThemeContext);
  const { isActivetheme, toggleTheme, setIsActivetheme } =
    useContext(ThemeContext);

  const [notifications, setNotifications] = useState([]);

  // Rest of the code remains the same...

  // Add a state for controlling the mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  // Function to close the mobile menu when a menu item is clicked
  const handleMenuItemClick = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const socket = socketIOClient(baseUrl);
    socket.on("notification", (data) => {
      console.log("notification======>", data);
      setNotifications((notify) => [...notify, data]);
    });
    socket.on("test", (data) => {
      console.log(data);
    });
    return () => socket.disconnect();
  }, []);
  const openNotification = (item) => {
    // navi
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleClearNotification = (item) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== item.id
    );
    setNotifications(updatedNotifications);
  };

  const renderNotificationActions = (item) => (
    <>
      <Button type="link" onClick={() => handleClearNotification(item)}>
        Clear
      </Button>
    </>
  );

  const content = (
    <List
      style={{ width: "350px" }}
      dataSource={notifications}
      renderItem={(item) => (
        <List.Item actions={[renderNotificationActions(item)]}>
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={item.title}
            description={item.content}
          />
        </List.Item>
      )}
      footer={
        <div>
          <Button type="link" onClick={handleClearAll}>
            Clear All
          </Button>
        </div>
      }
    />
  );

  const handleThemeToggle = () => {
    themeContext.toggleTheme();
    console.log(isActivetheme);
  };
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggle = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <>
      <NavbarStyling style={{ height: "50px" }}>
        <img
          src={Logo}
          alt=""
          style={{
            alignItems: "center",
            padding: "12px 12px",
            marginRight: "30px",
          }}
          width="80px"
          height="30px"
        />
        <img
          src={MobilyLogo}
          alt=""
          style={{
            alignItems: "center",
            padding: "10px 15px",
            marginRight: "30px",
          }}
          width="50px"
          height="30px"
        />
        <img
          src={LogoBGP}
          alt=""
          style={{ alignItems: "center", padding: "17px 15px" }}
          width="220px"
          height="20px"
        />
        {/* <p
        style={{
          width: "500px",
          paddingRight: "10px",
          color: "#FFF",
          fontWeight: 700,
        }}
      >
        BGP Traffic Optimizer
      </p> */}
        {/* <Button onClick={handleThemeToggle}>Toggle Theme</Button> */}

        <NavbarStyledMenu
          mode="horizontal"
          // mode={ mobileMenuOpen ? "vertical" : "horizontal" }
          selectedKeys={[pathname]}
          style={{ width: "100%" }}
        >
          {/* <MenuStyledLink
          key="/async_cmd-runner"
          mainloc={
            pathname === "/async_cmd-runner"
          }
        >
          <StyledLink
            to="/async_cmd-runner"
            mainloc={
              pathname === "/async_cmd-runner"
            }
          >
            Async Cmd Runner
          </StyledLink>
        </MenuStyledLink> */}
          {/* <MenuStyledLink
          key="/snmp-collector"
          mainloc={pathname === "/snmp-collector"}
        >
          <StyledLink
            to="/snmp-collector"
            mainloc={pathname === "/snmp-collector"}
          >
            SNMP Collector
          </StyledLink>
        </MenuStyledLink> */}
          {/* <MenuStyledLink key="/netflow" mainloc={pathname === "/netflow"}>
          <StyledLink to="/netflow" mainloc={pathname === "/netflow"}>
            Netflow
          </StyledLink>
        </MenuStyledLink> */}

          {/* <MenuStyledLink
          key="/utilization/transit"
          mainloc={
            pathname === "/utilization/transit" ||
            pathname === "/utilization/peering" ||
            pathname === "/utilization/backhaul"
          }
        >
          <StyledLink
            to="/utilization/transit"
            mainloc={
              pathname === "/utilization/transit" ||
              pathname === "/utilization/peering" ||
              pathname === "/utilization/backhaul"
            }
          >
            Utilization
          </StyledLink>
        </MenuStyledLink> */}
          {/* <MenuStyledLink
          key="/traffic-manuplater"
          mainloc={
            pathname === "/traffic-manuplater" ||
            pathname === "/traffic-manuplater/perticular-interface"
          }
        >
          <StyledLink
            to="/traffic-manuplater"
            mainloc={
              pathname === "/traffic-manuplater" ||
              pathname === "/traffic-manuplater/perticular-interface"
            }
          >
            Traffic Manuplater
          </StyledLink>
        </MenuStyledLink> */}

          {/* ------------------------------------------------------------ */}
          <MenuStyledLink
            key="/bgp-traffic-optimization/traffic-drill-down"
            mainloc={
              pathname === "/bgp-traffic-optimization/traffic-drill-down" ||
              location.pathname.startsWith(
                "/bgp-traffic-optimization/traffic-manipulation"
              ) ||
              pathname === "/bgp-traffic-optimization/analytics" ||
              pathname === "/bgp-traffic-optimization/asyn_cmd_runner"
            }
          >
            <StyledLink
              to="/bgp-traffic-optimization/traffic-drill-down"
              mainloc={
                pathname === "/bgp-traffic-optimization/traffic-drill-down" ||
                // pathname === "/bgp-traffic-optimization/traffic-manipulation" ||
                location.pathname.startsWith(
                  "/bgp-traffic-optimization/traffic-manipulation"
                ) ||
                pathname === "/bgp-traffic-optimization/analytics" ||
                pathname === "/bgp-traffic-optimization/asyn_cmd_runner"
              }
            >
              BGP
            </StyledLink>
          </MenuStyledLink>
          <MenuStyledLink
            key="/acl/add-site-mapping"
            mainloc={
              pathname === "/acl/service-mapping" || pathname === "/acl/onboard"
              // ||
              // pathname === "/bgp-traffic-optimization/traffic-manipulation" ||
              // pathname === "/bgp-traffic-optimization/analytics" ||
              // pathname === "/bgp-traffic-optimization/asyn_cmd_runner" ||
              // pathname === "/bgp-traffic-optimization/devices"
            }
          >
            <StyledLink
              to="/acl/service-mapping"
              mainloc={
                pathname === "/acl/service-mapping" ||
                pathname === "/acl/onboard"
                // ||
                // pathname === "/bgp-traffic-optimization/analytics" ||
                // pathname === "/bgp-traffic-optimization/asyn_cmd_runner" ||
                // pathname === "/bgp-traffic-optimization/devices"
              }
            >
              ACL
            </StyledLink>
          </MenuStyledLink>
          {/* <MenuStyledLink key="/admin" mainloc={pathname === "/admin"}>
            <StyledLink to="/admin" mainloc={pathname === "/admin"}>
              Admin
            </StyledLink>
          </MenuStyledLink> */}
          {/* <MenuStyledLink
            key="/asyn_cmd_runner"
            mainloc={pathname === "/asyn_cmd_runner"}
          >
            <StyledLink
              to="/asyn_cmd_runner"
              mainloc={pathname === "/asyn_cmd_runner"}
            >
              Async Cmd Runner
            </StyledLink>
          </MenuStyledLink>

          <MenuStyledLink
            key="/traffic-drill-down"
            mainloc={
              location.pathname === "/traffic-drill-down" ||
              // pathname === "traffic-drill-down/traffic-manipulation/*"
              location.pathname.startsWith(
                "/traffic-drill-down/traffic-manipulation"
              )
            }
          >
            <StyledLink
              to="/traffic-drill-down"
              mainloc={
                location.pathname === "/traffic-drill-down" ||

                location.pathname.startsWith(
                  "/traffic-drill-down/traffic-manipulation"
                )
              }
            >
              Traffic DrillDown
            </StyledLink>
          </MenuStyledLink>
          <MenuStyledLink key="/analytics" mainloc={pathname === "/analytics"}>
            <StyledLink to="/analytics" mainloc={pathname === "/analytics"}>
              Analytics
            </StyledLink>
          </MenuStyledLink>*/}
          <MenuStyledLink
            key="/setting/user"
            mainloc={
              pathname === "/setting/user" || pathname === "/setting/devices"
            }
          >
            <StyledLink
              to="/setting/user"
              mainloc={
                pathname === "/setting/user" || pathname === "/setting/devices"
              }
            >
              Settings
            </StyledLink>
          </MenuStyledLink>
          {/* ----------------------------------- */}
          {/* ------------------------------------------------------------ */}
          {/* <MenuStyledLink
            key="/asyn_cmd_runner"
            mainloc={pathname === "/asyn_cmd_runner"}
          >
            <StyledLink
              to="/asyn_cmd_runner"
              mainloc={pathname === "/asyn_cmd_runner"}
            >
              Async Cmd Runner
            </StyledLink>
          </MenuStyledLink>

          <MenuStyledLink
            key="/traffic-drill-down"
            mainloc={
              location.pathname === "/traffic-drill-down" ||
              // pathname === "traffic-drill-down/traffic-manipulation/*"
              location.pathname.startsWith(
                "/traffic-drill-down/traffic-manipulation"
              )
            }
          >
            <StyledLink
              to="/traffic-drill-down"
              mainloc={
                location.pathname === "/traffic-drill-down" ||

                location.pathname.startsWith(
                  "/traffic-drill-down/traffic-manipulation"
                )
              }
            >
              Traffic DrillDown
            </StyledLink>
          </MenuStyledLink>
          <MenuStyledLink key="/analytics" mainloc={pathname === "/analytics"}>
            <StyledLink to="/analytics" mainloc={pathname === "/analytics"}>
              Analytics
            </StyledLink>
          </MenuStyledLink>
          <MenuStyledLink
            key="/setting/user"
            mainloc={
              pathname === "/setting/user" || pathname === "/setting/devices"
            }
          >
            <StyledLink
              to="/setting/user"
              mainloc={
                pathname === "/setting/user" || pathname === "/setting/devices"
              }
            >
              Settings
            </StyledLink>
          </MenuStyledLink> */}
          {/* ----------------------------------- */}

          {/* <MenuStyledLink
          key="/utilization"
          mainloc={ pathname === "/utilization" }
        >
          <StyledLink to="/utilization" mainloc={ pathname === "/utilization" }>
            Utilization
          </StyledLink>
        </MenuStyledLink> */}
          {/* <MenuStyledLink
          key="/traffic-manipulator"
          mainloc={ pathname === "/traffic-manipulator" }
        >
          <StyledLink
            to="/traffic-manipulator"
            mainloc={ pathname === "/traffic-manipulator" }
          >
            Traffic-Manipulator
          </StyledLink>
        </MenuStyledLink> */}
          {/* <MenuStyledLink
          key="/dashboard/main"
          mainloc={
            pathname === "/dashboard/main" || pathname === "/dashboard/message"
          }
        >
          <StyledLink
            to="/dashboard/main"
            mainloc={
              pathname === "/dashboard/main" ||
              pathname === "/dashboard/message"
            }
          >
            Home
          </StyledLink>
        </MenuStyledLink> */}
          {/* <MenuStyledLink
          key="/bgp-collector/main"
          mainloc={
            pathname === "/bgp-collector/main" ||
            pathname === "/bgp-collector/detail" ||
            pathname === "/bgp-collector/cmd"
          }
        >
          <StyledLink
            to="/bgp-collector/main"
            mainloc={
              pathname === "/bgp-collector/main" ||
              pathname === "/bgp-collector/detail" ||
              pathname === "/bgp-collector/cmd"
            }
          >
            BGP Collector
          </StyledLink>
        </MenuStyledLink> */}
          {/*
      <MenuStyledLink key="/show-discovered-data"
       mainloc={pathname === "/show-discovered-data"}
      >
        <StyledLink to="/show-discovered-data" mainloc={pathname === "/show-discovered-data"}>Discovered Devices</StyledLink>
      </MenuStyledLink>
      <MenuStyledLink key="/show-auth-group-data"
       mainloc={pathname === "/show-auth-group-data"}
      >
        <StyledLink to="/show-auth-group-data" mainloc={pathname === "/show-auth-group-data"}>Auth Groups</StyledLink>
      </MenuStyledLink> */}
          {/* <MenuStyledLink key="/onboarded-devices"
       mainloc={pathname === "/onboarded-devices"}
      >
        <StyledLink to="/onboarded-devices" mainloc={pathname === "/onboarded-devices"}>OnBOarded Device</StyledLink>
      </MenuStyledLink> */}
          {/* <MenuStyledLink key="/vm-onboarded-devices"
       mainloc={pathname === "/vm-onboarded-devices"}
      >
        <StyledLink to="/vm-onboarded-devices" mainloc={pathname === "/vm-onboarded-devices"}>Real-Time Devices</StyledLink>
      </MenuStyledLink> */}
        </NavbarStyledMenu>

        <div
          style={{
            display: "flex-end",
            alignItems: "center",
            marginRight: "25px",
          }}
        >
          <div style={{ display: "flex" }}>
            <Switch
              //   defaultChecked
              style={{ marginTop: "14px" }}
              onClick={handleThemeToggle}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/* <Space size={24}>
            <Badge count={1}>
              <Avatar
                shape="square"
                icon={<BellOutlined />}
                onClick={() => openNotification(notifications[0])}
              />
            </Badge>
          </Space> */}
            {/* <List
            style={{ zIndex: 100 }}
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item actions={[renderNotificationActions(item)]}>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={item.title}
                  description={item.content}
                />
              </List.Item>
            )}
            footer={
              <div>
                <Button type="link" onClick={handleClearAll}>
                  Clear All
                </Button>
              </div>
            }
          /> */}
            <div style={{ marginTop: "5px", cursor: "pointer" }}>
              <Popover
                placement="bottomRight"
                title="Notifications"
                content={content}
                trigger="click"
              >
                {/* <Button
              type="primary"
              icon={<BellOutlined />}
              onClick={() => openNotification(notifications[0])}
            ></Button> */}

                <Badge count={notifications.length}>
                  <Avatar
                    shape="square"
                    icon={<BellOutlined />}
                    onClick={() => openNotification(notifications[0])}
                  />
                </Badge>
              </Popover>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div style={{ width: "80px", padding: "0px", marginTop: "8px" }}>
              <Text
                level={2}
                style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}
              >
                User
              </Text>
            </div>
            <img src={profile} alt="" style={{ marginTop: "5px" }} />
          </div>
          {/* <p style={{ padding: "0px", marginTop: "10px" }}>raza</p> */}
        </div>
      </NavbarStyling>
      <NavbarStyling2>
        <div className="flex">
          <img
            src={Logo}
            alt=""
            style={{
              alignItems: "center",
              padding: "12px 12px",
              marginRight: "30px",
            }}
            width="80px"
            height="30px"
          />
          <img
            src={MobilyLogo}
            alt=""
            style={{
              alignItems: "center",
              padding: "10px 15px",
              marginRight: "30px",
            }}
            width="30px"
            height="30px"
          />
          <img
            src={LogoBGP}
            alt=""
            style={{ alignItems: "center", padding: "10px 15px" }}
            width="220px"
            height="20px"
          />
        </div>
        <ToggleButton
          onClick={handleToggle}
          className={showSidebar ? "cross-icon" : ""}
        >
          {showSidebar ? <CloseOutlined /> : <MenuOutlined />}
        </ToggleButton>
        {showSidebar && (
          <>
            <NavbarStyledMenu
              mode="horizontal"
              // mode={ mobileMenuOpen ? "vertical" : "horizontal" }
              selectedKeys={[pathname]}
              style={{ width: "100%" }}
            >
              <MenuStyledLink
                key="/asyn_cmd_runner"
                mainloc={pathname === "/asyn_cmd_runner"}
              >
                <StyledLink
                  to="/asyn_cmd_runner"
                  mainloc={pathname === "/asyn_cmd_runner"}
                >
                  Async Cmd Runner
                </StyledLink>
              </MenuStyledLink>

              <MenuStyledLink
                key="/traffic-drill-down"
                mainloc={
                  location.pathname === "/traffic-drill-down" ||
                  location.pathname.startsWith(
                    "/bgp-traffic-optimization/traffic-manipulation"
                  )
                }
              >
                <StyledLink
                  to="/traffic-drill-down"
                  mainloc={
                    location.pathname === "/traffic-drill-down" ||
                    location.pathname.startsWith(
                      "/bgp-traffic-optimization/traffic-manipulation"
                    )
                  }
                >
                  Traffic DrillDown
                </StyledLink>
              </MenuStyledLink>
              <MenuStyledLink
                key="/analytics"
                mainloc={pathname === "/analytics"}
              >
                <StyledLink to="/analytics" mainloc={pathname === "/analytics"}>
                  Analytics
                </StyledLink>
              </MenuStyledLink>
            </NavbarStyledMenu>
          </>
        )}
      </NavbarStyling2>
    </>
  );
};

export default Navbar;

import {
  BellOutlined,
  MenuOutlined,
  CloseOutlined,
  CheckOutlined,
  LoginOutlined,
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
import { Link, useLocation, useNavigate } from "react-router-dom";
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
// const MenuStyledLink = styled(Menu.Item)`
//   background-color: ${(props) =>
//     props.mainloc ? "#009BDB4D !important" : "transparent !important"};
//   width: 20%;
//   overflow: hidden;
//   text-align: center;
// `;
const MenuStyledLink = styled(Menu.Item)`
  background-color: ${(props) =>
    props.mainloc ? "#009BDB4D !important" : "transparent !important"};
  width: 20%;

  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media screen and (max-width: 900px) {
    /* Apply ellipsis when screen width is 900px or less */
    width: auto; /* Allow content to adjust its width as needed */
  }
`;
const ToggleButton = styled.button`
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
  const navigate = useNavigate();
  const AclUserName = localStorage.getItem("bgp_username");

  const { pathname } = useLocation();
  const themeContext = useContext(ThemeContext);
  const { isActivetheme, toggleTheme, setIsActivetheme } =
    useContext(ThemeContext);

  const [notifications, setNotifications] = useState([]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

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

        <NavbarStyledMenu
          mode="horizontal"
          // mode={ mobileMenuOpen ? "vertical" : "horizontal" }
          selectedKeys={[pathname]}
          style={{ width: "100%" }}
        >
          {/* ------------------------------------------------------------ */}
          {AclUserName === "razaraheem" ? (
            <MenuStyledLink
              key="/acl/add-site-mapping"
              mainloc={
                pathname === "/acl/service-mapping" ||
                pathname === "/acl/onboard"
              }
            >
              <StyledLink
                to="/acl/service-mapping"
                mainloc={
                  pathname === "/acl/service-mapping" ||
                  pathname === "/acl/onboard"
                }
              >
                ACL
              </StyledLink>
            </MenuStyledLink>
          ) : (
            <>
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
                    pathname ===
                      "/bgp-traffic-optimization/traffic-drill-down" ||
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
                key="/latency-optimization/traffic-drill-down2"
                mainloc={
                  pathname === "/latency-optimization/traffic-drill-down2" ||
                  location.pathname.startsWith(
                    "/latency-optimization/traffic-manipulation"
                  ) ||
                  pathname === "/latency-optimization/analytics"
                }
              >
                <StyledLink
                  to="/latency-optimization/traffic-drill-down2"
                  mainloc={
                    pathname === "/latency-optimization/traffic-drill-down2" ||
                    location.pathname.startsWith(
                      "/latency-optimization/traffic-manipulation"
                    ) ||
                    pathname === "/latency-optimization/analytics"
                  }
                >
                  Latency Optimization
                </StyledLink>
              </MenuStyledLink>
              {/* <MenuStyledLink
                key="/latency-optimization"
                mainloc={pathname === "/latency-optimization"}
              >
                <StyledLink
                  to="/latency-optimization"
                  mainloc={pathname === "/latency-optimization"}
                >
                  Latency Optimization
                </StyledLink>
              </MenuStyledLink> */}

              <MenuStyledLink
                key="/setting/user"
                mainloc={
                  pathname === "/setting/user" ||
                  pathname === "/setting/devices"
                }
              >
                <StyledLink
                  to="/setting/user"
                  mainloc={
                    pathname === "/setting/user" ||
                    pathname === "/setting/devices"
                  }
                >
                  Settings
                </StyledLink>
              </MenuStyledLink>
              <MenuStyledLink
                key="/acl/add-site-mapping"
                mainloc={
                  pathname === "/acl/service-mapping" ||
                  pathname === "/acl/onboard"
                }
              >
                <StyledLink
                  to="/acl/service-mapping"
                  mainloc={
                    pathname === "/acl/service-mapping" ||
                    pathname === "/acl/onboard"
                  }
                >
                  ACL
                </StyledLink>
              </MenuStyledLink>
            </>
          )}
        </NavbarStyledMenu>

        <div
          style={{
            display: "flex-end",
            alignItems: "center",
            marginRight: "25px",
          }}
        >
          <div style={{ display: "flex" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {/* <Switch
              //   defaultChecked
              style={{ marginTop: "14px" }}
              onClick={handleThemeToggle}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
            <div style={{ marginTop: "10px", cursor: "pointer" }}>
              <Popover
                placement="bottomRight"
                title="Notifications"
                content={content}
                trigger="click"
              >
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
            <LoginOutlined
              onClick={() => {
                localStorage.removeItem("bgp_username");
                localStorage.removeItem("bgp_token");
                navigate("login");
              }}
              title="Logout"
              style={{
                marginTop: "10px",
                color: "#FBE2E3",
                fontWeight: "700",
                fontSize: "22px",
              }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div
              style={{
                cursor: "pointer",
                width: "80px",
                padding: "0px",
                marginTop: "13px",
              }}
            >
              <Text
                level={2}
                style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}
              >
                {localStorage.getItem("bgp_username")}
              </Text>
            </div>
            <img src={profile} alt="" style={{ marginTop: "5px" }} />
          </div>
        </div>
      </NavbarStyling>

      {/* =============================== */}

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
              {/* ------------------------------------------------------------ */}
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
                    pathname ===
                      "/bgp-traffic-optimization/traffic-drill-down" ||
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
                key="/latency-optimization/traffic-drill-down2"
                mainloc={
                  pathname === "/latency-optimization/traffic-drill-down2" ||
                  location.pathname.startsWith(
                    "/latency-optimization/traffic-manipulation"
                  ) ||
                  pathname === "/latency-optimization/analytics"
                }
              >
                <StyledLink
                  to="/latency-optimization/traffic-drill-down2"
                  mainloc={
                    pathname === "/latency-optimization/traffic-drill-down2" ||
                    location.pathname.startsWith(
                      "/latency-optimization/traffic-manipulation"
                    ) ||
                    pathname === "/latency-optimization/analytics"
                  }
                >
                  Latency Optimization
                </StyledLink>
              </MenuStyledLink>
              <MenuStyledLink
                key="/acl/add-site-mapping"
                mainloc={
                  pathname === "/acl/service-mapping" ||
                  pathname === "/acl/onboard"
                }
              >
                <StyledLink
                  to="/acl/service-mapping"
                  mainloc={
                    pathname === "/acl/service-mapping" ||
                    pathname === "/acl/onboard"
                  }
                >
                  ACL
                </StyledLink>
              </MenuStyledLink>

              <MenuStyledLink
                key="/setting/user"
                mainloc={
                  pathname === "/setting/user" ||
                  pathname === "/setting/devices"
                }
              >
                <StyledLink
                  to="/setting/user"
                  mainloc={
                    pathname === "/setting/user" ||
                    pathname === "/setting/devices"
                  }
                >
                  Settings
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

import { ConfigProvider, Layout } from "antd";
import React, { Suspense, useContext, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "sweetalert2/dist/sweetalert2.min.css";
import Loader from "./Components/CustomLoader";
import { ThemeContext } from "./ThemeContext";
import "./dark.css";
import "./light.css";
import theme from "./styles/theme.js";

const { Content } = Layout;

const USER_TYPES = {
  public: "Public User",
  normal: "Normal User",
  admin: "Admin User",
};

const CurrentUser = USER_TYPES.normal;

const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const Login = React.lazy(() => import("./Pages/Login"));
const FirstTimeLogin = React.lazy(() => import("./Pages/FirstTimeLogin"));
const Navbar = React.lazy(() => import("./Components/Navbar"));
const SecondDashboard = React.lazy(() => import("./Pages/Second"));
// const AsyncCmdRunner = React.lazy(() => import("./Pages/BgpCollector"));
const AsyncCmdRunner = React.lazy(() =>
  import("./Pages/BGPTrafficOptimization/AsynCmdRunner/mainSection.jsx")
);
const Netflow = React.lazy(() => import("./Pages/Netflow"));
const SnmpCollector = React.lazy(() => import("./Pages/SNMP_Collector"));
const DashboardMessages = React.lazy(() =>
  import("./Pages/Dashboard/DashboardMessages")
);
const Home = React.lazy(() => import("./Pages/Dashboard/Home"));
const SecondDashboardMessages = React.lazy(() =>
  import("./Pages/Second/DashboardMessages")
);
const SecondHome = React.lazy(() => import("./Pages/Second/Home"));
const BgpCollectorMain = React.lazy(() => import("./Pages/BgpCollector"));
const UtilizationMain = React.lazy(() => import("./Pages/Utilisation"));
const SettingMain = React.lazy(() => import("./Pages/Setting"));
const BGPMain = React.lazy(() => import("./Pages/BGPTrafficOptimization"));
const SettingUser = React.lazy(() => import("./Pages/Setting/User"));
const SettingDevices = React.lazy(() => import("./Pages/Setting/Devices"));
const BGP_Devices = React.lazy(() =>
  import("./Pages/BGPTrafficOptimization/Devices")
);

// ----------------------ACL---------------------------
const ACL_NSO_Main = React.lazy(() => import("./Pages/ACL_NSO"));
const AddSiteMapping = React.lazy(() =>
  import("./Pages/ACL_NSO/AddSiteMapping")
);
const CreateAnACL = React.lazy(() => import("./Pages/ACL_NSO/CreateAnACL"));
const AclNamesVrfMapping = React.lazy(() =>
  import("./Pages/ACL_NSO/ACLNamesVrfMapping")
);

// ----------------------------BGP--------------------------------
const BgpCollectorProviderIpsFromRouter = React.lazy(() =>
  import("./Pages/BgpCollector/main/ProviderIpsFromRouter.jsx")
);
const BgpCollectorRouterMain = React.lazy(() =>
  import("./Pages/BgpCollector/main/index.jsx")
);
const UtilizationTransit = React.lazy(() =>
  import("./Pages/Utilisation/Transit")
);
const UtilizationPeering = React.lazy(() =>
  import("./Pages/Utilisation/Peering")
);
const UtilizationBackhaul = React.lazy(() =>
  import("./Pages/Utilisation/Backhaul")
);
const BgpCollectorCmdRunnerDetails = React.lazy(() =>
  import("./Pages/BgpCollector/main/details")
);
const Utilisation = React.lazy(() => import("./Pages/Utilisation"));
const ModifiedUtilization = React.lazy(() =>
  import("./Pages/Utilisation/Modified")
);
const ModifiedTraffic = React.lazy(() =>
  import("./Pages/TrafficManuplater/Modified")
);
// const TrafficManuplater = React.lazy(() => import("./Pages/TrafficManuplater"));
const TrafficManuplaterPerticularInterface = React.lazy(() =>
  import("./Pages/TrafficManuplater/PerticularInterface")
);
const TrafficManuplater = React.lazy(() =>
  import("./Pages/BGPTrafficOptimization/TrafficDrillDown/TrafficManuplation")
);

const InflexSection = React.lazy(() =>
  import("./Pages/BGPTrafficOptimization/InfluxSection")
);
const TrafficDrillDown = React.lazy(() =>
  import("./Pages/BGPTrafficOptimization/TrafficDrillDown")
);
const TrafficDrillDownTrafficManipulation = React.lazy(() =>
  import("./Pages/TrafficDrillDown/TrafficManuplation")
);
const Admin = React.lazy(() => import("./Pages/Admin"));

const Test = React.lazy(() => import("./Pages/Test"));
const Table3 = React.lazy(() => import("./Pages/threestep"));

const App = () => {
  const { pathname } = useLocation();
  const { isActivetheme, toggleTheme } = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  console.log("isActivetheme ======>", isActivetheme);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <ThemeProvider theme={isActivetheme ? theme.darkMode : theme.lightMode}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "rgba(0,170,255,0.4)",
            borderRadius: "8px",
          },
        }}
      >
        {pathname !== "/login" && pathname !== "/first-time-login" && (
          <>
            <div
              style={{
                Width: "100vw",
                position: "fixed",
                top: 0,
                zIndex: 9999,
              }}
            >
              <Navbar />
            </div>
          </>
        )}

        <Layout>
          <Content>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <Navigate
                      to="/bgp-traffic-optimization/traffic-drill-down"
                      replace
                    />
                  }
                />

                <Route
                  path="login"
                  element={
                    <PublicElement>
                      <Login />
                    </PublicElement>
                  }
                />
                <Route
                  path="first-time-login"
                  element={
                    <PublicElement>
                      <FirstTimeLogin />
                    </PublicElement>
                  }
                />
                {/* <Route
                  path="snmp-collector"
                  element={
                    <PublicElement>
                      <SnmpCollector />
                    </PublicElement>
                  }
                />

                <Route
                  path="traffic-drill-down"
                  element={
                    <PublicElement>
                      <TrafficDrillDown />
                    </PublicElement>
                  }
                />
                <Route
                  path="traffic-drill-down/traffic-manipulation"
                  element={
                    <PublicElement>
                      <TrafficDrillDownTrafficManipulation />
                    </PublicElement>
                  }
                />
                <Route
                  path="utilization"
                  element={
                    <PublicElement>
                      <ModifiedUtilization />
                    </PublicElement>
                  }
                />
                <Route
                  path="test"
                  element={
                    <PublicElement>
                      <Test />
                    </PublicElement>
                  }
                />
                <Route
                  path="traffic-manipulator"
                  element={
                    <PublicElement>
                      <ModifiedTraffic />
                    </PublicElement>
                  }
                />
                <Route
                  path="utilisation"
                  element={
                    <PublicElement>
                      <Utilisation />
                    </PublicElement>
                  }
                />
                <Route
                  path="traffic-manuplater"
                  element={
                    <PublicElement>
                      <TrafficManuplater />
                    </PublicElement>
                  }
                />
                <Route
                  path="traffic-manuplater/perticular-interface"
                  element={
                    <PublicElement>
                      <TrafficManuplaterPerticularInterface />
                    </PublicElement>
                  }
                />
                <Route
                  path="asyn_cmd_runner"
                  element={
                    <PublicElement>
                      <AsyncCmdRunner />
                    </PublicElement>
                  }
                />
                <Route
                  path="netflow"
                  element={
                    <PublicElement>
                      <Netflow />
                    </PublicElement>
                  }
                />
                <Route
                  path="dashboard"
                  element={
                    <PublicElement>
                      <Dashboard />
                    </PublicElement>
                  }
                >
                  {pathname === "/dashboard/main" ? (
                    <Route
                      path="main"
                      element={
                        <PublicElement>
                          <Home />
                        </PublicElement>
                      }
                    />
                  ) : null}
                  {pathname === "/dashboard/message" ? (
                    <Route
                      path="message"
                      element={
                        <PublicElement>
                          <DashboardMessages />
                        </PublicElement>
                      }
                    />
                  ) : null}
                </Route>
                <Route
                  path="analytics"
                  element={
                    <PublicElement>
                      <InflexSection />
                    </PublicElement>
                  }
                />
                <Route
                  path="bgp-collector"
                  element={
                    <NormalElement>
                      <BgpCollectorMain />
                    </NormalElement>
                  }
                >
                  {pathname === "/bgp-collector/main" ? (
                    <Route
                      path="main"
                      element={
                        <NormalElement>
                          <BgpCollectorRouterMain />
                        </NormalElement>
                      }
                    />
                  ) : null}
                  {pathname === "/bgp-collector/cmd" ? (
                    <Route
                      path="cmd"
                      element={
                        <NormalElement>
                          <BgpCollectorProviderIpsFromRouter />
                        </NormalElement>
                      }
                    />
                  ) : null}
                  {pathname === "/bgp-collector/detail" ? (
                    <Route
                      path="detail"
                      element={
                        <NormalElement>
                          <BgpCollectorCmdRunnerDetails />
                        </NormalElement>
                      }
                    />
                  ) : null}
                </Route> */}

                <Route
                  path="setting"
                  element={
                    <NormalElement>
                      <SettingMain />
                    </NormalElement>
                  }
                >
                  {pathname === "/setting/user" ? (
                    <Route
                      path="user"
                      element={
                        <NormalElement>
                          <SettingUser />
                        </NormalElement>
                      }
                    />
                  ) : null}
                  {pathname === "/setting/devices" ? (
                    <Route
                      path="devices"
                      element={
                        <NormalElement>
                          <SettingDevices />
                        </NormalElement>
                      }
                    />
                  ) : null}
                </Route>
                <Route
                  path="bgp-traffic-optimization"
                  element={
                    <NormalElement>
                      <BGPMain />
                    </NormalElement>
                  }
                >
                  {pathname ===
                  "/bgp-traffic-optimization/traffic-drill-down" ? (
                    <Route
                      path="traffic-drill-down"
                      element={
                        <NormalElement>
                          <TrafficDrillDown />
                        </NormalElement>
                      }
                    />
                  ) : null}

                  {pathname ===
                  "/bgp-traffic-optimization/traffic-manipulation" ? (
                    <Route
                      path="traffic-manipulation"
                      element={
                        <NormalElement>
                          <TrafficManuplater />
                        </NormalElement>
                      }
                    />
                  ) : null}
                  {pathname === "/bgp-traffic-optimization/analytics" ? (
                    <Route
                      path="analytics"
                      element={
                        <NormalElement>
                          <InflexSection />
                        </NormalElement>
                      }
                    />
                  ) : null}
                  {pathname === "/bgp-traffic-optimization/asyn_cmd_runner" ? (
                    <Route
                      path="asyn_cmd_runner"
                      element={
                        <NormalElement>
                          <AsyncCmdRunner />
                        </NormalElement>
                      }
                    />
                  ) : null}
                  {/* {pathname === "/bgp-traffic-optimization/devices" ? (
                    <Route
                      path="devices"
                      element={
                        <NormalElement>
                          <BGP_Devices />
                        </NormalElement>
                      }
                    />
                  ) : null} */}
                </Route>
                {/* -------------------ACL----------------- */}
                <Route
                  path="acl"
                  element={
                    <NormalElement>
                      <ACL_NSO_Main />
                    </NormalElement>
                  }
                >
                  {pathname === "/acl/add-site-mapping" ? (
                    <Route
                      path="add-site-mapping"
                      element={
                        <NormalElement>
                          <AddSiteMapping />
                        </NormalElement>
                      }
                    />
                  ) : null}
                  {pathname === "/acl/service-mapping" ? (
                    <Route
                      path="service-mapping"
                      element={
                        <NormalElement>
                          <CreateAnACL />
                        </NormalElement>
                      }
                    />
                  ) : null}
                  {pathname === "/acl/onboard" ? (
                    <Route
                      path="onboard"
                      element={
                        <NormalElement>
                          <AclNamesVrfMapping />
                        </NormalElement>
                      }
                    />
                  ) : null}

                  {/* -------------------Admin----------------- */}
                </Route>
                <Route
                  path="admin"
                  element={
                    <PublicElement>
                      <Admin />
                    </PublicElement>
                  }
                />
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </ConfigProvider>
    </ThemeProvider>
  );
};

const PublicElement = ({ children }) => {
  return <>{children}</>;
};

const NormalElement = ({ children }) => {
  if (CurrentUser === USER_TYPES.normal || CurrentUser === USER_TYPES.admin) {
    return <>{children}</>;
  } else {
    return <h1>You don't have access</h1>;
  }
};

export default App;

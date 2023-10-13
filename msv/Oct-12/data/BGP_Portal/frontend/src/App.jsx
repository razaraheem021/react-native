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
import { PrivateRoute, PublicRoute } from "./Pages/ProtectedAndPublicRoute";
// import LatencyOptimization from "./Pages/Latency_optimization";
const { Content } = Layout;

const USER_TYPES = {
  public: "Public User",
  normal: "Normal User",
  admin: "Admin User",
};

const CurrentUser = USER_TYPES.normal;

const Login = React.lazy(() => import("./Pages/Login"));
const Navbar = React.lazy(() => import("./Components/Navbar"));
const FirstTimeLogin = React.lazy(() => import("./Pages/FirstTimeLogin"));

const BGPMain = React.lazy(() => import("./Pages/BGPTrafficOptimization"));
const LatencyOptimizationPage = React.lazy(() =>
  import("./Pages/Latency_optimization")
);

const ACL_NSO_Main = React.lazy(() => import("./Pages/ACL_NSO"));

const TrafficManuplater = React.lazy(() =>
  import("./Pages/BGPTrafficOptimization/TrafficDrillDown/TrafficManuplation")
);
const InflexSection = React.lazy(() =>
  import("./Pages/BGPTrafficOptimization/InfluxSection")
);
const Analytics = React.lazy(() =>
  import("./Pages/Latency_optimization/analytics")
);
// const AsyncCmdRunner = React.lazy(() =>
//   import("./Pages/BGPTrafficOptimization/AsynCmdRunner/mainSection.jsx")
// );
const AsyncCmdRunner = React.lazy(() =>
  import("./Pages/AsynCmdRunner/mainSection.jsx")
);

const TrafficDrillDown = React.lazy(() =>
  import("./Pages/BGPTrafficOptimization/TrafficDrillDown")
);
const TrafficDrillDown2 = React.lazy(() =>
  import("./Pages/Latency_optimization/trafficDrillDown")
);

const SettingMain = React.lazy(() => import("./Pages/Setting"));
const SettingUser = React.lazy(() => import("./Pages/Setting/User"));
const SettingDevices = React.lazy(() => import("./Pages/Setting/Devices"));
const AddSiteMapping = React.lazy(() =>
  import("./Pages/ACL_NSO/AddSiteMapping")
);
const ServiceMapping = React.lazy(() =>
  import("./Pages/ACL_NSO/ServiceMapping")
);
const CustomerOnboarding = React.lazy(() =>
  import("./Pages/ACL_NSO/CustomerOnboarding")
);
const Collapseable = React.lazy(() => import("./Pages/ACL_NSO/Collapseable"));

const App = () => {
  const { pathname } = useLocation();
  const location = useLocation();
  const isAllowedPath = location.pathname.startsWith(
    "/bgp-traffic-optimization/traffic-manipulation"
  );
  const { isActivetheme, toggleTheme } = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState(false);
  const token = localStorage.getItem("bgp_token");
  const AclUserName = localStorage.getItem("bgp_username");
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
              {AclUserName === "razaraheem" ? (
                <Routes>
                  <Route element={<PublicRoute />}>
                    <Route
                      path="login"
                      element={
                        <PublicElement>
                          <Login />
                        </PublicElement>
                      }
                    />
                  </Route>

                  <Route element={<PrivateRoute />}>
                    <Route
                      exact
                      path="/"
                      element={<Navigate to="acl/service-mapping" replace />}
                    />

                    <Route
                      path="first-time-login"
                      element={
                        <PublicElement>
                          <FirstTimeLogin />
                        </PublicElement>
                      }
                    />

                    {/* -------------------ACL----------------- */}
                    <Route
                      path="acl"
                      element={
                        <NormalElement>
                          <ACL_NSO_Main />
                        </NormalElement>
                      }
                    >
                      {pathname === "/acl/service-mapping" ? (
                        <Route
                          path="service-mapping"
                          element={
                            <NormalElement>
                              <ServiceMapping />
                            </NormalElement>
                          }
                        />
                      ) : null}
                      {pathname === "/acl/onboard" ? (
                        <Route
                          path="onboard"
                          element={
                            <NormalElement>
                              <CustomerOnboarding />
                            </NormalElement>
                          }
                        />
                      ) : null}
                      {pathname === "/acl/collapse" ? (
                        <Route
                          path="collapse"
                          element={
                            <NormalElement>
                              <Collapseable />
                            </NormalElement>
                          }
                        />
                      ) : null}
                      {pathname === "/acl/onboard" ? (
                        <Route
                          path="onboard"
                          element={
                            <NormalElement>
                              <CustomerOnboarding />
                            </NormalElement>
                          }
                        />
                      ) : null}

                      {/* -------------------Admin----------------- */}
                    </Route>
                    {/* <Route
                    path="admin"
                    element={
                      <PublicElement>
                        <Admin />
                      </PublicElement>
                    }
                  /> */}
                    {isAllowedPath && (
                      <Route
                        path="/*"
                        element={
                          token ? (
                            <Navigate to="/" replace />
                          ) : (
                            <Navigate to="/login" replace />
                          )
                        }
                      />
                    )}
                  </Route>
                </Routes>
              ) : (
                <Routes>
                  <Route element={<PublicRoute />}>
                    <Route
                      path="login"
                      element={
                        <PublicElement>
                          <Login />
                        </PublicElement>
                      }
                    />
                  </Route>

                  <Route element={<PrivateRoute />}>
                    <Route
                      exact
                      path="/"
                      element={
                        <Navigate
                          to="bgp-traffic-optimization/traffic-drill-down"
                          replace
                        />
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
                    {/* <Route
                      path="latency-optimization"
                      element={
                        <PublicElement>
                          <LatencyOptimizationPage />
                        </PublicElement>
                      }
                    /> */}
                    <Route
                      path="latency-optimization"
                      element={
                        <NormalElement>
                          <LatencyOptimizationPage />
                        </NormalElement>
                      }
                    >
                      {pathname ===
                      "/latency-optimization/traffic-drill-down2" ? (
                        <Route
                          path="traffic-drill-down2"
                          element={
                            <NormalElement>
                              <TrafficDrillDown2 />
                            </NormalElement>
                          }
                        />
                      ) : null}

                      {pathname === "/latency-optimization/analytics" ? (
                        <Route
                          path="analytics"
                          element={
                            <NormalElement>
                              <Analytics />
                            </NormalElement>
                          }
                        />
                      ) : null}
                    </Route>

                    <Route
                      path="asyn_cmd_runner"
                      element={
                        <PublicElement>
                          <AsyncCmdRunner />
                        </PublicElement>
                      }
                    />

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

                      {/* {pathname ===
                    "/bgp-traffic-optimization/asyn_cmd_runner" ? (
                      <Route
                        path="asyn_cmd_runner"
                        element={
                          <NormalElement>
                            <AsyncCmdRunner />
                          </NormalElement>
                        }
                      />
                    ) : null} */}
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
                              <ServiceMapping />
                            </NormalElement>
                          }
                        />
                      ) : null}
                      {pathname === "/acl/onboard" ? (
                        <Route
                          path="onboard"
                          element={
                            <NormalElement>
                              <CustomerOnboarding />
                            </NormalElement>
                          }
                        />
                      ) : null}
                      {pathname === "/acl/collapse" ? (
                        <Route
                          path="collapse"
                          element={
                            <NormalElement>
                              <Collapseable />
                            </NormalElement>
                          }
                        />
                      ) : null}
                      {pathname === "/acl/onboard" ? (
                        <Route
                          path="onboard"
                          element={
                            <NormalElement>
                              <CustomerOnboarding />
                            </NormalElement>
                          }
                        />
                      ) : null}

                      {/* -------------------Admin----------------- */}
                    </Route>
                    {/* <Route
                    path="admin"
                    element={
                      <PublicElement>
                        <Admin />
                      </PublicElement>
                    }
                  /> */}
                    {isAllowedPath && (
                      <Route
                        path="/*"
                        element={
                          token ? (
                            <Navigate to="/" replace />
                          ) : (
                            <Navigate to="/login" replace />
                          )
                        }
                      />
                    )}
                  </Route>
                </Routes>
              )}
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

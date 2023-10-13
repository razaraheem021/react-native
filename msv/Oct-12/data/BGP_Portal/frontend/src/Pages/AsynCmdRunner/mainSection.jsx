import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import ManualSection from "./index";
import ConfigurationSection from "./configrationFile";
import {
  MainDivwithoutSidebar,
  MainTableFailedDevicesTitle,
  MainTableFailedDevices,
  MainDiv,
} from "../../Components/GlobalStyles/main.styled.js";
import cardleft1 from "./assests/cardleft1.svg";
import cardleft2 from "./assests/cardleft2.svg";
import cardleft3 from "./assests/cardleft3.svg";
import completed from "./assests/completed.svg";
import error from "./assests/error.svg";
import queue from "./assests/queue.svg";
import Card from "../../Components/Card";
import axios, { baseUrl } from "../../utils/axios";
import DeviceCentricCard from "../../Components/DeviceCentricCard";

let successfullyExecutedCmds = 0;

const mainSection = () => {
  let [dataSource, setDataSource] = useState([]);
  let [dataSourceFilter, setDataSourceFilter] = useState([]);

  const [successfullyExecutedCmds, setSuccessfullyExecutedCmds] = useState(0);
  const [errorCmds, setErrorCmds] = useState(0);
  const [queuedCmds, setQueuedCmds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [filterCompletedConfig, setFilterCompletedConfig] = useState(false);
  const [queueConfig, setQueueConfig] = useState(false);
  const [errorConfig, setErrorConfig] = useState(false);
  const [filterCompletedShow, setFilterCompletedShow] = useState(false);
  const [queueShow, setQueueShow] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  let [dataSourceConfig, setDataSourceConfig] = useState([]);
  let [dataSourceFilterConfig, setDataSourceFilterConfig] = useState([]);
  const [rowCountConfig, setRowCountConfig] = useState(0);
  const [loadingConfig, setLoadingConfig] = useState(false);

  const [
    successfullyExecutedCmdsForConfiguration,
    setSuccessfullyExecutedCmdsForConfiguration,
  ] = useState(0);
  const [errorCmdsForConfiguration, setErrorCmdsForConfiguration] = useState(0);
  const [queuedCmdsForConfiguration, setQueuedCmdsForConfiguration] =
    useState(0);
  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    const serviceCalls = async () => {
      setLoadingConfig(true);

      try {
        const res = await axios.get(
          baseUrl + "/asynccommandrunner/configurations"
        );
        // excelData = res.data;

        setDataSourceConfig(res.data);
        setDataSourceFilterConfig(res.data);
        setRowCountConfig(res.data.length);
        setLoadingConfig(false);
        console.log(res.data);
      } catch (err) {
        console.log(err.response);
        setLoadingConfig(false);
      }
    };
    serviceCalls();
  }, []);

  useEffect(() => {
    const serviceCalls = async () => {
      setLoading(true);

      try {
        const res = await axios.get(baseUrl + "/asynccommandrunner");
        // excelData = res.data;

        setDataSource(res.data);
        setDataSourceFilter(res.data);
        setRowCount(res.data.length);
        setLoading(false);
        console.log(res.data);
      } catch (err) {
        console.log(err.response);
        setLoading(false);
      }
    };
    serviceCalls();
  }, []);

  const items = [
    {
      key: "1",
      label: `Show`,
      children: (
        <>
          <ManualSection />;
        </>
      ),
    },
    {
      key: "2",
      label: `Configuration`,
      children: (
        <>
          <ConfigurationSection />;
        </>
      ),
    },
  ];

  const [tableName, setTableName] = useState("Manual");
  const showTable = (myDataTable) => {
    if (myDataTable === "Manual") {
      setTableName("Manual");
    } else if (myDataTable === "Configuration") {
      setTableName("Configuration");
    }
  };

  const FilterCompletedDataOnClickConfig = () => {
    setFilterCompletedConfig(!filterCompletedConfig);
    setQueueConfig(false);
    setErrorConfig(false);
    if (!filterCompletedConfig) {
      //  const filtered = dataSourceTable1Tab1.filter(
      //    (item) => item.normal_congestion > 0
      //  );

      //  console.log("filtered item: " + filtered);
      //  setFilteredData(filtered);

      const filteredData = dataSourceConfig.filter(
        (item) => item.status == "Completed"
      );
      console.log(filteredData);

      setDataSourceFilterConfig(filteredData);
    } else {
      setDataSourceFilterConfig(dataSourceConfig);
    }
  };
  const FilterQueueDataOnClickConfig = () => {
    setQueueConfig(!queueConfig);
    setFilterCompletedConfig(false);
    setErrorConfig(false);
    if (!filterCompletedConfig) {
      //  const filtered = dataSourceTable1Tab1.filter(
      //    (item) => item.normal_congestion > 0
      //  );

      //  console.log("filtered item: " + filtered);
      //  setFilteredData(filtered);

      const filteredData = dataSourceConfig.filter(
        (item) => item.status == "Queue"
      );
      console.log(filteredData);

      setDataSourceFilterConfig(filteredData);
    } else {
      setDataSourceFilterConfig(dataSourceConfig);
    }
  };
  const FilterErrorDataOnClickConfig = () => {
    setErrorConfig(!errorConfig);
    setFilterCompletedConfig(false);
    setQueueConfig(false);
    if (!errorConfig) {
      //  const filtered = dataSourceTable1Tab1.filter(
      //    (item) => item.normal_congestion > 0
      //  );

      //  console.log("filtered item: " + filtered);
      //  setFilteredData(filtered);

      const filteredData = dataSourceConfig.filter(
        (item) => item.status == "Error"
      );
      console.log(filteredData);

      setDataSourceFilterConfig(filteredData);
    } else {
      setDataSourceFilterConfig(dataSourceConfig);
    }
  };
  const FilterCompletedDataOnClick = () => {
    setFilterCompletedShow(!filterCompletedShow);
    setQueueShow(false);
    setErrorShow(false);
    if (!filterCompletedShow) {
      const filteredData = dataSource.filter(
        (item) => item.status == "Completed"
      );
      console.log(filteredData);

      setDataSourceFilter(filteredData);
    } else {
      setDataSourceFilter(dataSource);
    }
  };
  const FilterQueueDataOnClick = () => {
    setQueueShow(!queueShow);
    setFilterCompletedShow(false);
    setErrorShow(false);
    if (!queueShow) {
      const filteredData = dataSource.filter((item) => item.status == "Queue");
      console.log(filteredData);

      setDataSourceFilter(filteredData);
    } else {
      setDataSourceFilter(dataSource);
    }
  };
  const FilterErrorDataOnClick = () => {
    setErrorShow(!errorShow);
    setQueueShow(false);
    setFilterCompletedShow(false);
    if (!errorShow) {
      const filteredData = dataSource.filter((item) => item.status == "Error");
      console.log(filteredData);

      setDataSourceFilter(filteredData);
    } else {
      setDataSourceFilter(dataSource);
    }
  };

  return (
    <MainDiv>
      {tableName === "Manual" ? (
        <div>
          <>
            <h2 style={{ fontSize: "22px", fontWeight: "bold" }}>
              Async Command Runner
            </h2>
          </>
        </div>
      ) : null}

      {tableName === "Configuration" ? (
        <div>
          <>
            <h2 style={{ fontSize: "22px", fontWeight: "bold" }}>
              Async Command Runner Configration
            </h2>
          </>
        </div>
      ) : null}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex" }}>
            {tableName === "Configuration" ? (
              <>
                <div
                  style={{
                    transform: filterCompletedConfig
                      ? "scale(1.08)"
                      : "scale(1)",
                  }}
                  onClick={FilterCompletedDataOnClickConfig}
                >
                  <DeviceCentricCard
                    customColor="#66B127"
                    content={successfullyExecutedCmdsForConfiguration}
                    contentTitle="Completed"
                    // customImgLeft={cardleft1}
                    customImgTop={completed}
                    customBgColor={
                      filterCompletedConfig
                        ? "#CEEDFF"
                        : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                    }
                  />
                </div>
                <div
                  style={{
                    transform: errorConfig ? "scale(1.08)" : "scale(1)",
                  }}
                  onClick={FilterErrorDataOnClickConfig}
                >
                  <DeviceCentricCard
                    customColor="#A30505"
                    content={errorCmdsForConfiguration}
                    contentTitle="Error"
                    // customImgLeft={cardleft2}
                    customImgTop={error}
                    customBgColor={
                      errorConfig
                        ? "#CEEDFF"
                        : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                    }
                  />
                </div>
                <div
                  style={{
                    transform: queueConfig ? "scale(1.08)" : "scale(1)",
                  }}
                  onClick={FilterQueueDataOnClickConfig}
                >
                  <DeviceCentricCard
                    customColor="#CBC301"
                    content={queuedCmdsForConfiguration}
                    contentTitle="Queue"
                    // customImgLeft={cardleft3}
                    customImgTop={queue}
                    customBgColor={
                      queueConfig
                        ? "#CEEDFF"
                        : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    transform: filterCompletedShow ? "scale(1.08)" : "scale(1)",
                  }}
                  onClick={FilterCompletedDataOnClick}
                >
                  <DeviceCentricCard
                    customColor="#66B127"
                    content={successfullyExecutedCmds}
                    contentTitle="Completed"
                    // customImgLeft={cardleft1}
                    customImgTop={completed}
                    customBgColor={
                      filterCompletedShow
                        ? "#CEEDFF"
                        : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                    }
                  />
                </div>
                <div
                  style={{
                    transform: errorShow ? "scale(1.08)" : "scale(1)",
                  }}
                  onClick={FilterErrorDataOnClick}
                >
                  <DeviceCentricCard
                    customColor="#A30505"
                    content={errorCmds}
                    contentTitle="Error"
                    // customImgLeft={cardleft2}
                    customImgTop={error}
                    customBgColor={
                      errorShow
                        ? "#CEEDFF"
                        : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                    }
                  />
                </div>
                <div
                  style={{
                    transform: queueShow ? "scale(1.08)" : "scale(1)",
                  }}
                  onClick={FilterQueueDataOnClick}
                >
                  <DeviceCentricCard
                    customColor="#CBC301"
                    content={queuedCmds}
                    contentTitle="Queue"
                    // customImgLeft={cardleft3}
                    customImgTop={queue}
                    customBgColor={
                      queueShow
                        ? "#CEEDFF"
                        : "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div
          style={{
            height: "45px",
            display: "flex",
            marginTop: "50px",
          }}
        >
          <MainTableFailedDevices
            active={"Manual" === tableName}
            onClick={() => showTable("Manual")}
          >
            <div style={{ display: "flex" }}>
              <MainTableFailedDevicesTitle
                active={"Manual" === tableName}
                style={{
                  width: "150px",
                  textAlign: "center",
                }}
              >
                Show
              </MainTableFailedDevicesTitle>
            </div>
          </MainTableFailedDevices>

          <MainTableFailedDevices
            active={"Configuration" === tableName}
            onClick={() => showTable("Configuration")}
          >
            <div style={{ display: "flex" }}>
              <MainTableFailedDevicesTitle
                active={"Configuration" === tableName}
                style={{
                  width: "150px",
                  textAlign: "center",
                  // paddingLeft: "20px",
                  // paddingTop: "10px",
                }}
              >
                Configuration
              </MainTableFailedDevicesTitle>
            </div>
          </MainTableFailedDevices>
        </div>
      </div>

      {tableName === "Manual" ? (
        <div>
          <>
            <ManualSection
              successfullyExecutedCmds={successfullyExecutedCmds}
              setSuccessfullyExecutedCmds={setSuccessfullyExecutedCmds}
              setErrorCmds={setErrorCmds}
              setQueuedCmds={setQueuedCmds}
              setDataSource={setDataSource}
              dataSource={dataSource}
              setLoading={setLoading}
              loading={loading}
              setRowCount={setRowCount}
              rowCount={rowCount}
              dataSourceFilter={dataSourceFilter}
              filterCompletedShow={filterCompletedShow}
              queueShow={queueShow}
              errorShow={errorShow}
            />
          </>
        </div>
      ) : null}
      {tableName === "Configuration" ? (
        <div>
          <>
            <ConfigurationSection
              setSuccessfullyExecutedCmdsForConfiguration={
                setSuccessfullyExecutedCmdsForConfiguration
              }
              setErrorCmdsForConfiguration={setErrorCmdsForConfiguration}
              setQueuedCmdsForConfiguration={setQueuedCmdsForConfiguration}
              setDataSourceConfig={setDataSourceConfig}
              dataSourceConfig={dataSourceConfig}
              setLoadingConfig={setLoadingConfig}
              loadingConfig={loadingConfig}
              setRowCountConfig={setRowCountConfig}
              rowCountConfig={rowCountConfig}
              filterCompletedConfig={filterCompletedConfig}
              queueConfig={queueConfig}
              errorConfig={errorConfig}
              dataSourceFilterConfig={dataSourceFilterConfig}
            />
          </>
        </div>
      ) : null}
    </MainDiv>
  );
};

export default mainSection;

import React, { useState } from "react";
import { Tabs } from "antd";
import ManualSection from "./index";
import ConfigurationSection from "./configrationFile";
import {
  MainDivwithoutSidebar,
  MainDivwithoutSidebarInfluxgraph,
  TableStyle,
  MainTableFailedDevicesTitle,
  MainTableFailedDevices,
  MainDiv,
} from "../../../Components/GlobalStyles/main.styled.js";
import cardleft1 from "./assests/cardleft1.svg";
import cardleft2 from "./assests/cardleft2.svg";
import cardleft3 from "./assests/cardleft3.svg";
import completed from "./assests/completed.svg";
import error from "./assests/error.svg";
import queue from "./assests/queue.svg";
import Card from "../../../Components/Card";

let successfullyExecutedCmds = 0;

const mainSection = () => {
  const [successfullyExecutedCmds, setSuccessfullyExecutedCmds] = useState(0);
  const [errorCmds, setErrorCmds] = useState(0);
  const [queuedCmds, setQueuedCmds] = useState(0);
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
  const items = [
    {
      key: "1",
      label: `Manual`,
      // children: <ManualSection />,
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
                <Card
                  customColor="#66B127"
                  content={successfullyExecutedCmdsForConfiguration}
                  contentTitle="Completed"
                  customImgLeft={cardleft1}
                  customImgRight={completed}
                  customBgColor={
                    "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                  }
                />
                <Card
                  customColor="#A30505"
                  content={errorCmdsForConfiguration}
                  contentTitle="Error"
                  customImgLeft={cardleft2}
                  customImgRight={error}
                  customBgColor={
                    "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                  }
                />
                <Card
                  customColor="#CBC301"
                  content={queuedCmdsForConfiguration}
                  contentTitle="Queue"
                  customImgLeft={cardleft3}
                  customImgRight={queue}
                  customBgColor={
                    "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                  }
                />
              </>
            ) : (
              <>
                <Card
                  customColor="#66B127"
                  content={successfullyExecutedCmds}
                  contentTitle="Completed"
                  customImgLeft={cardleft1}
                  customImgRight={completed}
                  customBgColor={
                    "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                  }
                />
                <Card
                  customColor="#A30505"
                  content={errorCmds}
                  contentTitle="Error"
                  customImgLeft={cardleft2}
                  customImgRight={error}
                  customBgColor={
                    "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                  }
                />
                <Card
                  customColor="#CBC301"
                  content={queuedCmds}
                  contentTitle="Queue"
                  customImgLeft={cardleft3}
                  customImgRight={queue}
                  customBgColor={
                    "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 254, 0.10) 100%)"
                  }
                />
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
                Manual
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
            />
          </>
        </div>
      ) : null}
    </MainDiv>
  );
};

export default mainSection;

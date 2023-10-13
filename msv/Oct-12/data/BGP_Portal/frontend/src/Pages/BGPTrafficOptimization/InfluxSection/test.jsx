import React from "react";
import ReactECharts from "echarts-for-react";
import { Row, Col } from "antd";
function BarChart() {
  const contractGraph = [
    { name: "Active", value: 1 },
    { name: "Pending", value: 0 },
    { name: "Expired", value: 0 },
    { name: "All Contracts", value: 1 },
  ];

  // const colors = ["#FEA800", "#DA0404", "#EBC606"];
  // const dataNames = contractGraph.map((item) => item.name);
  // const dataValues = contractGraph.map((item) => item.value);

  // const options = {
  //   color: colors,
  //   tooltip: {
  //     trigger: "axis",
  //     axisPointer: {
  //       type: "shadow",
  //     },
  //   },
  //   legend: {},
  //   grid: {
  //     left: "3%",
  //     right: "4%",
  //     bottom: "3%",
  //     containLabel: true,
  //   },
  //   xAxis: [
  //     {
  //       type: "category",
  //       data: dataNames,
  //     },
  //   ],
  //   yAxis: [
  //     {
  //       type: "value",
  //     },
  //   ],
  //   series: [
  //     {
  //       name: "Value",
  //       type: "bar",
  //       emphasis: {
  //         focus: "series",
  //       },
  //       data: dataValues,
  //     },
  //   ],
  // };
  const colors = ["#FEA800", "#DA0404", "#EBC606"];
  const activeContracts = contractGraph.map((item) => item.value);
  const pendingContracts = contractGraph.map((item) => item.value);
  const expiredContracts = contractGraph.map((item) => item.value);
  const allContracts = contractGraph.map((item) => item["All Contracts"]);

  const options = {
    color: colors,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        return `${params[0].name}<br />Active: ${params[0].value}<br />Pending: ${params[1].value}<br />Expired: ${params[2].value}<br />All Contracts: ${params[3].value}`;
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["Active", "Pending", "Expired", "All Contracts"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Active",
        type: "bar",
        emphasis: {
          focus: "series",
        },
        data: activeContracts,
      },
      {
        name: "Pending",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        data: pendingContracts,
      },
      {
        name: "Expired",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        data: expiredContracts,
      },
      {
        name: "All Contracts",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        data: allContracts,
      },
    ],
  };
  return (
    <div style={{ width: "50%" }}>
      <ReactECharts
        option={options}
        style={{ height: "450px", width: "100%" }}
      />
    </div>
  );
}

export default BarChart;

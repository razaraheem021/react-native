import { Spin } from "antd";

import ReactECharts from "echarts-for-react";
import axios from "axios";
import React, { useEffect, useState } from "react";

// import axios, { baseUrl } from "../../../../utils/axios";

const MultilineChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);


  const [dataSource, setDataSource] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          router_ip: "10.219.60.12",
          community: "48237:8800",
          interface: "interface",
        };

        // Change the URL to your actual endpoint
        const response = await axios.post(
          `http://10.73.211.89:5050/analytics/status`,
          data
        );
        console.log(response.data);

      //   const chartData = {
      //     labels: Object.keys(response.data),
      //     datasets: [
      //       {
      //         label: "Status",
      //         data: Object.values(response.data),
      //         fill: false,
      //         borderColor: "rgb(75, 192, 192)",
      //         tension: 0.1,
      //       },
      //     ],
      //   };

        setData(chartData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  const option = {
    tooltip: {
      trigger: "axis",
    },

    legend: {
      data: Object.keys(chartData),
    },

    xAxis: {
      type: "category",

      data: Object.keys(chartData),
    },

    yAxis: {
      type: "value",
    },

    series: [
      {
        name: "Netflow",

        type: "line",

        data: Object.values(chartData),
      },

      // {
      //   name: "BGP",

      //   type: "line",

      //   data: dataSource.line_2,
      // },

      // {

      // name: "Line 3",

      // type: "line",

      // data: [70, 90, 100, 80, 120, 140, 100],

      // },
    ],
  };

  return (
    <Spin spinning={loading}>
      {/* <h3>{graphData.community}</h3> */}

      <ReactECharts option={option} style={{ height: "400px" }} />
    </Spin>
  );
};

export default MultilineChart;

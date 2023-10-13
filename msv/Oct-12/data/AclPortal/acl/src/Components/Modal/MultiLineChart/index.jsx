import { Select } from "antd";
import ReactEcharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
import axios, { baseUrl } from "../../../utils/axios";

const { Option } = Select;

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [myFunction, setMyFunction] = useState([]);
  const [firstSelection, setFirstSelection] = useState("day");
  const [secondSelection, setSecondSelection] = useState("");
  const [thirdSelection, setThirdSelection] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState([]);

  useEffect(() => {
    const serviceCalls = async () => {
      setLoading(true);

      try {
        const res = await axios.get(baseUrl + "/getMonitoringSpiral", {
          params: {
            start: selectedDateRange[0],
            end: selectedDateRange[1],
          },
        });
        console.log("getMonitoringSpiral", res);
        setMyFunction(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err.response);
        setLoading(false);
      }
    };

    if (selectedDateRange.length === 2) {
      serviceCalls();
    }
  }, [selectedDateRange]);

  const handleFirstSelect = (value) => {
    setFirstSelection(value);
    setSecondSelection("");
    setThirdSelection("");

    if (value === "day") {
      setSelectedDateRange([]);
    }
  };

  const handleSecondSelect = (value) => {
    setSecondSelection(value);
    updateSelectedDateRange(firstSelection, value, thirdSelection);
  };

  const handleThirdSelect = (value) => {
    setThirdSelection(value);
    updateSelectedDateRange(firstSelection, secondSelection, value);
  };

  const handleMonthChange = (dates) => {
    if (dates.length === 2) {
      const start = dates[0].startOf("month").format("YYYY-MM-DD HH:mm:ss");
      const end = dates[1].endOf("month").format("YYYY-MM-DD HH:mm:ss");
      setSelectedDateRange([start, end]);
    } else {
      setSelectedDateRange([]);
    }
  };
  const getOption = () => {
    const generateTimeSeriesData = (length) => {
      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);

      const data = [];
      for (let i = 0; i < length; i++) {
        const timestamp = new Date(startDate.getTime() + i * 60 * 60 * 1000);
        const value = Math.floor(Math.random() * 100);
        data.push([timestamp, value]);
      }
      return data;
    };

    const data = [
      {
        name: "Line 1",
        type: "line",
        data: generateTimeSeriesData(24),
      },
      {
        name: "Line 2",
        type: "line",
        data: generateTimeSeriesData(24),
      },
    ];
    console.log(data);
    const seriesData = data.map((line) => ({
      name: line.name,
      type: "line",
      data: line.data,
    }));

    const legendData = seriesData.map((line) => line.name);

    const options = {
      title: {
        text: "Time Series Chart",
      },
      legend: {
        data: legendData,
      },
      xAxis: {
        type: "time",
      },
      yAxis: {
        type: "value",
      },
      tooltip: {
        trigger: "axis",
        formatter: (params) => {
          const timestamp = params[0].value[0];
          const valueText = params
            .map((param) => `${param.seriesName}: ${param.value[1]}`)
            .join("<br/>");
          return `${timestamp.toLocaleString()}<br/>${valueText}`;
        },
      },
      series: seriesData,
    };

    return options;
  };

  return (
    <div>
      {/* <div>
        <Select value={firstSelection} onChange={handleFirstSelect}>
          <Option value="day">Day</Option>
          <Option value="week">Week</Option>
          <Option value="month">Month</Option>
        </Select>
      </div> */}
      {/* {firstSelection === "day" && (
        <div>
          <Select value={secondSelection} onChange={handleSecondSelect}>

          </Select>
          <Select value={thirdSelection} onChange={handleThirdSelect}>
          </Select>
        </div>
      )}
      {firstSelection === "week" && (
        <div>
          <Select value={secondSelection} onChange={handleSecondSelect}>
            
          </Select>
          <Select value={thirdSelection} onChange={handleThirdSelect}>
           
          </Select>
        </div>
      )}
      {firstSelection === "month" && (
        <div>
          <DatePicker.RangePicker picker="month" onChange={handleMonthChange} />
        </div>
      )} */}
      <div style={{ width: "100%", height: "400px" }}>
        <ReactEcharts
          option={getOption()}
          style={{ height: "100%", padding: "0px", paddingTop: "12px" }}
        />
      </div>
    </div>
  );
};

export default Index;

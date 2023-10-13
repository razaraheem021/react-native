// import React, { useEffect, useState } from 'react';
// import { Select, Checkbox, Button } from 'antd';
// import ReactECharts from 'echarts-for-react';
// import axios, { baseUrl } from "../../utils/axios";
// import {
//   MainDivwithoutSidebar,
//   TableStyle,
// } from "../../Components/GlobalStyles/main.styled.js";
// import "./main.css";

// const { Option } = Select;

// const dummyResponse = {
//   "hostname": [{ value: "10.10.10.10", label: "ADAMANA" }],
//   "interface": [
//     { value: "eth0", label: "Ethernet 0" },
//     { value: "eth1", label: "Ethernet 1" },
//     { value: "wlan0", label: "Wireless LAN 0" },
//   ],
//   "community": [
//     { value: "public", label: "Public" },
//     { value: "private", label: "Private" },
//     { value: "community1", label: "Community 1" },
//   ],
// };

// const dummyGraphData = {
//   series: [
//     {
//       name: 'Line 1',
//       type: 'line',
//       data: [10, 20, 15, 25, 30],
//     },
//     {
//       name: 'Line 2',
//       type: 'line',
//       data: [5, 15, 10, 20, 25],
//     },
//     {
//       name: 'Line 3',
//       type: 'line',
//       data: [8, 18, 13, 23, 28],
//     },
//   ],
//   xData: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
// };

// const App = () => {
//   const [firstSelection, setFirstSelection] = useState('');
//   const [secondSelection, setSecondSelection] = useState([]);
//   const [thirdSelection, setThirdSelection] = useState([]);
//   const [fourthSelection, setFourthSelection] = useState([]);
//   const [fifthSelection, setFifthSelection] = useState('1 Day'); // Initialize with the default value
//   const [isGraphVisible, setIsGraphVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [mainData, setMainData] = useState(null);
//   const [mainGraphData, setMainGraphData] = useState(null);
//   const [isFirstSelectionValid, setIsFirstSelectionValid] = useState(true);
//   const [isSecondSelectionValid, setIsSecondSelectionValid] = useState(true);
//   const [isThirdSelectionValid, setIsThirdSelectionValid] = useState(true);
//   const [isFourthSelectionValid, setIsFourthSelectionValid] = useState(true);

//   const handleFirstChange = (value) => {
//     setFirstSelection(value);
//     setSecondSelection([]);
//     setThirdSelection([]);
//     setFourthSelection([]);
//   };

//   const handleSecondChange = (value) => {
//     setSecondSelection(value);
//     setThirdSelection([]);
//     setFourthSelection([]);
//   };

//   const handleThirdChange = (value) => {
//     setThirdSelection(value);
//     setFourthSelection([]);
//   };

//   const handleFourthChange = (value) => {
//     setFourthSelection(value);
//   };

//   const handleFifthChange = (value) => {
//     setFifthSelection(value);
//   };

//   const getOptionsForFirst = () => {
//     return ['snmp', 'netflow'];
//   };
//   useEffect(() => {
//     const serviceCalls = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(baseUrl + "/analytics/options");
//         setMainData(res.data);

//         setLoading(false);
//         console.log(res.data);
//       } catch (err) {
//         console.log(err.response);
//         setLoading(false);
//       }
//     };
//     serviceCalls();
//   }, []);
//   const getOptionsForSecond = () => {
//     if (firstSelection === 'snmp') {
//       return ['Option 1', 'Option 2', 'Option 3']; // Add your options for SNMP
//     } else if (firstSelection === 'netflow') {
//       return ['Option A', 'Option B', 'Option C']; // Add your options for Netflow
//     } else {
//       return [];
//     }
//   };

//   const getOptionsForThird = () => {
//     if (secondSelection.includes('Option 1')) {
//       return ['Option X', 'Option Y', 'Option Z']; // Add your options based on the selection of the second box
//     } else if (secondSelection.includes('Option 2')) {
//       return ['Option M', 'Option N', 'Option O']; // Add your options based on the selection of the second box
//     } else if (secondSelection.includes('Option 3')) {
//       return ['Option P', 'Option Q', 'Option R']; // Add your options based on the selection of the second box
//     } else {
//       return [];
//     }
//   };

//   const getOptionsForFourth = () => {
//     if (thirdSelection.includes('Option X')) {
//       return ['Option ALPHA', 'Option BETA', 'Option GAMMA']; // Add your options based on the selection of the third box
//     } else if (thirdSelection.includes('Option Y')) {
//       return ['Option DELTA', 'Option EPSILON', 'Option ZETA']; // Add your options based on the selection of the third box
//     } else if (thirdSelection.includes('Option Z')) {
//       return ['Option 123', 'Option 456', 'Option 789']; // Add your options based on the selection of the third box
//     } else {
//       return [];
//     }
//   };

//   const getTimeIntervalData = () => {
//     // Map the time interval to the corresponding data
//     const dataMap = {
//       '1 hour': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Sample data for 1 hour
//       '1 day': ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'], // Sample data for 1 day
//       '1 week': ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'], // Sample data for 1 week
//       '1 month': ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'], // Sample data for 1 month
//       '1 year': ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'], // Sample data for 1 year
//     };

//     return dataMap[fifthSelection];
//   };

//   const getLineGraphData = () => {
//     const xAxisData = getTimeIntervalData();
//     const seriesData = [];

//     // Define the mapping of options to their corresponding sample data
//     const sampleDataMap = {
//       'Option 1': [820, 932, 901, 934, 1290, 1330], // Sample data for Option 1
//       'Option 2': [320, 432, 501, 634, 890, 930], // Sample data for Option 2
//       'Option 3': [620, 732, 901, 934, 1290, 1330], // Sample data for Option 3
//     };

//     // Loop through the selected options in the second select box
//     for (const option of secondSelection) {
//       if (sampleDataMap[option]) {
//         seriesData.push({
//           name: option,
//           type: 'line',
//           data: sampleDataMap[option],
//         });
//       }
//     }

//     return {
//       xAxis: {
//         type: 'category',
//         data: xAxisData,
//       },
//       yAxis: {
//         type: 'value',
//       },
//       series: seriesData,
//     };
//   };

//   const data = {
//     series: [
//       {
//         name: 'Line 1',
//         type: 'line',
//         data: [10, 20, 15, 25, 30],
//       },
//       {
//         name: '',
//         type: 'line',
//         data: [],
//       },
//       // Add more lines as needed
//     ],
//     xData: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
//   };

//   const [options, setOptions] = useState(
//     {
//       legend: {
//         data: [],
//       },
//       xAxis: {
//         type: 'category',
//         data: [],
//       },
//       yAxis: {
//         type: 'value',
//       },
//       series: [],
//     })

//   useEffect(()=>{
//     if(mainGraphData){
//       setOptions({
//         legend: {
//           data: mainGraphData.series.map((item) => item.name),
//         },
//         xAxis: {
//           type: 'category',
//           data: mainGraphData.xData,
//         },
//         yAxis: {
//           type: 'value',
//         },
//         series: mainGraphData.series,
//       })
//     }
//   }, [mainGraphData])

//   const handleApplyButtonClick = async () => {
//     if (firstSelection === '') {
//       setIsFirstSelectionValid(false);
//     } else if (secondSelection.length === 0) {
//       setIsSecondSelectionValid(false);
//     } else if (thirdSelection.length === 0) {
//       setIsThirdSelectionValid(false);
//     } else {
//       setIsFirstSelectionValid(true);
//       setIsSecondSelectionValid(true);
//       setIsThirdSelectionValid(true);
//       // setIsFourthSelectionValid(true);
//       setIsGraphVisible(true);
//       const data = {
//         time: fifthSelection,
//         type: firstSelection,
//         router_ip: secondSelection,
//         interface: thirdSelection,
//         community: fourthSelection
//       }
//       console.log(data)

//       await axios
//         .post(baseUrl + "/analytics", data)
//         .then((response) => {
//           setMainGraphData(response.data)
//           setLoading(false);

//         })
//         .catch((err) => {
//           console.log("error ==> " + err);
//           setLoading(false);
//         });

//     }

//   };
//   return (
//     <MainDivwithoutSidebar style={ { marginTop: "10px" } } className="bg- [url('../Images/Mask group.png')] " >
//       <h2 style={ { fontSize: "22px", fontWeight: "bold", marginBottom: "10px" } }>Analytics</h2>
//       { isGraphVisible && <ReactECharts option={ options } style={ { height: '400px' } } /> }

//       <div style={ { textAlign: "center" } }>
//         <Select
//           placeholder="Select Module"
//           className={ !isFirstSelectionValid ? "select-error" : "" }
//           value={ firstSelection !== '' ? firstSelection : null } onChange={ handleFirstChange } style={ { width: 200, marginBottom: 10, marginRight: 10 } }>
//           { getOptionsForFirst().map((option) => (
//             <Option key={ option } value={ option }>
//               { option }
//             </Option>
//           )) }
//         </Select>

//         <Select
//           mode="multiple"
//           className={ !isFirstSelectionValid ? "select-error" : "" }
//           placeholder="Select Hostname"
//           value={ secondSelection !== '' ? secondSelection : null }
//           onChange={ handleSecondChange }
//           style={ { width: 250, marginBottom: 10, marginRight: 10 } }
//         >
//           { mainData && mainData?.hostname.map((option) => (
//             <Option key={ option.value } value={ option.value }>
//               <Checkbox key={ option } value={ option } checked={ secondSelection.includes(option.value) }>
//                 { option.label }
//               </Checkbox>
//             </Option>
//           )) }
//         </Select>

//         <Select
//           mode="multiple"
//           className={ !isFirstSelectionValid ? "select-error" : "" }
//           placeholder="Select Interface"
//           value={ thirdSelection !== '' ? thirdSelection : null }

//           onChange={ handleThirdChange }
//           style={ { width: 200, marginBottom: 10, marginRight: 10 } }
//         >
//           { mainData && mainData?.interface.map((option) => (
//             <Option key={ option.value } value={ option.value }>
//               <Checkbox key={ option } value={ option } checked={ thirdSelection.includes(option.value) }>
//               { option.label }
//               </Checkbox>
//             </Option>
//           )) }
//         </Select>

//         {firstSelection !== "snmp" && <Select
//           mode="multiple"
//           placeholder="Select Community"
//           className={ !isFirstSelectionValid ? "select-error" : "" }
//           value={ fourthSelection !== '' ? fourthSelection : null }

//           onChange={ handleFourthChange }
//           style={ { width: 200, marginBottom: 10, marginRight: 10 } }
//         >
//           { mainData && mainData?.community.map((option) => (
//             <Option key={ option.value } value={ option.value }>
//               <Checkbox key={ option } value={ option } checked={ fourthSelection.includes(option.value) }>
//               { option.label }
//               </Checkbox>
//             </Option>
//           )) }
//         </Select>
// }
//         {/* Fifth select box */ }
//         <Select value={ fifthSelection } onChange={ handleFifthChange } style={ { width: 200, marginBottom: 10, marginRight: 10 } }>
//           <Option value={ 6 }>Past 6 hour</Option>
//           <Option value={ 12 }>Past 12 hour</Option>
//           <Option value={ 24 }>Past 1 Day</Option>
//         </Select>

//         <Button style={ { backgroundColor: "#009BDB", color: "#fff" } } onClick={ handleApplyButtonClick }>Apply</Button>
//       </div>

//     </MainDivwithoutSidebar>
//   );
// };

// export default App;

import React, { useEffect, useState, useMemo } from "react";
import {
  Select,
  Checkbox,
  Radio,
  Button,
  Space,
  DatePicker,
  TimePicker,
  Popconfirm,
  Input,
  Modal,
} from "antd";
import ReactECharts from "echarts-for-react";
import axios, { baseUrl } from "../../utils/axios";
import {
  MainDivwithoutSidebar,
  MainDivwithoutSidebarInfluxgraph,
  TableStyle,
} from "../../Components/GlobalStyles/main.styled.js";
import "./main.css";
import moment from "moment";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import * as echarts from "echarts";

const { Option } = Select;
const { RangePicker } = DatePicker;

const onChange = (date) => {
  if (date) {
    console.log("Date: ", date);
  } else {
    console.log("Clear");
  }
};

const Index = () => {
  const [customHours, setCustomHours] = useState(0);

  const handleCustomHoursChange = (e) => {
    const hours = parseInt(e.target.value, 10);
    setCustomHours(hours);
  };

  const getCustomRange = () => {
    const startDate = dayjs().subtract(customHours, "hour");
    const endDate = dayjs();
    return [startDate, endDate];
  };

  const [highlightedCard, setHighlightedCard] = useState(null);
  const [cards, setCards] = useState([
    { title: "SNMP", content: "Simple Network Management Protocol" },
    { title: "Netflow", content: "Netflow is a feature" },
  ]);
  const [isGraphVisible, setIsGraphVisible] = useState(false);
  const [interfaceCheckboxValues, setInterfaceCheckboxValues] = useState({});
  const [communityCheckboxValues, setCommunityCheckboxValues] = useState({});
  const [routerCheckboxValues, setRouterCheckboxValues] = useState({});
  const [refinedData, setRefinedData] = useState({});
  const [dateTimeRange, setDateTimeRange] = useState([]);
  const [checked, setChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("24 Hours");
  const [filterRouterId, setFilterRouterId] = useState(0);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [clickedCard, setClickedCard] = useState(null);
  const [selectedOptionsInCards, setSelectedOptionsInCards] = useState([]);
  const [selectedDateTimeRange, setSelectedDateTimeRange] = useState([]);
  const [interfaceData, setInterfaceData] = useState([]);
  const [hostnameData, setHostnameData] = useState([]);
  const [communityData, setcommunityData] = useState([]);
  const [mycards, setMyCards] = useState([]);
  const [mainGraphData, setMainGraphData] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState({
    legend: {
      data: [],
    },
    xAxis: {
      type: "category",
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [],
  });
  useEffect(() => {
    const serviceCalls = async () => {
      // setLoading(true);

      try {
        const res = await axios.get(baseUrl + "/analytics/options");
        setInterfaceData(res.data.interface);
        setHostnameData(res.data.hostname);
        setcommunityData(res.data.community);

        // setLoading(false);
      } catch (err) {
        console.log(err.response);
        // setLoading(false);
      }
    };
    serviceCalls();
  }, []);
  const [colorGradients, setColorGradients] = useState([]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const getRandomGradients = (data, existingGradients) => {
    const gradients = data.map((seriesItem, index) => {
      if (existingGradients[index]) {
        // If a gradient already exists for this series, use it.
        return existingGradients[index];
      } else {
        // Otherwise, generate a new gradient for this series.
        const color = getRandomColor();
        return new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          {
            offset: 1,
            color,
          },
          {
            offset: 0.4,
            color: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
              color.slice(3, 5),
              16
            )}, ${parseInt(color.slice(5, 7), 16)}, 0.1)`,
          },
        ]);
      }
    });
    return gradients;
  };
  // Memoize the gradients so they only get regenerated when mainGraphData changes
  const newColorGradients = useMemo(() => {
    if (mainGraphData) {
      if (colorGradients.length !== mainGraphData.series.length) {
        return getRandomGradients(mainGraphData.series, colorGradients);
      } else {
        // If colorGradients already exist and their length matches, use them directly
        return colorGradients;
      }
    }
    return [];
  }, [mainGraphData, colorGradients]);

  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    // Function to generate random colors

    if (mainGraphData) {
      if (colorGradients.length !== mainGraphData.series.length) {
        setColorGradients(newColorGradients);
      }
      console.log(newColorGradients);
      setOptions({
        legend: {
          data: mainGraphData.series.map((item) => item),
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        xAxis: {
          type: "category",
          data: mainGraphData.xData,
          // Instead of a single color, use an array of colors for each line in the xAxis
          axisLine: {
            lineStyle: {
              color: newColorGradients.map(
                (gradient) => gradient.colorStops[1].color
              ),
            },
          },
        },
        yAxis: {
          type: "value",
        },
        series: mainGraphData.series.map((seriesItem, index) => ({
          ...seriesItem,
          areaStyle: {
            // Applying the gradient to the series
            color: newColorGradients[index],
          },
          emphasis: {
            // Lower opacity for other charts when not hovered over
            opacity: index === hoveredIndex ? 1 : 0.6,
          },
        })),
      });
    }
  }, [mainGraphData, newColorGradients]);

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log("From: ", dates[0]);
      console.log("to", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      setStartDateTime(`${dateStrings[0]}`);
      setEndDateTime(dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };

  const rangePresets = [
    {
      label: "Last 1 Days",
      value: [dayjs().add(-1, "d"), dayjs()],
    },
    {
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Last 14 Days",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];

  const addNewCard = () => {
    const newCard = {
      id: uuidv4(), // Assign a unique identifier to the card
      selectedOption: null,
      checkboxValues: {},
    };
    setMyCards([...mycards, newCard]);
  };

  const handleCardClose = (cardId) => {
    // Find the index of the card with the specified cardId
    console.log("Closing card with id:", cardId);
    const cardIndex = mycards.findIndex((card) => card.id === cardId);
    // Ensure the card is found before proceeding
    if (cardIndex !== -1) {
      // Remove the card from the mycards array
      setMyCards((prevMycards) => {
        const updatedCards = prevMycards.slice();
        updatedCards.splice(cardIndex, 1);

        // Remove the selected option from selectedOptionsInCards
        const closedCardOption = prevMycards[cardIndex]?.selectedOption;
        if (closedCardOption) {
          setSelectedOptionsInCards((prevSelectedOptions) => {
            return prevSelectedOptions.filter(
              (option) => option !== closedCardOption
            );
          });
        }
        console.log("Updated mycards:", mycards);
        console.log("Updated selectedOptionsInCards:", selectedOptionsInCards);
        return updatedCards;
      });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDateTimeRangeChange = (dates) => {
    setSelectedDateTimeRange(dates);

    if (dates.length === 2) {
      const startDateTime = dates[0].format("YYYY-MM-DD HH:mm:ss");
      const endDateTime = dates[1].format("YYYY-MM-DD HH:mm:ss");
      setStartDateTime(startDateTime);
      setEndDateTime(endDateTime);
    } else {
      setStartDateTime(null);
      setEndDateTime(null);
    }
  };
  // const [options, setOptions] = useState({
  //   legend: {
  //     data: ['Legend Name'], // Replace 'Legend Name' with appropriate data label
  //   },
  //   tooltip: { // Add the tooltip option here
  //     trigger: 'axis', // You can change the trigger type based on your requirement
  //   },
  //   xAxis: {
  //     type: 'category',
  //     data: ['X-Axis Label'], // Replace 'X-Axis Label' with appropriate data
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: [
  //     {
  //       name: 'Series Name', // Replace 'Series Name' with appropriate data label
  //       type: 'line', // Change to the appropriate chart type (line, bar, etc.)
  //       data: [10, 20, 30], // Replace with the actual data points
  //     },
  //   ],
  // }
  // );
  const handleSelectChangeXaxis = (value) => {
    setSelectedOption(value);
  };
  const handleCheckboxChangeforAggrigate = (e) => {
    setChecked(e.target.checked);
  };

  const handleApplyClickSelection = () => {
    console.log("Selected Date and Time Range:", dateTimeRange);
  };
  const handleCardClick = (index, title) => {
    setHighlightedCard(index);
    setClickedCard(title);
    setMyCards([]);
    setInterfaceCheckboxValues({});
    setCommunityCheckboxValues({});
    setRouterCheckboxValues({});
    setDateTimeRange([]);
    setChecked(false);
    setSelectedOption("24 Hours");
    // setClickedCard(null);
    setSelectedOptionsInCards([]);
    // setEndDateTime("")
    // setStartDateTime("")
    setSelectedDateTimeRange([]);
    setMainGraphData(null);
    setIsGraphVisible(false);
    setOptions({
      legend: {
        data: [],
      },
      xAxis: {
        type: "category",
        data: [],
      },
      yAxis: {
        type: "value",
      },
      series: [],
    });
  };
  useEffect(() => {
    console.log("blankkkkkkkkkkkk");
  }, [clickedCard]);
  const handleAddCard = () => {
    const newCard = {
      title: "New Card",
      selectedOption: null,
      checkboxValues: {},
    };
    setMyCards([...mycards, newCard]);
  };

  const handleSelectChange = (value, index) => {
    const updatedCards = [...mycards];
    updatedCards[index].selectedOption = value;
    // Clear the previous checkbox values when selecting a new option
    updatedCards[index].checkboxValues = {};
    setMyCards(updatedCards);

    // Store the selected option for the card in the state variable
    setSelectedOptionsInCards((prevSelectedOptions) => {
      const updatedSelectedOptions = [...prevSelectedOptions];
      updatedSelectedOptions[index] = value;
      return updatedSelectedOptions;
    });
  };

  const handleCheckboxChange = (e, index) => {
    console.log(e, index);
    console.log(e, index);

    const updatedCards = [...mycards];
    updatedCards[index].checkboxValues = {
      ...updatedCards[index].checkboxValues,
      [updatedCards[index].selectedOption]: e.target.value,
    };
    setMyCards(updatedCards);
  };

  const handleApplyClick = async () => {
    const interfaces = Object.keys(interfaceCheckboxValues).map(
      (index) => interfaceCheckboxValues[index]
    );
    const community = Object.keys(communityCheckboxValues).map(
      (index) => communityCheckboxValues[index]
    );
    const router = Object.keys(routerCheckboxValues).map(
      (index) => routerCheckboxValues[index]
    );

    const data = [{ interfaces }, { community }, { router }];

    const mydata = {
      datetimedata: dateTimeRange,
      aggregate: checked,
      interval: selectedOption,
      selectedItem: clickedCard,
      addtionalcardsData: data,
    };
    // console.log(refinedData)

    const actualdata = {};

    setIsGraphVisible(true);
    const allCheckboxValues = mycards.reduce((accumulator, current) => {
      const checkboxValues = current.checkboxValues;
      Object.keys(checkboxValues).forEach((key) => {
        accumulator[key] = [checkboxValues[key]];
      });
      return accumulator;
    }, {});

    const formattedData = Object.entries(allCheckboxValues).map(
      ([key, values]) => ({
        [key]: values,
      })
    );
    console.log(formattedData);
    const result = {};
    const keys = {
      "Entry 1": "first",
      "Entry 2": "second",
      "Entry 3": "third",
    };

    for (let i = 0; i < formattedData.length; i++) {
      const key = Object.keys(formattedData[i])[0];
      const value = formattedData[i][key];
      result[keys[`Entry ${i + 1}`]] = key;
      result[key] = value;
    }

    result["aggregate"] = checked;
    result["interval"] = selectedOption.toLowerCase();
    result["type"] = clickedCard.toLowerCase();
    result["start_date"] = startDateTime;
    result["end_date"] = endDateTime;

    console.log(result);

    setRefinedData(result);

    setIsGraphVisible(true);

    await axios
      .post(baseUrl + "/analytics", result)
      .then((response) => {
        // setMainGraphData(response.data)
        if (mainGraphData !== null) {
          setMainGraphData((prevData) => {
            return {
              series: [...prevData.series, response.data.series[0]],
              xData: response.data.xData,
            };
          });
        } else {
          setMainGraphData(response.data);
        }
        console.log(response.data);
        setIsModalOpen(false);

        // setLoading(false);
      })
      .catch((err) => {
        console.log("error ==> " + err);
        // setLoading(false);
      });
  };

  const handleResetClick = () => {
    setHighlightedCard(null);
    setMyCards([]);
    setInterfaceCheckboxValues({});
    setCommunityCheckboxValues({});
    setRouterCheckboxValues({});
    setDateTimeRange([]);
    setChecked(false);
    setSelectedOption("24 Hours");
    setClickedCard(null);
    setSelectedOptionsInCards([]);
    // setEndDateTime("")
    // setStartDateTime("")
    setSelectedDateTimeRange([]);
    setMainGraphData(null);
    setIsGraphVisible(false);
    setOptions({
      legend: {
        data: [],
      },
      xAxis: {
        type: "category",
        data: [],
      },
      yAxis: {
        type: "value",
      },
      series: [],
    });
  };
  return (
    <MainDivwithoutSidebarInfluxgraph>
      <div className="btncontainer">
        <button
          className="btn-custom"
          // type="primary"
          onClick={showModal}
          // style={ { width: "120px" } }
        >
          Generate Graph
        </button>
      </div>

      {/* <div className='flex justify-between'>
        <div>raza</div>
        <div className='flex gap-3'>
          <p>asd</p>
          <p>dsa</p>
          <p>asc</p>
        </div>
      </div> */}
      {/* <div className='flex sm:block md:flex'>
        <div
        // className='flex sm:block md:flex'
        >
          <p style={ { width: "200px" } }>df</p>
          <p style={ { width: "200px" } }>df</p>
        </div>
        <div
        // className='flex sm:block md:flex'
        >
          <p style={ { width: "200px" } }>df</p>
          <p style={ { width: "200px" } }>df</p>
        </div>
      </div> */}

      {/* <button className='btn-custom'>Generate Graph</button>
      <button className='btn-custom2'>custom</button>
      <p className='notification-animation'>A</p> */}

      <div className="graph-section" style={{ height: "500px" }}>
        {isGraphVisible ? (
          <ReactECharts
            option={options}
            style={{ height: "450px" }}
            
          />
        ) : (
          <p
            style={{
              height: "430px",
              display: "grid",
              placeItems: "center",
              fontSize: "25px",
              color: "#1f1f1f",
            }}
          >
            Generate Dynamic Graphs
          </p>
        )}
      </div>
      {/* : null } */}

      <Modal
        width={"100%"}
        footer={false}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ paading: "0px", margin: "0px" }}
      >
        <div
          className="app"
          style={{ overflowX: "auto", backgroundColor: "#DEF5FF" }}
        >
          <div className="card-container">
            <div
              style={{
                // display: "block",
                width: "200px",
                textAlign: "center",
                height: "250px",
                border: "1px solid #ccc",
                marginRight: "10px",
                borderRadius: "5px",
                backgroundColor: "#f7fdff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {cards.map((card, index) =>
                clickedCard !== null ? (
                  <Popconfirm
                    key={index}
                    title={`Do you want to select ${card.title}?`}
                    onConfirm={() => handleCardClick(index, card.title)}
                    okText="Yes"
                    cancelText="No"
                    placement="topRight"
                    // disabled={ clickedCard !== null }
                  >
                    <div
                      style={{
                        margin: "10px",
                        width: "160px",
                        textAlign: "center",
                      }}
                      className={`card ${
                        highlightedCard === index
                          ? "highlighted"
                          : "none_highlighted"
                      } ${
                        highlightedCard !== null && highlightedCard !== index
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <p disabled={highlightedCard === index ? true : false}>
                        {card.title}
                      </p>
                    </div>
                  </Popconfirm>
                ) : (
                  <div
                    key={index}
                    style={{
                      margin: "10px",
                      width: "160px",
                      textAlign: "center",
                    }}
                    className={`card ${
                      highlightedCard === index
                        ? "highlighted"
                        : "none_highlighted"
                    } ${
                      highlightedCard !== null && highlightedCard !== index
                        ? "disabled"
                        : ""
                    }`}
                    onClick={() => handleCardClick(index, card.title)}
                  >
                    <p disabled={highlightedCard === index ? true : false}>
                      {card.title}
                    </p>
                  </div>
                )
              )}
            </div>
            <div className="right-cards" style={{ marginRight: "10px" }}>
              {mycards.map((card, index) => (
                <div
                  key={card.id}
                  className="card"
                  style={{ height: "280px", overflowY: "auto" }}
                >
                  <div className="btncontainer">
                    <button
                      onClick={() => handleCardClose(card.id)}
                      className="close-button"
                    >
                      X
                    </button>
                  </div>
                  <Select
                    style={{ width: 200, marginBottom: 10 }}
                    placeholder="Select an option"
                    onChange={(value) => handleSelectChange(value, index)}
                  >
                    <Option
                      value="Interface"
                      disabled={
                        selectedOptionsInCards.includes("Interface") ||
                        !selectedOptionsInCards.includes("Router")
                      }
                    >
                      Interface
                    </Option>
                    {clickedCard !== "SNMP" ? (
                      <Option
                        value="Community"
                        disabled={selectedOptionsInCards.includes("Community")}
                      >
                        Community
                      </Option>
                    ) : null}
                    <Option
                      value="Router"
                      disabled={selectedOptionsInCards.includes("Router")}
                    >
                      Router
                    </Option>
                  </Select>
                  <div style={{ display: "block" }}>
                    {card.selectedOption && (
                      <Radio.Group
                        value={card.checkboxValues[card.selectedOption]}
                        onChange={(values) =>
                          handleCheckboxChange(values, index)
                        }
                      >
                        <Space direction="vertical">
                          {card.selectedOption === "Interface" && (
                            <>
                              {interfaceData.map((item) => (
                                <Radio key={item.value} value={item.value}>
                                  {item.label}
                                </Radio>
                              ))}
                            </>
                          )}
                          {card.selectedOption === "Community" &&
                            selectedOptionsInCards.includes("Community") && (
                              <>
                                {communityData.map((item) => (
                                  <Radio key={item.value} value={item.value}>
                                    {item.label}
                                  </Radio>
                                ))}
                              </>
                            )}
                          {card.selectedOption === "Router" && (
                            <>
                              {hostnameData.map((item) => (
                                <Radio
                                  key={item.value}
                                  value={item.value}
                                  onClick={() => setFilterRouterId(item.id)}
                                >
                                  {item.label}
                                </Radio>
                              ))}
                            </>
                          )}
                        </Space>
                      </Radio.Group>
                    )}
                  </div>
                </div>
              ))}

              <div className="add-card" onClick={addNewCard}>
                +
              </div>
            </div>
            <div className="main-card">
              {/* <Space direction="vertical" style={ { marginTop: "8px", marginBottom: "8px" } }>
                <Checkbox checked={ checked } onChange={ handleCheckboxChangeforAggrigate }>
                  Aggrigate
                </Checkbox>
              </Space> */}
              <Space
                direction="vertical"
                style={{ marginTop: "8px", marginBottom: "8px" }}
              >
                <Select
                  style={{ width: 200 }}
                  placeholder="Select an option"
                  value={selectedOption}
                  onChange={handleSelectChangeXaxis}
                >
                  <Option value={24}>24 Hours</Option>
                </Select>
              </Space>
              <Space
                direction="vertical"
                style={{ marginTop: "8px", marginBottom: "8px" }}
              >
                {/* <RangePicker
                showTime={ { format: 'HH:mm' } }
                format="YYYY-MM-DD HH:mm"
                value={ dateTimeRange }
                onChange={ handleDateTimeRangeChange }
              /> */}
                {/* <RangePicker showTime={ { format: 'HH:mm' } } onChange={ handleDateTimeRangeChange } /> */}
                <Space direction="vertical" size={12}>
                  {/* Custom Hours Input */}
                  {/* <Input type="number" value={ customHours } onChange={ handleCustomHoursChange } /> */}
                  {/*
                <DatePicker
                  presets={ [
                    {
                      label: 'Yesterday',
                      value: dayjs().add(-1, 'd'),
                    },
                    {
                      label: 'Last Week',
                      value: dayjs().add(-7, 'd'),
                    },
                    {
                      label: 'Last Month',
                      value: dayjs().add(-1, 'month'),
                    },
                  ] }
                  onChange={ onChange }
                />

                {/* Custom RangePicker with presets
                <RangePicker presets={ rangePresets } onChange={ onRangeChange } /> */}

                  {/* Custom RangePicker with presets and time */}
                  <RangePicker
                    style={{ marginTop: "0px" }}
                    presets={rangePresets}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={onRangeChange}
                  />

                  {/* Display custom range */}
                  {/* <div>
                  <p>Custom Range: </p>
                  { customHours > 0 && (
                    <>
                      <p>From: { getCustomRange()[0].format('YYYY-MM-DD HH:mm:ss') }</p>
                      <p>To: { getCustomRange()[1].format('YYYY-MM-DD HH:mm:ss') }</p>
                    </>
                  ) }
                </div> */}
                </Space>
                {/* <button onClick={ extractDateTime }>Extract Date and Time</button> */}
                {/* <Button onClick={ handleApplyClick }>Apply</Button> */}
              </Space>

              <Button
                styles={{ backgroundColor: "#009bdb !important" }}
                onClick={handleApplyClick}
                style={{ marginTop: "8px", marginBottom: "8px" }}
              >
                Add
              </Button>
              <Popconfirm
                title="Are you sure you want to reset?"
                onConfirm={handleResetClick}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Reset
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </Modal>
    </MainDivwithoutSidebarInfluxgraph>
  );
};

export default Index;

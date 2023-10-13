import React, { useState, useEffect, useCallback } from 'react';
import { Switch } from 'antd';
import {
  MainDivwithoutSidebar,
  TableStyle,
} from "../../Components/GlobalStyles/main.styled.js";

import BG from "../../Images/Mask group.png"

const Table = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  const [hideColumns, setHideColumns] = useState(false);
  const [hideColumnsCommunity, setHideColumnsCommunity] = useState(false);
  const [hideOtherColumns, setHideOtherColumns] = useState(false);
  const [routerIpClicked, setRouterIpClicked] = useState(false);
  const [hideOthercommunityColumns, setHideOtherCommunityColumns] = useState(false);
  const [communityClicked, setcommunityClicked] = useState(false);
  const [showColumnHeadings, setShowColumnHeadings] = useState(true); // New state variable

  const handleItemClick = (index) => {
    if (selectedItem === index) {
      setSelectedItem(null);
      setHideColumns(false);
      setHideOtherColumns(false);
      setRouterIpClicked(false);
    } else {
      setSelectedItem(index);
    }
  };

  const handleRouterIpClick = () => {
    setHideOtherColumns(!routerIpClicked);
    setRouterIpClicked(routerIpClicked);
    setShowThirdTable(false);
    setHideColumnsCommunity(false);
    setSelectedCommunity(null)
  };

  useEffect(() => {
    if (hideOtherColumns) {
      setHideColumns(true);
    } else {
      setHideColumns(false);
    }
  }, [hideOtherColumns]);
  useEffect(() => {
    if (hideOthercommunityColumns) {

      setHideColumnsCommunity(true);
    } else {
      setHideColumnsCommunity(false);
    }
  }, [hideOthercommunityColumns]);
  const handleSwitchChange = (checked, key) => {
    // Find the item in filteredData2 with the given key and update its checkbox value
    const updatedData2 = filteredData2.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          checkbox: checked ? 1 : 0,
        };
      }
      return item;
    });

    // Update the filteredData2 state with the updated data
    setFilteredData2(updatedData2);
  };

  const columnsthird = [
    { label: "Community", key: "community" },
    { label: "Ram", key: "ram" },
    { label: "Rom", key: "rom" },
    { label: "moniter", key: "moniter" },
  ];
  const columns = [
    { label: "Hostname", key: "hostname" },
    { label: "Utilization", key: "utilization" },
    { label: "sdf", key: "sdf" },
  ];
  const columns2 = [
    { label: "Community", key: "community" },
    { label: "Netflow", key: "netflow" },
    { label: "BGP", key: "bgp" },
    { label: "Current Status", key: "current_status" },
    { label: "Default Status", key: "default_status" },
    { label: "Suggested Status", key: "suggested_status" },
    { label: "Checkbox", key: "checkbox" },
  ];
  const thirdData = [
    {
      community: 25,
      ram: "sdv",
      rom: "sdf", moniter: "asafs"
    },
    {
      community: 25,
      ram: "sdsdsv", rom: "sdf", moniter: "asafs"
    },
    {
      community: 5,
      ram: "dv", rom: "sdf", moniter: "asafs"
    }
  ]
  const data1 = [
    { id: 1, hostname: "Bundlesfsfsefwef--100", utilization: "10 GB", sdf: "scs" },
    { id: 2, hostname: "Bundle--101", utilization: "15 GB", sdf: "scs" },
    { id: 3, hostname: "Bundle--102", utilization: "20 GB", sdf: "scs" },
    { id: 5, hostname: "Bundle--102", utilization: "20 GB", sdf: "scs" },
    { id: 6, hostname: "Bundle--102", utilization: "20 GB", sdf: "scs" },
    { id: 8, hostname: "Bundle--102", utilization: "20 GB", sdf: "scs" },
    { id: 33, hostname: "Bundle--102", utilization: "20 GB", sdf: "scs" },
    // { id: 32, hostname: "Bundle--102", utilization: "20 GB", sdf: "scs" },
    // { id: 4, hostname: "Bundle--102", utilization: "20 GB", sdf: "scs" },
    // { id: 0, hostname: "Bundle--102", utilization: "20 GB", sdf: "scs" },
    // { id: 10, hostname: "Bundle--102", utilization: "20 GB", sdf: "scs" },
  ];
  const detailsData = [
    {
      id: 1,
      key: "231",
      community: 25,
      netflow: "New York",
      bgp: "BGP 1",
      current_status: 1,
      default_status: 0,
      suggested_status: 1,
      checkbox: 1,
    },
    {
      id: 1,
      key: "34",
      community: 5,
      netflow: "New York",
      bgp: "BGP 1",
      current_status: 1,
      default_status: 0,
      suggested_status: 0,
      checkbox: 1,
    },
    {
      id: 1,
      key: "1",
      community: 255,
      netflow: "New",
      bgp: "BGP 21",
      current_status: 0,
      default_status: 0,
      suggested_status: 1,
      checkbox: 0,
    },
    {
      id: 3,
      key: "2",
      community: 54,
      netflow: "York",
      bgp: "BGP 14",
      current_status: 1,
      default_status: 1,
      suggested_status: 1,
      checkbox: 1,
    },
  ];

  // Filter data1 based on the hideColumns state
  const [filteredData1, setFilteredData1] = useState(data1);
  // Filter data2 based on the selected ID
  const [filteredData2, setFilteredData2] = useState([]);
  const [defaultStatusData, setDefaultStatusData] = useState([]);
  const [suggestedStatusData, setSuggestedStatusData] = useState([]);
  const [showThirdTable, setShowThirdTable] = useState(false); // New state variable to handle the visibility of the third table
  const [filteredThirdData, setFilteredThirdData] = useState([]);
  // Update handleCommunityClick function to filter thirdData based on the selected community
  const handleCommunityClick = (community) => {







    if (selectedCommunity === community) {
      setSelectedCommunity(null); // Show the third table
      setHideColumnsCommunity(false)


    } else {

      setShowThirdTable(true); // Show the third table


      setHideColumnsCommunity(true)
      setHideOtherCommunityColumns(!communityClicked);
      setcommunityClicked(communityClicked)


      setSelectedCommunity(community);
      // Filter thirdData based on the selected community and update the state variable
      const filteredData = thirdData.filter((item) => item.community === community);
      setFilteredThirdData(filteredData);




    }
















  };

  const handleCopyDefault = useCallback(() => {
    const updatedData2 = filteredData2.map(item => ({
      ...item,
      checkbox: item.default_status,
    }));
    setFilteredData2(updatedData2);
  }, [filteredData2]);

  const handleCopySuggested = useCallback(() => {
    const updatedData2 = filteredData2.map(item => ({
      ...item,
      checkbox: item.suggested_status,
    }));
    setFilteredData2(updatedData2);
  }, [filteredData2]);
  const handleSaveToDefault = useCallback(() => {
    const updatedData2 = filteredData2.map(item => ({
      ...item,
      default_status: item.checkbox,
    }));
    setFilteredData2(updatedData2);
  }, [filteredData2]);
  useEffect(() => {
    if (selectedItem !== null) {
      const updatedFilteredData2 = detailsData.filter((item) => item.id === selectedItem + 1);
      setFilteredData2(updatedFilteredData2);
    } else {
      setFilteredData2(detailsData);
    }
  }, [selectedItem]);
  // useEffect(() => {
  //   if (selectedItem !== null) {
  //     const updatedFilteredData2 = detailsData.filter(item => item.id === selectedItem + 1);
  //     setFilteredData2(updatedFilteredData2);
  //     const defaultStatusArr = updatedFilteredData2.map(item => ({
  //       ...item,
  //       checkbox: item.default_status,
  //     }));
  //     setDefaultStatusData(defaultStatusArr);

  //     const suggestedStatusArr = updatedFilteredData2.map(item => ({
  //       ...item,
  //       checkbox: item.suggested_status,
  //     }));
  //     setSuggestedStatusData(suggestedStatusArr);
  //   } else {
  //     setFilteredData2(detailsData);
  //     setDefaultStatusData([]);
  //     setSuggestedStatusData([]);
  //   }
  // }, [selectedItem, detailsData]);

  return (
    <MainDivwithoutSidebar style={ { marginTop: "50px" } } className="bg- [url('../Images/Mask group.png')] " >

      {/* <div style={ { maxWidth: "100%" } }> */ }
      <div className="flex flex-row">
        <div className={ selectedItem === null ? "flex-1" : "" } style={ { zIndex: 9999, height: '500px', overflowY: selectedItem !== null ? "" : "auto" } }>

          <table className={ `${selectedItem === null ? 'w-full' : 'w-[320px]'} ` }>
            <thead className="bg-[#009BDB] border-l-[5px]" >
              <tr>
                { columns.map((column, index) => (
                  <th

                    key={ index }
                    style={ {
                      display: (index === 0 || !hideColumns || routerIpClicked) ? "revert" : "none",
                      width: "300px"
                    } }
                    className={ `text-white font-inter text-base font-bold
                      text-left py-3 px-5`}
                  >

                    { column.label }
                  </th>
                )) }
              </tr>
            </thead>
            <tbody style={ { width: "300px" } }>
              { filteredData1.map((item) => (
                <React.Fragment key={ item.id }>
                  <tr className="h-2"></tr>
                  <tr
                    className={ `bg-white ${item.id % 2 === 0
                      ? "w-[370] border-left-[5px] border-[#009BDB]"
                      : "border-left-[5px] border-[#9ccbdc]"
                      }` }
                    style={ { borderBottom: "1px solid #E3E1E1" } }
                    onClick={ () => handleItemClick(item.id - 1) }
                  >
                    <td
                      style={ { width: "300px" } }
                      onClick={ () => handleRouterIpClick() }
                      className={
                        selectedItem === item.id - 1
                          ? "px-5 py-2 bg-[#DAF4FF] drop-shadow-md border-l-[5px] h-10 border-[#009BDB]"
                          : "px-5 py-2 bg-white w-[320px] border-l-[5px]"
                      }
                    >
                      { selectedItem === item.id - 1 ? (
                        <>
                          { item.hostname }
                          <div className="absolute top-0 left-0 h-10 bg-[#DAF4FF]" style={ { right: -15 } }>
                            <div className="w-full h-full flex flex-col justify-center px-5">
                              { item.hostname }
                            </div>
                          </div>
                        </>
                      ) : (
                        <>{ item.hostname }</>
                      ) }
                    </td>
                    { !hideColumns && (
                      <>
                        <td style={ { width: "300px" } } className='pl-5'>{ item.utilization }</td>
                        {/* <td></td> */ }
                        <td style={ { width: "300px" } } className='pl-5'>{ item.sdf }</td>
                      </>
                    ) }
                  </tr>
                </React.Fragment>
              )) }
            </tbody>
          </table>

        </div>
        { selectedItem !== null && (
          <div>
            <button style={ { fontSize: "18px" } } onClick={ () => {
              handleItemClick(selectedItem);
            } }>
              X
            </button>
            {/* <div className="flex space-x-4 mt-4">
              <button onClick={ handleCopyDefault } className="px-4 py-2 bg-blue-500 text-white rounded">
                Copy Default
              </button>
              <button onClick={ handleCopySuggested } className="px-4 py-2 bg-blue-500 text-white rounded">
                Copy Suggested
              </button>
              <button onClick={ handleSaveToDefault } className="px-4 py-2 bg-green-500 text-white rounded">
                Save to Default
              </button>
            </div> */}
            {/* <div className={ `flex flex-row px-9 pb-5 bg-[#F5FCFF] w-full h-full ${selectedItem !== null ? "drop-shadow-2xl" : ""}` } style={ { maxHeight: '500px', overflowY: 'auto', height: "500px" } }> */ }
            <div className={ `px-2 pb-5 bg-[#F5FCFF] ${selectedItem === null ? 'flex-1' : ''}` } style={ { overflowY: selectedItem !== null ? '' : 'auto' } }>
              <div className="flex">
                <div className={ `${selectedCommunity === null ? 'flex-1' : ''}` } style={ { height: '500px', overflowY: selectedCommunity !== null ? '' : 'auto' } }>
                  <table className={ `${selectedCommunity === null ? 'w-full' : 'w-[350px]'} border-collapse` } style={ { maxWidth: '100%', overflowX: 'auto' } }>
                    <thead className="bg-[#009BDB] border-l-[5px]">
                      <tr>
                        { columns2.map((column, index) => (
                          <th
                            key={ index }
                            style={ {
                              display: (index === 0 || !hideColumnsCommunity || communityClicked) ? 'revert' : 'none',
                              width: '300px',
                            } }
                            className="text-white font-inter text-base font-bold text-left py-3 px-5"
                          >
                            { column.label }
                          </th>
                        )) }
                      </tr>
                    </thead>
                    <tbody>
                      { filteredData2.map((item) => (
                        <React.Fragment>
                          <tr className="h-2"></tr>
                          <tr
                            className={ `overflow-auto bg-white border-l-5 ${selectedCommunity === item.community ? 'border-[#009BDB]' : 'border-[#9ccbdc]'} ` }
                            style={ { borderBottom: '1px solid #E3E1E1' } }
                          >
                            <td
                              style={ { width: '300px' } }
                              onClick={ () => handleCommunityClick(item.community) }
                              className={ `px-5 py-2 ${selectedCommunity === item.community ? 'bg-[#DAF4FF] drop-shadow-md border-l-5 h-10 border-[#009BDB]' : 'bg-white w-[0px] border-l-5'}` }
                            >
                              { selectedCommunity === item.community ? (
                                <>
                                  { item.community }
                                  <div className="absolute top-0 left-0 h-10 bg-[#DAF4FF]" style={ { right: -15 } }>
                                    <div className="w-full h-10 flex flex-col justify-center px-5">
                                      { item.community }
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>{ item.community }</>
                              ) }
                            </td>
                            { !hideColumnsCommunity && (
                              <>
                                <td className="px-5 py-2">{ item.netflow }</td>
                                <td className="px-5 py-2">{ item.bgp }</td>
                                <td className="px-5 py-2">{ item.current_status }</td>
                                <td className="px-5 py-2">{ item.default_status }</td>
                                <td className="px-5 py-2">{ item.suggested_status }</td>
                                <td className="px-5 py-2">
                                  <Switch
                                    checked={ item.checkbox === 1 }
                                    onChange={ (checked) => handleSwitchChange(checked, item.key) }
                                  />
                                </td>
                              </>
                            ) }
                          </tr>
                        </React.Fragment>
                      )) }
                    </tbody>
                  </table>
                </div>
                { selectedCommunity !== null && (
                  <div className="flex-2" style={ { height: '500px', overflowY: selectedCommunity !== null ? '' : 'auto' } }>
                    <table className={ `${selectedCommunity === null ? 'w-full' : 'w-full'} ` }>
                      <thead className="bg-[#009BDB] border-l-[5px]">
                        <tr>
                          { columnsthird.map((column, index) => (
                            <th
                              key={ index }
                              style={ {
                                display: hideColumnsCommunity || communityClicked ? 'revert' : 'none',
                                width: '300px',
                              } }
                              className="text-white font-inter text-base font-bold text-left py-3 px-5"
                            >
                              { column.label }
                            </th>
                          )) }
                        </tr>
                      </thead>
                      <tbody style={ { width: '300px' } }>
                        { filteredThirdData.map((item) => (
                          <React.Fragment key={ item.id }>
                            <tr className="h-2"></tr>
                            <tr
                              className={ `bg-white ${item.id % 2 === 0 ? 'w-[370] border-left-[5px] border-[#009BDB]' : 'border-left-[5px] border-[#9ccbdc]'
                                }` }
                              style={ { borderBottom: '1px solid #E3E1E1' } }
                              onClick={ () => handleItemClick(item.id - 1) }
                            >
                              <td style={ { width: '300px' } } className="h-10 pl-5">
                                { item.community }
                              </td>
                              <td style={ { width: '300px' } } className="h-10 pl-5">{ item.ram }</td>
                              <td style={ { width: '300px' } } className="h-10 pl-5" >{ item.rom }</td>
                              <td style={ { width: '300px' } } className="h-10 pl-5" >{ item.moniter }</td>
                              {/* Add more columns here if needed */ }
                            </tr>
                          </React.Fragment>
                        )) }
                      </tbody>
                    </table>
                  </div>
                ) }
              </div>
            </div>
          </div>
        ) }
      </div>
      {/* </div> */ }
    </MainDivwithoutSidebar>
  );
};

export default Table;
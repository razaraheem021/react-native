import React, { useState, useEffect } from "react";
import "./style.css";
import {
  TableStyle,
  MainDiv,
} from "../../../Components/GlobalStyles/main.styled";
import { Button, Radio, Space, Divider, Spin } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";

import { Upload, message, Table } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import axios from "axios";
import Swal from "sweetalert2";

const columns = [
  // Define your columns here
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Management IP",
    dataIndex: "management_ip",
    key: "management_ip",
  },
  {
    title: "MSR IP",
    dataIndex: "msr_ip",
    key: "msr_ip",
  },
  {
    title: "IP Address",
    dataIndex: "ip_address",
    key: "ip_address",
  },
  {
    title: "Current Path",
    dataIndex: "current_path",
    key: "current_path",
  },
  {
    title: "Delay",
    dataIndex: "delay",
    key: "delay",
  },
  {
    title: "Need Optimization",
    dataIndex: "need_optimization",
    key: "need_optimization",
  },
  {
    title: "Comments",
    dataIndex: "comments",
    key: "comments",
  },
  {
    title: "Optimized Route",
    dataIndex: "optimized_route",
    key: "optimized_route",
  },
  {
    title: "Optimized Delay",
    dataIndex: "optimized_delay",
    key: "optimized_delay",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Updated At",
    dataIndex: "updated_at",
    key: "updated_at",
  },
  // Add more columns as needed
];

const index = () => {
  const [size, setSize] = useState("medium");
  const [file, setFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [spin, setSpin] = useState(false);
  // const [data, setData] = useState([]);

  const [data, setData] = useState([]);
  // const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [postData, setPostData] = useState([]);
  console.log(postData, "post data");
  const openSweetAlert = (title, type, errors) => {
    console.log("Error-------->", errors);

    Swal.fire({
      title,
      type,
      allowOutsideClick: false,
    });
  };
  const dataPost = async () => {
    // const apiUrl = "http://10.73.211.89:8442/call_puller";

    const response = await axios.post(
      "http://10.73.211.89:8442/call_puller",
      postData
    );
    console.log(response, "response");
    if (response) {
      openSweetAlert(response.data.msg, "info");
      setCurrentStep(3);
    }
  };
  // ===========================
  const dataFetch = async () => {
    try {
      const apiUrl = "http://10.73.211.89:8442/get_puller_data";

      const response = await axios.get(apiUrl);
      console.log(response.data.data, "fetch response");



const fiteredData = response.data.data.map((item) => {

        const { id, ...rest } = item;

        return rest;

      });

      setData(fiteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    dataFetch();

    const intervalId = setInterval(dataFetch, 60000);

    return () => clearInterval(intervalId);
    // return () => {};
  }, []);

  const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "rowClassName1";
    } else {
      return "rowClassName2";
    }
  };

  const [messageApi, contextHolder] = message.useMessage();

  const jsonToExcel = (latencyData) => {
    let wb = XLSX.utils.book_new();
    if (latencyData && latencyData.length > 0) {
      let binarySeedData = XLSX.utils.json_to_sheet(latencyData);

      XLSX.utils.book_append_sheet(wb, binarySeedData, "latency");

      XLSX.writeFile(wb, "latency.xlsx");
    } else {
      messageApi.open({
        className: "custom-error-message",
        type: "error",
        content: "Please upload the file",
      });
    }

    // setExportLoading(false);
  };

  const handleFileDownload = async () => {
    // setExportLoading(true);

    jsonToExcel(data);

    // setExportLoading(false);
  };

  console.log(currentStep, "curr");

  const handleFileUpload = (info) => {
    if (info.file.status === "done") {
      setCurrentStep(2);
      setUploadInProgress(true);

      try {
        // Get the uploaded XLSX file
        const file = info.file.originFileObj;
        setFile(file);
        messageApi.open({
          className: "custom-message",
          type: "success",
          // content: `File ${file.name} is uploaded successfully!`,
          content: `File ${file.name} is uploaded successfully!`,
          duration: 6,
        });
        // Read the XLSX file
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });

          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const parsedData = XLSX.utils.sheet_to_json(sheet);

          // Extract IP addresses and create an array
          const ipAddresses = parsedData.map((row) => row.ip_address);

          // Set the array of IP addresses in the state
          // setTableData(ipAddresses);
          console.log(ipAddresses, "parse data");

          // Set the parsed data in the state
          // setTableData(parsedData);
          setPostData(ipAddresses);

          setUploadInProgress(false);
        };
        reader.readAsBinaryString(file);
      } catch (error) {
        console.error("Error processing file:", error);
      }
    }
  };

  const startProcessing = () => {
    setProcessing(true);
    setCurrentStep(3);
  };
  console.log(tableData, "tableData");

  return (
    <MainDiv style={{ padding: "20px 30px" }}>
      {contextHolder}

      {/* <Spin /> */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <Upload
            accept=".xlsx"
            customRequest={({ file, onSuccess }) =>
              setTimeout(() => onSuccess("ok"), 0)
            }
            showUploadList={false}
            onChange={handleFileUpload}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          {(currentStep === 2 || currentStep === 3) && !uploadInProgress ? (
            <>
              <Button
                onClick={
                  dataPost

                  // () => {
                  // setSpin(true);
                  // startProcessing();
                  // fetchData();
                  // }
                }
                // onClick={startProcessing}
                className="start_btn"
                type="primary"
                size={size}
                disabled={uploadInProgress}
              >
                Start
              </Button>
            </>
          ) : uploadInProgress ? (
            <Spin />
          ) : (
            ""
          )}
          {data && data.length > 0 ? (
            <Button
              className="download_btn"
              type="primary"
              size={size}
              onClick={handleFileDownload}
            >
              Download
            </Button>
          ) : (
            ""
          )}
        </div>
        {/* {processing && ( */}
        <TableStyle
          rowClassName={rowClassName}
          dataSource={data}
          columns={columns}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["3", data.length],
          }}
        />
        {/* )} */}
      </div>
    </MainDiv>
  );
};

export default index;

import React, { useState, useEffect } from "react";
import { Input, Select, Button } from "antd";
import {
  MainDivwithoutSidebar,
  MainDivwithoutSidebarInfluxgraph,
  TableStyle,
  MainTableFailedDevicesTitle,
  MainTableFailedDevices,
} from "../../../Components/GlobalStyles/main.styled.js";

import axios, { baseUrlofAcl } from "../../../utils/axios/Acl.jsx";
const Index = () => {
  const [name, setName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const SiteNames = async () => {
    const res = await axios
      .get(baseUrlofAcl + "/aclApiSiteName")
      .then((response) => {
        console.log("Site Names", response.data);
        // setData(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    SiteNames();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Name:", name);
    console.log("Selected Options:", selectedOptions);
  };
  const handleReset = () => {
    setName("");
    setSelectedOptions([]);
  };
  return (
    <MainDivwithoutSidebar>
      <div style={{ display: "grid", placeItems: "center", minHeight: "80vh" }}>
        <div
          style={{
            padding: "20px",
            width: "380px",

            borderRadius: "8px",
            border: "1px solid #009BDB",
            background: "#FFF",
            boxShadow: "3px 4px 24px 0px rgba(0, 0, 0, 0.06)",
          }}
        >
          <h3 style={{ fontSize: "26px", fontWeight: 600 }}>
            Add Site Mapping
          </h3>
          <br />
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <Input value={name} onChange={handleNameChange} />
            </div>
            <br />
            <div>
              <label>Select Options:</label>
              <Select
                mode="multiple"
                value={selectedOptions}
                onChange={handleSelectChange}
                style={{ width: "100%" }}
              >
                <Option value="option1">Option 1</Option>
                <Option value="option2">Option 2</Option>
                <Option value="option3">Option 3</Option>
                <Option value="option4">Option 4</Option>
              </Select>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                gap: 10,
              }}
            >
              <Button
                type="primary"
                danger
                onClick={handleReset}
                style={{ width: "50%" }}
              >
                Reset
              </Button>
              <Button type="primary" htmlType="submit" style={{ width: "50%" }}>
                Submit
              </Button>
            </div>
            <br />
            <br />
          </form>
        </div>
      </div>
    </MainDivwithoutSidebar>
  );
};

export default Index;

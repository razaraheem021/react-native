// import React, { useState, useEffect } from "react";
// import {
//   MainDiv,
//   TableStyle,
// } from "../../../Components/GlobalStyles/main.styled.js";

// import device from "./assets/devices.svg";
// import edit from "./assets/edit.svg";
// import axios, { baseUrl } from "../../../utils/axios";
// import "../../../index.css";

// const Index = () => {
//   const [data, setData] = useState([]);

//   // useEffect(() => {
//   //   const ServiceData = async () => {
//   //     let res = await axios.get(baseUrl + "/setting/device");
//   //     console.log(res.data);
//   //     setData(res.data);
//   //   };
//   //   ServiceData();
//   // }, []);

//   const columns = [
//     {
//       title: "Hostname",
//       dataIndex: "hostname",
//       key: "hostname",
//     },
//     {
//       title: "Ip Address",
//       dataIndex: "ip_address",
//       key: "ip_address",
//     },

//     {
//       title: "Action",
//       dataIndex: "action",
//       key: "action",
//       align: "center",
//       render: (text) => (
//         <>
//           <div
//             style={{
//               display: "flex",
//               gap: 5,
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <img src={edit} alt="" />
//           </div>
//         </>
//       ),
//     },
//   ];
//   const rowClassName = (record, index) => {
//     if (index % 2 === 0) {
//       return "rowClassName1";
//     } else {
//       return "rowClassName2";
//     }
//   };
//   return (
//     <MainDiv style={{ padding: "20px" }}>
//       <div style={{ display: "flex" }}>
//         <img src={device} alt="" /> &nbsp;&nbsp;
//         <p style={{ fontWeight: 700, fontSize: "20px" }}>Device</p>
//       </div>
//       <br />
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <p style={{ display: "flex", fontSize: "16px" }}>
//           {/* Row &nbsp;<b> 12</b>&nbsp;&nbsp; Col &nbsp;<b>12</b> */}
//         </p>
//         {/* <div>
//           <Button onClick={handleOpenModal}>Add User</Button>
//         </div> */}
//       </div>
//       {/* <TableStyle
//         rowClassName={rowClassName}
//         dataSource={data}
//         columns={columns}
//         // onChange={(pagination, filters) => {
//         //   if (filters.role) {
//         //     setRoleFilter(filters.role);
//         //   } else {
//         //     setRoleFilter([]);
//         //   }
//         // }}
//       /> */}
//       {/* <Modal
//         open={modalVisible}
//         title="Registration Form"
//         onCancel={handleCloseModal}
//         footer={[
//           <Button key="cancel" onClick={handleCloseModal}>
//             Cancel
//           </Button>,
//           <Button key="submit" type="primary" onClick={handleFormSubmit}>
//             Register
//           </Button>,
//         ]}
//       >
//         <form>
//           <div>
//             <label>Hostname</label>
//             <Input
//               name="hostname"
//               value={formValues.hostname}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Email</label>
//             <Input
//               type="email"
//               name="email"
//               value={formValues.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Role</label>
//             <Select
//               name="role"
//               value={formValues.role}
//               onChange={handleSelectChange}
//               required
//             >
//               <Option value="admin">Admin</Option>
//               <Option value="user">User</Option>
//             </Select>
//           </div>
//           <div>
//             <label>Password</label>
//             <Input.Password
//               name="password"
//               value={formValues.password}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </form>
//       </Modal> */}
//     </MainDiv>
//   );
// };

// export default Index;

import React, { useState, useEffect } from "react";
import {
  MainDiv,
  TableStyle,
} from "../../../Components/GlobalStyles/main.styled.js";

const Index = () => {
  return <MainDiv>Index</MainDiv>;
};

export default Index;

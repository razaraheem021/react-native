import React from "react";
import { FirstTimeLogin } from "../../Components/GlobalStyles/main.styled.js";
import Cisco from "./assets/cisco.png";
import Mobily from "./assets/mobily.png";

const Index = () => {
  return (
    <FirstTimeLogin>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: "95vh",
        }}
      >
        <div
          style={{
            width: "30%",
            borderWidth: "3px",
            border: `3px solid #bbdeec`,
            // borderImage: `linear-gradient(135deg, #009BDB, #0897D2E1, #5DB6DB, #B0D8E9CD, #A7CFE0BA, #E8F8FFF4) 1`,
            // borderImageSlice: 1,
            borderRadius: "16px",
            height: "450px",
            padding: "30px",
          }}
        >
          <img
            src={Cisco}
            alt="Cisco"
            width={100}
            // style={{ width: "100px", height: "100px" }}
          />
          <img src={Cisco} alt="Cisco" style={{ marginTop: "5px" }} />
          <img src={Mobily} alt="Mobily" />
        </div>
      </div>
    </FirstTimeLogin>
  );
};

export default Index;

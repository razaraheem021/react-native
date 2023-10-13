import React from "react";
import highConj from "./high.svg";

const Index = ({
  customColor,
  customImgLeft,
  customImgRight,
  content,
  customBgColor,
  contentTitle,
  contentTitleColor,
  customImgTop,
}) => {
  return (
    <div
      style={{
        color: customColor,
        marginRight: "15px",

        boxShadow: "3px 4px 16px 0px rgba(0, 0, 0, 0.14)",
        // padding: "1em",
        borderRadius: "8px",
        background: customBgColor,
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <img
          src={customImgTop}
          alt=""
          style={{ marginTop: "10px", marginBottom: "-12px" }}
        />
      </div>

      <img src={customImgLeft} alt="" />
      <div style={{ width: "150px", display: "flex" }}>
        <div style={{ flexDirection: "column" }}>
          <p
            style={{
              color: customColor,
              fontSize: "25px",
              fontWeight: "bold",
              width: "150px",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            {content}
          </p>
          <p
            style={{
              color: contentTitleColor,
              width: "150px",
              textAlign: "center",
              marginTop: "-20px",
              fontWeight: "500",
            }}
          >
            {contentTitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

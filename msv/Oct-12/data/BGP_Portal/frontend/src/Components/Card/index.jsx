import React from "react";

const Index = ({
  customColor,
  customImgLeft,
  customImgRight,
  content,
  customBgColor,
  contentTitle,
  contentTitleColor,
}) => {
  return (
    <div
      style={{
        color: customColor,
        margin: "8px",
        boxShadow: "3px 4px 16px 0px rgba(0, 0, 0, 0.14)",
        padding: "1em",
        borderRadius: "8px",
        background: customBgColor,
      }}
    >
      <div style={{ width: "180px", display: "flex" }}>
        <img src={customImgLeft} alt="" />
        <div style={{ flexDirection: "column", padding: "8px" }}>
          <p
            style={{
              color: customColor,
              fontSize: "25px",
              fontWeight: "bold",
              width: "120px",
              textAlign: "center",
            }}
          >
            {content}
          </p>
          <p
            style={{
              color: contentTitleColor,
              width: "120px",
              textAlign: "center",
            }}
          >
            {contentTitle}
          </p>
        </div>

        <img
          style={{ display: "flex", justifyContent: "flex-end" }}
          src={customImgRight}
          alt=""
        />
      </div>
    </div>
  );
};

export default Index;

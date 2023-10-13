import React from "react";
import { MainDiv } from "../../../Components/GlobalStyles/main.styled.js";
import { ComponentStyle } from "../../../Components/GlobalStyles/main.styled.js";

const Index = () => {
  return (
    <MainDiv>
      Home
      <ComponentStyle>
        <article className="dashboard-top">
          <article className="graph-placeholder">
            <h3 className="title">Configuration Backup Summary</h3>

            <h3>Raza Raheem</h3>
          </article>
          <article className="graph-placeholder">
            <h3 className="title">Configuration Backup Summary</h3>

            <h3>Raza Raheem</h3>
          </article>
          <article className="graph-placeholder">
            <h3 className="title">Configuration Backup Summary</h3>

            <h3>Raza Raheem</h3>
          </article>
        </article>
      </ComponentStyle>
    </MainDiv>
  );
};

export default Index;

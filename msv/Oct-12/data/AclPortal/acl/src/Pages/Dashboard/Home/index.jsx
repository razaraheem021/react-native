import React from "react";
import { MainDiv } from "../../../Components/GlobalStyles/main.styled.js";
import { ComponentStyle,TestingSvg } from "../../../Components/GlobalStyles/main.styled.js";
import {SvgTest} from "../../../SVG";

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
<TestingSvg>

      <span
        className="chatbot-icon"
        
      >
        <SvgTest />
      </span>
</TestingSvg>
<p>Raza</p>

    </MainDiv>
  );
};

export default Index;

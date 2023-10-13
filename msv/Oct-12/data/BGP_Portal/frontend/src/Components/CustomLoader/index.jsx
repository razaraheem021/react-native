// import React from "react";
// import { LoaderStyle } from "../GlobalStyles/main.styled.js";
// import PreLoader from "./spin.png";

// function Loader() {
//   return (
//     <LoaderStyle>
//       <img src={PreLoader} alt="Loader..." />
//     </LoaderStyle>
//   );
// }

// export default Loader;

import { Spin } from "antd";
import React from "react";
import { LoaderStyle } from "../GlobalStyles/main.styled.js";

function Loader() {
  return (
    <LoaderStyle>
      <Spin size="large" />
    </LoaderStyle>
  );
}

export default Loader;

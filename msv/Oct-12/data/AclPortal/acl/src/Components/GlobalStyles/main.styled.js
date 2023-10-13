import { Layout, Menu, Table, Input } from "antd";
import styled from "styled-components";
import {
  CommonSpacing,
  FlexboxStyle,
  GridBoxStyle,
  Poisitioning,
} from "../../styles/CommonStyle.js";
import BG from "./assests/bgImg.png";
import BGFirstTimeLogin from "./assests/Background.png";

const { Sider } = Layout;

export const TableStyle = styled(Table)`
  /* border-radius: 8px; */

  .hxZKXJ .ant-table-tbody > tr:nth-child(2n) > td {
    background-color: ${({ theme }) => theme.color.tableBgContent};
  }

  .ant-table-tbody > tr:nth-child(2n) > td {
    // background-color: #E9F7FF;
    background-color: ${({ theme }) => theme.color.tableBgContent};
    // border-left:5px solid;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #c6eaff !important;
    // background-color: ${({ theme }) => theme.color.tableBgEvenContent};

    // color: #FFFFFF !important;
  }




`;

export const LoaderStyle = styled.article`
  ${Poisitioning({ position: "absolute", top: "0", left: "0" })};
  ${FlexboxStyle({ justify: "center" })};

  width: 100%;
  height: 100%;

  img {
    width: 80px;
  }
`;
export const MainDiv = styled.div`
  height: 100vh;
  margin-top: 50px;
  /* padding-left: 180px; */

  /* position: absolute; */
  /* margin-left: 180px; */
  background-color: ${({ theme }) => theme.color.cotentSection};
  color: ${({ theme }) => theme.color.fontColor};


padding:25px;

  background-image: url(${BG});
  background-size: cover;
  background-position: center;


`;
export const MainDivwithoutSidebar = styled.div`
  min-height: 100vh;
  padding: 25px;
  padding-top: 70px;

  background-color: ${({ theme }) => theme.color.cotentSection};
  color: ${({ theme }) => theme.color.fontColor};


  width: 100%;
  background-image: url(${BG});
  background-size: cover;
  background-position: center;





`;
export const FirstTimeLogin = styled.div`
  min-height: 100vh;

  background-color: ${({ theme }) => theme.color.cotentSection};
  color: ${({ theme }) => theme.color.fontColor};


  width: 100%;
  background-image: url(${BGFirstTimeLogin});
  background-size: cover;
  background-position: center;

`;
export const MainDivLogin = styled.div`
  min-height: 100vh;
  padding: 1px;
  max-width:100vw;
  box-sizing:border-box;

  background-color: ${({ theme }) => theme.color.cotentSection};
  color: ${({ theme }) => theme.color.fontColor};
`;
export const MainDivwithoutSidebarInfluxgraph = styled.div`
  min-height: 100vh;
  padding: 25px;
  padding-top: 70px;
display:flex;
flex-direction:column;
  background-color: ${({ theme }) => theme.color.cotentSection};

  width: 100%;
  background-image: url(${BG});
  background-size: cover;
  background-position: center;
  color: ${({ theme }) => theme.color.fontColor};
`;

export const SidebarSection = styled(Sider)`
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  margin-top: 50px;
  left: 0;

  .ant-layout-sider-children {
    background-color: ${({ theme }) => theme.color.backgroundColor};
  }
`;
export const LoginStyledInput = styled(Input)`
  height: 2.8rem;

  border-radius: 6px;
  border: none !important;
  box-shadow: none !important;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.3) !important;

  &:focus {
    border: 1px solid #6ab344 !important;
  }
`;


export const LoginPassStyledInput = styled(Input.Password)`
  height: 2.8rem;
  border-radius: 6px;
  /* border: none !important; */
  box-shadow: none !important;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.3) !important;

  &:focus {
    border: 1px solid #6ab344 !important;
  }
`;
export const SidebarMainMenuSection = styled(Menu)`
  /* &.css-dev-only-do-not-override-mxhywb.ant-menu-light  */

  &.css-dev-only-do-not-override-zpuns1.ant-menu-light {
    background-color: ${({ theme }) => theme.color.backgroundColor};
    color: ${({ theme }) => theme.color.fontColor};
    border-bottom: none;
  }
`;
export const NavbarStyling = styled.div`
  background-color: ${({ theme }) => theme.color.navbarBgColor};
  color: ${({ theme }) => theme.color.fontColor};

  width: 100vw;
  display: flex;
  // line-height: 40px;

  /* The following media query will hide the NavbarStyling component at 768px width */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const NavbarStyling2 = styled.div`
  background-color: ${({ theme }) => theme.color.navbarBgColor};
  color: ${({ theme }) => theme.color.fontColor};

  width: 100vw;
  line-height: 40px;
display:none;
  /* The following media query will hide the NavbarStyling component at 768px width */
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
export const NavbarStyledMenu = styled(Menu)`
  background-color: ${({ theme }) => theme.color.navbarLinksBgColor};
  display: flex;
  justify-content: center;

  /* color: ${(props) =>
    props.mainLoc ? "#fff !important" : "#aaa !important"}; */
  padding-bottom: 1px !important;
`;
export const SidebarMenuItem = styled(Menu.Item)`
  &:hover {
    /* color:#0f0 !important; */
    color: ${({ theme }) => theme.color.sidebarActiveColor} !important;
    background: ${(props) =>
    props.mainloc ? "#000 !important" : "#333 !important"};
  }
`;

export const TestingSvg = styled.article`
  .chatbot-icon {
    > svg {
      width: 70px;
      height: 5rem;

      cursor: pointer;

      .testing {
        fill: ${({ theme }) => theme.color.svgColor};
        /* fill: #000; */
      }
    }
  }

  &:hover {
    /* color:#0f0 !important; */
    color: ${({ theme }) => theme.color.sidebarActiveColor} !important;
  }
`;

export const ComponentStyle = styled.article`
  ${CommonSpacing};

  .dashboard-top {
    ${GridBoxStyle({ columns: "repeat(3, 1fr)" })};
    margin-bottom: 20px;
    .graph-placeholder {
      border-radius: 12px;
      background-color: ${({ theme }) => theme.color.bgContent};
      box-shadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px";
      border: 0.6px solid rgba(0, 0, 0, 0.1);
      overflow: hidden;

      .title {
        padding: 10px;
        font-size: 14px;
        font-weight: 600;
        border-left: 5px solid #009bdb;
        margin-bottom: 20px;
      }
    }
  }
  @media (max-width: 940px) {
    .dashboard-top {
      grid-template-columns: 1fr;
    }
  }
`;

export const RouterStyling = styled.p`
  padding: 10px;
  background-color: #009bdb;
  margin: 3px;
  color: #fff;
  border-radius: 8px;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
    font-weight: bold;
  }
`;
export const MainTableFailedDevices = styled.div`
  padding: 10px;
  cursor: pointer;

  border-bottom: ${(props) =>
    props.active ? "3px solid #009BDB" : "1px solid #cccccc"};
  // border-right: ${(props) =>
    props.active ? "3px solid #66B127" : "1px solid #cccccc"};
  color: ${(props) => (props.active ? "#66B127" : "#333333")};
  background-color: ${(props) => (props.active ? "#cdf0ff" : "#fff")};
  border-top-left-radius: ${(props) => (props.active ? "8px" : "0px")};
  border-top-right-radius: ${(props) => (props.active ? "8px" : "0px")};
`;
export const MainTableFailedDevicesTitle = styled.span`
  color: ${(props) => (props.active ? "#333333" : "#333333")};
  font-weight: ${(props) => (props.active ? "700" : "400")};
`;
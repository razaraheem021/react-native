const constantColors = {
  svgColor: "#009BDB",

}

const theme = {
  lightMode: {
    color: {
      fontColor: "#000",
      backgroundColor: "rgb(198, 234, 255)",
      navbarBgColor: "#009BDB",
      navbarLinksBgColor: "#CEEDFF",

      sidebarActiveColor: "#009BDB",
      cotentSection: "rgba(198, 234, 255,0.3)",
      bgContent: "rgba(198, 234, 255,0.1)",
      tableBgContent: "rgb(198, 234, 255,0.3)",
      tableBgEvenContent: "rgb(255, 255, 255,0.3)",
      ...constantColors
    },
  },
  darkMode: {
    color: {
      fontColor: "#fff",
      backgroundColor: "#2f2f2f",
      navbarBgColor: "#2f2f2f",
      navbarLinksBgColor: "#4f4f4f",
      sidebarActiveColor: "#009BDB",
      cotentSection: "rgba(0,0,0,0.78)",
      bgContent: "rgba(0,0,0,0.2)",
      tableBgContent: "rgba(0, 0, 0,0.1)",
      tableBgEvenContent: "rgb(198, 234, 255,0.3)",

      ...constantColors
    },
  },
};
export default theme;
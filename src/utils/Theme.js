export const lightTheme = {
  colors: {
    primary: "#f2f5fc",
    primary_light: "#131c31",
    secondary: "#1325e1",
    button_hover: "#588ce4",
    text1: "#0e1cb8",
    text2: "#fff",
    para_text_color: "#292828",
    tertiary: "#131c31",
    stick: "#131c31",
    paranormal: "#e9e1e1",
    nav: "#46543B",

    button_normal: "#e9e1e1",
  },
  fonts: {
    family: "DM sans",
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  breakpoints: {
    mobile: "720px",
    tablet: "800px",
  },
};

export const darkTheme = {
  colors: {
    primary: "#131c31",
    primary_light: "#0f172a",
    secondary: "#7eadfc",
    button_hover: "#7eadfc",
    text1: "#fff",
    text2: "#000",
    para_text_color: "#dcdcdc",
    tertiary: "#131c31",
    stick: "#fff",
    paranormal: "#fff",
    normal: "#FFF",

    nav: "#7eadfc",

    button_normal: "#fff",
  },
  fonts: {
    family: "DM sans",
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  breakpoints: {
    mobile: "720px",
    tablet: "800px",
  },
};

export const yellowTheme = {
  colors: {
    primary: "#FFFBE6",
    primary_light: "#F8D347",
    secondary: "#FFC107",
    button_hover: "#FFD54F",
    text1: "#333333",
    text2: "#FFFFFF",
    para_text_color: "#555555",
    tertiary: "#F8D347",
    stick: "#F8D347",
    paranormal: "#FFFFFF",
    normal: "#FFC107",
    nav: "#333333",

    button_normal: "#FFFFFF",
  },
  fonts: {
    family: "DM sans",
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  breakpoints: {
    mobile: "720px",
    tablet: "800px",
  },
};
export const greenTheme = {
  colors: {
    primary: "#82C341",
    primary_light: "#95D44D",
    secondary: "#46543B",

    nav: "#46543B",
    button_hover: "#95D44D",
    text1: "#333",
    text2: "#FFF",
    para_text_color: "#6B6B6B",
    tertiary: "#FFF",
    stick: "#46543B",
    paranormal: "#FFF",
    button_normal: "#FFF",
  },
  fonts: {
    family: "Roboto",
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  breakpoints: {
    mobile: "720px",
    tablet: "800px",
  },
};

export const themeOptions = [
  { name: "Light", theme: lightTheme },
  { name: "Dark", theme: darkTheme },
  { name: "Yellow", theme: yellowTheme },
  { name: "Green", theme: greenTheme },
];

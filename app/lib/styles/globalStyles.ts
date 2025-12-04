import { createGlobalStyle, css, CSSProperties } from "styled-components";

/* font data type */
type FontData = Record<
  string,
  {
    name: string;
    file: string;
  }
>;

/* font alias */
export type FontAlias = "regular" | "bold" | "secondary";

/* font names */
export type Font = Record<FontAlias, string>;

/* record of fonts with name and src file path */
export const fontData: FontData = {
  regular: {
    name: "Circular-Book",
    file: "/fonts/CircularStd-Book.otf",
  },
  bold: {
    name: "Galano-Bold",
    file: "/fonts/Galano-Bold.otf",
  },
  secondary: {
    name: "JetBrainsMono-Regular",
    file: "/fonts/JetBrainsMono-Regular.ttf",
  },
};

/* theme colors */
export const themeColors = {
  primary: "#000",
  secondary: "#8d8d8d",
};

/* get only font names */
export const fonts: Font = Object.keys(fontData).reduce((fonts, currentValue) => {
  return { ...fonts, [currentValue]: fontData[currentValue].name };
}, {} as Font);

/* global styles */
const GlobalStyles = css`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
  }
  
  body {
    overflow-x: hidden !important;
    width: 100%;
    max-width: 100vw;
  }

  a {
    text-decoration: none;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h5,
  h6,
  p,
  div {
    margin: 0;
    padding: 0;
  }

  /* regular font */
  @font-face {
    font-family: ${fontData.regular.name};
    src: url(${fontData.regular.file});
    font-weight: 600;
  }

  /* bold font */
  @font-face {
    font-family: ${fontData.bold.name};
    src: url(${fontData.bold.file});
    font-weight: 900;
  }

  /* secondary font */
  @font-face {
    font-family: ${fontData.secondary.name};
    src: url(${fontData.secondary.file});
    font-weight: 600;
  }
`;

/* style props */
export type CSSValues = CSSProperties & {
  bg?: string;
  col?: boolean;
  onlyJustify?: boolean;
  onlyAlign?: boolean;
  custom?: CSSProperties;
  noMobile?: boolean;
  onlyMobile?: boolean;
  customMobile?: CSSProperties;
  font?: FontAlias;
  bgImage?: string;
  onlyBorder?: boolean;
  position?: string;
  yPercent?: string | number;
};

export type BreakpointType = "smallMobile" | "mobile" | "laptop" | "desktop";

/* breakpoints */
export const breakpoints = {
  smallMobile: "640px",
  mobile: "768px",
  laptop: "1281px",
  desktop: "1536px",
};
/* kebabize */
const kebabize = (str: string) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());

/* generate custom css */
export function generateCustomCSS(cssObject: any, device?: BreakpointType) {
  if (!cssObject) return "";
  let threshold = "";
  if (device) {
    threshold = device === "desktop" ? "min-width" : "max-width";
  }

  let css = threshold ? `@media (${threshold}: ${breakpoints[device!]}) {` : "";
  Object.keys(cssObject).forEach((key) => (css += `${kebabize(key)}: ${cssObject[key]};`));
  css += threshold ? "}" : "";

  return css;
}

/* adjust styles for other breakpoints */
export function adjustStyles(device: BreakpointType, toBeAdjusted: Record<string, number>, props: any) {
  let threshold = device === "desktop" ? "min-width" : "max-width";
  let css = `@media (${threshold}: ${breakpoints[device]}) {`;
  Object.keys(toBeAdjusted).forEach((key) => {
    const originalValue = props[key];
    css += `${kebabize(key)}: ${originalValue ? parseInt(originalValue) + toBeAdjusted[key] + "rem;" : "auto;"}`;
  });
  css += "}";
  // console.log(css);
  return css;
}

/* hide element css */
export function hideElement(device: BreakpointType) {
  let threshold = device === "desktop" ? "min-width" : "max-width";
  let css = `@media (${threshold}: ${breakpoints[device]}) {`;
  css += `display: none;`;
  css += "}";
  return css;
}

export default createGlobalStyle`${GlobalStyles}`;

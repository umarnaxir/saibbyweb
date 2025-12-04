import styled from "styled-components";
import { fonts, CSSValues, adjustStyles, generateCustomCSS, hideElement, FontAlias } from "@/lib/styles/globalStyles";
import { DefaultTheme } from "styled-components";

/* generate basic text css */
function getBasicTextCSS(props: CSSValues & { theme: DefaultTheme }, defaultFontFamily: FontAlias, defaultFontSize: string, defaultPadding: string) {
  let css = `
    font-family: ${props.font ? fonts[props.font as FontAlias] : fonts[defaultFontFamily]};
    padding: ${props.padding || defaultPadding};
    color: ${props.color || props.theme.color};
    font-size: ${props.fontSize || defaultFontSize};
    text-align: ${props.textAlign || "left"};
  `;

  css += generateCustomCSS(props.custom);
  css += generateCustomCSS(props.customMobile, "mobile");

  return css;
}

/* heading paragraph */
export const Heading = styled.h1.withConfig({
  shouldForwardProp: (prop) => !['custom', 'customMobile', 'font', 'fontSize', 'color', 'textAlign', 'padding', 'lineHeight', 'noMobile'].includes(prop),
}).attrs(props => ({ className: props.className || ""}))
<CSSValues>`
  /* set line height */
  line-height: ${(props) => props.lineHeight || "auto"};
  overflow-wrap: break-word;
  word-wrap: break-word;
  max-width: 100%;

  /* adjust styles for desktop and mobile */
  ${(props) => adjustStyles("desktop", { fontSize: 1.1, lineHeight: 1.1 }, props)}
  ${(props) => adjustStyles("mobile", { fontSize: -0.5, lineHeight: -0.5 }, props)}
    /* set basic text css */
    ${(props) => getBasicTextCSS(props, "bold", "5rem", "0 0")}
`;

/* styled paragraph */
export const Paragraph = styled.p.withConfig({
  shouldForwardProp: (prop) => !['custom', 'customMobile', 'font', 'fontSize', 'color', 'textAlign', 'padding', 'noMobile'].includes(prop),
})<CSSValues>`
  /* adjust styles for desktop and mobile */
  ${(props) => adjustStyles("desktop", { fontSize: 0.1 }, props)}
  ${(props) => adjustStyles("mobile", { fontSize: -0.58 }, props)}
    /* set basic text css */
  ${(props) => getBasicTextCSS(props, "regular", "1.6rem", "1rem 0")}
  ${(props) => (props.noMobile && hideElement("mobile"))}
`;

/* styled span text */
export const Text = styled.span.withConfig({
  shouldForwardProp: (prop) => !['custom', 'customMobile', 'font', 'fontSize', 'color', 'textAlign', 'padding', 'noMobile'].includes(prop),
})<CSSValues>`
  /* set basic text css */
  ${(props) => getBasicTextCSS(props, "regular", "1.6rem", "0")}

    /* no mobile */
  ${(props) => props.noMobile && hideElement("mobile")}
`;

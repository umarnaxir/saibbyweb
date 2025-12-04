import styled from "styled-components";
import { CSSValues, breakpoints, generateCustomCSS, hideElement } from "@/lib/styles/globalStyles";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !['custom', 'customMobile', 'noMobile', 'onlyMobile', 'bg'].includes(prop),
}).attrs((props) => ({ className: props.className || "" }))
<CSSValues>`
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;

${(props) => props.bg && `background-color: ${props.bg};`}

  /* no mobile */
  ${(props) => props.noMobile && hideElement("mobile")}
   /* only mobile */
   ${(props) => props.onlyMobile && hideElement("laptop")}

    /* generate css from custom css properties */
  ${(props) => generateCustomCSS(props.custom)}
  ${(props) => generateCustomCSS(props.customMobile, "mobile")}
`
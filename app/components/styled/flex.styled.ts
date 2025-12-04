import { CSSValues, breakpoints, generateCustomCSS, hideElement } from "@/lib/styles/globalStyles";
import styled from "styled-components";

export const Flex = styled.div.withConfig({
  shouldForwardProp: (prop) => !['custom', 'customMobile', 'col', 'onlyJustify', 'onlyAlign', 'noMobile', 'onlyMobile', 'bg', 'bgImage', 'justifyContent', 'alignItems', 'flexWrap', 'position', 'width', 'height', 'padding', 'margin', 'gap'].includes(prop),
}).attrs((props) => ({ className: props.className || "" }))
  <CSSValues>`
  display: flex;
  ${(props) => props.position && `position: ${props.position};`}
  flex-wrap: ${(props) => props.flexWrap || "row"};
  flex-direction: ${(props) => (props.col ? "column" : "row")};
  align-items: ${(props) => props.alignItems || "flex-start"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  padding: ${(props) => props.padding || "unset"};
  margin: ${(props) => props.margin || "unset"};
  /* background-color: ${(props) => props.bg || props.theme.bg}; */
  
  /* gap */
  ${(props) => props.gap && `gap: ${props.gap};`}
  
  ${(props) => props.bg && `background-color: ${props.bg};`}

  ${(props) => props.bgImage && `background-image: url(${props.bgImage})`};

  /* no mobile */
  ${(props) => props.noMobile && hideElement("mobile")}

   /* only mobile */
   ${(props) => props.onlyMobile && hideElement("laptop")}

  /* generate css from custom css properties */
  ${(props) => generateCustomCSS(props.custom)}
  ${(props) => generateCustomCSS(props.customMobile, "mobile")}
`;

export const FlexCenter = styled.div.withConfig({
  shouldForwardProp: (prop) => !['custom', 'customMobile', 'col', 'onlyJustify', 'onlyAlign', 'noMobile', 'onlyMobile', 'bg', 'bgImage', 'justifyContent', 'alignItems', 'flexWrap', 'position', 'width', 'height', 'padding', 'margin', 'gap'].includes(prop),
})<CSSValues>`
  display: flex;
  ${(props) => props.position && `position: ${props.position};`}
  flex-direction: ${(props) => (props.col ? "column" : "row")};
  align-items: ${(props) => (props.onlyJustify ? "start" : "center")};
  justify-content: ${(props) => (props.onlyAlign ? "start" : "center")};
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  padding: ${(props) => props.padding || "auto"};
  /* background-color: ${(props) => props.bg || props.theme.bg}; */
  ${(props) => props.bg && `background-color: ${props.bg};`}
  gap: ${(props) => props.gap || "auto"};

  ${(props) => props.bgImage && `background-image: url(${props.bgImage})`};

  /* gap */
  ${(props) => props.gap && `gap: ${props.gap};`}

  /* no mobile */
  ${(props) => props.noMobile && hideElement("mobile")}

  /* only mobile */
  // ${(props) => props.onlyMobile && hideElement("laptop")}

  /* generate css from custom css properties */
  ${(props) => generateCustomCSS(props.custom)}
  ${(props) => generateCustomCSS(props.customMobile, "mobile")}
`;

export function receiveCustomCSS(props: any) {
  return `  
  
  /* gap */
  ${(props: any) => props.gap && `gap: ${props.gap};`}

  /* no mobile */
  ${(props: any) => props.noMobile && hideElement("mobile")}

  /* only mobile */
  // ${(props: any) => props.onlyMobile && hideElement("laptop")}

  /* generate css from custom css properties */
  ${(props: any) => generateCustomCSS(props.custom)}
  ${(props: any) => generateCustomCSS(props.customMobile, "mobile")}
`
}

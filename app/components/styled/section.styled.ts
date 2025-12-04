import styled from "styled-components";
import { CSSValues } from "@/lib/styles/globalStyles"
export const Section = styled.div.withConfig({
  shouldForwardProp: (prop) => !['custom', 'customMobile', 'bg', 'noMobile', 'onlyMobile'].includes(prop),
}).attrs((props) => ({ className: props.className || "" }))<CSSValues>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: visible;
  width: 100%;
  max-width: 100%;
  /* z-index: 11; */
  
  /* ${(props) => props.bg && `background-color: ${props.bg} !important;`} */
  background-color: ${(props) => props.theme.bg};
`;

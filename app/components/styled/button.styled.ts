import styled from "styled-components";
import { CSSValues, fonts, generateCustomCSS } from "@/lib/styles/globalStyles";

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop: string) => !['custom', 'customMobile', 'onlyBorder', 'bg'].includes(prop),
})<CSSValues>`
  border: none;
  cursor: pointer;
  font-size: ${(props) => props.fontSize || "1.7rem"};
  font-family: ${fonts.regular};
  color: ${(props) => props.color || props.theme.bg};
  background-color: ${(props) => props.bg || props.theme.color};
  padding: ${(props) => props.padding ||  '0.8rem 1.7rem' };
  margin: ${(props) => props.margin || "1rem 0"};

  /* generate css from custom css properties */
  ${(props) => generateCustomCSS(props.custom)}
  ${(props) => generateCustomCSS(props.customMobile, "mobile")}

  ${(props) =>
    props.onlyBorder &&
    `background-color: white;
    padding: ${props.padding || '0.3rem 1.4rem' };
    border: 1px solid ${props.theme.color};
    color: ${props.theme.color}`}

   
`;

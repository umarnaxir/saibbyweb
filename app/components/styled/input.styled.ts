import styled from "styled-components";
import { FontAlias, fonts, CSSValues, generateCustomCSS, Font } from "@/lib/styles/globalStyles";
import { receiveCustomCSS } from "./flex.styled";

export const Input = styled.input.withConfig({
  shouldForwardProp: (prop) => !['custom', 'customMobile', 'font'].includes(prop),
}).attrs(props => ({
    type: 'text'
}))<CSSValues>`
    padding: 1.7rem 1.2rem;
    outline: none;
    font-size: 20px;
    background-color: black;
    border: none;
    color: white;
    font-family: ${(props)  =>  props.font ? fonts[props.font as FontAlias] : fonts['regular'] };

    &::placeholder {
        color: #a1a1a1;
    }

    &:disabled {
        background-color: gray;
    }

    /* generate css from custom css properties */
    ${(props: any) => generateCustomCSS(props.custom)}
    ${(props: any) => generateCustomCSS(props.customMobile, "mobile")}

   // ${(props) => receiveCustomCSS(props)}
`
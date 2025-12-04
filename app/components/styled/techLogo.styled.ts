import { CSSValues } from "@/lib/styles/globalStyles";
import styled from "styled-components";

export const TechLogo = styled.img.withConfig({
  shouldForwardProp: (prop) => !['custom', 'customMobile', 'bg', 'noMobile', 'onlyMobile'].includes(prop),
})<CSSValues>`
    width: 40%;
    aspect-ratio: 1;
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.07) translateY(-20px);
        fill: green;

        &+.tech-name {
            transform: scale(1.07);
        }
    }
`
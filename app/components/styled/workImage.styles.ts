import styled from "styled-components";
import { breakpoints, CSSValues } from "@/lib/styles/globalStyles";
import { Flex } from "./flex.styled";

export const WorkImage = styled(Flex).attrs((props) => ({ className: props.className || "" }))<CSSValues>`
  /* flex-grow: 1; */
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  width: 100%;
  /* height: 80%; */
  aspect-ratio: 1;
  overflow: hidden;
  // transform: translateX(20%);

  @media(max-width: ${() => breakpoints.mobile}) {
    border-radius: 10px;
  }
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
`;

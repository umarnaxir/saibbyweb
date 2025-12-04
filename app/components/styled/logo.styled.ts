import { breakpoints } from "@/lib/styles/globalStyles";
import styled from "styled-components";

export const Logo = styled.div`
  background-image: url("/images/logo-light.png");
  position: absolute;
  top: 7%;
  left: 10%;
  width: 45%;
  aspect-ratio: 1;
  z-index: 900;
  border: 2px solid #efefef;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: ${breakpoints.mobile}) {
    margin-left: 0;
    top: 15%;
    width: auto;
    height: 64.5%;
    aspect-ratio: 1;
    left: 5%;
  }
`;

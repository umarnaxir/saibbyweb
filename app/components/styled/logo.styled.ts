import { breakpoints } from "@/lib/styles/globalStyles";
import styled from "styled-components";

export const Logo = styled.div`
  background-image: url("/images/logo-light.png");
  position: absolute;
  top: 5%;
  margin-left:20%;
  left: 17.5%;
  width: 65%;
  aspect-ratio: 1;
  z-index: 101;
  border: 1px solid #efefef;
  background-size: cover;

  @media (max-width: ${breakpoints.mobile}) {
    margin-left:0;
    top: 15%;
    width: auto;
    height: 70%;
    left: 5%;
  }
`;

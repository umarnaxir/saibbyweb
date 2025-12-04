import { breakpoints, fonts } from "@/lib/styles/globalStyles";
import styled from "styled-components";
import MenuIcon from "@/components/sub/MenuIcon";

export const Hamburger = styled(MenuIcon)`
  position: absolute;
  left: 18%;
  bottom: 10%;
  /* width: 5vw; */
  margin-left: 20%;
  width: 63%;
  aspect-ratio: 1;
  border: 2px solid white;
  z-index: 101;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
cursor: pointer;

  span {
    position: absolute;
    width: 1px;
    left: 15%;
    text-align: center;
    font-size: 0.8rem;
    word-wrap: break-word;
    font-family: ${fonts.regular};
    color: white;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 64.5%;
    width: auto;
    aspect-ratio: 1;
    top: 16%;
    border: 1.5px solid white;
    left: auto;
    right:7%;
    bottom: auto;
    margin-left:0;

    span {
      font-size: 7px;
    }
  }

  @media(min-width: ${breakpoints.desktop}) {
    span {
      font-size: 1rem;
    }
  }

  div {
    width: 60%;
    left:65%;
    height: 0px;
    border-bottom: 1.5px solid #efefef;

    position: absolute;
    &.first {
      width: 60%;
      top:30%;
    }

    &.second {
      width: 50%;
      top:50%;
    }

    &.third {
      width: 45%;
      top:70%;
    }
  }
`;

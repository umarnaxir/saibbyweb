import { breakpoints } from "@/lib/styles/globalStyles";
import styled from "styled-components";
import MenuIcon from "@/components/sub/MenuIcon";

export const Hamburger = styled(MenuIcon)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 8%;
  width: 35%;
  aspect-ratio: 1;
  border: 2px solid white;
  z-index: 900;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: visible;
  cursor: pointer;

  @media (max-width: ${breakpoints.mobile}) {
    height: 50%;
    width: auto;
    aspect-ratio: 1;
    top: 16%;
    border: 1.8px solid white;
    left: auto;
    right: 7%;
    bottom: auto;
    transform: none;

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
    left: 80%;
    transform: none;
    height: 0px;
    border-bottom: 1.5px solid #efefef;

    overflow: visible;
    position: absolute;
    &.first {
      width: 55%;
      top:30%;
    }

    &.second {
      width: 45%;
      top:50%;
    }

    &.third {
      width: 35%;
      top:70%;
    }
  }
`;

import { CSSValues } from "@/lib/styles/globalStyles";
import styled from "styled-components";
export const MenuClose = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["custom", "customMobile", "bg", "noMobile", "onlyMobile"].includes(prop),
})<CSSValues>`
    position: absolute;
    padding: 10px 40px;
    cursor: pointer;
    top: 3%;
    right: 5%;
    width: 2%;
    transition: background-color 0.3s ease-in-out;

    div {
        width: 16px;
        height: 50px;
        position: relative;
        animation: load-close 2s;
 
        span {
            position: absolute;
            height: 100%;
            display: block;
            border-left: 4px solid black;
            transition: all ease 0.5s;
        }

        .first {
            left: 0;
            top: 0;
            transform: rotate(45deg);
        }

        .second {
            right: 0;
            top: 0;
            transform: rotate(-45deg);
        }

    }

}

@keyframes first {
    50% {
        transform: rotate(0deg) translateX(-500%);
    }

    100% {
        transform: rotate(-45deg) translateX(0%);
    }
}

@keyframes second {

    50% {
        transform: rotate(0deg) translateX(500%);
    }

    100% {
        transform: rotate(45deg) translateX(0%);

    }

}

@keyframes load-close {
    0% {
        transform: scale(0) rotate(0);
    }

    100% {
        transform: scale(1) rotate(-720deg);
    }
`;
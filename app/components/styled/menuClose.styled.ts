import { CSSValues } from "@/lib/styles/globalStyles";
import styled from "styled-components";
export const MenuClose = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["custom", "customMobile", "bg", "noMobile", "onlyMobile"].includes(prop),
})<CSSValues>`
    position: absolute;
    top: 3%;
    right: 5%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }

    div {
        width: 30px;
        height: 30px;
        position: relative;
        animation: load-close 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
 
        span {
            position: absolute;
            width: 100%;
            height: 4px;
            background-color: black;
            display: block;
            transition: all ease 0.3s;
            border-radius: 2px;
        }

        .first {
            top: 50%;
            left: 0;
            transform: translateY(-50%) rotate(45deg);
        }

        .second {
            top: 50%;
            left: 0;
            transform: translateY(-50%) rotate(-45deg);
        }

    }

    @media (max-width: 768px) {
        top: 2%;
        right: 3%;
        width: 40px;
        height: 40px;

        div {
            width: 24px;
            height: 24px;

            span {
                height: 3px;
            }
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
        opacity: 0;
    }

    100% {
        transform: scale(1) rotate(360deg);
        opacity: 1;
    }
`;
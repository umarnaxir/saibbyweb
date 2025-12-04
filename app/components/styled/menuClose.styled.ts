import { CSSValues } from "@/lib/styles/globalStyles";
import styled from "styled-components";

export const MenuClose = styled.div.withConfig({
  shouldForwardProp: (prop) => !['custom', 'customMobile', 'bg', 'noMobile', 'onlyMobile'].includes(prop),
})<CSSValues>`

    /* display: none; */
    position: absolute;
    /* height: 200px; */
     /* width: 100px; */
    padding: 10px 40px;
    cursor: pointer;
  top: 3%;
  right: 5%;
  width: 2%;
  transition: background-color 0.3s ease-in-out;
  &:hover {
        background-color: #efefef;
    }

    &:hover .first {
        animation: first 0.6s;
    }

    &:hover .second {
        animation: second 0.6s;
    }



    div {
        width: 4px;
        height: 100%;
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
`
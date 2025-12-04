"use client";

import { Flex } from "@/components/styled/flex.styled";
import gsap from "gsap";
import { useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styled from "styled-components";

type ScrollProgressBarProps = {
  className: string;
  bg?: string;
  barColor?: string;
  scrollTrigger?: ScrollTrigger.Vars;
};

const ProgressBarInner = styled.div<{ barColor: string }>`
  height: 100%;
  width: 0;
  background-color: ${(props) => props.barColor};
`;

function ScrollProgressBar({ bg = "black", barColor = "#00ff4c", className, scrollTrigger }: ScrollProgressBarProps) {
  const setAnimation = useCallback(
    (node: HTMLDivElement | null) => {
      if (node === null || !scrollTrigger) return;

      gsap.fromTo(
        "." + className + "__inner",
        { width: 0 },
        {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            ...scrollTrigger,
          },
        }
      );
    },
    [scrollTrigger, className]
  );

  return (
    <Flex
      ref={setAnimation}
      noMobile
      height="0.6rem"
      width="100vw"
      custom={{ position: "fixed", top: 0, left: 0, zIndex: 11, backgroundColor: bg }}
      customMobile={{ width: "1vw" }}
      className={className}
    >
      <ProgressBarInner className={`${className}__inner`} barColor={barColor} />
    </Flex>
  );
}

export default ScrollProgressBar;


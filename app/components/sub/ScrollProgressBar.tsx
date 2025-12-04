"use client";

import { Flex } from "@/components/styled/flex.styled";
import gsap from "gsap";
import { useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ScrollProgressBarProps = {
  className: string;
  bg?: string; // background (track) color
  barColor?: string; // moving progress color
  scrollTrigger?: ScrollTrigger.Vars;
};

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
      <div
        className={`${className}__inner`}
        style={{ height: "100%", width: 0, backgroundColor: barColor }}
      />
    </Flex>
  );
}

export default ScrollProgressBar;


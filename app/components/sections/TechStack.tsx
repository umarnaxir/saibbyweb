"use client";

import React from "react";
import Section from "@/components/sub/Section";
import SectionHeading from "@/components/sub/SectionHeading";
import { FlexCenter } from "@/components/styled/flex.styled";
import { useCallback, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollProgressBar from "@/components/sub/ScrollProgressBar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerScrollTrigger } from "@/lib/helpers/gsap";
import { TechLogo } from "@/components/styled/techLogo.styled";
import { Text } from "@/components/styled/text.styled";

const techStackHashmap: Record<string, string> = {
  mongo: "",
  vite: "",
  redis: "",
  heroku: "",
  gsap: "",
  nginx: "",
  express: "",
  githubActions: "github actions",
  sass: "",
  graphql: "",
  firebase: "",
  nuxt: "",
  tensorflow: "",
  socketio: "",
  typescript: "",
  nativescript: "",
  digitalOcean: "digital ocean",
  aws: "",
  react: "",
  figma: "",
  vue: "",
  node: "",
  adobeXd: "adobe XD",
  netlify: "",
  anime: "",
};

registerScrollTrigger();

function setDesktopAnimationForTechStack(setParentST: (vars: ScrollTrigger.Vars) => void) {
  const sectionEl = document.querySelector(".tech-stack") as HTMLElement | null;
  const stackEl = document.querySelector(".stack-svg") as HTMLElement | null;

  if (!sectionEl || !stackEl) return;

  const totalStacks = Object.keys(techStackHashmap).length;
  const rows = Math.ceil(totalStacks / 2);

  if (rows > 4) {
    const simpleST: ScrollTrigger.Vars = {
      trigger: sectionEl,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    };
    setParentST(simpleST);
    return;
  }

  const getScrollDistance = () => {
    const viewport = window.innerHeight;
    return rows * viewport * 0.6;
  };

  const techStackScrollTrigger: ScrollTrigger.Vars = {
    pin: true,
    trigger: sectionEl,
    start: "top top",
    end: () => "+=" + getScrollDistance(),
    scrub: 1.2,
    invalidateOnRefresh: true,
  };

  const t1 = gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      scrub: 1,
      start: "top top",
      end: () => "+=" + getScrollDistance(),
      invalidateOnRefresh: true,
    },
  });

  t1.fromTo(
    stackEl,
    { y: 0, ease: "none" },
    {
      y: () => -getScrollDistance(),
      ease: "none",
    }
  );

  setParentST(techStackScrollTrigger);
}

export default function TechStack() {
  const [parentST, setParentST] = useState<ScrollTrigger.Vars>({});
  const resizeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const setAnimation = useCallback((node: HTMLDivElement) => {
    if (node === null) return;

    // Clean up any existing ScrollTriggers first
    // Kill any ScrollTriggers related to tech-stack
    ScrollTrigger.getAll().forEach(st => {
      const trigger = st.trigger;
      if (trigger && (trigger as HTMLElement).classList?.contains('tech-stack')) {
        st.kill();
      }
    });

    // Wait for DOM to be ready
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.matchMedia({
          "(min-width: 768px)": function () {
            setDesktopAnimationForTechStack(setParentST);
          },
          "(max-width: 768px)": function () {
          },
        });

        // Debounce refresh to prevent conflicts
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    });
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Kill any remaining ScrollTriggers related to tech-stack
      ScrollTrigger.getAll().forEach(st => {
        const trigger = st.trigger;
        if (trigger && (trigger as HTMLElement).classList?.contains('tech-stack')) {
          st.kill();
        }
      });
      
      // Refresh to restore scroll
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
  }, []);

  return (
    <Section ref={setAnimation} className="tech-stack" mode="light">
      <SectionHeading title="techStack();" tagline="future proof technologies" />
      {Object.keys(parentST).length > 0 && <ScrollProgressBar className="techstack-scroll" bg="black" scrollTrigger={parentST} />}
      <FlexCenter
        className="stack-svg"
        customMobile={{
          paddingBottom: "7rem",
          marginTop: "8rem",
          position: 'relative',
          rowGap: "70px",
        }}
        custom={{
          flexWrap: "wrap",
          overflow: "hidden",
          marginTop: "1rem",
          padding: "5.5% 0",
          position: 'relative',
          rowGap: "100px",
        }}
      >
        <>
          {Object.keys(techStackHashmap).map((stack, index) => (
            <StackImage key={index} name={stack} />
          ))}
      </>
      </FlexCenter>
    </Section>
  );
}

function StackImage({ name }: { name: string }) {
  return (
    <FlexCenter col custom={{ width: "50%" }}>
      <TechLogo src={"/images/tech_stack/" + name + ".svg"} />
      <Text className="tech-name" color="black" font="secondary" custom={{ fontSize: "2.5rem", marginTop: "2%" }} customMobile={{ fontSize: "1.5rem", marginTop: '7%' }}>
        { techStackHashmap[name] === "" ? name.toLowerCase() : techStackHashmap[name].toLowerCase()}
      </Text>
    </FlexCenter>
  );
}

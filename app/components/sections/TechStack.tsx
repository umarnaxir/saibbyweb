"use client";

import Section from "@/components/sub/Section";
import SectionHeading from "@/components/sub/SectionHeading";
import { FlexCenter } from "@/components/styled/flex.styled";
import { useCallback, useState } from "react";
import gsap from "gsap";
import ScrollProgressBar from "@/components/sub/ScrollProgressBar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerScrollTrigger } from "@/lib/helpers/gsap";
import { TechLogo } from "@/components/styled/techLogo.styled";
import { Text } from "@/components/styled/text.styled";

const techStack = [
  "adobeXD",
  "androidStudio",
  "aws",
  "couchDB",
  "css",
  "digitalOcean",
  "express",
  "firebase",
  "graphql",
  "heroku",
  "html",
  "java",
  "javascript",
  "joomla",
  "jquery",
  "mySQL",
  "netlify",
  "nginx",
  "nodeJS",
  "nuxt",
  "php",
  "react",
  "redis",
  "saas",
  "socket.io",
  "typescript",
  "vue",
  "wordpress",
];

const techStackHashmap: any = {
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

function setDesktopAnimationForTechStack(setParentST: Function) {
  const sectionEl = document.querySelector(".tech-stack") as HTMLElement | null;
  const stackEl = document.querySelector(".stack-svg") as HTMLElement | null;

  if (!sectionEl || !stackEl) return;

  // number of rows in the grid (2 logos per row)
  const totalStacks = Object.keys(techStackHashmap).length;
  const rows = Math.ceil(totalStacks / 2);

  // if there are many rows, do not pin/animate the grid,
  // but still provide a simple scroll progress trigger
  if (rows > 4) {
    const simpleST: ScrollTrigger.Vars = {
      trigger: sectionEl,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      // markers: true,
    };
    setParentST(simpleST);
    return;
  }

  const getScrollDistance = () => {
    const viewport = window.innerHeight;
    return rows * viewport * 0.6;
  };

  /* pin parent element */
  const techStackScrollTrigger: ScrollTrigger.Vars = {
    pin: true,
    trigger: sectionEl,
    start: "top top",
    end: () => "+=" + getScrollDistance(),
    scrub: 1.2,
    // markers: true,
    invalidateOnRefresh: true,
  };

  const t1 = gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      scrub: 1,
      start: "top top",
      end: () => "+=" + getScrollDistance(),
      // markers: true,
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

  /* set parent scroll trigger */
  setParentST(techStackScrollTrigger);
}

export default function TechStack() {
  /* parent scroll trigger */
  const [parentST, setParentST] = useState<ScrollTrigger.Vars>({});

  const setAnimation = useCallback((node: HTMLDivElement) => {
    if (node === null) return;

    ScrollTrigger.matchMedia({
      "(min-width: 768px)": function () {
        setDesktopAnimationForTechStack(setParentST);
      },
      "(max-width: 768px)": function () {
      },
    });
  }, []);

  return (
    <Section ref={setAnimation} className="tech-stack" mode="light">
      {/* section heading */}
      <SectionHeading title="techStack();" tagline="future proof technologies" />
      {/* progress bar */}
      {Object.keys(parentST).length > 0 && <ScrollProgressBar className="techstack-scroll" bg="black" scrollTrigger={parentST} />}
      {/* tech stack image -logos */}
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
          // overflow: "hidden",
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
      <Text className="tech-name" color="black" font="secondary" custom={{ fontSize: "2.5rem", marginTop: "2%", transition: "all 0.2s ease-in-out" }} customMobile={{ fontSize: "1.5rem", marginTop: '7%' }}>
        { techStackHashmap[name] === "" ? name.toLowerCase() : techStackHashmap[name].toLowerCase()}
      </Text>
    </FlexCenter>
  );
}

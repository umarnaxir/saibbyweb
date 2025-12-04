"use client";

import Section from "@/components/sub/Section";
import gsap from "gsap";
import SectionHeading from "@/components/sub/SectionHeading";
import { Flex, FlexCenter } from "../styled/flex.styled";
import { registerScrollTrigger, revealAnimation } from "@/lib/helpers/gsap";
import { WorkImage } from "../styled/workImage.styles";
import { WorkData } from "@/lib/data/work";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkTextBlock from "@/components/sub/WorkTextBlock";
import ScrollProgressBar from "../sub/ScrollProgressBar";
import { useCallback, useState, useMemo } from "react";

registerScrollTrigger();

function Work() {
  const [parentST, setParentST] = useState<ScrollTrigger.Vars>({});

  const workImages = useMemo(() => [
    "dababel-img.avif",
    "rumie.png",
    "sitesync.png",
    "farm2i.png",
    "ml-jobs.png",
    "emchain.png",
    "ninemash.png",
    "elite-express.png",
    "jkcabs.jpeg",
    "tahilianihomes.jpeg",
    "bounipun.jpeg",
    "artwisted.jpeg",
  ], []);

  const setAnimation = useCallback((node: HTMLDivElement) => {
    if (node === null) return;

    ScrollTrigger.matchMedia({
      "(min-width: 768px)": function () {
        setDesktopAnimationForWorkSection(workImages, false, setParentST);
      },
      "(max-width: 768px)": function () {
        // revealAnimation is already called globally, no need to call again
      },
    });
  }, [workImages, setParentST]);

  return (
    <Section ref={setAnimation} className="work" mode="light">
      {/* section heading */}
      <SectionHeading title="recentWork();" tagline="hundreds of thousands daily active users" />

      {/* progress bar */}
      {Object.keys(parentST).length > 0 && <ScrollProgressBar className="work-scroll" bg="black" scrollTrigger={parentST} />}

      {/* it has two sections, one with text details another one with image, the section also need to be pinned */}
      <FlexCenter
        className="work-content"
        custom={{ flexGrow: 1, gap: "4%" }}
        customMobile={{ flexDirection: "column", paddingTop: "10%", width: "90%", marginLeft: "5%", overflow: "hidden", paddingBottom: "30px" }}
      >
        {workImages.map((image, index) => (
          <Flex
            key={index}
            className="reveal project-container"
            custom={{
              height: "100%",
              width: "100%",
              position: "absolute",
              top: "0",
              left: "0",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            customMobile={{ position: "relative", flexDirection: "column-reverse" }}
          >
            {/* project text container */}
            <WorkTextBlock
              className="work-text"
              key={index}
              number={index + 1}
              name={WorkData[index].name}
              description={WorkData[index].description}
              techStack={WorkData[index].techStack}
              link={WorkData[index].link}
            />

            {/* project image container */}
            <Flex
              col
              className="image-container"
              custom={{
                width: "40%",
                // width: "100%",
                aspectRatio: "1",
              }}
              customMobile={{ zIndex: 1, position: "relative", width: "100%", aspectRatio: "1.3", transform: "translateY(10%)", overflow: "hidden" }}
            >
              <WorkImage key={image} className="work-image" bgImage={"/images/work/" + image} />
            </Flex>
          </Flex>
        ))}
      </FlexCenter>
    </Section>
  );
}

function setDesktopAnimationForWorkSection(workImages: string[], isMobile: boolean, setParentST: (st: ScrollTrigger.Vars) => void) {
  const windowInnerHeight = isMobile ? window.innerHeight / 1.3 : window.innerHeight;
  
  const workImageElements: HTMLImageElement[] = gsap.utils.toArray(".work-image");
  const workTextBlocks: HTMLElement[] = gsap.utils.toArray(".work-text");

  const totalWorkElements = workImageElements.length;

  /* set initial z-index for project images and text blocks */
  gsap.set(".work-image", { zIndex: (i) => totalWorkElements - i });
  gsap.set(".work-text", { zIndex: (i) => totalWorkElements - i + 10 });

  /* set initial state for all work text blocks except the first one */
  workTextBlocks.forEach((block, i) => {
    if (i > 0) {
      gsap.set(block, { opacity: 0, yPercent: 100 });
    } else {
      /* ensure first text block starts visible */
      gsap.set(block, { opacity: 1, yPercent: 0 });
    }
  });

  /* set initial state for all work images except the first one */
  workImageElements.forEach((img, i) => {
    if (i > 0) {
      gsap.set(img, { opacity: 0 });
    } else {
      /* ensure first image starts visible */
      gsap.set(img, { opacity: 1 });
    }
  });
  
  /* project containers - initial reveal animation */
  gsap.fromTo([workImageElements[0], workTextBlocks[0]], {
    yPercent: 60,
    scale: 1.5, 
    opacity: 1,
  }, {
    scale: 1, 
    opacity: 1,
    yPercent: 0,
    ease: 'none',
    scrollTrigger: {
      scrub: 1, 
      trigger: '.work',
      start: 'top bottom-=100',
      end: 'top center-=150',
      // markers: true
    },
  });

  let finalPoint: number = 0;

  [...Array(totalWorkElements)].forEach((_, i) => {
    if (i === totalWorkElements - 1) {
      /* for the last element, just update final point */
      const startPoint = 0 + windowInnerHeight * i + windowInnerHeight * 0.6 * (i + 1);
      finalPoint = startPoint + windowInnerHeight;
      return;
    }

    /* calculate start point */
    const startPoint = 0 + windowInnerHeight * i + windowInnerHeight * 0.6 * (i + 1);

    /* update final point */
    finalPoint = startPoint + windowInnerHeight;

    /* set scroll trigger options */
    const scrollTrigger = () => ({
      snap: {
        snapTo: 1,
        duration: 0.55
      },
      scrub: 1,
      trigger: ".work",
      // markers: { startColor: colors[i + 1] ?? 'red', endColor: "red", fontSize: ((2 * i) + 10) + "px" },
      start: () => `top+=${startPoint}`,
      end: () => `top+=${startPoint + windowInnerHeight}`,
    });

    const imageUpdate = isMobile ? {} : { height: 0 };

    /* animate work image elements */
    gsap.to(workImageElements[i], {
      ease: "none",
      ...imageUpdate,
      opacity: 0,
      scrollTrigger: scrollTrigger(),
    });

    /* animate next image in */
    if (i + 1 < totalWorkElements) {
      gsap.fromTo(workImageElements[i + 1], {
        opacity: 0
      }, {
        ease: "none",
        opacity: 1,
        scrollTrigger: scrollTrigger(),
      });
    }

    const t1 = gsap.timeline({
      scrollTrigger: scrollTrigger(),
    });

    t1.to(workTextBlocks[i], {
      ease: "none",
      yPercent: isMobile ? -70 : -100,
      opacity: 0
    });

    if (i + 1 < totalWorkElements) {
      t1.fromTo(
        workTextBlocks[i + 1],
        {
          yPercent: 100,
          opacity: 0
        },
        {
          ease: "none",
          yPercent: 0,
          opacity: 1
        },
        "<"
      );
    }
  });

  /* pin parent element */
  const workScrollTrigger: ScrollTrigger.Vars = {
    pin: true,
    trigger: ".work",
    start: () => "top top",
    end: () => `top+=${finalPoint + 500}`,
    scrub: 1.2,
    invalidateOnRefresh: true,
  };

  /* set parent scroll trigger */
  setParentST(workScrollTrigger);
}

export default Work;

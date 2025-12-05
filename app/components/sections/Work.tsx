"use client";

import Section from "@/components/sub/Section";
import gsap from "gsap";
import SectionHeading from "@/components/sub/SectionHeading";
import { Flex, FlexCenter } from "../styled/flex.styled";
import { registerScrollTrigger } from "@/lib/helpers/gsap";
import { WorkImage } from "../styled/workImage.styles";
import { WorkData } from "@/lib/data/work";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkTextBlock from "@/components/sub/WorkTextBlock";
import ScrollProgressBar from "../sub/ScrollProgressBar";
import { useCallback, useState, useMemo, useEffect } from "react";

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

  const setAnimation = useCallback((node: HTMLDivElement | null) => {
    if (node === null) return;

    const initializeAnimations = () => {
      const workImageElements = gsap.utils.toArray<HTMLElement>(".work-image");
      const workTextBlocks = gsap.utils.toArray<HTMLElement>(".work-text");
      const projectContainers = gsap.utils.toArray<HTMLElement>(".project-container");
      
      if (workImageElements.length === 0 || workTextBlocks.length === 0 || projectContainers.length === 0) {
        setTimeout(initializeAnimations, 100);
        return;
      }

      // Wait for layout to settle and images to load
      requestAnimationFrame(() => {
        // Double RAF to ensure layout is complete
        requestAnimationFrame(() => {
          ScrollTrigger.matchMedia({
            "(min-width: 768px)": function () {
              setDesktopAnimationForWorkSection(workImages, false, setParentST);
            },
            "(max-width: 768px)": function () {
              // Mobile: Show all cards in a scrollable list
              projectContainers.forEach((container) => {
                gsap.set(container, { 
                  position: "relative",
                  opacity: 1,
                  visibility: "visible"
                });
              });
              workImageElements.forEach((img) => {
                gsap.set(img, { opacity: 1, visibility: "visible" });
              });
              workTextBlocks.forEach((block) => {
                gsap.set(block, { opacity: 1, visibility: "visible", yPercent: 0 });
              });
            },
          });

          ScrollTrigger.refresh();
        });
      });
    };

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      requestAnimationFrame(initializeAnimations);
    }, 50);
  }, [workImages, setParentST]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => {
        const trigger = st.trigger;
        if (trigger && (trigger as HTMLElement).classList?.contains('work')) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <Section ref={setAnimation} className="work" mode="light">
      {/* section heading */}
      <SectionHeading title="recentWork();" tagline="hundreds of thousands daily active users" />

      {/* progress bar */}
      {Object.keys(parentST).length > 0 && <ScrollProgressBar className="work-scroll" bg="black" scrollTrigger={parentST} />}

      {/* it has two sections, one with text details another one with image, the section also need to be pinned */}
      <FlexCenter
        className="work-content"
        custom={{ 
          flexGrow: 1, 
          gap: "4%",
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          overflow: "hidden"
        }}
        customMobile={{ 
          flexDirection: "column", 
          paddingTop: "10%", 
          width: "90%", 
          marginLeft: "5%", 
          overflow: "visible", 
          paddingBottom: "30px",
          minHeight: "auto"
        }}
      >
        {workImages.map((image, index) => {
          // Safety check: ensure WorkData has corresponding entry
          if (!WorkData[index]) {
            console.warn(`WorkData missing entry for index ${index}`);
            return null;
          }
          
          return (
          <Flex
            key={`container-${index}`}
            className="project-container"
            custom={{
              height: "100%",
              width: "100%",
              position: "absolute",
              top: "0",
              left: "0",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            customMobile={{ 
              position: "relative", 
              flexDirection: "column-reverse"
            }}
          >
            {/* project text container */}
            <WorkTextBlock
              className="work-text"
              key={`text-${index}`}
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
                aspectRatio: "1",
              }}
              customMobile={{ 
                zIndex: 1, 
                position: "relative", 
                width: "100%", 
                aspectRatio: "1.3", 
                transform: "translateY(10%)", 
                overflow: "hidden" 
              }}
            >
              <WorkImage 
                key={`image-${index}`} 
                className="work-image" 
                bgImage={`/images/work/${image}`}
                custom={{
                  backgroundImage: `url(/images/work/${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
              />
            </Flex>
          </Flex>
          );
        })}
      </FlexCenter>
    </Section>
  );
}

function setDesktopAnimationForWorkSection(workImages: string[], isMobile: boolean, setParentST: (st: ScrollTrigger.Vars) => void) {
  const windowInnerHeight = isMobile ? window.innerHeight / 1.3 : window.innerHeight;
  
  const workImageElements: HTMLElement[] = gsap.utils.toArray(".work-image");
  const workTextBlocks: HTMLElement[] = gsap.utils.toArray(".work-text");
  const projectContainers: HTMLElement[] = gsap.utils.toArray(".project-container");

  const totalWorkElements = workImageElements.length;

  if (totalWorkElements === 0) {
    console.warn("No work elements found");
    return;
  }

  // Kill any existing ScrollTriggers for work section
  ScrollTrigger.getAll().forEach(st => {
    const trigger = st.trigger;
    if (trigger && (trigger as HTMLElement).classList?.contains('work')) {
      st.kill();
    }
  });

  /* set initial z-index for project containers, images and text blocks */
  projectContainers.forEach((container, i) => {
    if (i === 0) {
      // First container: visible
      gsap.set(container, { 
        zIndex: totalWorkElements,
        opacity: 1,
        visibility: "visible",
        display: "flex"
      });
    } else {
      // Other containers: hidden but ready
      gsap.set(container, { 
        zIndex: totalWorkElements - i,
        opacity: 0,
        visibility: "hidden",
        display: "flex"
      });
    }
  });
  
  gsap.set(".work-image", { zIndex: (i) => totalWorkElements - i });
  gsap.set(".work-text", { zIndex: (i) => totalWorkElements - i + 10 });

  /* set initial state for all work text blocks */
  workTextBlocks.forEach((block, i) => {
    if (i === 0) {
      /* ensure first text block starts visible */
      gsap.set(block, { 
        opacity: 1, 
        yPercent: 0, 
        visibility: "visible",
        display: "flex"
      });
    } else {
      gsap.set(block, { 
        opacity: 0, 
        yPercent: 100, 
        visibility: "hidden",
        display: "flex"
      });
    }
  });

  /* set initial state for all work images */
  workImageElements.forEach((img, i) => {
    if (i === 0) {
      /* ensure first image starts visible */
      gsap.set(img, { 
        opacity: 1, 
        visibility: "visible",
        display: "block"
      });
    } else {
      gsap.set(img, { 
        opacity: 0, 
        visibility: "hidden",
        display: "block"
      });
    }
  });
  
  /* project containers - initial reveal animation */
  if (workImageElements[0] && workTextBlocks[0] && projectContainers[0]) {
    // Ensure first container is visible
    gsap.set(projectContainers[0], { 
      visibility: "visible", 
      opacity: 1,
      display: "flex"
    });
    
    // Set initial state for reveal animation (start slightly scaled and translated)
    gsap.set([workImageElements[0], workTextBlocks[0]], {
      yPercent: 60,
      scale: 1.2,
      opacity: 0.8
    });
    
    // Animate first card into view
    gsap.to([workImageElements[0], workTextBlocks[0]], {
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
  }

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
    if (workImageElements[i]) {
      gsap.to(workImageElements[i], {
        ease: "none",
        ...imageUpdate,
        opacity: 0,
        visibility: "hidden",
        scale: 0.9,
        scrollTrigger: scrollTrigger(),
      });
    }

    /* animate next image in */
    if (i + 1 < totalWorkElements && workImageElements[i + 1]) {
      // Show container before animating
      if (projectContainers[i + 1]) {
        gsap.set(projectContainers[i + 1], { 
          visibility: "visible",
          display: "flex",
          opacity: 0
        });
      }
      
      gsap.fromTo(workImageElements[i + 1], {
        opacity: 0,
        visibility: "hidden",
        scale: 1.1
      }, {
        ease: "none",
        opacity: 1,
        visibility: "visible",
        scale: 1,
        scrollTrigger: scrollTrigger(),
      });
    }

    const t1 = gsap.timeline({
      scrollTrigger: scrollTrigger(),
    });

    if (workTextBlocks[i]) {
      t1.to(workTextBlocks[i], {
        ease: "none",
        yPercent: isMobile ? -70 : -100,
        opacity: 0,
        visibility: "hidden",
        display: "flex"
      });
    }

    if (i + 1 < totalWorkElements && workTextBlocks[i + 1]) {
      // Show container before animating
      if (projectContainers[i + 1]) {
        gsap.set(projectContainers[i + 1], { 
          visibility: "visible",
          display: "flex",
          opacity: 0
        });
      }
      
      t1.fromTo(
        workTextBlocks[i + 1],
        {
          yPercent: 100,
          opacity: 0,
          visibility: "hidden",
          display: "flex"
        },
        {
          ease: "none",
          yPercent: 0,
          opacity: 1,
          visibility: "visible",
          display: "flex"
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

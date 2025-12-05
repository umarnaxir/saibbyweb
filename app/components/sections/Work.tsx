"use client";

import React from "react";
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
  const resizeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

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

    // Clean up any existing ScrollTriggers first
    // Kill any ScrollTriggers related to work
    ScrollTrigger.getAll().forEach(st => {
      const trigger = st.trigger;
      if (trigger && (trigger as HTMLElement).classList?.contains('work')) {
        st.kill();
      }
    });

    // Note: GSAP pin-spacers are managed automatically by ScrollTrigger
    // No manual cleanup needed - ScrollTrigger handles them properly

    const initializeAnimations = () => {
      const workImageElements = gsap.utils.toArray<HTMLElement>(".work-image");
      const workTextBlocks = gsap.utils.toArray<HTMLElement>(".work-text");
      const projectContainers = gsap.utils.toArray<HTMLElement>(".project-container");
      
      if (workImageElements.length === 0 || workTextBlocks.length === 0 || projectContainers.length === 0) {
        setTimeout(initializeAnimations, 100);
        return;
      }

      // CRITICAL: Immediately set all elements visible BEFORE any async operations
      // This prevents disappearing on refresh - elements are visible instantly
      projectContainers.forEach((container) => {
        gsap.set(container, { 
          visibility: "visible",
          opacity: 1,
          display: "flex"
        });
      });
      
      workImageElements.forEach((img, i) => {
        gsap.set(img, { 
          opacity: i === 0 ? 1 : 0.2,
          visibility: "visible"
        });
      });
      
      workTextBlocks.forEach((block, i) => {
        gsap.set(block, { 
          opacity: i === 0 ? 1 : 0.2,
          visibility: "visible",
          yPercent: i === 0 ? 0 : 100
        });
      });

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

          // Debounce refresh to prevent conflicts with Services section
          // Add extra delay to ensure Services section pin-spacer is fully cleaned up
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              ScrollTrigger.refresh();
            });
          });
        });
      });
    };

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      requestAnimationFrame(initializeAnimations);
    }, 50);
  }, [workImages, setParentST]);

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
      // Kill any remaining ScrollTriggers related to work
      ScrollTrigger.getAll().forEach(st => {
        const trigger = st.trigger;
        if (trigger && (trigger as HTMLElement).classList?.contains('work')) {
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
  const windowInnerHeight = window.innerHeight;
  const scrollDistance = windowInnerHeight * 1.2; // Each card gets 1.2x viewport height
  
  const workImageElements: HTMLElement[] = gsap.utils.toArray(".work-image");
  const workTextBlocks: HTMLElement[] = gsap.utils.toArray(".work-text");
  const projectContainers: HTMLElement[] = gsap.utils.toArray(".project-container");

  const totalWorkElements = workImageElements.length;

  if (totalWorkElements === 0) {
    console.warn("No work elements found");
    return;
  }

  // CRITICAL: Immediately set all elements to visible state to prevent disappearing on refresh
  // This runs BEFORE any animations to ensure elements are always visible
  projectContainers.forEach((container) => {
    gsap.set(container, {
      visibility: "visible",
      opacity: 1,
      display: "flex"
    });
  });
  
  workImageElements.forEach((img, i) => {
    if (i === 0) {
      gsap.set(img, { opacity: 1, visibility: "visible" });
    } else {
      gsap.set(img, { opacity: 0.2, visibility: "visible" });
    }
  });
  
  workTextBlocks.forEach((block, i) => {
    if (i === 0) {
      gsap.set(block, { opacity: 1, visibility: "visible", yPercent: 0 });
    } else {
      gsap.set(block, { opacity: 0.2, visibility: "visible", yPercent: 100 });
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
      // Other containers: Keep visible but ensure children are already visible (at 0.2 opacity)
      // This prevents blank/black div glitches - container and children both visible from start
      gsap.set(container, { 
        zIndex: totalWorkElements - i,
        opacity: 1,  // Container fully opaque - no transparency issues
        visibility: "visible",  // Visible so children can show
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
        opacity: 0.2,  // Changed from 0 to 0.2 - start partially visible to prevent black screen
        yPercent: 100, 
        visibility: "visible",
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
        opacity: 0.2,  // Changed from 0 to 0.2 - start partially visible to prevent black screen
        visibility: "visible",
        display: "block"
      });
    }
  });
  
  /* project containers - initial reveal animation */
  if (workImageElements[0] && workTextBlocks[0] && projectContainers[0]) {
    // CRITICAL FIX: Set first card to FULLY VISIBLE state immediately
    // This prevents disappearing on refresh - elements are always visible regardless of scroll position
    gsap.set(projectContainers[0], { 
      visibility: "visible", 
      opacity: 1,
      display: "flex"
    });
    
    // Set first card children to final visible state IMMEDIATELY
    // This ensures they're visible on page load/refresh, no matter the scroll position
    gsap.set([workImageElements[0], workTextBlocks[0]], {
      yPercent: 0,
      scale: 1,
      opacity: 1,
      visibility: "visible"
    });
    
    // Note: Removed initial reveal animation to prevent elements disappearing on refresh
    // First card is now always visible from the start
  }

  // Calculate total scroll distance needed
  const totalScrollDistance = scrollDistance * totalWorkElements;

  // Pre-setup next cards: Initialize children with small opacity so they're visible from start
  for (let i = 1; i < totalWorkElements; i++) {
    if (workImageElements[i]) {
      gsap.set(workImageElements[i], {
        opacity: 0.2,  // Start with small opacity so it's visible
        visibility: "visible",
        scale: 1.05
      });
    }
    if (workTextBlocks[i]) {
      gsap.set(workTextBlocks[i], {
        opacity: 0.2,  // Start with small opacity so it's visible
        visibility: "visible",
        yPercent: 100,
        display: "flex"
      });
    }
  }

  // Create scroll triggers for each card transition
  [...Array(totalWorkElements - 1)].forEach((_, i) => {
    const startPoint = scrollDistance * (i + 1);
    const endPoint = startPoint + scrollDistance;

    /* base scroll trigger options */
    const getScrollTriggerConfig = () => ({
      scrub: 1,
      trigger: ".work",
      start: () => `top+=${startPoint} top`,
      end: () => `top+=${endPoint} top`,
      invalidateOnRefresh: true,
    });

    // Create a timeline for synchronized animations
    const tl = gsap.timeline({
      scrollTrigger: {
        ...getScrollTriggerConfig(),
        snap: {
          snapTo: 1,
          duration: { min: 0.3, max: 0.7 },
          delay: 0.1,
          inertia: false
        },
        onEnter: () => {
          // Set next container visible as soon as we enter scroll trigger (before animation starts)
          if (i + 1 < totalWorkElements && projectContainers[i + 1]) {
            gsap.set(projectContainers[i + 1], { 
              visibility: "visible",
              display: "flex",
              opacity: 1,
              zIndex: totalWorkElements + 5
            });
          }
        },
        onEnterBack: () => {
          // Also handle when scrolling back
          if (i + 1 < totalWorkElements && projectContainers[i + 1]) {
            gsap.set(projectContainers[i + 1], { 
              visibility: "visible",
              display: "flex",
              opacity: 1,
              zIndex: totalWorkElements + 5
            });
          }
        },
      },
    });

    // Animate current card out
    if (workImageElements[i]) {
      tl.to(workImageElements[i], {
        ease: "power2.in",
        opacity: 0,
        visibility: "hidden",
        scale: 0.95,
        duration: 0.8,
      }, 0.1); // Slight delay to ensure next card starts appearing first
    }

    if (workTextBlocks[i]) {
      tl.to(workTextBlocks[i], {
        ease: "power2.in",
        yPercent: -80,
        opacity: 0,
        visibility: "hidden",
        duration: 0.8,
      }, 0.1); // Slight delay to ensure next card starts appearing first
    }

    // Hide current container after children fade out to prevent blank space
    if (projectContainers[i]) {
      tl.to(projectContainers[i], {
        opacity: 0,
        visibility: "hidden",
        duration: 0.1,
      }, 0.9); // Hide container after fade completes
    }

    // Animate next card in
    if (i + 1 < totalWorkElements) {
      // Ensure next card children are visible FIRST (at negative time)
      if (workImageElements[i + 1]) {
        tl.set(workImageElements[i + 1], {
          opacity: 0.2,
          visibility: "visible",
          scale: 1.05
        }, -0.2); // Even earlier to ensure children are ready
      }
      
      if (workTextBlocks[i + 1]) {
        tl.set(workTextBlocks[i + 1], {
          opacity: 0.2,
          visibility: "visible",
          yPercent: 100,
          display: "flex"
        }, -0.2); // Even earlier to ensure children are ready
      }

      // THEN set container visible - children are already visible so no blank space
      if (projectContainers[i + 1]) {
        tl.set(projectContainers[i + 1], { 
          visibility: "visible",
          display: "flex",
          opacity: 1,
          zIndex: totalWorkElements + 5
        }, -0.1); // Negative time ensures this happens BEFORE current card fades
      }
      
      // Now animate children from 0.2 to 1
      if (workImageElements[i + 1]) {
        tl.fromTo(workImageElements[i + 1], {
          opacity: 0.2,  // Start from pre-setup opacity (0.2) - already visible
          visibility: "visible",
          scale: 1.05
        }, {
          ease: "power2.out",
          opacity: 1,
          visibility: "visible",
          scale: 1,
          duration: 0.8,
        }, 0);
      }

      if (workTextBlocks[i + 1]) {
        tl.fromTo(
          workTextBlocks[i + 1],
          {
            yPercent: 100,
            opacity: 0.2,  // Start from pre-setup opacity (0.2) - already visible
            visibility: "visible",
            display: "flex"
          },
          {
            ease: "power2.out",
            yPercent: 0,
            opacity: 1,
            visibility: "visible",
            display: "flex",
            duration: 0.8,
          },
          0
        );
      }
    }
  });

  /* pin parent element */
  const workScrollTrigger: ScrollTrigger.Vars = {
    pin: true,
    trigger: ".work",
    start: "top top",
    end: () => `+=${totalScrollDistance}`,
    scrub: 1,
    invalidateOnRefresh: true,
    anticipatePin: 1,
  };

  /* set parent scroll trigger */
  setParentST(workScrollTrigger);
}

export default Work;

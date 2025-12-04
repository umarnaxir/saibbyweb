import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


export function registerScrollTrigger() {
  gsap.registerPlugin(ScrollTrigger);
}

registerScrollTrigger();

// Track if reveal animation has been initialized to prevent double initialization
let revealAnimationInitialized = false;
const revealTriggers: ScrollTrigger[] = [];

function animateFrom(elem: HTMLElement, direction: number = 0) {
  direction = direction || 1;
  let x = 0,
    y = direction * 100;

  /* setter function */
  function setXY(first: number, second: number) {
    x = first;
    y = second;
  }

  /* get class flags */
  const classList = elem.classList;
  const revealFromLeft = classList.contains("reveal-from-left");
  const revealFromRight = classList.contains("reveal-from-right");

  /* set values for x and y */
  if (revealFromLeft) setXY(-100, 0);
  else if (revealFromRight) setXY(100, 0);

  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 1,
      x: 0,
      y: 0,
      delay: 0.2,
      autoAlpha: 1,
      ease: "power4.out",
      overwrite: "auto",
    }
  );
}

/* hide element */
function hideElement(elem: HTMLElement) {
  gsap.set(elem, { autoAlpha: 0 });
}

function cleanupRevealAnimationInternal() {
  // Kill all ScrollTrigger instances
  revealTriggers.forEach((trigger) => {
    trigger.kill();
  });
  revealTriggers.length = 0;
  
  // Reset the initialization flag
  revealAnimationInitialized = false;
  
  // Reset all reveal elements to visible state
  gsap.utils.toArray(".reveal").forEach(function (elem: unknown) {
    const eleme = elem as HTMLElement;
    gsap.set(eleme, { autoAlpha: 1, x: 0, y: 0, clearProps: "all" });
  });
}

function setRevealAnimation() {
  // Clean up existing triggers if already initialized
  if (revealAnimationInitialized) {
    cleanupRevealAnimationInternal();
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".reveal").forEach(function (elem: unknown) {
    const eleme = elem as HTMLElement;
    hideElement(eleme); // assure that the element is hidden when scrolled into view

    const trigger = ScrollTrigger.create({
      trigger: eleme,
      start: "top 85%",
      onEnter: function () {
        animateFrom(eleme);
      },
      onEnterBack: function () {
        animateFrom(eleme, -1);
      },
      onLeaveBack: () => hideElement(eleme),
      onLeave: function () {
        hideElement(eleme);
      },
    });

    revealTriggers.push(trigger);
  });

  revealAnimationInitialized = true;
  
  // Refresh ScrollTrigger and check for elements in viewport after DOM is ready
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    
    // Check if elements are already in viewport and animate them immediately
    requestAnimationFrame(() => {
      gsap.utils.toArray(".reveal").forEach(function (elem: unknown) {
        const eleme = elem as HTMLElement;
        const rect = eleme.getBoundingClientRect();
        const viewportThreshold = window.innerHeight * 0.85;
        const isInViewport = rect.top < viewportThreshold && rect.bottom > 0;
        // Animate immediately if element is in viewport
        if (isInViewport) {
          animateFrom(eleme);
        }
      });
    });
  });
}

export const revealAnimation = setRevealAnimation;
export const cleanupRevealAnimation = cleanupRevealAnimationInternal;
// export const horizontalAnim = setHorizontalSectionAnimation;

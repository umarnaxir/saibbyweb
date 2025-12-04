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

function setRevealAnimation() {
  // Prevent double initialization
  if (revealAnimationInitialized) {
    return;
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

    // Check if element is already in viewport on page load and animate immediately
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      const rect = eleme.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
      if (isInViewport && !trigger.isActive) {
        animateFrom(eleme);
      }
    });
  });

  revealAnimationInitialized = true;
  
  // Refresh ScrollTrigger after a brief delay to ensure all elements are measured
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

export const revealAnimation = setRevealAnimation;
// export const horizontalAnim = setHorizontalSectionAnimation;

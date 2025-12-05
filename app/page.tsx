"use client";

import "@/lib/styles/app.scss";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import SWHeader from "@/components/sub/SWHeader";
import { Container } from "@/components/styled/container.styled";
import TechStack from "@/components/sections/TechStack";
import Footer from "@/components/sections/Footer";
import OffCanvasMenu from "@/components/sections/OffCanvasMenu";
import { useEffect, useState, useRef } from "react";
import ContactForm from "@/components/sections/ContactForm";
import { revealAnimation, cleanupRevealAnimation } from "@/lib/helpers/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [menuToggle, setMenuToggle] = useState(false);
  const [contactFormToggle, setContactFormToggle] = useState(false);
  const globalRefreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showContactForm = () => {
    setContactFormToggle(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Wait for all components to mount before initializing
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          revealAnimation();
          // Initial refresh after all animations are set up
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 300);
        });
      });
    }

    setTimeout(() => setContactFormToggle(true), 6000);

    // Cleanup function to reset animations when component unmounts
    return () => {
      cleanupRevealAnimation();
      if (globalRefreshTimeoutRef.current) {
        clearTimeout(globalRefreshTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <Container
        className="main-container"
        custom={{ width: "92%", marginLeft: "8%" }}
        customMobile={{ width: "100%", marginLeft: "0" }}
      >
        <SWHeader toggleMenu={() => setMenuToggle((t) => !t)} />
        <Hero />
        <Services showContactForm={showContactForm} />
        <Work />
        <TechStack />
        <Footer updateContactFormToggle={showContactForm} />
        <OffCanvasMenu
          menuToggle={menuToggle}
          closeMenu={() => setMenuToggle(false)}
        />
        <ContactForm
          contactFormToggle={contactFormToggle}
          updateContactFormToggle={() => setContactFormToggle((_) => !_)}
        />
      </Container>
    </>
  );
}

"use client";

import "@/lib/styles/app.scss";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import SWHeader from "@/components/sub/SWHeader";
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
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          revealAnimation();
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 300);
        });
      });
    }

    setTimeout(() => setContactFormToggle(true), 6000);

    return () => {
      cleanupRevealAnimation();
      if (globalRefreshTimeoutRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearTimeout(globalRefreshTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
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
    </>
  );
}

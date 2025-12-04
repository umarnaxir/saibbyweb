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
import { useEffect, useState } from "react";
import ContactForm from "@/components/sections/ContactForm";
import { revealAnimation } from "@/lib/helpers/gsap";

export default function Home() {
  /* offcanvas menu toggle */
  const [menuToggle, setMenuToggle] = useState(false);
  /* contact form toggle */
  const [contactFormToggle, setContactFormToggle] = useState(false);
  /* show contact form */
  const showContactForm = () => {
    setContactFormToggle(true);
  }

  useEffect(() => {
    // Initialize reveal animations once on mount
    if (typeof window !== 'undefined') {
      // Use requestAnimationFrame to ensure DOM is fully rendered
      requestAnimationFrame(() => {
        revealAnimation();
      });
    }
    
    // Initialize Google Analytics if needed
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // You may want to add ReactGA initialization here if needed
      // ReactGA.pageview(window.location.pathname + window.location.search);
    }
    
    setTimeout(() => setContactFormToggle(true), 6000);
  }, []);

  return (
    <>
      <Container custom={{ width: "95%", marginLeft: "5%" }} customMobile={{ width: "100%", marginLeft: "0" }}>
        {/* logo */}
        <SWHeader toggleMenu={() => setMenuToggle((t) => !t)} />
        {/* hero */}
        <Hero />
        {/* Services */}
        <Services showContactForm={showContactForm} />
        {/* Work */}
        <Work />
        {/* tech stack */}
        <TechStack />
        {/* footer  */}
        <Footer
          updateContactFormToggle={showContactForm}
        />
        {/* off canvas menu */}
        <OffCanvasMenu menuToggle={menuToggle} closeMenu={() => setMenuToggle(false)} />
        {/* full screen contact form */}
        <ContactForm contactFormToggle={contactFormToggle} updateContactFormToggle={() => setContactFormToggle((_) => !_)} />
      </Container>
    </>
  );
}

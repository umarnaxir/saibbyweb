"use client";

import { useCallback, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/sub/Section";
import SectionHeading from "@/components/sub/SectionHeading";
import { Flex } from "@/components/styled/flex.styled";
import ServiceCard from "@/components/sub/ServiceCard";
import { serviceList } from "@/lib/data/services";
import ScrollProgressBar from "@/components/sub/ScrollProgressBar";

type ServicesProps = {
    showContactForm: () => void;
}

function Services({showContactForm}: ServicesProps) {
    const [parentST, setParentST] = useState<ScrollTrigger.Vars>({});

    const setAnimation = useCallback((node: HTMLDivElement | null) => {
        if (node === null) return;

        const initializeAnimations = () => {
            const sections = gsap.utils.toArray<HTMLElement>(".service-card");
            if (sections.length === 0) {
                setTimeout(initializeAnimations, 100);
                return;
            }

            // Wait a bit more for layout to settle
            requestAnimationFrame(() => {
                let maxWidth = 0;
                const calculateTotalWidthOfSections = () => {
                    maxWidth = 0;
                    sections.forEach((sec, index) => {
                        if (sec) {
                            // Force reflow to get accurate measurements
                            const width = sec.offsetWidth || sec.getBoundingClientRect().width;
                            if (width > 0) {
                                maxWidth += width;
                                // Add gap between cards (2rem = 32px) for each card except the last
                                if (index < sections.length - 1) {
                                    maxWidth += 32;
                                }
                            }
                        }
                    });
                };

                calculateTotalWidthOfSections();
                
                // Retry if width calculation failed
                if (maxWidth === 0) {
                    setTimeout(initializeAnimations, 200);
                    return;
                }

                ScrollTrigger.addEventListener("refreshInit", calculateTotalWidthOfSections);

                const track = document.querySelector(".services-track") as HTMLElement;
                if (!track) {
                    setTimeout(initializeAnimations, 100);
                    return;
                }

                // Set track width to fit all cards - use inline style for reliability
                track.style.width = `${maxWidth}px`;
                gsap.set(track, { 
                    x: 0,
                    opacity: 1,
                    visibility: 'visible'
                });

                ScrollTrigger.matchMedia({
                    "(min-width: 768px)": function () {
                        const viewportWidth = window.innerWidth;
                        const totalScrollDistance = Math.max(0, maxWidth - viewportWidth);
                        
                        // Calculate scroll end distance - enough to show all cards
                        const scrollEndDistance = totalScrollDistance + 200; // Extra padding
                        
                        const servicesScrollTrigger: ScrollTrigger.Vars = {
                            trigger: ".services",
                            scrub: 1,
                            pin: true,
                            start: "top top",
                            end: () => `+=${scrollEndDistance}`,
                            invalidateOnRefresh: true
                        };

                        setHorizontalSectionAnimation(sections, maxWidth, servicesScrollTrigger);
                        
                        // Header animations - desktop only
                        gsap.fromTo(['.sw-header'], 
                            {
                                width: '10%'
                            },
                            {
                                width: '7%',
                                scrollTrigger: {
                                    trigger: ".services",
                                    start: () => "top top",
                                    end: () => "top+=100",
                                    scrub: 1
                                }
                            }
                        );

                        const container = document.querySelector('.main-container') as HTMLElement;
                        if (container) {
                            gsap.fromTo(container,
                                {
                                    marginLeft: '10%',
                                    width: '90%'
                                },
                                {
                                    marginLeft: '7%',
                                    width: '93%',
                                    scrollTrigger: {
                                        trigger: ".services",
                                        start: () => "top top",
                                        end: () => "top+=100",
                                        scrub: 1
                                    }
                                }
                            );
                        }

                        gsap.to(['.sw-menu,.sw-logo'], {
                            marginLeft: 0,
                            scrollTrigger: {
                                trigger: ".services",
                                start: () => "top center-=center",
                                end: () => "top+=80",
                                scrub: 1
                            }
                        });

                        const stCopy = { ...servicesScrollTrigger };
                        delete stCopy['pin'];
                        setParentST(stCopy);
                    },
                    "(max-width: 768px)": function() {
                        // Mobile: Only animate header height, not width
                        gsap.set(['.sw-header'], { clearProps: 'width' });
                        
                        gsap.to(['.sw-header'], {
                            height: '13vw',
                            scrollTrigger: {
                                trigger: ".services",
                                start: () => "top center+=100",
                                end: () => "top+=100",
                                scrub: 1
                            }
                        });
                    }
                });

                ScrollTrigger.refresh();
            });
        };

        requestAnimationFrame(initializeAnimations);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            ScrollTrigger.getAll().forEach(st => {
                const trigger = st.trigger;
                if (trigger && (trigger as HTMLElement).classList?.contains('services')) {
                    st.kill();
                }
            });
        };
    }, []);

    return (
        <Section ref={setAnimation} className="services" mode="light">
            <SectionHeading title="whatWeDo();" tagline="our services" />
            
            {Object.keys(parentST).length > 0 && (
                <ScrollProgressBar className="services-scroll" bg="black" scrollTrigger={parentST} />
            )}
            
            <Flex 
                className="services-track"
                custom={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    padding: '2rem 0',
                    gap: '2rem',
                    width: 'auto',
                    minHeight: '70vh',
                    alignItems: 'center',
                    overflow: 'visible',
                    position: 'relative'
                }}
                customMobile={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem',
                    padding: '2rem 1rem',
                    minHeight: 'auto',
                    width: '100%'
                }}
            >
                {serviceList.map((service, index) => (
                    <ServiceCard
                        key={index}
                        name={service.name}
                        description={service.description}
                        image={service.image}
                        subServices={service.subServices}
                        onClick={showContactForm}
                    />
                ))}
            </Flex>
        </Section>
    );
}

function setHorizontalSectionAnimation(sections: HTMLElement[], maxWidth: number, parentScrollTrigger: ScrollTrigger.Vars) {
    if (sections.length === 0 || maxWidth === 0) return;

    const track = document.querySelector(".services-track") as HTMLElement;
    if (!track) return;

    // Ensure track starts at correct position and is visible
    gsap.set(track, { x: 0, opacity: 1, visibility: 'visible' });

    // Initial reveal animation - completes before main scroll starts
    gsap.fromTo(
        track,
        { 
            x: 200, 
            opacity: 0.6 
        },
        {
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
                trigger: ".services",
                scrub: 1,
                start: "top bottom",
                end: "top top-=50", // End slightly before main scroll starts
            },
        }
    );

    // Main horizontal scroll animation
    const viewportWidth = window.innerWidth;
    const totalScrollDistance = Math.max(0, maxWidth - viewportWidth);

    // Animate the track container horizontally - this is the main scroll
    const containerAnimation = gsap.to(track, {
        x: -totalScrollDistance,
        ease: "none",
        scrollTrigger: parentScrollTrigger
    });

    // Animate individual card images as they come into view
    sections.forEach((section) => {
        const imageElement = section.lastChild as HTMLElement;
        if (imageElement) {
            gsap.fromTo(imageElement, {
                backgroundPositionX: 120,
                opacity: 0.2,
            }, {
                backgroundPositionX: 3,
                opacity: 1,
                ease: "ease",
                scrollTrigger: {
                    scrub: 1,
                    trigger: section,
                    containerAnimation: containerAnimation,
                    start: "left right",
                    end: "left left",
                },
            });
        }
    });
}

export default Services;

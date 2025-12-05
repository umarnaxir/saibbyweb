"use client";

import React, { useCallback, useState, useEffect } from "react";
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
    const refreshHandlerRef = React.useRef<(() => void) | null>(null);
    const resizeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const setAnimation = useCallback((node: HTMLDivElement | null) => {
        if (node === null) return;

        // Clean up any existing ScrollTriggers first
        // Kill any ScrollTriggers related to services
        ScrollTrigger.getAll().forEach(st => {
            const trigger = st.trigger;
            if (trigger && (trigger as HTMLElement).classList?.contains('services')) {
                st.kill();
            }
        });

        // Remove old refresh handler if exists
        if (refreshHandlerRef.current) {
            ScrollTrigger.removeEventListener("refreshInit", refreshHandlerRef.current);
            refreshHandlerRef.current = null;
        }

        const initializeAnimations = () => {
            const sections = gsap.utils.toArray<HTMLElement>(".service-card");
            if (sections.length === 0) {
                setTimeout(initializeAnimations, 100);
                return;
            }

            // Explicitly ensure all service cards are visible
            sections.forEach((section) => {
                if (section) {
                    gsap.set(section, { 
                        opacity: 1, 
                        visibility: 'visible',
                        autoAlpha: 1
                    });
                }
            });

            // Wait for layout to settle with double RAF
            requestAnimationFrame(() => {
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

                    // Store refresh handler for cleanup
                    refreshHandlerRef.current = () => calculateTotalWidthOfSections();
                    ScrollTrigger.addEventListener("refreshInit", refreshHandlerRef.current);

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
                            const servicesScrollTrigger: ScrollTrigger.Vars = {
                                trigger: ".services",
                                scrub: 1,
                                pin: true,
                                pinSpacing: true,
                                start: "top top",
                                end: () => {
                                    // Recalculate on each refresh for accuracy
                                    const currentViewportWidth = window.innerWidth;
                                    const currentMaxWidth = maxWidth;
                                    const currentTotalScrollDistance = Math.max(0, currentMaxWidth - currentViewportWidth);
                                    // Add extra padding (20% of viewport) to ensure all cards are fully visible
                                    return `+=${currentTotalScrollDistance + (currentViewportWidth * 0.2)}`;
                                },
                                invalidateOnRefresh: true,
                                anticipatePin: 1
                            };

                            setHorizontalSectionAnimation(sections, maxWidth, servicesScrollTrigger);
                            
                            // Header animations - desktop only
                            gsap.fromTo(['.sw-header'], 
                                {
                                    width: '8%'
                                },
                                {
                                    width: '5%',
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
                                        marginLeft: '8%',
                                        width: '92%'
                                    },
                                    {
                                        marginLeft: '5%',
                                        width: '95%',
                                        scrollTrigger: {
                                            trigger: ".services",
                                            start: () => "top top",
                                            end: () => "top+=100",
                                            scrub: 1
                                        }
                                    }
                                );
                            }

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

                    // Debounce refresh to prevent conflicts
                    requestAnimationFrame(() => {
                        ScrollTrigger.refresh();
                    });
                });
            });
        };

        // Small delay to ensure DOM is ready
        setTimeout(() => {
            requestAnimationFrame(initializeAnimations);
        }, 50);
    }, []);

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
            // Remove refresh handler
            if (refreshHandlerRef.current) {
                ScrollTrigger.removeEventListener("refreshInit", refreshHandlerRef.current);
                refreshHandlerRef.current = null;
            }

            // Kill any remaining ScrollTriggers related to services
            ScrollTrigger.getAll().forEach(st => {
                const trigger = st.trigger;
                if (trigger && (trigger as HTMLElement).classList?.contains('services')) {
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
        <Section ref={setAnimation} className="services" mode="light" >
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
    gsap.set(track, { 
        x: 0, 
        opacity: 1, 
        visibility: 'visible',
        clearProps: 'transform'
    });
    
    // Ensure all service cards are visible
    sections.forEach((section) => {
        if (section) {
            gsap.set(section, { 
                opacity: 1, 
                visibility: 'visible',
                autoAlpha: 1
            });
        }
    });

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

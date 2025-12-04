"use client";

import { useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/sub/Section";
type ServicesProps = {
    showContactForm: () => void;
}

function Services({showContactForm}: ServicesProps) {
    const [parentST, setParentST] = useState<ScrollTrigger.Vars>({});

    const setAnimation = useCallback((node: HTMLDivElement | null) => {
        if (node === null)
            return;

        const sections = gsap.utils.toArray<HTMLElement>(".service-card");
        let maxWidth = 0;
        const calculateTotalWidthOfSections = () => {
            maxWidth = 0;
            sections.forEach((sec) => {
                const section = sec;
                maxWidth += section.offsetWidth;
            });
        };

        calculateTotalWidthOfSections();
        ScrollTrigger.addEventListener("refreshInit", calculateTotalWidthOfSections);

        const servicesScrollTrigger: ScrollTrigger.Vars = {
            trigger: ".services",
            scrub: 1,
            pin: true,
            start: "top top",
            end: () => `+=${maxWidth + 600}`,
            invalidateOnRefresh: true
        }

        ScrollTrigger.matchMedia({
            "(min-width: 768px)": function () {
                setHorizontalSectionAnimation(sections, maxWidth, servicesScrollTrigger);
                
                gsap.fromTo(['.sw-header'], 
                    {
                        width: '10%'
                    },
                    {
                        width: '7%',
                        scrollTrigger: {
                            trigger: ".services",
                            start: () => "top top",
                            end:() => "top+=100",
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
                                end:() => "top+=100",
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
                        end:() => "top+=80",
                        scrub: 1
                    }
                });

            },
            "(max-width: 768px)": function() {
                gsap.to(['.sw-header'], {
                    height: '13vw',
                    scrollTrigger: {
                        trigger: ".services",
                        start: () => "top center+=100",
                        end:() => "top+=100",
                        scrub: 1
                    }
                });
            }
        });

        delete servicesScrollTrigger['pin']
        setParentST(servicesScrollTrigger);

    }, []);

    return (
        <Section ref={setAnimation} className="services" mode="light">
        </Section>
    );
}

function setHorizontalSectionAnimation(sections: HTMLElement[], maxWidth: number, parentScrollTrigger: ScrollTrigger.Vars) {
    gsap.fromTo(
        [".services-track"],
        { x: 200, opacity: 0.6 },
        {
            x: 100,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
                trigger: ".services",
                scrub: 1,
                start: "center-=20% center",
                end: "center top"
            },
        }
    );

    const containerAnimation = gsap.to(".service-card", {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: parentScrollTrigger
    });

    sections.forEach((section) => {
        gsap.fromTo(section.lastChild, {
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
                id: "1",
            },
        });
    });
}


export default Services;

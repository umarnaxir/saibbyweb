"use client";

import { useCallback, useState } from "react";
import gsap from "gsap";
import { CSSProperties } from "styled-components";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlexCenter, Flex } from "@/components/styled/flex.styled";
/* sub components */
import Section from "@/components/sub/Section";
import SectionHeading from "@/components/sub/SectionHeading";
import ServiceCard from "@/components/sub/ServiceCard";
import ScrollProgressBar from "@/components/sub/ScrollProgressBar";
/* services data */
import { serviceList } from "@/lib/data/services";


/* service list track styles */
const serviceListStyles: CSSProperties = {
    marginTop: "2rem",
    width: "100%",
    overflow: "hidden",
    flexGrow: 1
}
/* service list track styles (mobile) */
const serviceListTrackStyles: { regular: CSSProperties, mobile: CSSProperties } = {
    regular: {
        gap: "2rem",
        width: 'fit-content',
        flexWrap: 'nowrap',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        // marginRight: '10%',
    },
    mobile: {
        width: '100%',
        flexDirection: 'column',
        marginLeft: '0%',
        marginRight: '0%',
        padding: '0 5%'
    }
}
type ServicesProps = {
    showContactForm: () => void;
}
function Services({showContactForm}: ServicesProps) {
    /* parent ST */
    const [parentST, setParentST] = useState<ScrollTrigger.Vars>({});

    const setAnimation = useCallback((node: HTMLDivElement | null) => {
        if (node === null)
            return;

        /* get array of sections */
        const sections = gsap.utils.toArray<HTMLElement>(".service-card");
        /* calculate width of the all sections combined  */
        let maxWidth = 0;
        /* calculate width of the container */
        const calculateTotalWidthOfSections = () => {
            maxWidth = 0;
            sections.forEach((sec) => {
                const section = sec;
                maxWidth += section.offsetWidth;
            });
        };

        /* get width of container */
        calculateTotalWidthOfSections();
        /* recalculate width of window resize */
        ScrollTrigger.addEventListener("refreshInit", calculateTotalWidthOfSections);

        /* scroll trigger */
        const servicesScrollTrigger: ScrollTrigger.Vars = {
            trigger: ".services",
            scrub: 1,
            pin: true,
            // markers: true,
            start: "top top",
            end: () => `+=${maxWidth + 600}`,
            invalidateOnRefresh: true
        }


        ScrollTrigger.matchMedia({
            "(min-width: 768px)": function () {
                setHorizontalSectionAnimation(sections, maxWidth, servicesScrollTrigger);
                gsap.to(['.sw-header'], {
                    width: '5%',
                    
                    // ease: 'expo',
                    scrollTrigger: {
                        trigger: ".services",
                        start: () => "top center+=100",
                        end:() => "top+=80",
                        scrub: 1
                    }
                });

                /* adjust logo and hamburger */
                gsap.to(['.sw-menu,.sw-logo'], {
                   marginLeft: 0,
                //    scale: 0.8,
                    // ease: 'expo',
                    scrollTrigger: {
                        trigger: ".services",
                        start: () => "top center-=center",
                        end:() => "top+=80",
                        // markers: true,
                        scrub: 1
                    }
                });

            },
            "(max-width: 768px)": function() {
                // return;
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
        /* set parent scroll trigger */
        setParentST(servicesScrollTrigger);

    }, []);


    return (
        <Section ref={setAnimation} className="services" mode="light">
            {/* section heading */}
            <SectionHeading title="whatWeDo();" tagline="written from scratch. build to scale." />
            {/* progress bar */}
            { Object.keys(parentST).length > 0 && <ScrollProgressBar className="services-scroll" bg="black" scrollTrigger={parentST} />}
            {/* service list */}
            <FlexCenter bg="transparent" onlyAlign custom={serviceListStyles} customMobile={{ paddingBottom: '3.5rem'}}>
                <Flex
                    bg="transparent"
                    className="services-track"
                    custom={serviceListTrackStyles.regular}
                    customMobile={serviceListTrackStyles.mobile}
                    flexWrap="nowrap"
                >
                    {serviceList.map((service) => (
                        <ServiceCard
                            onClick={showContactForm}
                            key={service.name}
                            name={service.name}
                            description={service.description}
                            image={service.image}
                            subServices={service.subServices}
                        />
                    ))}
                </Flex>
            </FlexCenter>
        

        </Section>
    );
}

/* horizontal section trigger */
function setHorizontalSectionAnimation(sections: HTMLElement[], maxWidth: number, parentScrollTrigger: ScrollTrigger.Vars) {
    /* bring service track forward while scrolling down */
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
                // markers: true,
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

    /* animate every single card */

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
                // markers: true,
                /* left of the card, right of the screen */
                start: "left right",
                /* left of the card, center of the screen */
                end: "left left",
                // toggleActions: "play none none reset",
                id: "1",
            },
        });
    });


}


export default Services;

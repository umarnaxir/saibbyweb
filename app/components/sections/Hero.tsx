"use client";

import { Heading, Paragraph } from "@/components/styled/text.styled";
import { Flex, FlexCenter } from "@/components/styled/flex.styled";
import { Button } from "@/components/styled/button.styled";
import Section from "@/components/sub/Section";

function initiateCall() {
  const phoneNumber = "+15179170070"
  // Check if the device supports making phone calls
  if (typeof window !== 'undefined' && 'location' in window) {
    window.location.href = `tel:${phoneNumber}`;
  } else {
    alert('Making phone calls is not supported on this device.');
  }
}

function Hero() {
  return (
    <Section mode="dark">
      <FlexCenter height="100vh" onlyAlign padding="0 0 0 10%" customMobile={{ paddingLeft: 0, justifyContent: "center" }} custom={{ overflowX: "hidden", width: "100%", maxWidth: "100%" }}>
        <Flex className="reveal" col width="65%" justifyContent="flex-start" customMobile={{ transform: "translateY(-22px)", width: "85%" }} custom={{ overflowWrap: "break-word", wordWrap: "break-word", maxWidth: "100%", overflowX: "hidden" }}>
          {/* heading */}
          <Heading fontSize="5.4rem" lineHeight="5.4rem" custom={{ overflowWrap: "break-word", wordWrap: "break-word", maxWidth: "100%" }}>
          Srinagar based digital-first<wbr></wbr>
            <span style={{ color: "#6dd26d" }}> creative </span> studio
          </Heading>
          {/* tagline */}
          <Paragraph fontSize="2rem"> websites. apps. ui/ux. branding. social media. </Paragraph>

          {/* cta */}
          {/* <Button> explore saibbyweb </Button>
                    <Button> Meet: Suhaib Khan </Button> */}
          {/* <a href={"https://linkedin.com/in/saibby"} target="_blank"> */}
            <FlexCenter >
              {/* <img style={{ width: "3rem", marginRight: "6px" }} src="/images/social/3.svg" /> */}
              {/* <Paragraph fontSize="2rem" style={{ paddingRight: "6px" }}>
                :{" "}
              </Paragraph> */}
              <Button onClick={initiateCall}>Get Quick Quote</Button>
             
            </FlexCenter>
          {/* </a> */}
        </Flex>
      </FlexCenter>
      {/* footer text */}
      <Paragraph
        noMobile
        custom={{
          position: "absolute",
          right: "5%",
          bottom: "5%",
        }}
      >
        Crafted with <span style={{ color: "#a9474f" }}> ❤ </span> in Kashmir
      </Paragraph>
    </Section>
  );
}

export default Hero;

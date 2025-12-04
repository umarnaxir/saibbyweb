"use client";

import { Heading, Paragraph } from "@/components/styled/text.styled";
import { Flex, FlexCenter } from "@/components/styled/flex.styled";
import { Button } from "@/components/styled/button.styled";
import Section from "@/components/sub/Section";
import styled from "styled-components";

const GreenSpan = styled.span`
  color: #6dd26d;
`;

const RedSpan = styled.span`
  color: #a9474f;
`;

function initiateCall() {
  const phoneNumber = "+15179170070"
  if (typeof window !== 'undefined' && 'location' in window) {
    window.location.href = `tel:${phoneNumber}`;
  } else {
    alert('Making phone calls is not supported on this device.');
  }
}

function Hero() {
  return (
    <Section mode="dark">
      <FlexCenter height="100vh" onlyAlign padding="0 0 0 10%" customMobile={{ paddingLeft: 0, justifyContent: "center" }} custom={{ overflow: "hidden", width: "100%", maxWidth: "100%" }}>
        <Flex className="reveal" col width="65%" justifyContent="flex-start" customMobile={{ transform: "translateY(-22px)", width: "85%" }} custom={{ overflowWrap: "break-word", wordWrap: "break-word", maxWidth: "100%", overflowX: "hidden" }}>
          <Heading fontSize="5.4rem" lineHeight="5.4rem" custom={{ overflow: "hidden", wordWrap: "break-word", maxWidth: "100%" }}>
          Srinagar based digital-first<wbr></wbr>
            <GreenSpan> creative </GreenSpan> studio
          </Heading>
          <Paragraph fontSize="2rem"> websites. apps. ui/ux. branding. social media. </Paragraph>
            <FlexCenter>
              <Button onClick={initiateCall}>Get Quick Quote</Button>
            </FlexCenter>
        </Flex>
      </FlexCenter>
      <Paragraph
        noMobile
        custom={{
          position: "absolute",
          right: "5%",
          bottom: "5%",
        }}
      >
        Crafted with <RedSpan> ❤ </RedSpan> in Kashmir
      </Paragraph>
    </Section>
  );
}

export default Hero;

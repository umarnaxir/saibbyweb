"use client";

import Section from "@/components/sub/Section";
import { Flex, FlexCenter } from "@/components/styled/flex.styled";
import { Heading, Paragraph } from "../styled/text.styled";
import { Button } from "../styled/button.styled";
import Link from "next/link";
import styled from "styled-components";

type FooterProps = {
  updateContactFormToggle: () => void;
};

type ScheduleMeetingCTAProps = FooterProps;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const GreenSpan = styled.span`
  color: #6dd26d;
`;

const SocialImage = styled.img`
  width: 2rem;
`;

export default function Footer({ updateContactFormToggle }: FooterProps) {
  return (
    <Section className="footer" mode="dark">
      <ScheduleMeetingCTA updateContactFormToggle={() => updateContactFormToggle()} />
      <PointOfContact />
      <FooterLinks />
    </Section>
  );
}

function FooterLinks() {
  const borderStyle = "0.5px solid #2e2e2e";
  const custom = { width: "25%", padding: "2% 5%", height: "12vh", border: borderStyle };
  const customMobile = { width: "50% !important", height: "12vw", gap: "1rem", border: borderStyle };
  const textStyles = {
    desktop: {
      color: "#a1a1a1",
      fontSize: "1.6rem",
    },
    mobile: {
      fontSize: "1.3rem",
    },
  };

  return (
    <Flex custom={{ position: "absolute", bottom: 0, left: 0, width: "100%" }} customMobile={{ flexDirection: "row", position: "relative", flexWrap: "wrap", marginTop: "2rem" }}>
      <FlexCenter custom={custom} customMobile={customMobile}>
        <Paragraph custom={textStyles.desktop} customMobile={textStyles.mobile}>
          {" "}
          © saibbyweb 2023{" "}
        </Paragraph>
      </FlexCenter>

      <FlexCenter custom={custom} customMobile={customMobile}>
        <StyledLink href="/terms-of-service">
          <Paragraph custom={textStyles.desktop} customMobile={textStyles.mobile}>
            {" "}
            terms and conditions{" "}
          </Paragraph>
        </StyledLink>
      </FlexCenter>

      <FlexCenter custom={custom} customMobile={customMobile}>
        <StyledLink href="/privacy-policy">
          <Paragraph custom={textStyles.desktop} customMobile={textStyles.mobile}>
            {" "}
            privacy policy{" "}
          </Paragraph>
        </StyledLink>
      </FlexCenter>

      <FlexCenter custom={{ ...custom, gap: "2rem" }} customMobile={customMobile}>
        <a href="https://instagram.com/saibbyweb" target="_blank">
          <SocialImage src="/images/social/1.svg" />{" "}
        </a>
        <a href="https://facebook.com/saibbyweb" target="_blank">
          <SocialImage src="/images/social/2.svg" />{" "}
        </a>
        <a href="https://linkedin.com/company/saibbyweb" target="_blank">
          <SocialImage src="/images/social/3.svg" />{" "}
        </a>
        <a href="https:/twitter.com/saibbyweb" target="_blank">
          <SocialImage src="/images/social/4.svg" />{" "}
        </a>
      </FlexCenter>
    </Flex>
  );
}

type ContactPointProps = {
  label: string;
  value: string;
  width?: string;
  invertColors?: boolean;
};

function ContactPoint({ label, value, width, invertColors }: ContactPointProps) {
  const colors = { primary: "gray", secondary: "white" };
  if (invertColors) {
    const temp = colors.primary;
    colors.primary = colors.secondary;
    colors.secondary = temp;
  }

  return (
    <Flex col width={width || "33%"} customMobile={{ width: "100%" }}>
      <Paragraph color={colors.primary}>{label}</Paragraph>
      <Paragraph color={colors.secondary} custom={{ width: "70%" }}>
        {value}{" "}
      </Paragraph>
    </Flex>
  );
}

function PointOfContact() {
  return (
    <FlexCenter width="93%"  custom={{ gap: "1rem", marginTop: "4%", marginLeft: "10%" }} customMobile={{ flexWrap: "wrap", height: "auto" }}>
      <ContactPoint invertColors label="⛰️ Kashmir, India" value="207 & 209 - Saudi Sheikh Complex, NH1A, Chanpora, Bypass, Srinagar, Jammu & Kashmir, 190015" width="35%" />
      <ContactPoint label="email us at" value="hello@saibbyweb.com" />
      <ContactPoint label="call us on" value="+91-8082007711" />
    </FlexCenter>
  );
}

function ScheduleMeetingCTA({ updateContactFormToggle }: ScheduleMeetingCTAProps) {
  return (
    <Flex col custom={{ marginTop: "8%", padding: "0 10%" }}>
      <Flex width="60%" customMobile={{ width: "100%" }}>
        <Heading fontSize="5.2rem" lineHeight="5.2rem" width="50%">
          Have an idea? <br></br> Let&apos;s <GreenSpan> connect.</GreenSpan>
        </Heading>
      </Flex>

      <Flex width="65%">
        <Paragraph
          color="#c9c7c7"
          custom={{
            fontSize: "1.8rem",
          }}
          customMobile={{
            fontSize: "1.4rem",
          }}
        >
          Schedule a meeting and make the best decision for your business.
        </Paragraph>
      </Flex>

      <Flex custom={{ gap: "1rem" }}>
        <Button onClick={() => updateContactFormToggle()}> schedule meeting </Button>
      </Flex>
    </Flex>
  );
}

"use client";

import Section from "@/components/sub/Section";
import { Flex, FlexCenter } from "@/components/styled/flex.styled";
import { Heading, Paragraph, Text } from "@/components/styled/text.styled";
import { Button } from "@/components/styled/button.styled";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <Section mode="dark" className="terms-of-service">
      <FlexCenter
        col
        custom={{
          paddingTop: "6rem",
          paddingBottom: "8rem",
          paddingLeft: "4%",
          paddingRight: "4%",
        }}
        customMobile={{
          paddingTop: "5rem",
          paddingBottom: "6rem",
          paddingLeft: "4%",
          paddingRight: "4%",
        }}
      >
        {/* Top row: back link + title */}
        <Flex
          custom={{
            width: "100%",
            maxWidth: "110rem",
            margin: "0 auto 3.2rem auto",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          customMobile={{
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1.6rem",
          }}
        >
          {/* Back home link */}
          <FlexCenter
            custom={{
              gap: "0.8rem",
            }}
          >
            <Link href="/">
              <Button
                custom={{
                  padding: "0.8rem 1.6rem",
                  fontSize: "1.4rem",
                  borderRadius: "999px",
                  backgroundColor: "#101010",
                  border: "1px solid #2e2e2e",
                  color: "white",
                }}
                customMobile={{
                  fontSize: "1.3rem",
                }}
              >
                ← Back to home
              </Button>
            </Link>
          </FlexCenter>

          {/* Page title */}
          <FlexCenter
            col
            custom={{ alignItems: "flex-end" }}
            customMobile={{ alignItems: "flex-start" }}
          >
            <Heading
              as="h1"
              fontSize="4.2rem"
              lineHeight="4.6rem"
              textAlign="right"
              custom={{ whiteSpace: "nowrap", color: "#6dd26d" }}
            >
              Terms of Service
            </Heading>
            <Paragraph
              fontSize="1.4rem"
              color="#c9c7c7"
              textAlign="right"
              custom={{ marginTop: "0.6rem" }}
              customMobile={{ textAlign: "left", fontSize: "1.3rem" }}
            >
              Effective Date: December 1, 2025
            </Paragraph>
          </FlexCenter>
        </Flex>

        {/* Content Container */}
        <Flex
          col
          custom={{
            width: "100%",
            maxWidth: "110rem",
            margin: "0 auto",
            padding: "3.2rem 3.2rem 4.2rem 3.2rem",
            borderRadius: "1.6rem",
            border: "1px solid #2e2e2e",
            backgroundColor: "#050505",
            backdropFilter: "blur(6px)",
            gap: "3.2rem",
            boxShadow: "0 24px 80px rgba(0,0,0,0.65)",
          }}
          customMobile={{
            padding: "2.4rem 1.6rem 3.2rem 1.6rem",
          }}
        >
          {/* Company Information */}
          <Flex
            col
            custom={{
              padding: "2.4rem 2.4rem 2.6rem 2.4rem",
              borderRadius: "1.2rem",
              border: "1px solid #262626",
              backgroundColor: "#080808",
              gap: "1.4rem",
            }}
          >
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Company Information
            </Heading>
            <Paragraph color="#f5f5f5">
              <Text as="span" color="#c9c7c7">
                Company:
              </Text>{" "}
              Saibbyweb
            </Paragraph>
            <Paragraph color="#f5f5f5">
              <Text as="span" color="#c9c7c7">
                Contact:
              </Text>{" "}
              <a href="mailto:hello@saibbyweb.com">hello@saibbyweb.com</a>
            </Paragraph>
            <Paragraph color="#f5f5f5">
              <Text as="span" color="#c9c7c7">
                Website:
              </Text>{" "}
              <a href="https://saibbyweb.com" target="_blank" rel="noreferrer">
                https://saibbyweb.com
              </a>
            </Paragraph>
          </Flex>

          {/* Acceptance of Terms */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Acceptance of Terms
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              By accessing or using Saibbyweb&apos;s applications and services
              (&quot;Services&quot;), you agree to be bound by these Terms of
              Service (&quot;Terms&quot;). If you do not agree to these Terms,
              do not use our Services.
            </Paragraph>
          </Flex>

          {/* Description of Services */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Description of Services
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              Saibbyweb provides custom software development solutions and
              applications that may integrate with Meta platforms (Facebook,
              Instagram, WhatsApp) and other third-party services. Our Services
              enable users to manage and interact with Meta platform features
              through our custom applications.
            </Paragraph>
          </Flex>

          {/* User Accounts and Registration */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              User Accounts and Registration
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              To use certain features of our Services, you may need to create an
              account or connect your Meta account. You are responsible for:
            </Paragraph>
            <Flex
              col
              custom={{
                gap: "0.6rem",
                marginTop: "0.4rem",
              }}
            >
              {[
                "Maintaining the confidentiality of your account credentials",
                "All activities that occur under your account",
                "Providing accurate and current information",
              ].map((item) => (
                <Flex
                  key={item}
                  custom={{ gap: "0.8rem", alignItems: "flex-start" }}
                >
                  <Text as="span" color="#6dd26d">
                    •
                  </Text>
                  <Paragraph color="#e5e5e5" custom={{ padding: "0" }}>
                    {item}
                  </Paragraph>
                </Flex>
              ))}
            </Flex>
          </Flex>

          {/* User Conduct */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              User Conduct
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              You agree not to:
            </Paragraph>
            <Flex
              col
              custom={{
                gap: "0.6rem",
                marginTop: "0.4rem",
              }}
            >
              {[
                "Violate any applicable laws or regulations",
                "Infringe upon the rights of others",
                "Transmit malicious code or disrupt our Services",
                "Attempt unauthorized access to our systems",
                "Use our Services for any fraudulent or harmful purpose",
                "Violate Meta's Platform Terms and Policies",
                "Send spam, unsolicited messages, or engage in bulk messaging via WhatsApp without proper consent",
                "Use our Services to send messages that violate WhatsApp's Commerce Policy or contain prohibited content",
              ].map((item) => (
                <Flex
                  key={item}
                  custom={{ gap: "0.8rem", alignItems: "flex-start" }}
                >
                  <Text as="span" color="#6dd26d">
                    •
                  </Text>
                  <Paragraph color="#e5e5e5" custom={{ padding: "0" }}>
                    {item}
                  </Paragraph>
                </Flex>
              ))}
            </Flex>
          </Flex>

          {/* Data and Privacy */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Data and Privacy
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              Your use of our Services is subject to our Privacy Policy, which
              is incorporated into these Terms by reference. We collect and
              process your data in accordance with our Privacy Policy and
              applicable data protection laws.
            </Paragraph>
            <Paragraph color="#dcdcdc" textAlign="left">
              You retain ownership of any content you submit through our
              Services. By submitting content, you grant us a limited license to
              use, store, and process that content solely to provide our
              Services.
            </Paragraph>
          </Flex>

          {/* Meta Platform Integration */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Meta Platform Integration
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              Our Services integrate with Meta platforms, including WhatsApp
              Cloud API. Your use of Meta features through our Services is
              subject to Meta&apos;s Terms of Service and Platform Policies. We
              are not responsible for Meta&apos;s practices or policies.
            </Paragraph>
            <Flex
              col
              custom={{
                padding: "1.8rem 2rem",
                borderRadius: "1.2rem",
                border: "1px solid #2e2e2e",
                backgroundColor: "rgba(96,177,96,0.12)",
              }}
            >
              <Paragraph color="#e5e5e5" textAlign="left">
                <Text as="span" color="#6dd26d">
                  Important:
                </Text>{" "}
                Saibbyweb is not affiliated with, endorsed by, or sponsored by
                WhatsApp LLC or Meta Platforms Inc. We are an independent
                service provider using WhatsApp Cloud API in compliance with
                their terms and policies.
              </Paragraph>
            </Flex>
          </Flex>

          {/* WhatsApp Business Policy Compliance */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              WhatsApp Business Policy Compliance
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              When using our Services that involve WhatsApp messaging, you agree
              to comply with WhatsApp&apos;s Business Terms of Service and
              Commerce Policy. This includes, but is not limited to:
            </Paragraph>
            <Flex
              col
              custom={{
                gap: "0.6rem",
                marginTop: "0.4rem",
              }}
            >
              {[
                "Obtaining explicit consent before sending messages to users",
                "Not sending spam, unsolicited messages, or prohibited content",
                'Honoring opt-out requests immediately when users reply "STOP"',
                "Using only pre-approved message templates when required by WhatsApp's policies",
                "Not using WhatsApp for illegal activities or to promote prohibited products or services",
              ].map((item) => (
                <Flex
                  key={item}
                  custom={{ gap: "0.8rem", alignItems: "flex-start" }}
                >
                  <Text as="span" color="#6dd26d">
                    •
                  </Text>
                  <Paragraph color="#e5e5e5" custom={{ padding: "0" }}>
                    {item}
                  </Paragraph>
                </Flex>
              ))}
            </Flex>
            <Flex
              col
              custom={{
                padding: "1.8rem 2rem",
                borderRadius: "1.2rem",
                border: "1px solid #3a6b3a",
                backgroundColor: "rgba(96,177,96,0.16)",
              }}
            >
              <Paragraph color="#e5e5e5" textAlign="left">
                <Text as="span" color="#6dd26d">
                  Violation Consequences:
                </Text>{" "}
                Violation of WhatsApp&apos;s Business Terms or Commerce Policy
                may result in immediate suspension or termination of your access
                to our Services, and we may report such violations to WhatsApp.
              </Paragraph>
            </Flex>
          </Flex>

          {/* Intellectual Property */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Intellectual Property
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              All intellectual property rights in our Services, including
              software, designs, trademarks, and content (excluding
              user-generated content), are owned by Saibbyweb. You may not copy,
              modify, distribute, or reverse engineer our Services without our
              written permission.
            </Paragraph>
          </Flex>

          {/* Service Availability and Modifications */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Service Availability and Modifications
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              We strive to provide reliable Services but do not guarantee
              uninterrupted or error-free operation. We reserve the right to:
            </Paragraph>
            <ul>
              <li>
                <Paragraph color="#e5e5e5">
                  Modify, suspend, or discontinue any aspect of our Services at
                  any time
                </Paragraph>
              </li>
              <li>
                <Paragraph color="#e5e5e5">
                  Update these Terms with reasonable notice
                </Paragraph>
              </li>
              <li>
                <Paragraph color="#e5e5e5">
                  Refuse service to anyone for any reason
                </Paragraph>
              </li>
            </ul>
          </Flex>

          {/* Limitation of Liability */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Limitation of Liability
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              To the maximum extent permitted by law, Saibbyweb shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising from your use of our Services.
            </Paragraph>
          </Flex>

          {/* Termination */}
          <Flex col custom={{ gap: "1.2rem" }}>
            <Heading
              as="h2"
              fontSize="2.6rem"
              lineHeight="3rem"
              color="#6dd26d"
            >
              Termination
            </Heading>
            <Paragraph color="#e5e5e5" textAlign="left">
              We may suspend or terminate your access to our Services at any
              time if you violate these Terms or engage in conduct that we
              determine to be harmful to our Services or other users.
            </Paragraph>
            <Paragraph color="#e5e5e5" textAlign="left">
              You may terminate your account at any time by contacting us at{" "}
              <a href="mailto:hello@saibbyweb.com">hello@saibbyweb.com</a>. Upon
              termination, you may request deletion of your data in accordance
              with our Privacy Policy.
            </Paragraph>
          </Flex>

          {/* Governing Law */}
          <Flex col custom={{ gap: "1.2rem" }}>
            <Heading
              as="h2"
              fontSize="2.6rem"
              lineHeight="3rem"
              color="#6dd26d"
            >
              Governing Law
            </Heading>
            <Paragraph color="#e5e5e5" textAlign="left">
              These Terms shall be governed by and construed in accordance with
              the laws of India. Any disputes arising from these Terms or your
              use of our Services shall be subject to the exclusive jurisdiction
              of the courts in India.
            </Paragraph>
          </Flex>

          {/* Contact Information */}
          <Flex
            col
            custom={{
              padding: "2.4rem 2.4rem 2.8rem 2.4rem",
              borderRadius: "1.2rem",
              border: "1px solid #2e2e2e",
              backgroundColor: "rgba(255,255,255,0.02)",
              gap: "1.4rem",
            }}
          >
            <Heading
              as="h2"
              fontSize="2.6rem"
              lineHeight="3rem"
              color="#6dd26d"
            >
              Contact Information
            </Heading>
            <Paragraph color="#e5e5e5" textAlign="left">
              For questions or concerns about these Terms, contact us at:
            </Paragraph>
            <Paragraph color="#f5f5f5" textAlign="left">
              <Text as="span" color="#c9c7c7">
                Email:
              </Text>{" "}
              <a href="mailto:hello@saibbyweb.com">hello@saibbyweb.com</a>
            </Paragraph>
            <Paragraph color="#f5f5f5" textAlign="left">
              <Text as="span" color="#c9c7c7">
                Website:
              </Text>{" "}
              <a href="https://saibbyweb.com" target="_blank" rel="noreferrer">
                https://saibbyweb.com
              </a>
            </Paragraph>
            <Paragraph
              fontSize="1.4rem"
              color="#a1a1a1"
              textAlign="left"
              custom={{ marginTop: "0.8rem" }}
            >
              Last Updated: December 1, 2025
            </Paragraph>
          </Flex>
        </Flex>
      </FlexCenter>
    </Section>
  );
}


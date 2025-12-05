"use client";

import Section from "@/components/sub/Section";
import { Flex, FlexCenter } from "@/components/styled/flex.styled";
import { Heading, Paragraph, Text } from "@/components/styled/text.styled";
import { Button } from "@/components/styled/button.styled";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <Section mode="dark" className="privacy-policy">
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
              Privacy Policy
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
          {/* Introduction */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Introduction
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              Saibbyweb (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
              committed to protecting your privacy and respecting your data
              rights. This Privacy Policy explains how we collect, use, store,
              and delete your information when you use our applications and
              services that integrate with Meta platforms (Facebook, Instagram,
              WhatsApp).
            </Paragraph>
          </Flex>

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

          {/* Information We Collect */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Information We Collect
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              We collect the following types of information:
            </Paragraph>

            <Flex col custom={{ gap: "1.6rem", marginTop: "0.8rem" }}>
              {/* Information from Meta Platforms */}
              <Flex
                col
                custom={{
                  padding: "1.8rem 2rem",
                  borderRadius: "1.2rem",
                  border: "1px solid #262626",
                  backgroundColor: "#080808",
                  gap: "0.8rem",
                }}
              >
                <Heading
                  as="h3"
                  fontSize="2rem"
                  lineHeight="2.4rem"
                  color="#6dd26d"
                >
                  Information from Meta Platforms
                </Heading>
                <Paragraph color="#e5e5e5" textAlign="left">
                  When you connect your Meta account to our application, we may
                  collect your name, email address, profile picture, and other
                  information you authorize us to access through Meta&apos;s
                  permissions.
                </Paragraph>
              </Flex>

              {/* WhatsApp-Specific Information */}
              <Flex
                col
                custom={{
                  padding: "1.8rem 2rem",
                  borderRadius: "1.2rem",
                  border: "1px solid #262626",
                  backgroundColor: "#080808",
                  gap: "0.8rem",
                }}
              >
                <Heading
                  as="h3"
                  fontSize="2rem"
                  lineHeight="2.4rem"
                  color="#6dd26d"
                >
                  WhatsApp-Specific Information
                </Heading>
                <Paragraph color="#e5e5e5" textAlign="left">
                  When you communicate with us via WhatsApp Cloud API, we
                  collect your phone number, message content, timestamps, and
                  any media files you share. This information is necessary to
                  provide customer support and respond to your inquiries through
                  WhatsApp.
                </Paragraph>
              </Flex>

              {/* Usage Information */}
              <Flex
                col
                custom={{
                  padding: "1.8rem 2rem",
                  borderRadius: "1.2rem",
                  border: "1px solid #262626",
                  backgroundColor: "#080808",
                  gap: "0.8rem",
                }}
              >
                <Heading
                  as="h3"
                  fontSize="2rem"
                  lineHeight="2.4rem"
                  color="#6dd26d"
                >
                  Usage Information
                </Heading>
                <Paragraph color="#e5e5e5" textAlign="left">
                  We automatically collect information about how you interact
                  with our services, including device information, browser type,
                  IP address, and usage patterns.
                </Paragraph>
              </Flex>

              {/* Information You Provide */}
              <Flex
                col
                custom={{
                  padding: "1.8rem 2rem",
                  borderRadius: "1.2rem",
                  border: "1px solid #262626",
                  backgroundColor: "#080808",
                  gap: "0.8rem",
                }}
              >
                <Heading
                  as="h3"
                  fontSize="2rem"
                  lineHeight="2.4rem"
                  color="#6dd26d"
                >
                  Information You Provide
                </Heading>
                <Paragraph color="#e5e5e5" textAlign="left">
                  Any data you voluntarily submit through our application,
                  including preferences, settings, and content you create.
                </Paragraph>
              </Flex>
            </Flex>
          </Flex>

          {/* How We Use Your Information */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              How We Use Your Information
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              We use your information solely for the following purposes:
            </Paragraph>

            <Flex
              col
              custom={{
                gap: "0.6rem",
                marginTop: "0.4rem",
              }}
            >
              {[
                "To provide and maintain our services",
                "To authenticate and recognize you when you use our application",
                "To respond to your requests and provide customer support",
                "To improve our services and develop new features",
                "To comply with legal obligations",
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
                marginTop: "1.4rem",
              }}
            >
              <Paragraph color="#e5e5e5" textAlign="left">
                <Text as="span" color="#6dd26d">
                  Important:
                </Text>{" "}
                We do not sell your personal information to third parties. We do
                not use your data for purposes beyond what you have explicitly
                consented to.
              </Paragraph>
            </Flex>
          </Flex>

          {/* Data Sharing */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Data Sharing
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              We do not share your personal information with third parties
              except:
            </Paragraph>

            <Flex
              col
              custom={{
                gap: "0.6rem",
                marginTop: "0.4rem",
              }}
            >
              {[
                "With your explicit consent",
                "To comply with legal obligations or valid legal requests",
                "With service providers who assist us in operating our services (under strict confidentiality agreements)",
                "In connection with Meta's platform requirements",
                "With Meta Platforms Inc. (WhatsApp) as required for the operation of WhatsApp Cloud API services, including message delivery and platform compliance",
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

          {/* Your Data Rights */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Your Data Rights
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              You have the right to:
            </Paragraph>

            <Flex
              col
              custom={{
                gap: "0.6rem",
                marginTop: "0.4rem",
              }}
            >
              {[
                "Access the personal information we hold about you",
                "Request correction of inaccurate data",
                "Request deletion of your data at any time",
                "Withdraw consent for data processing",
                "Opt-out of promotional communications",
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

          {/* WhatsApp Messaging and Consent */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              WhatsApp Messaging and Consent
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              We may send you messages via WhatsApp Cloud API for customer
              support, service updates, and responses to your inquiries. By
              providing your phone number and initiating communication with us
              via WhatsApp, you explicitly consent to receive messages from us.
            </Paragraph>
            <Flex
              col
              custom={{
                padding: "1.8rem 2rem",
                borderRadius: "1.2rem",
                border: "1px solid #3a6b3a",
                backgroundColor: "rgba(96,177,96,0.16)",
                marginTop: "0.6rem",
              }}
            >
              <Paragraph color="#e5e5e5" textAlign="left">
                <Text as="span" color="#6dd26d">
                  Opt-Out Instructions:
                </Text>{" "}
                You can opt-out of receiving WhatsApp messages at any time by
                replying with &quot;STOP&quot; to any message. We will honor
                your opt-out request promptly and stop sending messages, except
                for essential service-related communications required to
                complete ongoing transactions or as required by law.
              </Paragraph>
            </Flex>
          </Flex>

          {/* Data Deletion */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Data Deletion
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              You may request deletion of your data at any time by:
            </Paragraph>

            <Flex
              col
              custom={{
                gap: "0.6rem",
                marginTop: "0.4rem",
              }}
            >
              {[
                'Emailing us at hello@saibbyweb.com with the subject line "Data Deletion Request"',
                "Using the data deletion request feature within our application (if available)",
                "Initiating a deletion request through your Meta account settings",
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
                marginTop: "0.6rem",
              }}
            >
              <Paragraph color="#e5e5e5" textAlign="left">
                We will process your deletion request within 30 days and
                permanently remove all your personal information from our
                systems.
              </Paragraph>
            </Flex>
          </Flex>

          {/* Data Retention */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Data Retention
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              We retain your personal information only for as long as necessary
              to provide our services or as required by law. Once you request
              deletion or discontinue use of our services, we will delete your
              data in accordance with this policy.
            </Paragraph>
          </Flex>

          {/* Data Security */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Data Security
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction.
            </Paragraph>
          </Flex>

          {/* Children's Privacy */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Children&apos;s Privacy
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              Our services are not intended for users under 13 years of age. We
              do not knowingly collect personal information from children under
              13.
            </Paragraph>
          </Flex>

          {/* International Data Transfers */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              International Data Transfers
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              If you access our services from outside India, your information
              may be transferred to and processed in India or other countries
              where our service providers operate.
            </Paragraph>
          </Flex>

          {/* Changes to This Policy */}
          <Flex col custom={{ gap: "1rem" }}>
            <Heading
              as="h2"
              fontSize="2.4rem"
              lineHeight="2.8rem"
              color="#6dd26d"
            >
              Changes to This Policy
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              We may update this Privacy Policy from time to time. We will
              notify you of significant changes by posting the updated policy on
              our website and updating the effective date.
            </Paragraph>
          </Flex>

          {/* Contact Us */}
          <Flex
            col
            custom={{
              padding: "2.4rem 2.4rem 2.8rem 2.4rem",
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
              Contact Us
            </Heading>
            <Paragraph color="#dcdcdc" textAlign="left">
              For questions, concerns, or requests regarding this Privacy Policy
              or your personal data, contact us at:
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
          </Flex>
        </Flex>
      </FlexCenter>
    </Section>
  );
}


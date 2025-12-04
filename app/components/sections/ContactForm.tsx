"use client";

import { Flex, FlexCenter } from "@/components/styled/flex.styled";
import Modal from "@/components/sub/Modal";
import React, { ChangeEvent, useState } from "react";
import { Button } from "../styled/button.styled";
import { Input } from "../styled/input.styled";
import { Heading, Paragraph } from "../styled/text.styled";
import "@/lib/helpers/stringValidator";
import Lottie from "lottie-react";
import CheckGreen from "@/lib/data/check-green.json";
import axios from "axios";
import Image from "next/image";

const POST_URL = "https://us-central1-nifty-memory-204406.cloudfunctions.net/saveMessage";

type ContactFormLayoutProps = {
  updateToggle?: () => void;
};

/* error msg */
export type ErrorMsg = {
  status: boolean;
  msg: string;
};

function ContactFormLayout({ updateToggle }: ContactFormLayoutProps) {
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState<ErrorMsg>({ status: false, msg: "Please re-check your details." });
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(field: string): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> {
    return function (e: ChangeEvent<HTMLInputElement>) {
      setError({ status: false, msg: "" });
      setFormDetails({ ...formDetails, [field]: e.target.value });
    };
  }

  function handleFormSubmission() {
    /* validate form details */
    const { name, email, message } = formDetails;
    /* check if any field is blank */
    if (name.isEmpty() || email.isEmpty() || message.isEmpty()) {
      setError({ status: true, msg: "Oops! Looks like you forgot something" });
      return;
    }

    const nameValid = !name.isEmpty() && name.hasOnlyAlphabets();
    const emailValid = !email.isEmpty() && email.isValidEmail();
    const messageValid = true;

    if (nameValid && emailValid && messageValid) {
      console.log(formDetails);
      setLoading(true);
      // setTimeout(() => {
      //   setLoading(false);
      //   setSubmitted(true);
      // }, 1500);
      axios
        .post(POST_URL, formDetails)
        .then(() => {
          setLoading(false);
          setSubmitted(true);
        })
        .catch(() => console.log("something happened"));
    } else {
      setError({ status: true, msg: "Please recheck your enteries" });
    }
  }

  if (submitted) {
    return (
      <FlexCenter col bg="#ffffff" position="relative" customMobile={{ width: "85%" }}>
        {/* close icon  */}
        <Flex custom={{ cursor: "pointer", position: "absolute", top: "4%", right: "3%", width: "3%" }} customMobile={{ width: "6%", right: "5%", top: "6%" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "1" }}>
            <Image fill onClick={() => updateToggle!()} src="/images/actions/close.svg" alt="Close" style={{ objectFit: "contain", cursor: "pointer" }} />
          </div>
        </Flex>

        <Lottie animationData={CheckGreen} style={{ height: 300 }} loop={false} />
        <Paragraph as="h5" custom={{ backgroundColor: "#3ea36a", color: "white", textAlign: "center", width: "100%", padding: "15px 20px", boxSizing: "border-box" }}>
          We have received your query. Somebody from our team will get back to you in next 24 hours. Sit tight!
        </Paragraph>
      </FlexCenter>
    );
  }

  return (
    <FlexCenter position="relative" gap="1rem" onlyJustify col bg="white" width="55vw" customMobile={{ width: "90%", padding: "3% 4%" }} padding="2% 1% 0.5% 1%">
      {/* close icon  */}
      <Flex custom={{ cursor: "pointer", position: "absolute", top: "4%", right: "3%", width: "3%" }} customMobile={{ width: "6%", right: "5%", top: "6%" }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "1" }}>
          <Image fill onClick={() => updateToggle!()} src="/images/actions/close.svg" alt="Close" style={{ objectFit: "contain", cursor: "pointer" }} />
        </div>
      </Flex>

      {/* heading and square */}
      <Flex>
        {/* <Heading padding="20px" as="h3" fontSize="3rem" font="secondary"> */}

        <Heading padding="1.5rem" customMobile={{ padding: "5% 0 0 0", width: "85%", fontSize: "3.5rem", lineHeight: "3.5rem" }} fontSize="5.2rem" lineHeight="5.2rem" width="50%">
          Let&apos;s level up your brand together.
        </Heading>
      </Flex>

      <FlexCenter customMobile={{ flexDirection: "column" }} custom={{ marginTop: "2rem" }} width="100%" gap="1rem">
        {/* name */}
        <Input
          disabled={loading}
          custom={{ flexGrow: 1 }}
          onChange={handleInputChange("name")}
          value={formDetails.name}
          customMobile={{ width: "100%", padding: "1rem" }}
          placeholder="Your name"
        />
        {/* email */}
        <Input
          disabled={loading}
          custom={{ flexGrow: 1 }}
          onChange={handleInputChange("email")}
          value={formDetails.email}
          customMobile={{ width: "100%", padding: "1rem" }}
          placeholder="Your email"
        />
      </FlexCenter>

      {/* message */}
      <Input
        disabled={loading}
        custom={{ flexGrow: 1, width: "100%", height: "20rem" }}
        value={formDetails.message}
        customMobile={{ height: "13rem" }}
        placeholder="Write your message"
        as="textarea"
        onChange={handleInputChange("message")}
      />

      {/* send */}
      <Button
        disabled={loading}
        padding="0.5rem 5rem"
        onClick={handleFormSubmission}
        custom={{ width: "10vw", alignSelf: "flex-end" }}
        onlyBorder
        color="black"
        customMobile={{ width: "auto" }}
      >
        Send
      </Button>

      {/* error message */}
      {error.status && <Paragraph custom={{ backgroundColor: "#b53c3c", color: "white", textAlign: "center", width: "100%" }}> {error.msg} </Paragraph>}
    </FlexCenter>
  );
}
type ContactFormProps = {
  contactFormToggle: boolean;
  updateContactFormToggle: () => void;
};
export default function ContactForm({ contactFormToggle, updateContactFormToggle }: ContactFormProps) {
  return (
    <Modal toggle={contactFormToggle} updateToggle={updateContactFormToggle}>
      <ContactFormLayout />
    </Modal>
  );
}

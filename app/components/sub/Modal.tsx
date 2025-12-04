"use client";

import { FlexCenter } from "@/components/styled/flex.styled";
import { CSSValues } from "@/lib/styles/globalStyles";
import React, { JSXElementConstructor, ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";

/* full screen styles */
const fullScreenStyles = (options: Options | undefined): CSSValues => ({
  position: "fixed",
  top: "0",
  left: "0",
  width: " 100vw",
  height: "100vh",
  zIndex: "12",
  backgroundColor: options?.bg || "rgba(0,0,0,0.7)",
});

type Options = {
  bg?: string;
};

/* close icon styles */
const closeIconStyles: CSSValues = { cursor: "pointer", position: "absolute", top: "7%", right: "5%", width: "3%" };

type ModalProps = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  options?: Options;
  toggle: boolean;
  updateToggle: Function

};

const Modal: React.FC<ModalProps> = function({ children, toggle, updateToggle, options }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Create portal element if it doesn't exist
    if (!document.getElementById("portal")) {
      const portalDiv = document.createElement("div");
      portalDiv.id = "portal";
      document.body.appendChild(portalDiv);
    }
  }, []);

  const childrenWithSetToggle = React.cloneElement(children, { updateToggle });

  if (!mounted || toggle == false) {
    return <></>;
  }

  const portalElement = document.getElementById("portal");
  if (!portalElement) {
    return <></>;
  }

  return createPortal(
    <FlexCenter custom={fullScreenStyles(options)}>{childrenWithSetToggle}</FlexCenter>,
    portalElement
  );
}

export default Modal;

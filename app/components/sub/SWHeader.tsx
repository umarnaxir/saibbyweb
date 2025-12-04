import { Logo } from "@/components/styled/logo.styled";
import { Hamburger } from "@/components/styled/hamburger.styled";
import { Flex } from "@/components/styled/flex.styled";
import { CSSProperties } from "styled-components";

const SWHeaderStyles: CSSProperties = {
  width: "100%",
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: 3,
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};

/* sw header props */
type SWHeaderProps = {
  toggleMenu: Function
}

export default function SWHeader({toggleMenu}: SWHeaderProps) {
  return (
    <Flex
      className="sw-header"
      custom={{ ...SWHeaderStyles, width: "7%", backgroundColor: "black", borderBottom: "0px solid white", height: "100vh" }}
      customMobile={{ ...SWHeaderStyles, backgroundColor: "black", height: "20vw" }}
    >
      <Logo className="sw-logo" />
      {/* offcanvas menu */}
      <Hamburger className="sw-menu" toggleMenu={toggleMenu} />
    </Flex>
  );
}

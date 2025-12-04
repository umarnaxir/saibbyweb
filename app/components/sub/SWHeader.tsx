import { Logo } from "@/components/styled/logo.styled";
import { Hamburger } from "@/components/styled/hamburger.styled";
import { Flex } from "@/components/styled/flex.styled";

type SWHeaderProps = {
  toggleMenu: () => void;
}

export default function SWHeader({toggleMenu}: SWHeaderProps) {
  return (
    <Flex
      className="sw-header "
      custom={{ 
        width: "10%",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        overflow: "visible",
        backgroundColor: "black", 
        height: "100vh"
      }}
      customMobile={{ 
        width: "100%",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        overflow: "visible",
        border: "2px solid red",
        backgroundColor: "black", 
        height: "20vw" 
      }}
    >
      <Logo className="sw-logo "  />
      <Hamburger className="sw-menu " toggleMenu={toggleMenu} />
    </Flex>
  );
}

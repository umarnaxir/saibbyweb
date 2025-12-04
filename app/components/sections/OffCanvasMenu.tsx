"use client";

import { Flex } from "@/components/styled/flex.styled";
import { Heading, Paragraph } from "@/components/styled/text.styled";
import { CSSValues } from "@/lib/styles/globalStyles";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import styled from "styled-components";
import { MenuClose } from "@/components/styled/menuClose.styled";
const linksMap = { 
  Home: "/", 
  Services: "/#services", 
  Work: "/#work", 
  TechStack: "/#tech-stack" 
};

type OffCanvasMenuProps = {
  menuToggle: boolean;
  closeMenu: Function;
};

/* full screen styles */
const fullScreenStyles: CSSValues = {
  position: "fixed",
  top: "0",
  left: "0",
  width: " 100vw",
  height: "100vh",
  zIndex: "12",
};

const MenuItem = styled(Flex)`
  &:hover {
    border-right: 3px solid black;

    h2 {
      color: black;
      cursor: pointer;
    }
  }
`;

/* styled image */
const CloseImage = styled.img`
  cursor: pointer;
  position: absolute;
  top: 7%;
  right: 5%;
  width: 2%;

  @media (max-width: 768px) {
    width: 6%;
  }
`;

function MenuCloseButton({closeMenu}: { closeMenu: Function }) {
  return (
   <MenuClose onClick={() => closeMenu()}>
      <div>
        <span className="first"></span>
        <span className="second"></span>
      </div>
    </MenuClose>
  );
}

export default function OffCanvasMenu({ menuToggle, closeMenu }: OffCanvasMenuProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    closeMenu();
    
    // Extract route and hash from path
    const [route, hash] = path.split('#');
    
    // If there's a hash, handle navigation and scrolling
    if (hash) {
      // Navigate to the route if not already there
      if (pathname !== route) {
        router.push(route);
        // Wait for navigation to complete before scrolling
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        // Already on the page, just scroll to the section
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // No hash, just navigate
      router.push(path);
    }
  };

  return menuToggle == false ? (
    <></>
  ) : (
    // createPortal(
    <Flex custom={fullScreenStyles}>
      {/* close icon  */}
      {/* <CloseImage onClick={() => closeMenu()} src="/images/actions/close.svg" /> */}
      <MenuCloseButton closeMenu={closeMenu} />

      <Flex customMobile={{ width: "0%" }} width="50%" bg="black" height="100%"></Flex>

      <Flex customMobile={{ width: "100%" }} width="50%" height="100%" bg="white" col custom={{ borderRight: "2px solid black", padding: "15rem 3%" }}>
        {Object.entries(linksMap).map(([name, path], index) => (
          <MenuItem key={index} customMobile={{ borderRight: "none" }} custom={{ width: "80%", borderRight: "3px solid gray" }} style={{ padding: "2% 4%" }}>
            <div onClick={() => handleNavigation(path)} style={{ cursor: 'pointer' }}>
              <Heading as="h2" fontSize="4.5rem" color="gray">
                {name}
              </Heading>
            </div>
          </MenuItem>
        ))}

        <Paragraph style={{marginTop: "40px"}}>
          <i>
            {/* Excuse our digital dust as we spruce up our online space for an even better experience! Some buttons are still in the coding oven, so if not all are clickable just yet—thank you for your patience as we fine-tune for perfection. */}
            </i></Paragraph>
      </Flex>
    </Flex>
  );
}

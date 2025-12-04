"use client";

import { Flex } from "@/components/styled/flex.styled";
import { Heading, Paragraph } from "@/components/styled/text.styled";
import { CSSValues } from "@/lib/styles/globalStyles";
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
  closeMenu: () => void;
};

const fullScreenStyles: CSSValues = {
  position: "fixed",
  top: "0",
  left: "0",
  width: " 100vw",
  height: "100vh",
  zIndex: "1000",
};

const MenuItem = styled(Flex)`
  padding: 2% 4%;
  &:hover {
    border-right: 4px solid black;

    h2 {
      color: black;
      cursor: pointer;
    }
  }
`;

const MenuItemClickable = styled.div`
  cursor: pointer;
`;

const MenuParagraph = styled(Paragraph)`
  margin-top: 40px;
`;

function MenuCloseButton({ closeMenu }: { closeMenu: () => void }) {
  return (
    <MenuClose onClick={closeMenu}>
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
    
    const [route, hash] = path.split('#');
    
    if (hash) {
      if (pathname !== route) {
        router.push(route);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      router.push(path);
    }
  };

  return menuToggle == false ? (
    <></>
  ) : (
    <Flex custom={fullScreenStyles}>
      <MenuCloseButton closeMenu={closeMenu} />
      <Flex customMobile={{ width: "0%" }} width="50%" bg="black" height="100%"></Flex>
      <Flex customMobile={{ width: "100%" }} width="50%" height="100%" bg="white" col custom={{ borderRight: "2px solid black", padding: "15rem 3%" }}>
        {Object.entries(linksMap).map(([name, path], index) => (
          <MenuItem key={index} customMobile={{ borderRight: "none" }} custom={{ width: "80%", borderRight: "3px solid gray" }}>
            <MenuItemClickable onClick={() => handleNavigation(path)}>
              <Heading as="h2" fontSize="4.5rem" color="gray">
                {name}
              </Heading>
            </MenuItemClickable>
          </MenuItem>
        ))}
        <MenuParagraph>
          <i></i>
        </MenuParagraph>
      </Flex>
    </Flex>
  );
}

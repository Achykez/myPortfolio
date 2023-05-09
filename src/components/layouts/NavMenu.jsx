import { PaddingContainer, FlexContainer } from "../../styles/Global.styled";
import styled from "styled-components";
import { motion } from "framer-motion";
import { slideInLeft, slideInRight } from "../../utils/Variants";
import { AiOutlineClose } from "react-icons/ai";
import { navLinks } from "../../utils/Data";

const NavMenu = ({ setOpenMenu }) => {
  return (
    <NavMenuContainer
      as={motion.div}
      variants={slideInLeft}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <PaddingContainer left="5%" right="5%" top="2rem">
        <FlexContainer justify="flex-end" responsiveFlex>
          <MenuIcon onClick={() => setOpenMenu(false)}>
            <AiOutlineClose />
          </MenuIcon>
        </FlexContainer>
      </PaddingContainer>

      <PaddingContainer top="8%">
        <FlexContainer direction="column" align="center" responsiveFlex>
          {navLinks.map((links) => (
            <MenuItem
              key={links.id}
              href={`#${links.href}`}
              onClick={() => setOpenMenu(false)}>
              {links.name}
            </MenuItem>
          ))}
        </FlexContainer>
      </PaddingContainer>
    </NavMenuContainer>
  );
};

const NavMenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary_light};
  z-index: 1;
`;
const MenuIcon = styled.a`
  color: ${({ theme }) => theme.colors.nav};
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
`;

export const MenuItem = styled.a`
  color: #fff;
  font-size: 2.5rem;
  margin-top: 3rem;
  cursor: pointer;
  text-decoration: none;
   &:hover {
    color: ${({theme }) => theme.colors.nav}
   }
`;
export default NavMenu;

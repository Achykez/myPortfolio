import styled from "styled-components";
import { motion } from "framer-motion";

export const LoaderWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
`;

// export const MainBody = styled.div`
//   background-color: ${({ theme }) => theme.colors.primary};
// `;

// export const Container = styled.div`
//   width: 90%;
//   max-width: 1280px;
//   margin: auto;
// `;
export const PaddingContainer = styled.div`
  padding-top: ${({ top }) => top};
  padding-bottom: ${({ bottom }) => bottom};
  padding-left: ${({ left }) => left};
  padding-right: ${({ right }) => right};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: ${({ responsiveTop }) => responsiveTop};
    padding-bottom: ${({ responsiveBottom }) => responsiveBottom};
    padding-left: ${({ responsiveLeft }) => responsiveLeft};
    padding-right: ${({ responsiveRight }) => responsiveRight};
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  gap: ${({ gap }) => gap};
  flex-direction: ${({ direction }) => direction};

  & > div {
    flex: ${({ fullWidthChild }) => fullWidthChild && 1};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: ${({ responsiveFlex }) => responsiveFlex ? "flex" : "block"};
    flex-direction: ${({ responsiveDirection }) => responsiveDirection};
  }
`;

export const Heading = styled(PaddingContainer)`
  color: ${({ theme }) => theme.colors.text1};
  font-family: "Josefin Sans", sans-serif;

  text-align: ${({ align }) => align};
  font-size: ${({ size }) => {
    switch (size) {
      case "h1":
        return "4.5rem";

      case "h2":
        return "3rem";

      case "h3":
        return "2rem";

      case "h4":
        return "1.2rem";

      default:
        return;
    }
  }};

  @media(max-width: ${({theme}) => theme.breakpoints.mobile}){
    font-size: ${({ size }) => {
    switch (size) {
      case "h1":
        return "2.5rem";

      case "h2":
        return "2rem";

      case "h3":
        return "1.5rem";

      case "h4":
        return "1rem";

      default:
        return;
    }
  }};
  }
`;
export const BlueText = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;
export const ParaText = styled(PaddingContainer)`
  color: ${({ theme }) => theme.colors.para_text_color};
  line-height: 2rem;
`;
export const IconContainer = styled.div`
  font-size: ${({ size }) => size};
  cursor: pointer;
  color: ${({ color, theme }) => {
    switch (color) {
      case "white":
        return theme.colors.text1;

      case "blue":
        return theme.colors.secondary;

      default:
        return;
    }
  }};
`;
export const Button = styled.a`
  display: inline-block;
  width: max-content;
  padding: 1rem 2rem;
  color: ${({ theme }) => theme.colors.paranormal};
  background-color: ${({ theme }) => theme.colors.primary_light};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.paranormal};
    background-color: ${({ theme }) => theme.colors.nav};
  }
`;
export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text1};
  border: 1px solid ${(props) => props.theme.colors.button_normal};
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 16px;
  margin: 10px 10px;
  /* border: none; */
  cursor: pointer;
`;

export const DropdownContent = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  background-color: ${(props) => props.theme.colors.primary};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const DropdownItem = styled.button`
  color: ${(props) => props.theme.colors.text1};
  padding: 12px 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: ${(props) => props.theme.colors.button_hover};
  }
`;
export const Logo = styled.p`
 display:  flex;
 font-size: 1.7rem;
 font-weight: ${({theme}) => theme.fonts.weight.medium};
 color: #fff;
 font-family: ${({theme}) => theme.fonts.family};
`;

export const MenuIcon = styled.a`
  color: ${({theme}) => theme.colors.nav};
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
 

`
export const NavBar = styled.div`
  z-index: 999;
  align-items: center;
  gap: 10px;
  position: sticky;
  padding-left: 2rem  ;
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.tertiary};
  transition: all 0.3s ease-in;
  top: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.stick};
`;

export const MainBody = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
   position: relative;
  overflow: hidden;
`;

export const Container = styled.div`
  width: 90%;
  max-width: 1280px;
  margin: auto;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    padding: 0 20px;
  }
`;
export const SwitchContainer = styled.div`
   position: fixed;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: flex-end;
  background-color: ${({theme}) => theme.colors.button_hover};
  margin-top: 12px;
  margin-left: 8px;
  border-radius: 10px;
  padding: 10px;
  opacity: 0.3;
  transition: opacity 0.3s ease-in-out;
  z-index: 9999;
  cursor: move;
  left: 10;

  &:hover {
    opacity: 1;
  }
`;

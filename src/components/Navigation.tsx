"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { FiMenu, FiX } from "react-icons/fi";
import { LogoIcon } from "@/assets";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

// Conditionally add admin link in development
const getNavLinks = () => {
  const links = [...navLinks];
  if (process.env.NODE_ENV === "development") {
    links.push({ name: "Admin", href: "/admin" });
  }
  return links;
};

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ theme, $scrolled }) =>
    $scrolled ? `${theme.colors.bg}dd` : "transparent"};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(10px)" : "none")};
  transition: all 0.3s ease;
  border-bottom: ${({ theme, $scrolled }) =>
    $scrolled ? `1px solid ${theme.colors.border}` : "none"};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const DesktopNavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const NavLinkBase = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const NavLink = NavLinkBase;
const StyledNextLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 1001;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const MobileNavLinkBase = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  padding: 0.5rem 0;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const MobileNavLink = MobileNavLinkBase;

const StyledMobileNextLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  padding: 0.5rem 0;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Only prevent default for hash links (same page navigation)
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setMobileMenuOpen(false);
  };

  const links = getNavLinks();

  return (
    <>
      <Nav $scrolled={scrolled}>
        <NavContainer>
          <LogoWrapper onClick={handleHomeClick}>
            <LogoIcon width={70} height={70} />
          </LogoWrapper>

          <DesktopNavLinks>
            {links.map((link) => {
              // Use Next.js Link for admin, regular anchor for hash links
              if (link.href.startsWith("/")) {
                return (
                  <motion.div key={link.href} whileHover={{ y: -2 }}>
                    <StyledNextLink
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}>
                      {link.name}
                    </StyledNextLink>
                  </motion.div>
                );
              }
              return (
                <NavLink
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  whileHover={{ y: -2 }}>
                  {link.name}
                </NavLink>
              );
            })}
            <ThemeToggle />
          </DesktopNavLinks>

          <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}>
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
        </NavContainer>
      </Nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <MobileMenu
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <LogoWrapper
                  onClick={handleHomeClick}>
                  <LogoIcon width={50} height={50} />
                </LogoWrapper>
                <ThemeToggle />
              </div>
              <MobileNavLinks>
                {links.map((link, index) => {
                  // Use Next.js Link for admin, regular anchor for hash links
                  if (link.href.startsWith("/")) {
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}>
                        <StyledMobileNextLink
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href)}>
                          {link.name}
                        </StyledMobileNextLink>
                      </motion.div>
                    );
                  }
                  return (
                    <MobileNavLink
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}>
                      {link.name}
                    </MobileNavLink>
                  );
                })}
              </MobileNavLinks>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

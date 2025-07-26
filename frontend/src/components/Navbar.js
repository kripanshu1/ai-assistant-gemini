import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 2rem;
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: blur(10px);
  border-bottom: ${props => props.scrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'};
  z-index: 1000;
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.scrolled ? '#333' : 'white'};
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${props => props.scrolled ? '#333' : 'white'};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${props => props.scrolled ? '#333' : 'white'};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const linkVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <NavbarContainer
      scrolled={scrolled}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <NavContent>
        <Logo
          scrolled={scrolled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          AnimatedSite
        </Logo>
        
        <NavLinks>
          <NavLink 
            href="#home" 
            scrolled={scrolled}
            variants={linkVariants}
            whileHover="hover"
          >
            Home
          </NavLink>
          <NavLink 
            href="#features" 
            scrolled={scrolled}
            variants={linkVariants}
            whileHover="hover"
          >
            Features
          </NavLink>
          <NavLink 
            href="#testimonials" 
            scrolled={scrolled}
            variants={linkVariants}
            whileHover="hover"
          >
            Testimonials
          </NavLink>
          <NavLink 
            href="#contact" 
            scrolled={scrolled}
            variants={linkVariants}
            whileHover="hover"
          >
            Contact
          </NavLink>
        </NavLinks>
        
        <MobileMenuButton scrolled={scrolled}>
          ☰
        </MobileMenuButton>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;

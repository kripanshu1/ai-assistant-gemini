import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 3rem 0 1rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const FooterSection = styled(motion.div)``;

const FooterTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ecf0f1;
`;

const FooterText = styled.p`
  line-height: 1.6;
  color: #bdc3c7;
  margin-bottom: 1rem;
`;

const FooterLink = styled(motion.a)`
  display: block;
  color: #bdc3c7;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #3498db;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, #3498db, #2980b9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #34495e;
  padding-top: 2rem;
  text-align: center;
`;

const Copyright = styled(motion.p)`
  color: #bdc3c7;
  font-size: 0.9rem;
`;

const FooterLogo = styled(motion.div)`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #3498db, #2980b9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Newsletter = styled.div`
  margin-top: 1rem;
`;

const NewsletterInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  margin-bottom: 0.5rem;
  
  &::placeholder {
    color: #bdc3c7;
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const NewsletterButton = styled(motion.button)`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 25px;
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const socialVariants = {
    hover: {
      scale: 1.1,
      y: -3,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <FooterContainer>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FooterContent>
            <FooterSection variants={itemVariants}>
              <FooterLogo
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                AnimatedSite
              </FooterLogo>
              <FooterText>
                Creating beautiful, animated websites that captivate and engage your audience. 
                We bring your digital vision to life with cutting-edge technology and stunning design.
              </FooterText>
              <SocialLinks>
                <SocialLink
                  href="#"
                  variants={socialVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  📘
                </SocialLink>
                <SocialLink
                  href="#"
                  variants={socialVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  🐦
                </SocialLink>
                <SocialLink
                  href="#"
                  variants={socialVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  📷
                </SocialLink>
                <SocialLink
                  href="#"
                  variants={socialVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  💼
                </SocialLink>
              </SocialLinks>
            </FooterSection>

            <FooterSection variants={itemVariants}>
              <FooterTitle>Quick Links</FooterTitle>
              <FooterLink
                href="#home"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Home
              </FooterLink>
              <FooterLink
                href="#features"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Features
              </FooterLink>
              <FooterLink
                href="#testimonials"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Testimonials
              </FooterLink>
              <FooterLink
                href="#contact"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Contact
              </FooterLink>
            </FooterSection>

            <FooterSection variants={itemVariants}>
              <FooterTitle>Services</FooterTitle>
              <FooterLink
                href="#"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Web Design
              </FooterLink>
              <FooterLink
                href="#"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Animation
              </FooterLink>
              <FooterLink
                href="#"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Development
              </FooterLink>
              <FooterLink
                href="#"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Consulting
              </FooterLink>
            </FooterSection>

            <FooterSection variants={itemVariants}>
              <FooterTitle>Newsletter</FooterTitle>
              <FooterText>
                Subscribe to get updates on our latest projects and tutorials.
              </FooterText>
              <Newsletter>
                <NewsletterInput
                  type="email"
                  placeholder="Enter your email"
                />
                <NewsletterButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </NewsletterButton>
              </Newsletter>
            </FooterSection>
          </FooterContent>

          <FooterBottom>
            <Copyright variants={itemVariants}>
              © 2024 AnimatedSite. All rights reserved. Made with ❤️ and lots of animations.
            </Copyright>
          </FooterBottom>
        </motion.div>
      </Container>
    </FooterContainer>
  );
};

export default Footer;

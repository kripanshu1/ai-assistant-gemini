import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import styled from 'styled-components';
import axios from 'axios';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const TextContent = styled.div``;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  opacity: 0.8;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AnimationContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(10px);
`;

// Simple animation data (since we don't have access to actual Lottie files)
const simpleCircleAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 180,
  w: 400,
  h: 400,
  nm: "Simple Circle",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 1,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { 
          a: 1, 
          k: [
            { i: { x: 0.833, y: 0.833 }, o: { x: 0.167, y: 0.167 }, t: 0, s: 0 },
            { t: 179, s: 360 }
          ]
        },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0,
      sw: 400,
      sh: 400,
      sc: "#ffffff",
      ip: 0,
      op: 180,
      st: 0,
      bm: 0
    }
  ]
};

const HeroSection = () => {
  const [heroData, setHeroData] = useState({
    title: "Welcome to Our Animated Website",
    subtitle: "Experience smooth animations and beautiful design",
    description: "Built with modern libraries and cutting-edge animation technologies"
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hero');
        setHeroData(response.data);
      } catch (error) {
        console.log('Using default hero data');
      }
    };

    fetchHeroData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <HeroContainer id="home">
      <FloatingElements>
        <FloatingElement
          variants={floatingVariants}
          animate="animate"
          style={{ top: '20%', left: '10%' }}
        />
        <FloatingElement
          variants={floatingVariants}
          animate="animate"
          style={{ top: '60%', right: '15%' }}
        />
        <FloatingElement
          variants={floatingVariants}
          animate="animate"
          style={{ bottom: '20%', left: '20%' }}
        />
      </FloatingElements>

      <HeroContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <TextContent>
            <Title variants={itemVariants}>
              {heroData.title}
            </Title>
            <Subtitle variants={itemVariants}>
              {heroData.subtitle}
            </Subtitle>
            <Description variants={itemVariants}>
              {heroData.description}
            </Description>
            <ButtonGroup variants={itemVariants}>
              <motion.a
                href="#features"
                className="btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Features
              </motion.a>
              <motion.a
                href="#contact"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </ButtonGroup>
          </TextContent>
        </motion.div>

        <AnimationContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              width: '300px',
              height: '300px',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{
                width: '200px',
                height: '200px',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: '100px',
                  height: '100px',
                  background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                  borderRadius: '50%',
                  boxShadow: '0 0 30px rgba(255, 107, 107, 0.5)'
                }}
              />
            </motion.div>
          </motion.div>
        </AnimationContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;

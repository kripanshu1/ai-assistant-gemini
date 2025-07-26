import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import axios from 'axios';

const FeaturesContainer = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  color: #333;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled(motion.div)`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  display: inline-block;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
`;

const AnimatedBackground = styled(motion.div)`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  border-radius: 50%;
  z-index: -1;
`;

const FeaturesSection = () => {
  const [features, setFeatures] = useState([]);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/features');
        setFeatures(response.data);
      } catch (error) {
        // Default features if API is not available
        setFeatures([
          {
            id: 1,
            title: "Smooth Animations",
            description: "Framer Motion powered animations for seamless user experience",
            icon: "✨"
          },
          {
            id: 2,
            title: "Lottie Integration",
            description: "Beautiful Lottie animations for enhanced visual appeal",
            icon: "🎨"
          },
          {
            id: 3,
            title: "Responsive Design",
            description: "Perfectly optimized for all devices and screen sizes",
            icon: "📱"
          },
          {
            id: 4,
            title: "Modern Stack",
            description: "Built with React, Node.js, and the latest web technologies",
            icon: "🚀"
          }
        ]);
      }
    };

    fetchFeatures();
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const backgroundVariants = {
    hover: {
      scale: 1.2,
      rotate: 180,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <FeaturesContainer id="features" ref={ref}>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionTitle variants={itemVariants}>
            Amazing Features
          </SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            Discover what makes our website special with these incredible features
          </SectionSubtitle>
          
          <FeaturesGrid variants={containerVariants}>
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                variants={cardVariants}
                whileHover="hover"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
              >
                <AnimatedBackground
                  variants={backgroundVariants}
                />
                <FeatureIcon
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {feature.icon}
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </motion.div>
      </Container>
    </FeaturesContainer>
  );
};

export default FeaturesSection;

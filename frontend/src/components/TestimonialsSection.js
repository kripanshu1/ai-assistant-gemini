import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import axios from 'axios';

const TestimonialsContainer = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const TestimonialCarousel = styled.div`
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TestimonialCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const TestimonialText = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  font-style: italic;
  
  &:before {
    content: '"';
    font-size: 3rem;
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 1rem;
    left: 2rem;
  }
  
  &:after {
    content: '"';
    font-size: 3rem;
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    bottom: 1rem;
    right: 2rem;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const AuthorAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const AuthorInfo = styled.div`
  text-align: left;
`;

const AuthorName = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
`;

const AuthorRole = styled.p`
  opacity: 0.8;
  font-size: 0.9rem;
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.2rem;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const CarouselControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
`;

const CarouselButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  backdrop-filter: blur(10px);
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CarouselDots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Dot = styled(motion.button)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.4)'};
  cursor: pointer;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(10px);
`;

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/testimonials');
        setTestimonials(response.data);
      } catch (error) {
        // Default testimonials if API is not available
        setTestimonials([
          {
            id: 1,
            name: "John Doe",
            role: "Web Developer",
            message: "Amazing animations and smooth user experience!",
            rating: 5
          },
          {
            id: 2,
            name: "Jane Smith",
            role: "UI/UX Designer",
            message: "Beautiful design with perfect animation timing.",
            rating: 5
          },
          {
            id: 3,
            name: "Mike Johnson",
            role: "Product Manager",
            message: "This website sets a new standard for modern web design.",
            rating: 5
          }
        ]);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

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
    enter: {
      x: 300,
      opacity: 0,
      scale: 0.8
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      x: -300,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#FFD700' : 'rgba(255, 255, 255, 0.3)' }}>
        ★
      </span>
    ));
  };

  if (testimonials.length === 0) return null;

  return (
    <TestimonialsContainer id="testimonials" ref={ref}>
      <FloatingElement
        variants={floatingVariants}
        animate="animate"
        style={{ top: '10%', left: '5%' }}
      />
      <FloatingElement
        variants={floatingVariants}
        animate="animate"
        style={{ top: '70%', right: '10%' }}
      />
      
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionTitle variants={itemVariants}>
            What Our Clients Say
          </SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            Don't just take our word for it - hear from our satisfied clients
          </SectionSubtitle>
          
          <TestimonialCarousel>
            <AnimatePresence mode="wait">
              <TestimonialCard
                key={currentIndex}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Stars>
                  {renderStars(testimonials[currentIndex].rating)}
                </Stars>
                <TestimonialText>
                  {testimonials[currentIndex].message}
                </TestimonialText>
                <TestimonialAuthor>
                  <AuthorAvatar>
                    {testimonials[currentIndex].name.charAt(0)}
                  </AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>{testimonials[currentIndex].name}</AuthorName>
                    <AuthorRole>{testimonials[currentIndex].role}</AuthorRole>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            </AnimatePresence>
          </TestimonialCarousel>
          
          <CarouselControls>
            <CarouselButton
              onClick={prevTestimonial}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ←
            </CarouselButton>
            
            <CarouselDots>
              {testimonials.map((_, index) => (
                <Dot
                  key={index}
                  active={index === currentIndex}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </CarouselDots>
            
            <CarouselButton
              onClick={nextTestimonial}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              →
            </CarouselButton>
          </CarouselControls>
        </motion.div>
      </Container>
    </TestimonialsContainer>
  );
};

export default TestimonialsSection;

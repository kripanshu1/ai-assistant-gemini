import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import axios from 'axios';

const ContactContainer = styled.section`
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ContactForm = styled(motion.form)`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(45deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
    transform: translateX(10px);
  }
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
`;

const InfoText = styled.div``;

const InfoTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
`;

const InfoDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled(motion.textarea)`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  background: #f8f9fa;
  font-family: 'Inter', sans-serif;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(45deg, #00b894, #00cec9);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  margin-top: 1rem;
`;

const ErrorMessage = styled(motion.div)`
  background: linear-gradient(45deg, #e17055, #d63031);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  margin-top: 1rem;
`;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      setSubmitStatus({ type: 'success', message: response.data.message });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Sorry, there was an error sending your message. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const formVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const infoVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <ContactContainer id="contact" ref={ref}>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionTitle variants={itemVariants}>
            Get In Touch
          </SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            Ready to start your project? Let's discuss how we can help bring your vision to life
          </SectionSubtitle>
          
          <ContactContent>
            <ContactInfo
              variants={infoVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.h3
                style={{ fontSize: '1.8rem', marginBottom: '2rem', fontWeight: '600' }}
              >
                Let's Connect
              </motion.h3>
              
              <InfoItem
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <InfoIcon>📧</InfoIcon>
                <InfoText>
                  <InfoTitle>Email</InfoTitle>
                  <InfoDescription>hello@animatedsite.com</InfoDescription>
                </InfoText>
              </InfoItem>
              
              <InfoItem
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <InfoIcon>📱</InfoIcon>
                <InfoText>
                  <InfoTitle>Phone</InfoTitle>
                  <InfoDescription>+1 (555) 123-4567</InfoDescription>
                </InfoText>
              </InfoItem>
              
              <InfoItem
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <InfoIcon>📍</InfoIcon>
                <InfoText>
                  <InfoTitle>Address</InfoTitle>
                  <InfoDescription>123 Animation St, Web City, WC 12345</InfoDescription>
                </InfoText>
              </InfoItem>
              
              <InfoItem
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <InfoIcon>⏰</InfoIcon>
                <InfoText>
                  <InfoTitle>Hours</InfoTitle>
                  <InfoDescription>Mon - Fri: 9:00 AM - 6:00 PM</InfoDescription>
                </InfoText>
              </InfoItem>
            </ContactInfo>
            
            <ContactForm
              variants={formVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              onSubmit={handleSubmit}
            >
              <FormGroup variants={itemVariants}>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  variants={inputVariants}
                  whileFocus="focus"
                  placeholder="Your full name"
                />
              </FormGroup>
              
              <FormGroup variants={itemVariants}>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  variants={inputVariants}
                  whileFocus="focus"
                  placeholder="your@email.com"
                />
              </FormGroup>
              
              <FormGroup variants={itemVariants}>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  variants={inputVariants}
                  whileFocus="focus"
                  placeholder="Tell us about your project..."
                />
              </FormGroup>
              
              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </SubmitButton>
              
              {submitStatus && (
                submitStatus.type === 'success' ? (
                  <SuccessMessage
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {submitStatus.message}
                  </SuccessMessage>
                ) : (
                  <ErrorMessage
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {submitStatus.message}
                  </ErrorMessage>
                )
              )}
            </ContactForm>
          </ContactContent>
        </motion.div>
      </Container>
    </ContactContainer>
  );
};

export default ContactSection;

// src/components/Welcome.js
import React from 'react';
import { Button, Typography } from 'antd';
import { useSpring, animated } from '@react-spring/web';
import bg from '../images/bg.jpg'; // Replace with your image path

const { Title, Text } = Typography;

const Welcome = () => {
  // Animation effect for the background image using react-spring
  const backgroundAnimation = useSpring({
    from: { transform: 'scale(1.1)' },
    to: { transform: 'scale(1)' },
    config: { duration: 10000 },
    loop: { reverse: true },
  });

  return (
    <div style={welcomeSectionStyle} className="welcome-section">
      <animated.div style={{ ...backgroundAnimation, ...backgroundImageStyle }} className="background-image" />
      <div style={contentStyle}>
        <Title level={2} style={titleStyle}>Welcome to the Face Recognition Attendance System</Title>
        <Text style={descriptionStyle}>
          A seamless and secure solution to manage attendance with real-time face recognition.
        </Text>
        <div style={buttonContainerStyle}>
          <Button
            type="primary"
            size="large"
            style={buttonStyle}
            onClick={() => window.location.href = '/user'}
          >
            Go to User Dashboard
          </Button>
          <Button
            type="default"
            size="large"
            style={buttonStyle}
            onClick={() => window.location.href = '/admin-dashboard'}
          >
            Go to Admin Dashboard
          </Button>
        </div>
      </div>
      <style>{responsiveStyles}</style>
    </div>
  );
};

// Styles
const welcomeSectionStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  color: '#fff',
};

// Background image with animation
const backgroundImageStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'brightness(0.6)',
  zIndex: -1,
};

// Content styling with responsive adjustments
const contentStyle = {
  textAlign: 'center',
  maxWidth: '600px',
  padding: '40px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for readability
  borderRadius: '12px',
  zIndex: 1,
};

// Text style updates
const titleStyle = {
  fontSize: '2.5rem',
  color: '#FF7F50', // Gold color for a premium look
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
};

const descriptionStyle = {
  fontSize: '1.2rem',
  color: '#ADD8E6', // Vibrant orange color for description text
  marginBottom: '24px',
  fontStyle: 'italic',
  marginTop: '10px', // Spacing above the button
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  flexWrap: 'wrap', // Stack buttons on smaller screens
  marginTop: '20px', // Extra spacing before buttons
};

const buttonStyle = {
  width: '200px',
  height: '50px',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: '#1E90FF',
  borderRadius: '8px',
  border: 'none',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// Responsive media query to remove background image on mobile and set a light background color
const responsiveStyles = `
  @media (max-width: 768px) {
    .background-image {
      display: none;
    }
    .welcome-section {
      background: linear-gradient(135deg, #f0f4f8, #d9e2ec); /* Light gradient background */
    }
    .contentStyle {
      padding: 20px;
      max-width: 90%;
    }
    .titleStyle {
      fontSize: '2rem';
    }
    .buttonStyle {
      width: 150px;
      height: 45px;
    }
  }
`;

export default Welcome;

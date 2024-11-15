// src/components/Navbar.js
import React, { useState } from 'react';
import { Layout, Menu, Typography, Dropdown } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import logo from '../images/logo.png';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  // Dropdown menu items
  const profileMenu = (
    <Menu>
      <Menu.Item key="signIn" onClick={() => window.location.href = '/signin'}>
        Sign In
      </Menu.Item>
      <Menu.Item key="signUp" onClick={() => window.location.href = '/signup'}>
        Sign Up
      </Menu.Item>
    </Menu>
  );

  // Handle hamburger menu visibility
  const handleMenuClick = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <Header style={headerStyle}>
      {/* Logo and Title Section */}
      <div style={logoContainerStyle}>
        <img src={logo} alt="Logo" style={logoStyle} />
        <Title level={3} style={titleStyle}>Face Recognition Attendance</Title>
      </div>

      {/* Mobile Title */}
      <div style={mobileTitleStyle}>
        <Title level={4} style={{ margin: 0, color: '#FFD700' }}>Face Recognition Attendance</Title> {/* Vibrant color for mobile */}
      </div>

      {/* Hamburger Icon and Dropdown */}
      <div style={menuContainerStyle}>
        <MenuOutlined style={menuIconStyle} onClick={handleMenuClick} />
        {menuVisible && (
          <Menu theme="dark" mode="vertical" style={dropdownStyle}>
            <Menu.Item key="userDashboard" onClick={() => window.location.href = '/user-dashboard'}>
              User Dashboard
            </Menu.Item>
            <Menu.Item key="adminDashboard" onClick={() => window.location.href = '/admin-dashboard'}>
              Admin Dashboard
            </Menu.Item>
            <Menu.Divider />
            {profileMenu} {/* Sign In/Sign Up options */}
          </Menu>
        )}
      </div>
    </Header>
  );
};

// Styles
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#001529',
  padding: '0 16px',
  height: '64px',
  position: 'relative',
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const logoStyle = {
  height: '40px',
  borderRadius: '50%',
  marginRight: '16px',
};

const titleStyle = {
  color: '#FFD700', // Vibrant gold color for visibility
  margin: 0,
  display: 'block',
  fontSize: '20px',
  fontWeight: '600', // Increase font weight for emphasis
  display: 'none', // Hide on smaller screens
};

const mobileTitleStyle = {
  color: '#FFD700', // Gold color for mobile title
  display: 'none',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

const menuContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const menuIconStyle = {
  color: '#fff',
  fontSize: '24px',
  cursor: 'pointer',
};

const dropdownStyle = {
  position: 'absolute',
  right: '16px',
  top: '64px',
  zIndex: 1,
  backgroundColor: '#001529',
};

// Responsive adjustments
const responsiveStyles = `
  @media (min-width: 768px) {
    ${titleStyle.display = 'block'}; // Show title on larger screens
    ${mobileTitleStyle.display = 'none'}; // Hide mobile title
  }

  @media (max-width: 767px) {
    ${titleStyle.display = 'none'}; // Hide title on smaller screens
    ${mobileTitleStyle.display = 'flex'}; // Show mobile title
  }
`;

export default Navbar;

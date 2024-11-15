import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { AppstoreOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Profile', '1', <UserOutlined />, '/view-profile'), // Define the paths for navigation
  getItem('Summary', '2', <AppstoreOutlined />, '/summary'),
  getItem('Logout', '3', <PoweroffOutlined />, '/logout'),
];

const UserDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onClickMenuItem = ({ key }) => {
    if (key === '2') {
      console.log('Logout clicked');
      // Add your logout logic here
    }
    // Use navigate to go to the path for each menu item
    if (key === '1') {
      navigate('/view-profile'); // Navigate to Profile
    } else if (key === '2') {
      navigate('/summary'); // Navigate to Summary
    }
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={200}
        style={{
          background: '#001529', // Dark background for the sidebar
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={onClickMenuItem}
          theme="dark" // Use dark theme for the menu
          inlineCollapsed={collapsed}
        >
          {/* Dynamically generate Menu Items with links */}
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            backgroundColor: 'lightslategrey',
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            User Panel
          </div>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <div
            style={{
              marginBlockStart: 20,
              padding: 30,
              minHeight: 400,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* Content will change based on routing defined in App.js */}
            {/* This part will not have the Routes component here */}
            <p>Select a menu item to navigate</p>
          </div>
        </Content>
        <Footer
          style={{
            backgroundColor: 'gray',
            textAlign: 'center',
          }}
        >
          Face Recognition ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;

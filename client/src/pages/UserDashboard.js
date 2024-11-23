import React, { useEffect, useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { AppstoreOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem('Profile', '1', <UserOutlined />),
  getItem('Summary', '2', <AppstoreOutlined />),
  getItem('Logout', '3', <PoweroffOutlined />),
];

const UserDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Check login state on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token'); // Replace 'authToken' with your key for authentication
    if (!isLoggedIn) {
      navigate('/signin'); // Redirect to sign-in if not logged in
    }
  }, [navigate]);

  const onClickMenuItem = ({ key }) => {
    if (key === '1') {
      navigate('/profile'); // Navigate to Profile
    } else if (key === '2') {
      navigate('/summary'); // Navigate to Summary
    } else if (key === '3') {
      console.log('Logout clicked');
      localStorage.removeItem('token'); // Clear authentication token
      navigate('/signin'); // Redirect to sign-in after logout
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
          background: '#001529',
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={onClickMenuItem}
          theme="dark"
          inlineCollapsed={collapsed}
        >
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

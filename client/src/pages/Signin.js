import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', values);
  
      if (response.data.success) {
        alert('Signin successful!');
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/upload'); // Redirect to another page
      } else {
        alert(response.data.message); // Handle specific message
      }
    } catch (error) {
      console.error('Signin error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'An error occurred during signin.');
    }
  };
  

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
      <h2>Sign In</h2>
      <Form
        name="signin-form"
        onFinish={handleSubmit} // Pass handleSubmit as a reference
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signin;

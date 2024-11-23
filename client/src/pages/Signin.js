import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate ,Link} from 'react-router-dom';
import axios from '../utils/axios'; // Import the custom Axios instance

const Signin = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // Use the custom Axios instance for the API request
      const { data } = await axios.post('/auth/signin', values);

      // Save token and user data in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      message.success('Signin successful!');
      navigate('/upload'); // Navigate to Home page
    } catch (error) {
      message.error(error.response?.data?.message || 'Invalid credentials!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Signin</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Signin
          </Button>
        </Form.Item>
      </Form>
      <p style={{ textAlign: 'center' }}>
        Don’t have an account? <Link  to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Signin;

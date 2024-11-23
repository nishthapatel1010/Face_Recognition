import React, { useState } from 'react';
import { Form, Input, Button, message, Select, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const { Option } = Select;

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Use the custom Axios instance for the API request
      const { data } = await axios.post('/auth/signup', values);

      // Save token and user data in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      message.success('Signup successful!');
      navigate('/signin'); // Navigate to Signin page
    } catch (error) {
      message.error(error.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '50px auto',
        padding: '40px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        background: '#fff',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', fontSize: '24px' }}>
        Create an Account
      </h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ username: '', email: '', gender: 'Male', age: '', phone: '', password: '' }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select your gender!' }]}
        >
          <Select placeholder="Select your gender">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[
            { required: true, message: 'Please enter your age!' },
          ]}
        >
          <Input type="number" placeholder="Enter your age" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: 'Please enter your phone number!' },
            { pattern: /^\d{10}$/, message: 'Phone number must be 10 digits!' },
          ]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          label="Date of Joining"
          name="dateOfJoining"
          rules={[{ required: true, message: 'Please select your date of joining!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Signup
          </Button>
        </Form.Item>
      </Form>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Already have an account?{' '}
        <a onClick={() => navigate('/signin')} style={{ color: '#1890ff', cursor: 'pointer' }}>
          Signin
        </a>
      </p>
    </div>
  );
};

export default Signup;

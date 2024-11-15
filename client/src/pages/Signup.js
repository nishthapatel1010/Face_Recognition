import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, Typography, message as antdMessage, Card, Radio } from 'antd';

const { Title, Text } = Typography;

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        dateOfJoining: '',
        password: '',
        confirmPassword: '',  // Add confirmPassword to the state
        secretKey: '',
        role: 'user',
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRoleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            role: e.target.value,
            ...(e.target.value === 'user' && { secretKey: '' }),
        }));
    };

    const handleSubmit = async () => {
        setError(null);

        // Validation checks
        if (!formData.name) return setError("Name is required.");
        if (!formData.email) return setError("Email is required.");
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(formData.email)) return setError("Please enter a valid email address.");

        if (formData.role === 'user') {
            if (!formData.phone) return setError("Phone number is required.");
            const phonePattern = /^[0-9]{10}$/;
            if (!phonePattern.test(formData.phone)) return setError("Please enter a valid phone number (10 digits).");

            if (!formData.age) return setError("Age is required.");
            if (isNaN(formData.age) || formData.age <= 0) return setError("Please enter a valid age.");

            if (!formData.gender) return setError("Gender is required.");
            if (!formData.dateOfJoining) return setError("Date of Joining is required.");
        } else if (formData.role === 'admin') {
            if (!formData.secretKey) return setError("Secret key is required for Admin.");
            if (formData.secretKey !== "PQ30$11") {
                return setError("Invalid Admin.");
            }
        }

        if (!formData.password) return setError("Password is required.");
        if (formData.password !== formData.confirmPassword) return setError("Passwords do not match."); // Add this check

        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(formData.password)) {
            return setError("Password must be at least 8 characters long, include a number and a special character.");
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            antdMessage.success(response.data.message);

            // Navigate based on role
            if (formData.role === 'user') {
                navigate('/signin'); // Redirect to /signin page
            } else if (formData.role === 'admin') {
                navigate('/signin'); // Redirect to /signin page for admin
            }
        } catch (err) {
            setError(err.response?.data.message || "Signup failed. Please try again.");
        }
    };

    return (
        <div style={{ maxWidth: 450, margin: '0 auto', padding: '2rem' }}>
            <Card
                style={{
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                }}
            >
                <Title level={2} style={{ textAlign: 'center', color: '#333' }}>Signup</Title>

                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                    style={{ maxWidth: 400, margin: '0 auto' }}
                >
                    <Form.Item label="Role" required>
                        <Radio.Group onChange={handleRoleChange} value={formData.role}>
                            <Radio value="user">User</Radio>
                            <Radio value="admin">Admin</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {formData.role === 'admin' && (
                        <Form.Item label="Secret Key" required>
                            <Input
                                name="secretKey"
                                value={formData.secretKey}
                                onChange={handleChange}
                                placeholder="Enter secret key"
                                style={{
                                    borderRadius: '5px',
                                    border: '1px solid #ddd',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </Form.Item>
                    )}

                    <Form.Item label="Name" required>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </Form.Item>

                    <Form.Item label="Email" required>
                        <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </Form.Item>

                    {formData.role === 'user' && (
                        <>
                            <Form.Item label="Phone" required>
                                <Input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                />
                            </Form.Item>

                            <Form.Item label="Age" required>
                                <Input
                                    name="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="Enter your age"
                                />
                            </Form.Item>

                            <Form.Item label="Gender" required>
                                <Select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={(value) => setFormData({ ...formData, gender: value })}
                                    placeholder="Select your gender"
                                >
                                    <Select.Option value="male">Male</Select.Option>
                                    <Select.Option value="female">Female</Select.Option>
                                    <Select.Option value="other">Other</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Date of Joining" required>
                                <Input
                                    name="dateOfJoining"
                                    type="date"
                                    value={formData.dateOfJoining}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </>
                    )}

                    <Form.Item label="Password" required>
                        <Input.Password
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </Form.Item>

                    {/* Add Confirm Password field */}
                    <Form.Item label="Confirm Password" required>
                        <Input.Password
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>

                {error && <Text type="danger" style={{ textAlign: 'center', display: 'block' }}>{error}</Text>}
            </Card>
        </div>
    );
};

export default Signup;

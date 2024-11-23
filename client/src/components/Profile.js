// ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { Avatar, Button, Input, DatePicker, Form, Typography, Card, Space } from "antd";
import { UserOutlined, EditOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const { Title, Text } = Typography;

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [employeeId, setEmployeeId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const signedInEmail = "user@example.com";
  const signedInUsername = "John Doe";

  useEffect(() => {
    setEmployeeId(uuidv4());
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => setIsEditing(true);
  const handleSaveChanges = () => {
    form.validateFields().then(() => {
      setIsEditing(false);
    });
  };

  return (
    <div style={{ padding: "2rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card
        style={{
          maxWidth: 500,
          width: "100%",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Profile Image Section */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <Avatar
            size={120}
            src={profileImage}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#1890ff" }}
          />
          <div style={{ marginTop: "0.5rem" }}>
            <label htmlFor="upload-avatar" style={{ cursor: "pointer" }}>
              <Button icon={<UploadOutlined />} type="link">
                Change Picture
              </Button>
            </label>
            <input
              id="upload-avatar"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* User Details */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <Title level={4} style={{ marginBottom: 0 }}>
            {signedInUsername}
          </Title>
          <Text type="secondary">{signedInEmail}</Text>
        </div>

        {/* Editable Form Section */}
        {isEditing ? (
          <Form form={form} layout="vertical" style={{ padding: "0 1rem" }}>
            <Form.Item
              label="Name"
              name="name"
              initialValue={signedInUsername}
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              initialValue={signedInEmail}
              rules={[{ required: true, type: "email", message: "Invalid email" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Employee ID">
              <Input value={employeeId} disabled style={{ backgroundColor: "#f5f5f5" }} />
            </Form.Item>
            <Form.Item label="Date of Birth" name="dob">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSaveChanges}
                block
                style={{ marginTop: "1rem" }}
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div style={{ padding: "0 1rem" }}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEditProfile}
              block
              style={{ marginTop: "1rem" }}
            >
              Edit Profile
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;

import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Alert, Space } from 'antd';
import { LockOutlined, MailOutlined, SafetyCertificateOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Title, Text, Paragraph } = Typography;

export default function AdminLoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    setLoading(true);
    setErrorMessage('');
    try {
      await login(values.email, values.password);
      navigate('/admin');
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0E2A47 0%, #1B4F72 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: 440,
          borderRadius: 16,
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
        }}
        bodyStyle={{ padding: 40 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <SafetyCertificateOutlined style={{ fontSize: 48, color: '#E67E22', marginBottom: 12 }} />
          <Title level={2} style={{ color: '#1B4F72', margin: 0 }}>
            KESCA Admin Portal
          </Title>
          <Text type="secondary" style={{ fontSize: 14 }}>
            Sign in to manage directory, courses, and inquiries
          </Text>
        </div>

        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: 20, borderRadius: 8 }}
          />
        )}

        <Form form={form} layout="vertical" onFinish={handleFinish} size="large">
          <Form.Item
            name="email"
            label="Admin Email"
            rules={[{ required: true, type: 'email', message: 'Please enter your email' }]}
          >
            <Input prefix={<MailOutlined style={{ color: '#aaa' }} />} placeholder="admin@kesca.org" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password prefix={<LockOutlined style={{ color: '#aaa' }} />} placeholder="••••••••" />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                background: '#1B4F72',
                borderColor: '#1B4F72',
                height: 48,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Sign In to Dashboard
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 16, borderTop: '1px solid #eee', paddingTop: 16 }}>
          <Link to="/" style={{ color: '#666', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <ArrowLeftOutlined /> Back to KESCA Public Website
          </Link>
        </div>
      </Card>
    </div>
  );
}

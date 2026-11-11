import React, { useState } from 'react';
import { Layout, Menu, Typography, Card, Tabs, Table, Tag, Button, Space, Result } from 'antd';
import {
  DashboardOutlined,
  ShopOutlined,
  BookOutlined,
  CalendarOutlined,
  CameraOutlined,
  MailOutlined,
  LogoutOutlined,
  HomeOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Header, Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inquiries');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const sampleInquiries = [
    {
      key: '1',
      date: '2026-11-10',
      name: 'Michael Chang',
      email: 'mchang@goldenwok.ca',
      business: 'Golden Wok Bistro',
      message: 'Need advice on municipal fire citation regarding exhaust fan hinge kit requirement.',
      status: 'new',
    },
    {
      key: '2',
      date: '2026-11-08',
      name: 'Sarah Tremblay',
      email: 'sarah@lavalgrill.qc.ca',
      business: 'Laval Smokehouse',
      message: 'Requesting syllabus for Supervisor Level 2 certification course.',
      status: 'answered',
    },
    {
      key: '3',
      date: '2026-11-05',
      name: 'David Miller',
      email: 'dmiller@hamiltonburgers.ca',
      business: 'The Burger Loft',
      message: 'How do I verify if my current contractor is using certified bare-metal techniques?',
      status: 'new',
    },
  ];

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date', width: 110 },
    { title: 'Contact', dataIndex: 'name', key: 'name', width: 150 },
    { title: 'Business', dataIndex: 'business', key: 'business', width: 180 },
    { title: 'Email', dataIndex: 'email', key: 'email', width: 200 },
    { title: 'Inquiry', dataIndex: 'message', key: 'message' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === 'new' ? 'orange' : 'green'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#1B4F72',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Space size={12}>
          <SafetyCertificateOutlined style={{ color: '#E67E22', fontSize: 24 }} />
          <Title level={4} style={{ color: '#fff', margin: 0 }}>
            KESCA Administration Panel
          </Title>
        </Space>
        <Space size={16}>
          <Link to="/">
            <Button icon={<HomeOutlined />} ghost>
              View Public Website
            </Button>
          </Link>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </Space>
      </Header>

      <Content style={{ padding: 32, background: '#F4F6F9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}>
            <Title level={2} style={{ color: '#1B4F72', margin: 0 }}>
              Administration Dashboard
            </Title>
            <Text type="secondary">
              Managing standards compliance, directory listings, inquiries, and certifications.
            </Text>
          </div>

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            type="card"
            size="large"
            items={[
              {
                key: 'inquiries',
                label: (
                  <span>
                    <MailOutlined /> Customer Inquiries ({sampleInquiries.filter((i) => i.status === 'new').length} New)
                  </span>
                ),
                children: (
                  <Card style={{ borderRadius: 8 }}>
                    <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                      <Title level={4} style={{ margin: 0, color: '#1B4F72' }}>
                        Customer Inquiry Board
                      </Title>
                      <Tag color="#1B4F72">Auto-synced with /api/inquiries</Tag>
                    </div>
                    <Table
                      dataSource={sampleInquiries}
                      columns={columns}
                      pagination={{ pageSize: 5 }}
                    />
                  </Card>
                ),
              },
              {
                key: 'directory',
                label: (
                  <span>
                    <ShopOutlined /> Certified Directory
                  </span>
                ),
                children: (
                  <Card style={{ borderRadius: 8 }}>
                    <Result
                      status="info"
                      title="Directory Management (Phase 5)"
                      subTitle="Directory CRUD operations (adding/editing contractor certifications and GPS coordinates) are scheduled for Phase 5. The public directory is populated with seed data."
                      extra={[
                        <Link to="/find-a-pro" key="view">
                          <Button type="primary" style={{ background: '#1B4F72' }}>
                            View Public Directory
                          </Button>
                        </Link>,
                      ]}
                    />
                  </Card>
                ),
              },
              {
                key: 'courses',
                label: (
                  <span>
                    <BookOutlined /> Courses &amp; Education
                  </span>
                ),
                children: (
                  <Card style={{ borderRadius: 8 }}>
                    <Result
                      status="info"
                      title="Course Administration (Phase 5)"
                      subTitle="Course curriculum management, enrollment auditing, and free owner course registrations are scheduled for Phase 5."
                      extra={[
                        <Link to="/education" key="edu">
                          <Button type="primary" style={{ background: '#1B4F72' }}>
                            View Course Offerings
                          </Button>
                        </Link>,
                      ]}
                    />
                  </Card>
                ),
              },
              {
                key: 'gallery',
                label: (
                  <span>
                    <CameraOutlined /> Photo Audits &amp; Gallery
                  </span>
                ),
                children: (
                  <Card style={{ borderRadius: 8 }}>
                    <Result
                      status="info"
                      title="Before/After Photo Uploads (Phase 4 &amp; 5)"
                      subTitle="Admin photo uploads with GPS extraction and KML layer compilation will be wired in Phase 4."
                      extra={[
                        <Link to="/gallery" key="gal">
                          <Button type="primary" style={{ background: '#1B4F72' }}>
                            View Public Photo Gallery
                          </Button>
                        </Link>,
                      ]}
                    />
                  </Card>
                ),
              },
            ]}
          />
        </div>
      </Content>
    </Layout>
  );
}

import React, { useState } from 'react';
import { Row, Col, Typography, Card, Form, Input, Button, Result, Tag, Space, Divider, message } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SendOutlined,
  GlobalOutlined,
  LinkOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { submitInquiry } from '../../api/inquiries';
import SectionTitle from '../../components/common/SectionTitle';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

// Meeting Decision #17 & #18: Official partner links
const officialLinks = [
  {
    name: 'Air Advocates',
    role: 'Parent Volunteer Organization & Environmental Health Initiative',
    url: 'https://www.airadvocates.net',
    contact: 'Rob Sweet, Director',
    iconColor: '#1B4F72',
  },
  {
    name: 'Friendly Green Giant',
    role: 'Eco-Friendly Kitchen Degreasing & Ventilation Solutions',
    url: 'https://www.friendlygreengiant.ca',
    iconColor: '#27AE60',
  },
  {
    name: 'Slumlord Patrol',
    role: 'Tenant Safety, Multi-Residential Dryer Exhaust & Mould Prevention',
    url: 'https://www.slumlordpatrol.com',
    iconColor: '#E67E22',
  },
  {
    name: 'Strongpoint Adventures',
    role: 'Outdoor, Safety & Facility Leadership Programs',
    url: 'https://www.strongpointadventures.com',
    iconColor: '#2980B9',
  },
  {
    name: 'Air-Medics',
    role: 'Commercial Air Quality & Ventilation Diagnostics',
    url: 'https://air-medics.ca',
    iconColor: '#8E44AD',
  },
];

export default function ContactPage() {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await submitInquiry({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: `[Contact Form Message]: ${values.message}`,
      });
      setSubmitted(true);
      form.resetFields();
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Banner */}
      <div style={{ background: '#1B4F72', color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <div className="container">
          <Tag color="#E67E22" style={{ marginBottom: 12, fontSize: 14, padding: '2px 10px' }}>
            Get in Touch
          </Tag>
          <Title level={1} style={{ color: '#fff', marginBottom: 16 }}>
            Contact KESCA &amp; Leadership
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 800, margin: '0 auto' }}>
            Have questions about joining the association, technician certification, or technical standards?
            We are here to assist.
          </Paragraph>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <Row gutter={[48, 48]}>
            {/* Contact Form */}
            <Col xs={24} lg={14}>
              <Card
                style={{ borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                bodyStyle={{ padding: 32 }}
              >
                {submitted ? (
                  <Result
                    status="success"
                    title="Message Sent Successfully"
                    subTitle="Thank you for contacting KESCA. Rob Sweet or a volunteer coordinator will follow up with you within a few business days."
                    extra={[
                      <Button
                        type="primary"
                        key="reset"
                        onClick={() => setSubmitted(false)}
                        style={{ background: '#1B4F72', borderColor: '#1B4F72' }}
                      >
                        Send Another Note
                      </Button>,
                    ]}
                  />
                ) : (
                  <div>
                    <Title level={3} style={{ color: '#1B4F72', marginTop: 0, marginBottom: 8 }}>
                      Send Us a Direct Message
                    </Title>
                    <Paragraph style={{ color: '#666', fontSize: 15, marginBottom: 24 }}>
                      Fill out the form below. We respond promptly to all commercial kitchen and ventilation inquiries.
                    </Paragraph>
                    <Form form={form} layout="vertical" onFinish={handleSubmit} size="large">
                      <Row gutter={16}>
                        <Col xs={24} sm={12}>
                          <Form.Item name="name" label="Your Name" rules={[{ required: true, message: 'Please enter your name' }]}>
                            <Input placeholder="John Doe" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Please enter your email' }]}>
                            <Input placeholder="john@example.com" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item name="phone" label="Phone Number (optional)">
                        <Input placeholder="(416) 555-0199" />
                      </Form.Item>
                      <Form.Item name="message" label="Message" rules={[{ required: true, message: 'Please enter your message' }]}>
                        <TextArea rows={5} placeholder="How can KESCA help your organization or business?..." />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={submitting}
                          block
                          style={{
                            background: '#E67E22',
                            borderColor: '#E67E22',
                            height: 48,
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                          icon={<SendOutlined />}
                        >
                          Send Message
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                )}
              </Card>

              {/* Volunteer Note */}
              <div
                style={{
                  marginTop: 24,
                  padding: 20,
                  background: '#FFF8EE',
                  border: '1px solid #FFE4C4',
                  borderRadius: 8,
                }}
              >
                <Text strong style={{ color: '#1B4F72', display: 'block', marginBottom: 4 }}>
                  Volunteer Organization Notice
                </Text>
                <Text style={{ color: '#666', fontSize: 14 }}>
                  KESCA is a volunteer-led initiative sponsored by <strong>Air Advocates</strong>. Rob Sweet and our technical committee review incoming correspondence in the order received. We appreciate your patience!
                </Text>
              </div>
            </Col>

            {/* Right: Contact Information & Official Network Links (Meeting Decision #17 & #18) */}
            <Col xs={24} lg={10}>
              <Card
                style={{
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #1B4F72 0%, #2C3E50 100%)',
                  color: '#fff',
                  marginBottom: 24,
                }}
                bodyStyle={{ padding: 28 }}
                bordered={false}
              >
                <Title level={4} style={{ color: '#fff', marginTop: 0, marginBottom: 16 }}>
                  Direct Association Contact
                </Title>
                <Space orientation="vertical" size={16} style={{ width: '100%' }}>
                  <div>
                    <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, display: 'block' }}>
                      Contact Lead
                    </Text>
                    <Text strong style={{ color: '#fff', fontSize: 16 }}>
                      Rob Sweet
                    </Text>
                    <Text style={{ color: '#E67E22', fontSize: 14, display: 'block' }}>
                      Air Advocates
                    </Text>
                  </div>
                  <div>
                    <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, display: 'block' }}>
                      Official Email
                    </Text>
                    <a href="mailto:info@airadvocates.net" style={{ color: '#E67E22', fontSize: 16 }}>
                      <MailOutlined style={{ marginRight: 8 }} />
                      info@airadvocates.net
                    </a>
                  </div>
                  <div>
                    <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, display: 'block' }}>
                      Location &amp; Jurisdiction
                    </Text>
                    <Text style={{ color: '#fff', fontSize: 15 }}>
                      <EnvironmentOutlined style={{ marginRight: 8 }} />
                      Ontario &amp; National Canada Jurisdiction
                    </Text>
                  </div>
                </Space>
              </Card>

              {/* Official Websites Sidebar (Meeting Decision #18) */}
              <Card style={{ borderRadius: 12 }} bodyStyle={{ padding: 24 }}>
                <Title level={4} style={{ color: '#1B4F72', marginTop: 0, marginBottom: 8 }}>
                  <LinkOutlined style={{ marginRight: 8, color: '#E67E22' }} />
                  Affiliated Initiatives &amp; Partners
                </Title>
                <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 16 }}>
                  Official partner network websites (Strongpoint &amp; Air Advocates Network):
                </Text>
                <Space direction="vertical" size={12} style={{ width: '100%' }}>
                  {officialLinks.map((link, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 8,
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text strong style={{ color: '#1B4F72', fontSize: 15 }}>
                          {link.name}
                        </Text>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <Button size="small" type="link" icon={<GlobalOutlined />}>
                            Visit
                          </Button>
                        </a>
                      </div>
                      <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 2 }}>
                        {link.role}
                      </Text>
                    </div>
                  ))}
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
}

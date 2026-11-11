import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  Form,
  Input,
  Typography,
  Space,
  message,
  List,
  Tag,
} from 'antd';
import {
  FireOutlined,
  SafetyCertificateOutlined,
  DollarCircleOutlined,
  BookOutlined,
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getEvents } from '../../api/events';
import { getMapPins } from '../../api/businesses';
import { submitInquiry } from '../../api/inquiries';
import SectionTitle from '../../components/common/SectionTitle';
import './HomePage.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// Lazy-load the map to avoid SSR/hydration issues
const MapView = React.lazy(() => import('../../components/common/MapView'));

const whyKescaFeatures = [
  {
    icon: <FireOutlined style={{ fontSize: 40, color: '#E67E22' }} />,
    title: 'Fire Prevention',
    description:
      'Grease buildup in kitchen exhaust ducts is a leading cause of commercial kitchen fires. KESCA enforces the preventative maintenance code to eliminate this risk before it becomes a catastrophe.',
  },
  {
    icon: <SafetyCertificateOutlined style={{ fontSize: 40, color: '#1B4F72' }} />,
    title: 'Food Safety',
    description:
      'Clean exhaust and ventilation systems prevent cross-contamination, control odours, and ensure your kitchen meets health inspection standards. KESCA certified = inspector ready.',
  },
  {
    icon: <DollarCircleOutlined style={{ fontSize: 40, color: '#27AE60' }} />,
    title: 'Economic Savings',
    description:
      'Regular cleaning saves on electricity, extends equipment life, reduces repair costs, and dramatically lowers liability risk. KESCA maintenance pays for itself many times over.',
  },
];

const differentiators = [
  'Enforces the preventative maintenance code — not just membership',
  'Before/After photo documentation proving work was completed',
  'Licensed technicians, supervisors, and inspectors at three levels',
  'Covers kitchen exhaust, refrigeration, grease traps, dryer & bathroom exhaust, and supply air systems',
  'Consumer demand: uncertified restaurants get left behind',
  'Government recognition follows industry-led standards',
];

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [pins, setPins] = useState([]);
  const [contactForm] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getEvents()
      .then((data) => setEvents((data || []).slice(0, 3)))
      .catch(() => {});
    getMapPins()
      .then((data) => setPins(data || []))
      .catch(() => {});
  }, []);

  async function handleContactSubmit(values) {
    setSubmitting(true);
    try {
      await submitInquiry(values);
      setSubmitted(true);
      contactForm.resetFields();
      message.success('Message sent! We will get back to you shortly.');
    } catch {
      message.error('Could not send message. Please email info@airadvocates.net directly.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* ===================== 1. VIDEO HERO ===================== */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <Tag color="#E67E22" style={{ marginBottom: 16, fontSize: 13 }}>
              Coming Soon
            </Tag>
            <Title
              level={1}
              style={{ color: '#fff', maxWidth: 760, margin: '0 auto 16px', fontSize: 'clamp(28px, 5vw, 52px)' }}
            >
              The Dangers of Not Ventilating Your Kitchen
            </Title>
            <Paragraph
              style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 600, margin: '0 auto 32px' }}
            >
              A short documentary about fire hazards, health risks, and the economic cost of neglecting
              kitchen exhaust cleaning — and how KESCA certified professionals solve it.
            </Paragraph>
            <Space size={16} wrap style={{ justifyContent: 'center' }}>
              <Link to="/certification">
                <Button
                  type="primary"
                  size="large"
                  style={{ background: '#E67E22', borderColor: '#E67E22', fontSize: 16, padding: '0 32px', height: 48 }}
                >
                  Get Certified
                </Button>
              </Link>
              <Link to="/find-a-pro">
                <Button
                  size="large"
                  style={{ background: 'transparent', borderColor: '#fff', color: '#fff', fontSize: 16, padding: '0 32px', height: 48 }}
                >
                  Find Certified Companies
                </Button>
              </Link>
            </Space>

            {/* Storyboard breakdown */}
            <div className="storyboard">
              <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, display: 'block', marginBottom: 12 }}>
                VIDEO STORYBOARD (~90 seconds)
              </Text>
              <div className="storyboard-scenes">
                {[
                  { time: '0–15s', desc: 'Busy restaurant kitchen — steam, smoke, grease buildup in ducts' },
                  { time: '15–30s', desc: 'Close-up of grease buildup — fire hazard highlighted' },
                  { time: '30–50s', desc: 'KESCA certified technician doing Before/After cleaning' },
                  { time: '50–75s', desc: 'Health inspector and restaurant owner reviewing KESCA certificate' },
                  { time: '75–90s', desc: 'Clean, safe kitchen — KESCA logo + "Get Certified Today" CTA' },
                ].map((scene, i) => (
                  <div key={i} className="storyboard-scene">
                    <Tag color="rgba(255,255,255,0.15)" style={{ color: '#E67E22', border: 'none', marginBottom: 4 }}>
                      {scene.time}
                    </Tag>
                    <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>
                      {scene.desc}
                    </Text>
                  </div>
                ))}
              </div>
              <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 12, display: 'block' }}>
                * Final video to be provided by Rob Sweet
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 2. WHY KESCA ===================== */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title="Why KESCA?"
            subtitle="The preventative maintenance code exists for a reason. KESCA enforces it."
          />
          <Row gutter={[32, 32]}>
            {whyKescaFeatures.map((f) => (
              <Col xs={24} sm={8} key={f.title}>
                <Card
                  className="feature-card"
                  bordered={false}
                  style={{ textAlign: 'center', height: '100%', background: '#F4F6F9', borderRadius: 10 }}
                >
                  <div style={{ marginBottom: 20 }}>{f.icon}</div>
                  <Title level={4} style={{ color: '#1B4F72' }}>
                    {f.title}
                  </Title>
                  <Paragraph style={{ color: '#555', fontSize: 15 }}>{f.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* ===================== 3. EDUCATION & CERTIFICATION ===================== */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            title="Education &amp; Certification"
            subtitle="From free owner orientation to full inspector certification — KESCA has a path for everyone."
          />
          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} sm={12} md={10}>
              <Card
                hoverable
                style={{ borderRadius: 10, borderTop: '4px solid #E67E22', height: '100%' }}
              >
                <Space direction="vertical" size={12}>
                  <BookOutlined style={{ fontSize: 36, color: '#E67E22' }} />
                  <Title level={4} style={{ margin: 0, color: '#1B4F72' }}>
                    Free Owner Orientation
                  </Title>
                  <Paragraph style={{ color: '#555', fontSize: 15 }}>
                    Restaurant and commercial kitchen owners get a free course explaining what the
                    preventative maintenance code requires, what certified cleaning looks like, and
                    how to verify your contractor's credentials.
                  </Paragraph>
                  <Link to="/education">
                    <Button type="primary" icon={<ArrowRightOutlined />}>
                      Start Free Course
                    </Button>
                  </Link>
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={10}>
              <Card
                hoverable
                style={{ borderRadius: 10, borderTop: '4px solid #1B4F72', height: '100%' }}
              >
                <Space direction="vertical" size={12}>
                  <SafetyCertificateOutlined style={{ fontSize: 36, color: '#1B4F72' }} />
                  <Title level={4} style={{ margin: 0, color: '#1B4F72' }}>
                    Get KESCA Certified
                  </Title>
                  <Paragraph style={{ color: '#555', fontSize: 15 }}>
                    Technician, Supervisor, and Inspector levels. Take the course, pass the exam,
                    submit Before/After photo documentation, and receive your official KESCA certificate.
                  </Paragraph>
                  <Link to="/certification">
                    <Button style={{ background: '#1B4F72', borderColor: '#1B4F72', color: '#fff' }} icon={<ArrowRightOutlined />}>
                      View Certification Paths
                    </Button>
                  </Link>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* ===================== 4. FIND A PRO ===================== */}
      <section className="section">
        <div className="container">
          <Row gutter={[48, 32]} align="middle">
            <Col xs={24} md={10}>
              <SectionTitle
                title="Find Certified Companies"
                subtitle="Search Canada's directory of KESCA certified kitchen exhaust cleaning professionals."
                align="left"
                style={{ marginBottom: 24 }}
              />
              <Paragraph style={{ fontSize: 16, color: '#555', marginBottom: 24 }}>
                Only hire contractors who meet the standard. KESCA certified companies submit
                Before/After photos proving their work — not just a membership card.
              </Paragraph>
              <Link to="/find-a-pro">
                <Button
                  type="primary"
                  size="large"
                  style={{
                    background: '#E67E22',
                    borderColor: '#E67E22',
                    fontSize: 17,
                    padding: '0 36px',
                    height: 52,
                    fontWeight: 700,
                  }}
                  icon={<ArrowRightOutlined />}
                >
                  Find a Certified Pro Near You
                </Button>
              </Link>
            </Col>
            <Col xs={24} md={14}>
              <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #eee', minHeight: 320 }}>
                <React.Suspense fallback={<div style={{ height: 320, background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading map…</div>}>
                  <MapView
                    pins={pins}
                    center={[56.1304, -106.3468]}
                    zoom={3}
                    height="320px"
                  />
                </React.Suspense>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* ===================== 5. UPCOMING EVENTS ===================== */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            title="Upcoming Events"
            subtitle="Training sessions, industry meetings, and certification workshops."
          />
          {events.length > 0 ? (
            <List
              dataSource={events}
              renderItem={(event) => (
                <List.Item
                  style={{ background: '#fff', marginBottom: 12, borderRadius: 8, padding: '16px 24px' }}
                  extra={
                    event.url ? (
                      <a href={event.url} target="_blank" rel="noopener noreferrer">
                        <Button type="link" icon={<ArrowRightOutlined />}>Details</Button>
                      </a>
                    ) : null
                  }
                >
                  <List.Item.Meta
                    avatar={<CalendarOutlined style={{ fontSize: 28, color: '#1B4F72' }} />}
                    title={<span style={{ fontSize: 16, color: '#1B4F72', fontWeight: 600 }}>{event.title}</span>}
                    description={
                      <Space size={16}>
                        {event.date && (
                          <Text type="secondary">
                            {new Date(event.date).toLocaleDateString('en-CA', {
                              year: 'numeric', month: 'long', day: 'numeric',
                            })}
                          </Text>
                        )}
                        {event.location && <Text type="secondary">{event.location}</Text>}
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <CalendarOutlined style={{ fontSize: 48, color: '#ccc', display: 'block', marginBottom: 12 }} />
              <Text type="secondary" style={{ fontSize: 15 }}>
                No upcoming events yet — check back soon.
              </Text>
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link to="/events">
              <Button type="link" icon={<ArrowRightOutlined />} style={{ fontSize: 15 }}>
                View all events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== 6. WHY KESCA IS DIFFERENT ===================== */}
      <section className="section">
        <div className="container">
          <Row gutter={[48, 32]} align="middle">
            <Col xs={24} md={12}>
              <SectionTitle
                title="How KESCA is Different"
                subtitle="Most associations hand out membership cards. KESCA enforces a standard."
                align="left"
                style={{ marginBottom: 24 }}
              />
              <List
                dataSource={differentiators}
                renderItem={(item) => (
                  <List.Item style={{ padding: '8px 0', border: 'none' }}>
                    <Space>
                      <CheckCircleOutlined style={{ color: '#27AE60', fontSize: 18 }} />
                      <Text style={{ fontSize: 15 }}>{item}</Text>
                    </Space>
                  </List.Item>
                )}
              />
              <div style={{ marginTop: 24 }}>
                <Link to="/standards">
                  <Button type="link" icon={<ArrowRightOutlined />} style={{ fontSize: 15, padding: 0 }}>
                    Read the KESCA Standards
                  </Button>
                </Link>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Card
                style={{
                  background: '#1B4F72',
                  borderRadius: 12,
                  color: '#fff',
                  textAlign: 'center',
                }}
                bordered={false}
              >
                <UserOutlined style={{ fontSize: 56, color: 'rgba(255,255,255,0.3)', display: 'block', margin: '0 auto 16px' }} />
                <Title level={3} style={{ color: '#fff', margin: '0 0 12px' }}>
                  Rob Sweet
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, display: 'block', marginBottom: 4 }}>
                  Founder, KESCA
                </Text>
                <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, display: 'block', marginBottom: 20 }}>
                  Air Advocates
                </Text>
                <Paragraph style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, fontStyle: 'italic' }}>
                  "We are gathering the industry, setting the standards, and the government will follow.
                  Consumer demand drives certification — uncertified restaurants get left behind."
                </Paragraph>
                <a href="mailto:info@airadvocates.net">
                  <Button style={{ background: '#E67E22', borderColor: '#E67E22', color: '#fff' }}>
                    info@airadvocates.net
                  </Button>
                </a>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* ===================== 7. CONTACT FORM ===================== */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            title="Contact Us"
            subtitle="Have a question about certification, standards, or joining KESCA? Get in touch."
          />
          <Row justify="center">
            <Col xs={24} sm={20} md={14} lg={12}>
              {submitted ? (
                <Card style={{ textAlign: 'center', borderRadius: 10 }}>
                  <CheckCircleOutlined style={{ fontSize: 56, color: '#27AE60', display: 'block', marginBottom: 16 }} />
                  <Title level={4} style={{ color: '#1B4F72' }}>Message Sent!</Title>
                  <Paragraph style={{ color: '#555' }}>
                    Thank you — Rob will get back to you within a few days.
                    We are a volunteer organization and appreciate your patience.
                  </Paragraph>
                  <Button type="link" onClick={() => setSubmitted(false)}>Send another message</Button>
                </Card>
              ) : (
                <Form
                  form={contactForm}
                  layout="vertical"
                  onFinish={handleContactSubmit}
                  size="large"
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item name="name" label="Your Name" rules={[{ required: true, message: 'Please enter your name' }]}>
                        <Input placeholder="Jane Smith" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                        <Input placeholder="jane@example.com" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="phone" label="Phone (optional)">
                    <Input placeholder="+1 (416) 555-0100" />
                  </Form.Item>
                  <Form.Item name="message" label="Message" rules={[{ required: true, message: 'Please enter your message' }]}>
                    <TextArea rows={5} placeholder="Tell us about your question or request…" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={submitting}
                      block
                      style={{ background: '#E67E22', borderColor: '#E67E22', height: 48, fontSize: 16 }}
                    >
                      Send Message
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
}

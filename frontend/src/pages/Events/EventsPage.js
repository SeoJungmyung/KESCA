import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, List, Button, Tag, Space, Spin, Modal, Form, Input, message } from 'antd';
import {
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { getEvents } from '../../api/events';
import { submitInquiry } from '../../api/inquiries';
import SectionTitle from '../../components/common/SectionTitle';

const { Title, Paragraph, Text } = Typography;

const fallbackEvents = [
  {
    id: 'e-1',
    title: 'KESCA Founding Assembly & Standards Review',
    starts_at: '2026-12-01T14:00:00Z',
    ends_at: '2026-12-01T16:30:00Z',
    location: 'Virtual Conference (Zoom Live)',
    url: 'https://zoom.us/j/kesca-founding-assembly',
    description:
      'Inaugural convention of Canadian kitchen exhaust system cleaners, ventilation engineers, and food service stakeholders. We will present the foundational preventative maintenance codes, discuss technician licensing criteria, and formalize our initial 25-company steering committee.',
    category: 'Founding Meeting',
  },
  {
    id: 'e-2',
    title: 'Kitchen Fire Prevention & Insurance Underwriting Webinar',
    starts_at: '2027-01-15T18:00:00Z',
    ends_at: '2027-01-15T19:30:00Z',
    location: 'Online Webinar',
    url: 'https://zoom.us/j/kesca-fire-prevention-webinar',
    description:
      'Co-hosted with property risk underwriters and municipal fire marshals. Learn how proper NFPA 96 exhaust cleaning documentation protects property owners from denied claims following grease fires, and how Before/After photographic audits provide indisputable proof.',
    category: 'Public Webinar',
  },
  {
    id: 'e-3',
    title: 'Annual Canadian Commercial Kitchen Ventilation Conference 2027',
    starts_at: '2027-03-20T09:00:00Z',
    ends_at: '2027-03-21T17:00:00Z',
    location: 'Metro Toronto Convention Centre, 255 Front St W, Toronto, ON',
    url: 'https://kesca.org/conference-2027',
    description:
      'The premier national gathering for exhaust technicians, facility managers, and safety regulators. Features hands-on equipment workshops, access door installation demonstrations, chemical safety labs, and technician certification exams.',
    category: 'Annual Conference',
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState(fallbackEvents);
  const [loading, setLoading] = useState(true);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getEvents()
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setEvents(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setRegisterModalOpen(true);
  };

  const handleRegisterSubmit = async (values) => {
    setSubmitting(true);
    try {
      await submitInquiry({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: `Event Registration: "${selectedEvent?.title}". Organization: ${values.organization || 'N/A'}. Seats: ${values.attendees || 1}`,
      });
      message.success('Registration RSVP received! We will send event access details to your email.');
      setRegisterModalOpen(false);
      form.resetFields();
    } catch {
      message.error('Failed to submit RSVP. Please contact info@airadvocates.net.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (startStr, endStr) => {
    if (!startStr) return '';
    const start = new Date(startStr);
    const sTime = start.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' });
    if (!endStr) return sTime;
    const end = new Date(endStr);
    const eTime = end.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
    return `${sTime} – ${eTime}`;
  };

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Banner */}
      <div style={{ background: '#1B4F72', color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <div className="container">
          <Tag color="#E67E22" style={{ marginBottom: 12, fontSize: 14, padding: '2px 10px' }}>
            Events &amp; Industry News
          </Tag>
          <Title level={1} style={{ color: '#fff', marginBottom: 16 }}>
            Upcoming KESCA Events
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 800, margin: '0 auto' }}>
            Join our open forums, professional training workshops, and public webinars. Stay informed on Canadian kitchen ventilation safety.
          </Paragraph>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionTitle
            title="Scheduled Conventions &amp; Webinars"
            subtitle="All commercial kitchen stakeholders are welcome: contractors, inspectors, and restaurant managers."
          />

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <Spin size="large" tip="Loading events..." />
            </div>
          ) : (
            <Row gutter={[24, 24]}>
              {events.map((event) => (
                <Col xs={24} key={event.id}>
                  <Card
                    hoverable
                    style={{ borderRadius: 12, borderLeft: '6px solid #1B4F72' }}
                    bodyStyle={{ padding: 28 }}
                  >
                    <Row gutter={[24, 16]} align="middle">
                      <Col xs={24} md={17}>
                        <Space style={{ marginBottom: 8 }} wrap>
                          <Tag color="#1B4F72">{event.category || 'Event'}</Tag>
                          <Space size={4}>
                            <CalendarOutlined style={{ color: '#E67E22' }} />
                            <Text strong style={{ color: '#1B4F72' }}>
                              {formatDate(event.starts_at)}
                            </Text>
                          </Space>
                          <Space size={4}>
                            <ClockCircleOutlined style={{ color: '#888' }} />
                            <Text type="secondary">{formatTime(event.starts_at, event.ends_at)}</Text>
                          </Space>
                        </Space>
                        <Title level={3} style={{ color: '#1B4F72', marginTop: 4, marginBottom: 12 }}>
                          {event.title}
                        </Title>
                        <Paragraph style={{ color: '#555', fontSize: 15, marginBottom: 16 }}>
                          {event.description}
                        </Paragraph>
                        <Space size={6}>
                          <EnvironmentOutlined style={{ color: '#E67E22' }} />
                          <Text strong style={{ color: '#4A5568' }}>
                            {event.location}
                          </Text>
                        </Space>
                      </Col>
                      <Col xs={24} md={7} style={{ textAlign: 'right' }}>
                        <Space direction="vertical" style={{ width: '100%' }} size={12}>
                          <Button
                            type="primary"
                            size="large"
                            block
                            onClick={() => handleRegisterClick(event)}
                            style={{ background: '#E67E22', borderColor: '#E67E22', height: 48, fontWeight: 600 }}
                            icon={<ArrowRightOutlined />}
                          >
                            RSVP / Register Free
                          </Button>
                          {event.url && (
                            <a href={event.url} target="_blank" rel="noopener noreferrer">
                              <Button block icon={<ShareAltOutlined />}>
                                Official Link / Meeting Room
                              </Button>
                            </a>
                          )}
                        </Space>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {/* Volunteer note */}
          <div
            style={{
              marginTop: 48,
              padding: 28,
              background: '#F8FAFC',
              borderRadius: 12,
              border: '1px solid #E2E8F0',
              textAlign: 'center',
            }}
          >
            <Title level={4} style={{ color: '#1B4F72', marginBottom: 8 }}>
              Want to host a regional KESCA meeting in your city?
            </Title>
            <Paragraph style={{ color: '#666', maxWidth: 640, margin: '0 auto 16px' }}>
              We are actively looking for regional coordinators across Ontario, Quebec, Alberta, and British Columbia to organize local training workshops.
            </Paragraph>
            <Button
              type="primary"
              onClick={() => {
                setSelectedEvent({ title: 'Host Regional Chapter Workshop' });
                setRegisterModalOpen(true);
              }}
              style={{ background: '#1B4F72', borderColor: '#1B4F72' }}
            >
              Express Interest as Regional Host
            </Button>
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      <Modal
        title={`Register for: ${selectedEvent?.title}`}
        open={registerModalOpen}
        onCancel={() => setRegisterModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Paragraph style={{ color: '#666', marginBottom: 20 }}>
          Reservations are complimentary for all industry stakeholders. Submit your information below to receive connection details and cal-reminders.
        </Paragraph>
        <Form form={form} layout="vertical" onFinish={handleRegisterSubmit}>
          <Form.Item name="name" label="Your Name" rules={[{ required: true, message: 'Please enter your name' }]}>
            <Input placeholder="Jane Smith" />
          </Form.Item>
          <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
            <Input placeholder="jane@restaurantgroup.ca" />
          </Form.Item>
          <Form.Item name="phone" label="Phone (optional)">
            <Input placeholder="(416) 555-0199" />
          </Form.Item>
          <Form.Item name="organization" label="Company or Affiliation">
            <Input placeholder="Air Clean Corp / Metro Restaurants" />
          </Form.Item>
          <Form.Item name="attendees" label="Number of Attendees" initialValue={1}>
            <Input type="number" min={1} max={20} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              block
              style={{ background: '#E67E22', borderColor: '#E67E22', height: 44, fontSize: 16 }}
            >
              Confirm Registration
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

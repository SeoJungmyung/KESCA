import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, Button, Tag, Space, Modal, Form, Input, message, Alert, List } from 'antd';
import {
  BookOutlined,
  CheckCircleOutlined,
  DollarCircleOutlined,
  SafetyCertificateOutlined,
  FireOutlined,
  GiftOutlined,
  ArrowRightOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getCourses } from '../../api/courses';
import { submitInquiry } from '../../api/inquiries';
import SectionTitle from '../../components/common/SectionTitle';

const { Title, Paragraph, Text } = Typography;

const fallbackCourses = [
  {
    id: 'course-1',
    title: 'Restaurant Owner Orientation: Fire & Ventilation Protection',
    level: 'Restaurant Owners & Managers',
    is_free: true,
    price_cents: 0,
    description:
      'A non-technical, high-impact orientation designed exclusively for restaurant operators, property managers, and commercial kitchen owners. Learn what the preventative maintenance code mandates, how to recognize dangerous grease accumulation, and how to verify contractor credentials before liability hits.',
    modules: [
      'Understanding NFPA 96 & the Municipal Fire Safety Inspection process',
      'The true costs of neglected ductwork: insurance denials and business closure',
      'How to spot inadequate cleaning: why wiping the hood canopy is not enough',
      'How to read and audit contractor Before/After photo reports',
    ],
  },
  {
    id: 'course-2',
    title: 'Kitchen Exhaust Cleaning Fundamentals',
    level: 'Technician Level 1',
    is_free: false,
    price_cents: 29900,
    description:
      'Comprehensive technical curriculum for kitchen exhaust cleaning technicians. Covers full system degreasing to bare metal, hood canopy systems, baffle filter maintenance, vertical/horizontal duct scraping, and rooftop fan washdown.',
    modules: [
      'Chemical safety, caustic degreasers, personal protective equipment (PPE)',
      'Horizontal duct entry, access panel sealing, and gasket replacement',
      'Exhaust fan hinge kit installation and electrical safety isolation',
      'Digital Before/After photo submission and geotagging compliance',
    ],
  },
  {
    id: 'course-3',
    title: 'Supervision, Quality Control & Safety Management',
    level: 'Supervisor Level 2',
    is_free: false,
    price_cents: 39900,
    description:
      'Advanced management training for crew leads, operations managers, and business owners. Emphasizes on-site hazard assessment, crew safety protocols, job sign-offs, and compliance reporting.',
    modules: [
      'Supervising on-site crew safety and confined-space duct protocols',
      'Make-up air supply balancing and rooftop static pressure fundamentals',
      'Fire suppression system fusible link safeguards and emergency reset procedures',
      'Customer audit presentations and certificate issuance workflows',
    ],
  },
];

export default function EducationPage() {
  const [courses, setCourses] = useState(fallbackCourses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getCourses()
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          const merged = data.map((d, i) => ({
            ...fallbackCourses[i % fallbackCourses.length],
            ...d,
          }));
          setCourses(merged);
        }
      })
      .catch(() => {});
  }, []);

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const handleEnrollSubmit = async (values) => {
    setSubmitting(true);
    try {
      await submitInquiry({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: `Course Enrollment Request: "${selectedCourse?.title}" (${selectedCourse?.is_free ? 'FREE' : `$${(selectedCourse?.price_cents / 100).toFixed(2)}`}). Organization: ${values.organization || 'Individual'}. Notes: ${values.notes || 'None'}`,
      });
      message.success('Enrollment request submitted! We will email you with syllabus details and next steps.');
      setModalOpen(false);
      form.resetFields();
    } catch {
      message.error('Failed to submit enrollment. Please reach out to info@airadvocates.net.');
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
            Education &amp; Training
          </Tag>
          <Title level={1} style={{ color: '#fff', marginBottom: 16 }}>
            Accredited Kitchen Exhaust Education
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 800, margin: '0 auto' }}>
            Education is our core mission. We empower restaurant owners with free preventative maintenance guidance
            and train professional technicians to the highest national standards.
          </Paragraph>
        </div>
      </div>

      {/* Hero: FREE Owner Orientation Callout (Meeting Decision #4) */}
      <section className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="container">
          <Card
            style={{
              background: 'linear-gradient(135deg, #FFF9F0 0%, #FFF2E0 100%)',
              border: '2px solid #E67E22',
              borderRadius: 16,
              boxShadow: '0 8px 30px rgba(230, 126, 34, 0.15)',
            }}
            bodyStyle={{ padding: 36 }}
          >
            <Row gutter={[36, 24]} align="middle">
              <Col xs={24} md={16}>
                <Space style={{ marginBottom: 8 }}>
                  <Tag color="#E67E22" icon={<GiftOutlined />} style={{ fontSize: 14, padding: '4px 10px' }}>
                    100% FREE RESOURCE
                  </Tag>
                  <Tag color="#1B4F72">For Restaurant &amp; Commercial Kitchen Owners</Tag>
                </Space>
                <Title level={2} style={{ color: '#1B4F72', marginTop: 8, marginBottom: 12 }}>
                  Free Restaurant Owner Orientation
                </Title>
                <Paragraph style={{ fontSize: 16, color: '#4A5568', lineHeight: 1.8 }}>
                  Most restaurant owners don't realize their fire insurance can be voided if kitchen exhaust cleaning isn't completed to bare metal. Our free orientation teaches you what the law requires, how to audit duct cleanliness, and how regular maintenance saves thousands in energy bills.
                </Paragraph>
                <Row gutter={[16, 12]}>
                  <Col xs={24} sm={12}>
                    <Text strong style={{ color: '#1B4F72' }}>
                      <CheckCircleOutlined style={{ color: '#27AE60', marginRight: 8 }} />
                      No credit card or membership required
                    </Text>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Text strong style={{ color: '#1B4F72' }}>
                      <CheckCircleOutlined style={{ color: '#27AE60', marginRight: 8 }} />
                      Self-paced online format (~45 mins)
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => handleEnrollClick(courses[0] || fallbackCourses[0])}
                  style={{
                    background: '#E67E22',
                    borderColor: '#E67E22',
                    fontSize: 17,
                    fontWeight: 700,
                    height: 52,
                    padding: '0 36px',
                    boxShadow: '0 4px 15px rgba(230, 126, 34, 0.4)',
                  }}
                  icon={<BookOutlined />}
                >
                  Start Free Orientation
                </Button>
                <Text type="secondary" style={{ display: 'block', marginTop: 12, fontSize: 13 }}>
                  Instant access • Volunteer educational initiative
                </Text>
              </Col>
            </Row>
          </Card>
        </div>
      </section>

      {/* All Courses Catalog */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            title="Professional Course Catalog"
            subtitle="Industry-recognized qualifications for technicians, supervisors, and operations managers."
          />
          <Row gutter={[32, 32]}>
            {courses.map((course) => (
              <Col xs={24} lg={8} key={course.id}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    borderRadius: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  bodyStyle={{ padding: 28 }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <Tag color={course.is_free ? 'orange' : '#1B4F72'} style={{ fontSize: 13, padding: '2px 8px' }}>
                        {course.level}
                      </Tag>
                      <Text strong style={{ fontSize: 20, color: course.is_free ? '#27AE60' : '#1B4F72' }}>
                        {course.is_free ? 'FREE' : `$${(course.price_cents / 100).toFixed(2)}`}
                      </Text>
                    </div>
                    <Title level={4} style={{ color: '#1B4F72', marginTop: 8, marginBottom: 12 }}>
                      {course.title}
                    </Title>
                    <Paragraph style={{ color: '#555', fontSize: 14, minHeight: 60 }}>
                      {course.description}
                    </Paragraph>
                    <div style={{ margin: '16px 0', borderTop: '1px solid #f0f0f0', paddingTop: 12 }}>
                      <Text strong style={{ fontSize: 13, color: '#888', display: 'block', marginBottom: 8 }}>
                        Course Modules Included:
                      </Text>
                      <List
                        size="small"
                        dataSource={course.modules || []}
                        renderItem={(mod) => (
                          <List.Item style={{ padding: '4px 0', border: 'none' }}>
                            <Space align="start">
                              <CheckCircleOutlined style={{ color: '#27AE60', fontSize: 13, marginTop: 4 }} />
                              <Text style={{ fontSize: 13, color: '#4A5568' }}>{mod}</Text>
                            </Space>
                          </List.Item>
                        )}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #eee' }}>
                    <Button
                      type="primary"
                      block
                      onClick={() => handleEnrollClick(course)}
                      style={{
                        background: course.is_free ? '#E67E22' : '#1B4F72',
                        borderColor: course.is_free ? '#E67E22' : '#1B4F72',
                        height: 44,
                        fontWeight: 600,
                      }}
                      icon={<ArrowRightOutlined />}
                    >
                      {course.is_free ? 'Register for Free' : 'Enroll in Course'}
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Why Educated Cleaning Saves Money (Economic Payback) */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title="The Economic Payback of Preventative Maintenance"
            subtitle="Properly trained cleaning crews save businesses far more than their service cost."
          />
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: 'center', height: '100%', borderRadius: 8 }}>
                <DollarCircleOutlined style={{ fontSize: 36, color: '#27AE60', marginBottom: 12 }} />
                <Title level={4} style={{ color: '#1B4F72' }}>Lower Electricity</Title>
                <Paragraph style={{ color: '#666', fontSize: 14 }}>
                  Clean fan impellers and ducts restore designed aerodynamic static pressure, reducing electrical draw by up to 20%.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: 'center', height: '100%', borderRadius: 8 }}>
                <FireOutlined style={{ fontSize: 36, color: '#E67E22', marginBottom: 12 }} />
                <Title level={4} style={{ color: '#1B4F72' }}>Zero Fire Spread</Title>
                <Paragraph style={{ color: '#666', fontSize: 14 }}>
                  Removing combustible fuel from ductwork prevents cooking flare-ups from traveling through plenums into the roof.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: 'center', height: '100%', borderRadius: 8 }}>
                <SafetyCertificateOutlined style={{ fontSize: 36, color: '#1B4F72', marginBottom: 12 }} />
                <Title level={4} style={{ color: '#1B4F72' }}>Insurance Coverage</Title>
                <Paragraph style={{ color: '#666', fontSize: 14 }}>
                  Commercial kitchen underwriters mandate NFPA 96 compliance. KESCA certificates protect claims from denial.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: 'center', height: '100%', borderRadius: 8 }}>
                <UsergroupAddOutlined style={{ fontSize: 36, color: '#8E44AD', marginBottom: 12 }} />
                <Title level={4} style={{ color: '#1B4F72' }}>Avoid Lawsuits</Title>
                <Paragraph style={{ color: '#666', fontSize: 14 }}>
                  Eliminate foul odours, air stagnation, and health department shutdowns before public reputation suffers.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Enrollment Modal */}
      <Modal
        title={`Enroll in ${selectedCourse?.title}`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Paragraph style={{ color: '#666', marginBottom: 20 }}>
          {selectedCourse?.is_free
            ? 'Enter your contact details to receive complimentary access to the orientation course materials.'
            : `Please provide your details below. Tuition: $${((selectedCourse?.price_cents || 0) / 100).toFixed(2)}. An invoice and syllabus will be delivered to your email.`}
        </Paragraph>
        <Form form={form} layout="vertical" onFinish={handleEnrollSubmit}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter your name' }]}>
            <Input placeholder="John Doe" />
          </Form.Item>
          <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
            <Input placeholder="john@example.com" />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
            <Input placeholder="(416) 555-0199" />
          </Form.Item>
          <Form.Item name="organization" label="Restaurant or Company Name">
            <Input placeholder="Acme Bistro / CleanVent Ltd." />
          </Form.Item>
          <Form.Item name="notes" label="Additional Notes (optional)">
            <Input.TextArea rows={3} placeholder="Tell us about your team size or specific learning goals..." />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              block
              style={{
                background: selectedCourse?.is_free ? '#E67E22' : '#1B4F72',
                borderColor: selectedCourse?.is_free ? '#E67E22' : '#1B4F72',
                height: 44,
                fontSize: 16,
              }}
            >
              {selectedCourse?.is_free ? 'Confirm Free Access' : 'Submit Enrollment Request'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

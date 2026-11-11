import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, Steps, Button, Tag, Space, List, Divider } from 'antd';
import {
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  AuditOutlined,
  CameraOutlined,
  FileProtectOutlined,
  ArrowRightOutlined,
  TrophyOutlined,
  DollarCircleOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getCertifications } from '../../api/certifications';
import SectionTitle from '../../components/common/SectionTitle';

const { Title, Paragraph, Text } = Typography;

const fallbackCertifications = [
  {
    id: 'c-1',
    level: 'Technician',
    name: 'KESCA Certified Technician',
    description:
      'Certified to clean commercial kitchen exhaust systems, access ducts, clean grease filters, degrease fans, and ensure systems reach bare metal compliance.',
    badgeColor: '#1B4F72',
    requirements: [
      'Completion of Kitchen Exhaust Cleaning Fundamentals Course',
      'Minimum 100 logged hours of on-site cleaning under supervision',
      'Pass written technical examination (80% minimum)',
      'Submission of 5 approved Before/After photo audit portfolios',
    ],
  },
  {
    id: 'c-2',
    level: 'Supervisor',
    name: 'KESCA Certified Supervisor',
    description:
      'Certified to oversee cleaning crews, conduct quality control audits, manage chemical safety (WHMIS/OSHA), and sign off on completed preventative maintenance.',
    badgeColor: '#E67E22',
    requirements: [
      'Hold active KESCA Technician certification for 2+ years',
      'Completion of Supervision, Crew Management & Safety Course',
      'Advanced duct engineering and static pressure balance knowledge',
      'Emergency fire suppression system lockout training',
    ],
  },
  {
    id: 'c-3',
    level: 'Inspector',
    name: 'KESCA Certified Inspector',
    description:
      'Certified to conduct independent code compliance inspections, perform combustible grease depth gauge audits, and issue official legal compliance certificates.',
    badgeColor: '#27AE60',
    requirements: [
      'Comprehensive code mastery: NFPA 96 & KESCA Preventative Maintenance Code',
      'Certified use of precision comb grease depth gauges',
      'Independent audit ethics and reporting standard compliance',
      'Annual recertification and continuing education units (CEUs)',
    ],
  },
];

const steps = [
  {
    title: 'Step 1: Take the Course',
    desc: 'Enroll in an accredited training course covering bare-metal cleaning, duct access requirements, and chemical safety.',
    icon: <AuditOutlined style={{ fontSize: 28, color: '#1B4F72' }} />,
  },
  {
    title: 'Step 2: Pass the Exam',
    desc: 'Demonstrate technical mastery of fire codes, static ventilation dynamics, and preventative maintenance protocols.',
    icon: <SafetyCertificateOutlined style={{ fontSize: 28, color: '#1B4F72' }} />,
  },
  {
    title: 'Step 3: Submit Before/After Photos',
    desc: 'Submit tamper-proof, geotagged, time-stamped Before and After photos proving true grease removal to bare metal.',
    icon: <CameraOutlined style={{ fontSize: 28, color: '#E67E22' }} />,
  },
  {
    title: 'Step 4: Receive Certificate',
    desc: 'Get your verified KESCA credentials, unique certificate code, and prominent listing in the National Directory.',
    icon: <FileProtectOutlined style={{ fontSize: 28, color: '#27AE60' }} />,
  },
];

export default function CertificationPage() {
  const [certifications, setCertifications] = useState(fallbackCertifications);

  useEffect(() => {
    getCertifications()
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          // Merge API data with detailed requirements
          const merged = data.map((d, i) => ({
            ...fallbackCertifications[i % fallbackCertifications.length],
            ...d,
          }));
          setCertifications(merged);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Banner */}
      <div style={{ background: '#1B4F72', color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <div className="container">
          <Tag color="#E67E22" style={{ marginBottom: 12, fontSize: 14, padding: '2px 10px' }}>
            Professional Standards
          </Tag>
          <Title level={1} style={{ color: '#fff', marginBottom: 16 }}>
            KESCA Professional Certification
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 800, margin: '0 auto' }}>
            Three tiers of industry accreditation backed by verifiable photo proof and rigorous preventative maintenance standards.
          </Paragraph>
        </div>
      </div>

      {/* 4-Step Pathway Section */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title="The 4-Step Path to Certification"
            subtitle="A transparent, accountable journey ensuring genuine technical competency."
          />
          <Row gutter={[24, 24]}>
            {steps.map((s, idx) => (
              <Col xs={24} sm={12} lg={6} key={idx}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    borderRadius: 10,
                    textAlign: 'center',
                    borderTop: `4px solid ${idx === 2 ? '#E67E22' : idx === 3 ? '#27AE60' : '#1B4F72'}`,
                  }}
                  bodyStyle={{ padding: 24 }}
                >
                  <div style={{ marginBottom: 16 }}>{s.icon}</div>
                  <Title level={4} style={{ color: '#1B4F72', marginBottom: 12 }}>
                    {s.title}
                  </Title>
                  <Paragraph style={{ color: '#666', fontSize: 14, margin: 0 }}>
                    {s.desc}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 3 Certification Levels */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            title="Certification Levels"
            subtitle="Explore the requirements and competencies for Technicians, Supervisors, and Inspectors."
          />
          <Row gutter={[32, 32]}>
            {certifications.map((cert) => (
              <Col xs={24} lg={8} key={cert.id}>
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
                    <Tag color={cert.badgeColor || '#1B4F72'} style={{ fontSize: 13, marginBottom: 12, padding: '3px 8px' }}>
                      Level: {cert.level}
                    </Tag>
                    <Title level={3} style={{ color: '#1B4F72', marginTop: 4, marginBottom: 12 }}>
                      {cert.name}
                    </Title>
                    <Paragraph style={{ color: '#555', fontSize: 15, marginBottom: 20 }}>
                      {cert.description}
                    </Paragraph>
                    <Divider orientation="left" style={{ margin: '16px 0', fontSize: 13, color: '#888' }}>
                      Key Prerequisites
                    </Divider>
                    <List
                      dataSource={cert.requirements || []}
                      renderItem={(req) => (
                        <List.Item style={{ padding: '6px 0', border: 'none' }}>
                          <Space align="start">
                            <CheckCircleOutlined style={{ color: '#27AE60', marginTop: 4 }} />
                            <Text style={{ fontSize: 14, color: '#4A5568' }}>{req}</Text>
                          </Space>
                        </List.Item>
                      )}
                    />
                  </div>
                  <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #eee' }}>
                    <Link to="/education">
                      <Button
                        type="primary"
                        block
                        style={{ background: cert.badgeColor || '#1B4F72', borderColor: cert.badgeColor || '#1B4F72', height: 44 }}
                        icon={<ArrowRightOutlined />}
                      >
                        Enroll for {cert.level} Training
                      </Button>
                    </Link>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Why KESCA is Not IKECA (Meeting Decision #11 Callout) */}
      <section className="section">
        <div className="container">
          <Card
            style={{
              background: '#F8FAFC',
              borderRadius: 12,
              border: '2px solid #E2E8F0',
            }}
            bodyStyle={{ padding: 36 }}
          >
            <Row gutter={[48, 24]} align="middle">
              <Col xs={24} md={16}>
                <Tag color="#E67E22" style={{ marginBottom: 12 }}>
                  Enforced Standard
                </Tag>
                <Title level={2} style={{ color: '#1B4F72', marginBottom: 12 }}>
                  Accountability Beyond Membership
                </Title>
                <Paragraph style={{ fontSize: 16, color: '#4A5568', lineHeight: 1.8 }}>
                  Unlike conventional trade associations that merely collect annual dues without guaranteeing work quality, <strong>KESCA actively enforces the preventative maintenance code</strong>.
                </Paragraph>
                <Paragraph style={{ fontSize: 16, color: '#4A5568', lineHeight: 1.8 }}>
                  Our certification demands verifiable <strong>Before &amp; After photo evidence with GPS coordinates and timestamps</strong>. Grease cannot be faked when photos confirm bare-metal clearance.
                </Paragraph>
                <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                  <Col xs={24} sm={12}>
                    <Space align="start">
                      <ThunderboltOutlined style={{ color: '#E67E22', fontSize: 20, marginTop: 4 }} />
                      <div>
                        <Text strong style={{ display: 'block' }}>Reduced Electricity Bills</Text>
                        <Text type="secondary" style={{ fontSize: 13 }}>Clean fans move air freely without overdrawing motor amps.</Text>
                      </div>
                    </Space>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Space align="start">
                      <DollarCircleOutlined style={{ color: '#27AE60', fontSize: 20, marginTop: 4 }} />
                      <div>
                        <Text strong style={{ display: 'block' }}>Avoid Costly Lawsuits</Text>
                        <Text type="secondary" style={{ fontSize: 13 }}>Documented cleaning protects against food-borne and fire liabilities.</Text>
                      </div>
                    </Space>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                <Card
                  style={{
                    background: '#1B4F72',
                    color: '#fff',
                    borderRadius: 12,
                  }}
                  bodyStyle={{ padding: 24 }}
                >
                  <TrophyOutlined style={{ fontSize: 48, color: '#E67E22', marginBottom: 12 }} />
                  <Title level={4} style={{ color: '#fff', margin: 0 }}>
                    Ready to Certify?
                  </Title>
                  <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, margin: '12px 0 20px' }}>
                    Join the founding group of Canadian kitchen exhaust contractors.
                  </Paragraph>
                  <Link to="/contact">
                    <Button
                      size="large"
                      style={{ background: '#E67E22', borderColor: '#E67E22', color: '#fff', fontWeight: 600, width: '100%' }}
                    >
                      Apply for Certification
                    </Button>
                  </Link>
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
      </section>
    </div>
  );
}

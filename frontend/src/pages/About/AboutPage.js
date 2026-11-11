import React from 'react';
import { Row, Col, Typography, Card, List, Button, Tag, Space } from 'antd';
import {
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  MailOutlined,
  AppstoreOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/common/SectionTitle';

const { Title, Paragraph, Text } = Typography;

const scopes = [
  {
    title: 'Kitchen Exhaust Systems',
    desc: 'Hoods, filters, ductwork, and exhaust fans cleaned to bare metal per NFPA 96 & preventative maintenance codes.',
  },
  {
    title: 'Refrigeration & Walk-In Coolers',
    desc: 'Evaporator and condenser coils, drain lines, fans, and airflow balancing to prevent premature compressor failure.',
  },
  {
    title: 'Grease Traps & Interceptors',
    desc: 'Regular inspection, pumping protocols, and grease containment verification to protect municipal infrastructure.',
  },
  {
    title: 'Dryer Exhaust Systems',
    desc: 'Heavy commercial and multi-residential laundry duct lint removal, backdraft damper inspections, and fire stop verification.',
  },
  {
    title: 'Bathroom Exhaust Systems',
    desc: 'Commercial ventilation clearing, moisture control maintenance, and duct sanitization to prevent mould & air stagnation.',
  },
  {
    title: 'Supply & Make-Up Air Systems',
    desc: 'Intake filters, dampers, heater sections, and balancing to guarantee positive air replacement and proper hood draw.',
  },
];

export default function AboutPage() {
  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Banner */}
      <div style={{ background: '#1B4F72', color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <div className="container">
          <Tag color="#E67E22" style={{ marginBottom: 12, fontSize: 14, padding: '2px 10px' }}>
            About KESCA
          </Tag>
          <Title level={1} style={{ color: '#fff', marginBottom: 16 }}>
            Kitchen Exhaust Systems Cleaners Association
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 800, margin: '0 auto' }}>
            A volunteer industry association setting the standard for preventative maintenance, fire safety,
            and ventilation cleanliness across Canada.
          </Paragraph>
        </div>
      </div>

      {/* Mission & Overview */}
      <section className="section">
        <div className="container">
          <Row gutter={[48, 36]} align="middle">
            <Col xs={24} md={12}>
              <SectionTitle
                title="Who We Are"
                subtitle="Setting the standard from within the industry."
                align="left"
              />
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                <strong>KESCA</strong> is a volunteer-led industry association founded to raise the bar for commercial kitchen exhaust cleaning and ventilation maintenance in Canada.
              </Paragraph>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                Unlike general trade associations that simply collect membership dues, KESCA <strong>enforces the preventative maintenance code</strong>. We hold contractors accountable through rigorous training, verified testing, and mandatory Before/After photo documentation of every cleaning job.
              </Paragraph>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                Our mission is to gather industry leaders (~25 founding companies to start) to establish unified national standards. As history shows in other trades, when the industry proactively sets rigorous standards, government and municipal code enforcement follows.
              </Paragraph>
            </Col>
            <Col xs={24} md={12}>
              <Card
                style={{
                  background: '#F4F6F9',
                  borderRadius: 12,
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                <Title level={4} style={{ color: '#1B4F72', marginTop: 0 }}>
                  <SafetyCertificateOutlined style={{ marginRight: 8, color: '#E67E22' }} />
                  Consumer Demand Drives Change
                </Title>
                <Paragraph style={{ fontSize: 15, color: '#4A5568' }}>
                  Restaurant owners, property managers, insurers, and municipal fire marshals are demanding verifiable proof of clean kitchens.
                </Paragraph>
                <Paragraph style={{ fontSize: 15, color: '#4A5568' }}>
                  Uncertified restaurants and substandard cleaning contractors face escalating liabilities, catastrophic fire risks, and failed health inspections. By educating commercial operators, KESCA ensures certified companies earn the public's trust.
                </Paragraph>
                <div style={{ marginTop: 20 }}>
                  <Link to="/certification">
                    <Button type="primary" style={{ background: '#1B4F72', borderColor: '#1B4F72' }}>
                      Get Certified Today
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Scope of Standards */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            title="Comprehensive Scope of Work"
            subtitle="Proper kitchen ventilation goes far beyond just spraying down grease filters."
          />
          <Row gutter={[24, 24]}>
            {scopes.map((item, idx) => (
              <Col xs={24} sm={12} lg={8} key={idx}>
                <Card
                  hoverable
                  style={{ height: '100%', borderRadius: 8 }}
                  bodyStyle={{ padding: 24 }}
                >
                  <Title level={4} style={{ color: '#1B4F72', marginBottom: 12, fontSize: 18 }}>
                    <AppstoreOutlined style={{ color: '#E67E22', marginRight: 8 }} />
                    {item.title}
                  </Title>
                  <Paragraph style={{ color: '#555', fontSize: 14, margin: 0 }}>
                    {item.desc}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Contact & Leadership */}
      <section className="section">
        <div className="container">
          <Card
            style={{
              background: 'linear-gradient(135deg, #1B4F72 0%, #2C3E50 100%)',
              borderRadius: 12,
              color: '#fff',
              padding: '20px 10px',
            }}
            bordered={false}
          >
            <Row gutter={[32, 24]} align="middle" justify="space-between">
              <Col xs={24} md={16}>
                <Title level={3} style={{ color: '#fff', marginBottom: 8 }}>
                  Leadership &amp; Initiative
                </Title>
                <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 8 }}>
                  KESCA is spearheaded by <strong>Rob Sweet</strong>, founder of <strong>Air Advocates</strong>.
                  We welcome industry veterans, ventilation technicians, and commercial food service operators to contribute to shaping the standards.
                </Paragraph>
                <Text style={{ color: '#E67E22', fontSize: 15 }}>
                  <MailOutlined style={{ marginRight: 8 }} />
                  info@airadvocates.net
                </Text>
              </Col>
              <Col xs={24} md={8} style={{ textAlign: 'right' }}>
                <Link to="/contact">
                  <Button
                    size="large"
                    style={{ background: '#E67E22', borderColor: '#E67E22', color: '#fff', height: 48, padding: '0 28px' }}
                    icon={<ArrowRightOutlined />}
                  >
                    Contact the Association
                  </Button>
                </Link>
              </Col>
            </Row>
          </Card>
        </div>
      </section>
    </div>
  );
}

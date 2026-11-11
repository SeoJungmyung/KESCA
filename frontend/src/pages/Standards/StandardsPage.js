import React, { useState, useEffect } from 'react';
import { Tabs, Row, Col, Card, Popover, Button, Typography, Tag, Space, Spin, Alert } from 'antd';
import {
  SafetyCertificateOutlined,
  BookOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getStandards } from '../../api/standards';
import { getCourses } from '../../api/courses';
import SectionTitle from '../../components/common/SectionTitle';

const { Title, Paragraph, Text } = Typography;

const fallbackStandards = [
  {
    id: 's-1',
    category: 'cleaning',
    title: 'Standard C-101: Bare Metal Grease Removal Protocol',
    body: 'Mandatory standard requiring the complete removal of combustible grease accumulations from the exhaust canopy hood, grease containment reservoirs, exhaust ducts, and centrifugal fans down to the original bare metal surface without chemical residue.',
  },
  {
    id: 's-2',
    category: 'cleaning',
    title: 'Standard C-102: Access Panel & Horizontal Duct Cleanout',
    body: 'Specification requiring UL-listed access doors installed at every 12 feet of horizontal duct run and at every duct turn to guarantee complete cleaning access without leaving neglected intermediate duct sections.',
  },
  {
    id: 's-3',
    category: 'inspection',
    title: 'Standard I-201: Depth Gauge Combustible Grease Measurement',
    body: 'Standardized comb-gauge measurement protocol measuring grease deposit depth at critical accumulation points. Requires immediate remediation when grease depth exceeds 2,000 microns (0.078 inches).',
  },
  {
    id: 's-4',
    category: 'inspection',
    title: 'Standard I-202: Pre & Post Cleaning Verification Photography',
    body: 'Obligatory digital photo audit protocol documenting time-stamped and geotagged Before and After conditions for hood plenums, vertical duct risers, horizontal transitions, and rooftop exhaust discharge points.',
  },
  {
    id: 's-5',
    category: 'maintenance',
    title: 'Standard M-301: Fan Belt Tensioning & Bearing Lubrication',
    body: 'Operational code specifying verification of exhaust fan belt alignment, deflection tension tolerances, high-temperature bearing lubrication cycles, and vibration damper integrity during every scheduled service.',
  },
  {
    id: 's-6',
    category: 'maintenance',
    title: 'Standard M-302: Make-Up Air Interlock & Pressure Balancing',
    body: 'Verification procedures ensuring proper static pressure differentials between cooking lines and dining areas, make-up air damper modulation, and automated interlocks triggering supply air with exhaust activation.',
  },
];

export default function StandardsPage() {
  const [standards, setStandards] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    Promise.all([
      getStandards().catch(() => null),
      getCourses().catch(() => null),
    ]).then(([standardsRes, coursesRes]) => {
      if (standardsRes && Array.isArray(standardsRes) && standardsRes.length > 0) {
        setStandards(standardsRes);
      } else {
        setStandards(fallbackStandards);
      }
      if (coursesRes && Array.isArray(coursesRes)) {
        setCourses(coursesRes);
      }
      setLoading(false);
    });
  }, []);

  const getFilteredStandards = (cat) => {
    if (cat === 'all') return standards;
    return standards.filter((s) => s.category?.toLowerCase() === cat);
  };

  const renderPopoverContent = (standard) => (
    <div style={{ maxWidth: 280, padding: 4 }}>
      <Text strong style={{ display: 'block', marginBottom: 8, color: '#1B4F72' }}>
        Recommended Next Steps
      </Text>
      <Paragraph style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
        Learn how to implement this standard or hire a certified specialist trained in compliance.
      </Paragraph>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Link to="/education">
          <Button size="small" type="primary" icon={<BookOutlined />} block style={{ background: '#E67E22', borderColor: '#E67E22' }}>
            Find Training Courses
          </Button>
        </Link>
        <Link to="/find-a-pro">
          <Button size="small" icon={<SearchOutlined />} block>
            Browse Certified Directory
          </Button>
        </Link>
      </Space>
    </div>
  );

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ background: '#1B4F72', color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <div className="container">
          <Tag color="#E67E22" style={{ marginBottom: 12, fontSize: 14, padding: '2px 10px' }}>
            Code &amp; Compliance
          </Tag>
          <Title level={1} style={{ color: '#fff', marginBottom: 16 }}>
            KESCA Preventative Maintenance Standards
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 800, margin: '0 auto' }}>
            Clear, enforceable codes governing the inspection, cleaning, and mechanical integrity of commercial kitchen ventilation systems.
          </Paragraph>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionTitle
            title="Industry Standards Catalog"
            subtitle="Hover over any standard to discover relevant certification training and accredited contractors."
          />

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <Spin size="large" tip="Loading standards..." />
            </div>
          ) : (
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              centered
              size="large"
              items={[
                { key: 'all', label: 'All Standards' },
                { key: 'cleaning', label: 'Cleaning Protocols' },
                { key: 'inspection', label: 'Inspection & Verification' },
                { key: 'maintenance', label: 'Preventative Maintenance' },
              ]}
            />
          )}

          {!loading && (
            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
              {getFilteredStandards(activeTab).map((item) => (
                <Col xs={24} md={12} key={item.id}>
                  <Popover
                    content={renderPopoverContent(item)}
                    title={
                      <span style={{ fontSize: 14, color: '#1B4F72' }}>
                        <InfoCircleOutlined style={{ marginRight: 6 }} />
                        Standard Resources
                      </span>
                    }
                    trigger="hover"
                    placement="topRight"
                  >
                    <Card
                      hoverable
                      style={{
                        height: '100%',
                        borderRadius: 8,
                        borderLeft: `5px solid ${
                          item.category === 'cleaning'
                            ? '#E67E22'
                            : item.category === 'inspection'
                            ? '#1B4F72'
                            : '#27AE60'
                        }`,
                      }}
                    >
                      <Space orientation="horizontal" style={{ marginBottom: 8 }}>
                        <Tag
                          color={
                            item.category === 'cleaning'
                              ? 'orange'
                              : item.category === 'inspection'
                              ? 'blue'
                              : 'green'
                          }
                          style={{ textTransform: 'capitalize' }}
                        >
                          {item.category}
                        </Tag>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Hover for courses &amp; pros
                        </Text>
                      </Space>
                      <Title level={4} style={{ color: '#1B4F72', marginTop: 4, marginBottom: 12, fontSize: 18 }}>
                        {item.title}
                      </Title>
                      <Paragraph style={{ color: '#4A5568', fontSize: 15, lineHeight: 1.6 }}>
                        {item.body}
                      </Paragraph>
                    </Card>
                  </Popover>
                </Col>
              ))}
            </Row>
          )}

          <div
            style={{
              marginTop: 48,
              padding: 24,
              background: '#F8FAFC',
              borderRadius: 8,
              border: '1px solid #E2E8F0',
              textAlign: 'center',
            }}
          >
            <Title level={4} style={{ color: '#1B4F72', marginBottom: 8 }}>
              Need clarification on technical code compliance?
            </Title>
            <Paragraph style={{ color: '#666', maxWidth: 640, margin: '0 auto 16px' }}>
              Our standards committee assists commercial kitchen operators, municipal authorities, and certified contractors with technical interpretations.
            </Paragraph>
            <Link to="/contact">
              <Button type="primary" style={{ background: '#1B4F72', borderColor: '#1B4F72' }}>
                Contact Technical Committee
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

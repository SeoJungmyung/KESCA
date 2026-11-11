import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, Tag, Space, Image, Button, Alert } from 'antd';
import {
  CameraOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CompassOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getGallery } from '../../api/gallery';
import SectionTitle from '../../components/common/SectionTitle';

const { Title, Paragraph, Text } = Typography;

// High quality SVG data URIs for Before (greasy/dirty) and After (clean/bare metal) placeholders
const beforeSvg = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#2B241C"/>
  <rect x="50" y="50" width="500" height="300" rx="8" fill="#3D3023" stroke="#5A4734" stroke-width="4"/>
  <circle cx="200" cy="180" r="80" fill="#1C140D" opacity="0.8"/>
  <path d="M120 220 Q200 160 350 240 T500 200" stroke="#1A120B" stroke-width="36" stroke-linecap="round" fill="none"/>
  <path d="M160 260 Q260 210 420 270" stroke="#23170D" stroke-width="28" stroke-linecap="round" fill="none"/>
  <text x="300" y="70" font-family="sans-serif" font-size="20" font-weight="bold" fill="#D35400" text-anchor="middle">BEFORE CLEANING — HEAVY GREASE BUILDUP</text>
  <text x="300" y="340" font-family="sans-serif" font-size="14" fill="#E67E22" text-anchor="middle">Combustible Grease Depth: &gt; 2,500 Microns • Severe Fire Hazard</text>
</svg>
`);

const afterSvg = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#1E2A38"/>
  <rect x="50" y="50" width="500" height="300" rx="8" fill="#2C3E50" stroke="#4A6572" stroke-width="4"/>
  <circle cx="200" cy="180" r="80" fill="#7F8C8D" opacity="0.3"/>
  <line x1="80" y1="120" x2="520" y2="120" stroke="#BDC3C7" stroke-width="3" stroke-dasharray="10,10"/>
  <line x1="80" y1="280" x2="520" y2="280" stroke="#BDC3C7" stroke-width="3" stroke-dasharray="10,10"/>
  <text x="300" y="70" font-family="sans-serif" font-size="20" font-weight="bold" fill="#27AE60" text-anchor="middle">AFTER CLEANING — RESTORED TO BARE METAL</text>
  <text x="300" y="200" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ECF0F1" text-anchor="middle">✓ BARE METAL VERIFIED (NFPA 96 &amp; KESCA CODE)</text>
  <text x="300" y="340" font-family="sans-serif" font-size="14" fill="#2ECC71" text-anchor="middle">Grease Depth: 0 Microns • 100% Code Compliant</text>
</svg>
`);

const fallbackGalleryItems = [
  {
    id: 'g-1',
    title: 'Commercial Hood Plenum & Grease Extraction',
    contractor: 'Ontario Exhaust Pros',
    city: 'Toronto, ON',
    latitude: 43.6532,
    longitude: -79.3832,
    date: '2026-11-04',
    before_image_url: beforeSvg,
    after_image_url: afterSvg,
    notes: 'Complete degreasing of grease trough, internal plenum walls, and fire fusible link bracket.',
    kml_ref: 'KML-TOR-4401',
  },
  {
    id: 'g-2',
    title: 'Horizontal Duct Access & Cleanout Run',
    contractor: 'Clean Ducts Inc',
    city: 'Ottawa, ON',
    latitude: 45.4215,
    longitude: -75.6972,
    date: '2026-10-28',
    before_image_url: beforeSvg,
    after_image_url: afterSvg,
    notes: '24-foot horizontal duct run cleaned to bare steel via UL-listed sealed access ports.',
    kml_ref: 'KML-OTT-1920',
  },
  {
    id: 'g-3',
    title: 'Rooftop Centrifugal Upblast Fan & Shroud',
    contractor: 'GrillGuard Services',
    city: 'Hamilton, ON',
    latitude: 43.2557,
    longitude: -79.8711,
    date: '2026-10-15',
    before_image_url: beforeSvg,
    after_image_url: afterSvg,
    notes: 'Fan impeller blades washed down, grease drainage collector unclogged, hinge kit inspected.',
    kml_ref: 'KML-HAM-0814',
  },
  {
    id: 'g-4',
    title: 'Make-Up Air Supply Intake & Filter Replacement',
    contractor: 'VentRight Solutions',
    city: 'Mississauga, ON',
    latitude: 43.5890,
    longitude: -79.6441,
    date: '2026-09-30',
    before_image_url: beforeSvg,
    after_image_url: afterSvg,
    notes: 'Intake damper cleaning and pressure test ensuring adequate air balance for cooking hoods.',
    kml_ref: 'KML-MIS-5521',
  },
];

export default function GalleryPage() {
  const [items, setItems] = useState(fallbackGalleryItems);

  useEffect(() => {
    getGallery()
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setItems(data);
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
            Verified Proof of Clean
          </Tag>
          <Title level={1} style={{ color: '#fff', marginBottom: 16 }}>
            Before &amp; After Photo Gallery
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 800, margin: '0 auto' }}>
            Before/After photos are the proof that grease was removed. With geotagging and timestamps,
            work quality cannot be faked.
          </Paragraph>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Phase 4 KML Notice (Meeting Decision #8) */}
          <Alert
            message="GPS Geotagged Verification &amp; KML Connection"
            description="All photos displayed are submitted by certified contractors with embedded GPS coordinates and timestamps. Full KML file download and interactive map overlay integration arrives in Phase 4."
            type="info"
            showIcon
            icon={<CompassOutlined />}
            style={{ marginBottom: 32, borderRadius: 8 }}
          />

          <SectionTitle
            title="Field Audit Documentation"
            subtitle="Click on any image to inspect high-resolution detail. Notice the bare metal finish required by KESCA standards."
          />

          <Row gutter={[32, 32]}>
            {items.map((item) => (
              <Col xs={24} lg={12} key={item.id}>
                <Card
                  hoverable
                  style={{ borderRadius: 12, overflow: 'hidden' }}
                  bodyStyle={{ padding: 24 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <Title level={4} style={{ margin: 0, color: '#1B4F72' }}>
                        {item.title}
                      </Title>
                      <Text type="secondary" style={{ fontSize: 14 }}>
                        Contractor: <strong>{item.contractor || 'KESCA Accredited Member'}</strong>
                      </Text>
                    </div>
                    <Tag color="#1B4F72" icon={<SafetyCertificateOutlined />}>
                      KESCA Verified
                    </Tag>
                  </div>

                  {/* Side-by-Side Images */}
                  <Image.PreviewGroup>
                    <Row gutter={[12, 12]}>
                      <Col xs={24} sm={12}>
                        <div style={{ position: 'relative' }}>
                          <Image
                            src={item.before_image_url || beforeSvg}
                            alt="Before cleaning"
                            style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 8 }}
                          />
                          <Tag
                            color="red"
                            style={{
                              position: 'absolute',
                              top: 10,
                              left: 10,
                              fontWeight: 700,
                              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                            }}
                          >
                            BEFORE
                          </Tag>
                        </div>
                      </Col>
                      <Col xs={24} sm={12}>
                        <div style={{ position: 'relative' }}>
                          <Image
                            src={item.after_image_url || afterSvg}
                            alt="After cleaning"
                            style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 8 }}
                          />
                          <Tag
                            color="green"
                            style={{
                              position: 'absolute',
                              top: 10,
                              left: 10,
                              fontWeight: 700,
                              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                            }}
                          >
                            AFTER (BARE METAL)
                          </Tag>
                        </div>
                      </Col>
                    </Row>
                  </Image.PreviewGroup>

                  <Paragraph style={{ color: '#555', fontSize: 14, marginTop: 16, marginBottom: 12 }}>
                    {item.notes}
                  </Paragraph>

                  {/* Metadata Bar */}
                  <div
                    style={{
                      paddingTop: 12,
                      borderTop: '1px solid #f0f0f0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    <Space size={16} wrap>
                      <span style={{ fontSize: 13, color: '#666' }}>
                        <EnvironmentOutlined style={{ color: '#E67E22', marginRight: 4 }} />
                        {item.city} ({item.latitude?.toFixed(4)}, {item.longitude?.toFixed(4)})
                      </span>
                      {item.date && (
                        <span style={{ fontSize: 13, color: '#666' }}>
                          <ClockCircleOutlined style={{ color: '#1B4F72', marginRight: 4 }} />
                          {item.date}
                        </span>
                      )}
                    </Space>
                    {item.kml_ref && (
                      <Tag color="geekblue" icon={<FileTextOutlined />}>
                        {item.kml_ref}
                      </Tag>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <Title level={4} style={{ color: '#1B4F72', marginBottom: 12 }}>
              Are you a contractor ready to submit audit photos?
            </Title>
            <Paragraph style={{ color: '#666', maxWidth: 600, margin: '0 auto 20px' }}>
              Only authenticated KESCA members and certified inspectors can upload portfolio items to the national gallery.
            </Paragraph>
            <Link to="/certification">
              <Button type="primary" size="large" style={{ background: '#1B4F72', borderColor: '#1B4F72' }}>
                Learn About Photo Audit Certification
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

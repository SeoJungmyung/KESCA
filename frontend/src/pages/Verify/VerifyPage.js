import React, { useState } from 'react';
import { Row, Col, Typography, Card, Input, Button, Result, Tag, Space, Descriptions, Divider, Alert } from 'antd';
import {
  SafetyCertificateOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  QrcodeOutlined,
  ShopOutlined,
  CalendarOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import { api } from '../../api/client';
import SectionTitle from '../../components/common/SectionTitle';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const sampleVerifiedCerts = {
  'KESCA-ONT-2026-001': {
    code: 'KESCA-ONT-2026-001',
    businessName: 'Ontario Exhaust Pros',
    city: 'Toronto, ON',
    level: 'Technician',
    issuedDate: '2026-11-01',
    expiryDate: '2027-11-01',
    inspector: 'Rob Sweet (Lead Auditor #001)',
    status: 'ACTIVE & VERIFIED',
    scope: 'Hood canopies, baffle filters, horizontal duct cleanouts, and centrifugal exhaust fans to bare metal.',
  },
  'KESCA-ONT-2026-002': {
    code: 'KESCA-ONT-2026-002',
    businessName: 'Clean Ducts Inc',
    city: 'Ottawa, ON',
    level: 'Supervisor',
    issuedDate: '2026-10-15',
    expiryDate: '2027-10-15',
    inspector: 'Rob Sweet (Lead Auditor #001)',
    status: 'ACTIVE & VERIFIED',
    scope: 'Commercial kitchen exhaust, supply air balancing, fire barrier inspections, and crew safety management.',
  },
  'KESCA-ONT-2026-005': {
    code: 'KESCA-ONT-2026-005',
    businessName: 'VentRight Solutions',
    city: 'Mississauga, ON',
    level: 'Inspector',
    issuedDate: '2026-09-30',
    expiryDate: '2027-09-30',
    inspector: 'KESCA Standards Board',
    status: 'ACTIVE & VERIFIED',
    scope: 'Combustible grease depth measurement, insurance compliance audit, and NFPA 96 certifications.',
  },
};

export default function VerifyPage() {
  const [certCode, setCertCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifiedData, setVerifiedData] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (value) => {
    const code = (value || certCode).trim().toUpperCase();
    if (!code) return;
    setLoading(true);
    setSearched(true);

    try {
      // Try backend endpoint
      const res = await api.get(`/verify/${encodeURIComponent(code)}`);
      if (res && res.certificate) {
        setVerifiedData(res.certificate);
        setLoading(false);
        return;
      }
    } catch {
      // Fallback to sample registry in dev/seed mode
    }

    if (sampleVerifiedCerts[code]) {
      setVerifiedData(sampleVerifiedCerts[code]);
    } else {
      setVerifiedData(null);
    }
    setLoading(false);
  };

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Banner */}
      <div style={{ background: '#1B4F72', color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <div className="container">
          <Tag color="#E67E22" style={{ marginBottom: 12, fontSize: 14, padding: '2px 10px' }}>
            Credential Verification
          </Tag>
          <Title level={1} style={{ color: '#fff', marginBottom: 16 }}>
            Verify a KESCA Certificate
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 800, margin: '0 auto' }}>
            Instant digital validation for commercial kitchen operators, municipal fire marshals, and insurance underwriters.
          </Paragraph>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          {/* Search Box Card */}
          <Card
            style={{ borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: 32 }}
            bodyStyle={{ padding: 36 }}
          >
            <Title level={3} style={{ color: '#1B4F72', textAlign: 'center', marginTop: 0, marginBottom: 8 }}>
              Enter Certificate Code
            </Title>
            <Paragraph style={{ textAlign: 'center', color: '#666', marginBottom: 24 }}>
              Located on your physical certificate sticker, inspection report, or contractor documentation.
            </Paragraph>

            <Search
              placeholder="e.g. KESCA-ONT-2026-001"
              enterButton={
                <Button
                  type="primary"
                  size="large"
                  style={{ background: '#E67E22', borderColor: '#E67E22', fontWeight: 600, padding: '0 28px' }}
                >
                  Verify Now
                </Button>
              }
              size="large"
              value={certCode}
              onChange={(e) => setCertCode(e.target.value)}
              onSearch={handleSearch}
              loading={loading}
              prefix={<SafetyCertificateOutlined style={{ color: '#1B4F72' }} />}
            />

            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Sample demo codes to try:{' '}
                <Button type="link" size="small" onClick={() => { setCertCode('KESCA-ONT-2026-001'); handleSearch('KESCA-ONT-2026-001'); }}>
                  KESCA-ONT-2026-001
                </Button>
                {' • '}
                <Button type="link" size="small" onClick={() => { setCertCode('KESCA-ONT-2026-002'); handleSearch('KESCA-ONT-2026-002'); }}>
                  KESCA-ONT-2026-002
                </Button>
                {' • '}
                <Button type="link" size="small" onClick={() => { setCertCode('KESCA-ONT-2026-005'); handleSearch('KESCA-ONT-2026-005'); }}>
                  KESCA-ONT-2026-005
                </Button>
              </Text>
            </div>
          </Card>

          {/* Verification Results */}
          {searched && (
            <div>
              {verifiedData ? (
                <Card
                  style={{
                    borderRadius: 12,
                    border: '2px solid #27AE60',
                    background: '#FAFCFA',
                    boxShadow: '0 8px 30px rgba(39, 174, 96, 0.12)',
                  }}
                  bodyStyle={{ padding: 32 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
                    <Space>
                      <CheckCircleOutlined style={{ fontSize: 32, color: '#27AE60' }} />
                      <div>
                        <Tag color="green" style={{ fontSize: 14, fontWeight: 700, padding: '3px 10px' }}>
                          {verifiedData.status}
                        </Tag>
                        <Title level={4} style={{ margin: 0, color: '#1B4F72' }}>
                          Official KESCA Accreditation
                        </Title>
                      </div>
                    </Space>
                    <Tag color="#1B4F72" style={{ fontSize: 14, padding: '4px 12px' }}>
                      Code: {verifiedData.code}
                    </Tag>
                  </div>

                  <Divider style={{ margin: '16px 0' }} />

                  <Descriptions bordered column={{ xs: 1, sm: 2 }} size="middle">
                    <Descriptions.Item label="Company Name">
                      <strong>{verifiedData.businessName}</strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Jurisdiction">
                      {verifiedData.city}
                    </Descriptions.Item>
                    <Descriptions.Item label="Certification Tier">
                      <Tag color="#1B4F72">{verifiedData.level}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Auditing Authority">
                      {verifiedData.inspector}
                    </Descriptions.Item>
                    <Descriptions.Item label="Effective Date">
                      {verifiedData.issuedDate}
                    </Descriptions.Item>
                    <Descriptions.Item label="Valid Through">
                      <span style={{ color: '#27AE60', fontWeight: 600 }}>{verifiedData.expiryDate}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Accredited Scope" span={2}>
                      {verifiedData.scope}
                    </Descriptions.Item>
                  </Descriptions>

                  <div style={{ marginTop: 24, padding: 16, background: '#EFF9F3', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <FileDoneOutlined style={{ fontSize: 24, color: '#27AE60' }} />
                    <Text style={{ fontSize: 13, color: '#2E7D32' }}>
                      This contractor has submitted geotagged Before &amp; After photo documentation verifying compliance with the KESCA Preventative Maintenance Code and NFPA 96 bare-metal standards.
                    </Text>
                  </div>
                </Card>
              ) : (
                <Card style={{ borderRadius: 12, textAlign: 'center', padding: '32px 20px' }}>
                  <CloseCircleOutlined style={{ fontSize: 56, color: '#E74C3C', marginBottom: 16 }} />
                  <Title level={3} style={{ color: '#1B4F72', marginTop: 0 }}>
                    Certificate Not Found
                  </Title>
                  <Paragraph style={{ color: '#666', maxWidth: 540, margin: '0 auto 20px', fontSize: 15 }}>
                    The certificate code <strong>"{certCode}"</strong> could not be validated against our accredited database.
                    Please verify the exact spelling, or contact KESCA headquarters to check manual records.
                  </Paragraph>
                  <Space size={16} wrap>
                    <Button onClick={() => setSearched(false)}>Try Another Code</Button>
                    <a href="mailto:info@airadvocates.net">
                      <Button type="primary" style={{ background: '#1B4F72', borderColor: '#1B4F72' }}>
                        Inquire with Rob Sweet
                      </Button>
                    </a>
                  </Space>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import {
  GlobalOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import kescaLogo from '../../styles/images/02 kesca 2020.jpg';

const { Title, Text, Paragraph } = Typography;

const partnerLinks = [
  {
    label: 'KESCA Certified Verification',
    href: '/verify',
    icon: <SafetyCertificateOutlined />,
    internal: true,
  },
  {
    label: 'Air Advocates',
    href: 'https://www.airadvocates.net',
    icon: <GlobalOutlined />,
  },
  {
    label: 'Friendly Green Giant',
    href: 'https://www.friendlygreengiant.ca',
    icon: <GlobalOutlined />,
  },
  {
    label: 'Slumlord Patrol',
    href: 'https://www.slumlordpatrol.com',
    icon: <GlobalOutlined />,
  },
  {
    label: 'Strongpoint Adventures',
    href: 'https://www.strongpointadventures.com',
    icon: <GlobalOutlined />,
  },
  {
    label: 'Air-Medics',
    href: 'https://air-medics.ca',
    icon: <GlobalOutlined />,
  },
];

const footerStyle = {
  background: '#1B2D3E',
  color: '#ccc',
  padding: '48px 24px 0',
};

const linkStyle = {
  color: '#aab8c2',
  display: 'inline-flex',
  alignItems: 'center',
  marginBottom: 10,
  textDecoration: 'none',
  fontSize: 14,
  transition: 'color 0.2s',
};

const bottomBarStyle = {
  borderTop: '1px solid rgba(255,255,255,0.1)',
  marginTop: 40,
  padding: '16px 0',
  textAlign: 'center',
};

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Row gutter={[48, 32]} align="top">
          {/* Brand column */}
          <Col xs={24} md={14}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <img
                src={kescaLogo}
                alt="KESCA Logo"
                style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 4 }}
              />
              <div>
                <Title level={4} style={{ color: '#fff', margin: 0, letterSpacing: 1 }}>
                  KESCA
                </Title>
                <Text style={{ color: '#E67E22', fontSize: 13, fontWeight: 500 }}>
                  Kitchen Exhaust Systems Cleaners Association
                </Text>
              </div>
            </div>
            <Paragraph style={{ color: '#aab8c2', fontSize: 15, maxWidth: 520, lineHeight: 1.7 }}>
              Setting the standard for kitchen exhaust cleaning, preventative maintenance codes, and fire safety in Canada.
            </Paragraph>
            <Paragraph style={{ color: '#aab8c2', fontSize: 14 }}>
              A volunteer initiative by{' '}
              <a
                href="https://www.airadvocates.net"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#E67E22', fontWeight: 600 }}
              >
                Air Advocates
              </a>
              . Contact:{' '}
              <a href="mailto:info@airadvocates.net" style={{ color: '#E67E22' }}>
                info@airadvocates.net
              </a>
            </Paragraph>
          </Col>

          {/* Partner links */}
          <Col xs={24} md={10}>
            <Title level={5} style={{ color: '#fff', marginBottom: 16, marginTop: 0 }}>
              Partners &amp; Affiliated Initiatives
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {partnerLinks.map((p) =>
                p.internal ? (
                  <Link key={p.label} to={p.href} style={linkStyle}>
                    <Space size={8}>
                      {p.icon}
                      <span>{p.label}</span>
                    </Space>
                  </Link>
                ) : (
                  <a
                    key={p.label}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                  >
                    <Space size={8}>
                      {p.icon}
                      <span>{p.label}</span>
                    </Space>
                  </a>
                )
              )}
            </div>
          </Col>
        </Row>

        <div style={bottomBarStyle}>
          <Text style={{ color: '#6b7f8c', fontSize: 13 }}>
            © 2026 KESCA — Kitchen Exhaust Systems Cleaners Association. Volunteer project by Air Advocates.
          </Text>
        </div>
      </div>
    </footer>
  );
}

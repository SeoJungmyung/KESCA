import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import {
  GlobalOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/standards', label: 'Standards' },
  { to: '/find-a-pro', label: 'Find a Pro' },
  { to: '/certification', label: 'Certification' },
  { to: '/education', label: 'Education' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const partnerLinks = [
  {
    label: 'KESCA Certified',
    href: '/certification',
    icon: <SafetyCertificateOutlined />,
    internal: true,
  },
  {
    label: 'Air Advocates',
    href: 'https://www.airadvocates.net',
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
  display: 'block',
  marginBottom: 8,
  textDecoration: 'none',
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
        <Row gutter={[32, 32]}>
          {/* Brand column */}
          <Col xs={24} sm={24} md={8}>
            <Title level={4} style={{ color: '#fff', marginBottom: 8 }}>
              KESCA
            </Title>
            <Paragraph style={{ color: '#aab8c2', fontSize: 15 }}>
              Setting the standard for kitchen exhaust cleaning in Canada
            </Paragraph>
            <Paragraph style={{ color: '#aab8c2', fontSize: 13 }}>
              A volunteer initiative by{' '}
              <a
                href="https://www.airadvocates.net"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#E67E22' }}
              >
                Air Advocates
              </a>
              . Contact:{' '}
              <a href="mailto:info@airadvocates.net" style={{ color: '#E67E22' }}>
                info@airadvocates.net
              </a>
            </Paragraph>
          </Col>

          {/* Quick links */}
          <Col xs={24} sm={12} md={8}>
            <Title level={5} style={{ color: '#fff', marginBottom: 16 }}>
              Quick Links
            </Title>
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} style={linkStyle}>
                {item.label}
              </Link>
            ))}
          </Col>

          {/* Partner links */}
          <Col xs={24} sm={12} md={8}>
            <Title level={5} style={{ color: '#fff', marginBottom: 16 }}>
              Partners &amp; Resources
            </Title>
            {partnerLinks.map((p) =>
              p.internal ? (
                <Link key={p.label} to={p.href} style={linkStyle}>
                  <Space>
                    {p.icon}
                    {p.label}
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
                  <Space>
                    {p.icon}
                    {p.label}
                  </Space>
                </a>
              )
            )}
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

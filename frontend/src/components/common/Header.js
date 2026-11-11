import React, { useState, useMemo } from 'react';
import { Menu, Button, Drawer, Typography, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import kescaLogo from '../../styles/images/02 kesca 2020.jpg';

const { Title, Text } = Typography;

const navItems = [
  { key: '/', label: 'Home' },
  { key: '/about', label: 'About' },
  { key: '/standards', label: 'Standards' },
  { key: '/find-a-pro', label: 'Find a Pro' },
  { key: '/certification', label: 'Certification' },
  { key: '/education', label: 'Education' },
  { key: '/events', label: 'Events' },
  { key: '/gallery', label: 'Gallery' },
  { key: '/contact', label: 'Contact' },
];

const headerStyle = {
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  background: '#ffffff',
  borderBottom: '1px solid #E2E8F0',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
};

const innerStyle = {
  maxWidth: 1240,
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 72,
  gap: 16,
};

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  // Determine currently selected menu key based on location.pathname
  const selectedKey = useMemo(() => {
    const path = location.pathname;
    if (path === '/') return '/';
    const match = navItems.find((item) => item.key !== '/' && path.startsWith(item.key));
    return match ? match.key : '';
  }, [location.pathname]);

  const menuItems = useMemo(() => {
    return navItems.map((item) => ({
      key: item.key,
      label: (
        <Link
          to={item.key}
          onClick={() => setDrawerOpen(false)}
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: selectedKey === item.key ? '#1B4F72' : '#2D3748',
          }}
        >
          {item.label}
        </Link>
      ),
    }));
  }, [selectedKey]);

  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        {/* Logo Section */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexShrink: 0,
          }}
        >
          <img
            src={kescaLogo}
            alt="KESCA Logo"
            style={{
              height: 50,
              width: 50,
              objectFit: 'contain',
              borderRadius: 6,
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: '#1B4F72',
                letterSpacing: 1.5,
                lineHeight: 1.1,
              }}
            >
              KESCA
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: '#718096',
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}
            >
              Cleaners Association
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Menu (disabledOverflow guarantees menu never collapses into ...) */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flex: '1 1 auto',
            minWidth: 0,
          }}
        >
          <Menu
            mode="horizontal"
            disabledOverflow={true}
            selectedKeys={selectedKey ? [selectedKey] : []}
            items={menuItems}
            style={{
              border: 'none',
              background: 'transparent',
              lineHeight: '70px',
              minWidth: 0,
              width: '100%',
              justifyContent: 'flex-end',
            }}
          />
        </nav>

        {/* Mobile Hamburger Button */}
        <Button
          className="mobile-menu-btn"
          type="text"
          icon={<MenuOutlined style={{ fontSize: 24, color: '#1B4F72' }} />}
          onClick={() => setDrawerOpen(true)}
          style={{ display: 'none' }}
          aria-label="Toggle navigation menu"
        />
      </div>

      {/* Mobile Drawer Navigation */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src={kescaLogo}
              alt="KESCA Logo"
              style={{ height: 36, width: 36, objectFit: 'contain' }}
            />
            <span style={{ color: '#1B4F72', fontWeight: 800, fontSize: 18 }}>KESCA</span>
          </div>
        }
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={280}
      >
        <Menu
          mode="inline"
          selectedKeys={selectedKey ? [selectedKey] : []}
          items={menuItems}
          style={{ border: 'none', fontSize: 16 }}
        />
      </Drawer>

      <style>{`
        @media (max-width: 1030px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: inline-flex !important;
          }
        }
        .desktop-nav .ant-menu-horizontal {
          border-bottom: none !important;
          display: flex !important;
        }
        .desktop-nav .ant-menu-item {
          padding: 0 14px !important;
        }
        .desktop-nav .ant-menu-item-selected {
          color: #1B4F72 !important;
          // border-bottom: 3px solid #1B4F72 !important;
        }
      `}</style>
    </header>
  );
}

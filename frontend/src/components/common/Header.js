import React, { useState } from 'react';
import { Menu, Button, Drawer, Typography, Row, Col } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const { Title } = Typography;

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
  zIndex: 100,
  background: '#fff',
  borderBottom: '1px solid #eee',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};

const innerStyle = {
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 64,
};

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = navItems.find((item) => item.key !== '/' && location.pathname.startsWith(item.key))?.key
    || (location.pathname === '/' ? '/' : '');

  const menuItems = navItems.map((item) => ({
    key: item.key,
    label: item.label,
  }));

  const handleMenuClick = ({ key }) => {
    navigate(key);
    setDrawerOpen(false);
  };

  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Title
            level={3}
            style={{ margin: 0, color: '#1B4F72', letterSpacing: 2, fontWeight: 900 }}
          >
            KESCA
          </Title>
        </Link>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Menu
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ border: 'none', background: 'transparent', fontSize: 15 }}
          />
        </div>

        {/* Mobile hamburger */}
        <Button
          className="mobile-menu-btn"
          type="text"
          icon={<MenuOutlined style={{ fontSize: 22 }} />}
          onClick={() => setDrawerOpen(true)}
          style={{ display: 'none' }}
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={<span style={{ color: '#1B4F72', fontWeight: 700 }}>KESCA</span>}
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={280}
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ border: 'none' }}
        />
      </Drawer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}

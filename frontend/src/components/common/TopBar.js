import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const topBarStyle = {
  background: '#1B4F72',
  padding: '6px 24px',
};

const textStyle = {
  color: '#fff',
  fontSize: 13,
};

export default function TopBar() {
  return (
    <div style={topBarStyle}>
      <Row justify="space-between" align="middle">
        <Col xs={0} sm={12}>
          <Text style={textStyle}>KESCA — Kitchen Exhaust Systems Cleaners Association</Text>
        </Col>
        <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
          <Link to="/find-a-pro">
            <Button
              size="small"
              style={{ marginRight: 8, background: 'transparent', borderColor: '#fff', color: '#fff' }}
            >
              Find certified companies
            </Button>
          </Link>
          <Link to="/certification">
            <Button size="small" style={{ background: '#E67E22', borderColor: '#E67E22', color: '#fff' }}>
              Get certified
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

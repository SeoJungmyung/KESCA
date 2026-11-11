import React from 'react';
import { Card, Tag, Typography, Space } from 'antd';
import { PhoneOutlined, GlobalOutlined, SafetyCertificateOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

export default function BusinessCard({ business }) {
  if (!business) return null;
  const { name, city, province, certified, phone, website } = business;

  return (
    <Card
      hoverable
      style={{ marginBottom: 16, borderRadius: 8 }}
      bodyStyle={{ padding: '20px 24px' }}
    >
      <Space direction="vertical" size={6} style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Title level={5} style={{ margin: 0, color: '#1B4F72' }}>
            {name}
          </Title>
          {certified && (
            <Tag icon={<SafetyCertificateOutlined />} color="#1B4F72">
              KESCA Certified
            </Tag>
          )}
        </div>

        {(city || province) && (
          <Space size={4}>
            <EnvironmentOutlined style={{ color: '#888' }} />
            <Text type="secondary">
              {[city, province].filter(Boolean).join(', ')}
            </Text>
          </Space>
        )}

        {phone && (
          <Space size={4}>
            <PhoneOutlined style={{ color: '#888' }} />
            <a href={`tel:${phone}`} style={{ color: '#1B4F72' }}>
              {phone}
            </a>
          </Space>
        )}

        {website && (
          <Space size={4}>
            <GlobalOutlined style={{ color: '#888' }} />
            <a
              href={website.startsWith('http') ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#E67E22' }}
            >
              {website.replace(/^https?:\/\//, '')}
            </a>
          </Space>
        )}
      </Space>
    </Card>
  );
}

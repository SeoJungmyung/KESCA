import React from 'react';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function SectionTitle({ title, subtitle, align = 'center', style = {} }) {
  return (
    <div style={{ textAlign: align, marginBottom: 40, ...style }}>
      <Title level={2} style={{ color: '#1B4F72', marginBottom: subtitle ? 8 : 0 }}>
        {title}
      </Title>
      {subtitle && (
        <Text style={{ fontSize: 17, color: '#555', display: 'block' }}>{subtitle}</Text>
      )}
    </div>
  );
}

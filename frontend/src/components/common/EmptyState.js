import React from 'react';
import { Empty } from 'antd';

export default function EmptyState({ description = 'No data available', image }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 0' }}>
      <Empty
        image={image || Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span style={{ color: '#888', fontSize: 15 }}>{description}</span>}
      />
    </div>
  );
}

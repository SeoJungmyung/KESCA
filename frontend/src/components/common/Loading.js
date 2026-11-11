import React from 'react';
import { Spin } from 'antd';

export default function Loading({ tip = 'Loading...' }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 0' }}>
      <Spin size="large" tip={tip} />
    </div>
  );
}

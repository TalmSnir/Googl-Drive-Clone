import React from 'react';
import { Container } from 'react-bootstrap';
export default function CenterContainer({ children }) {
  return (
    <Container
      className='d-flex align-items-center justify-content-center flex-dir-col'
      style={{ minHeight: '100vh' }}>
      <div className='w-100' style={{ maxWidth: '400px' }}>
        {children}
      </div>
    </Container>
  );
}

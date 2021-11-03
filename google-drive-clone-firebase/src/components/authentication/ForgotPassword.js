import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { CenterContainer } from '..';

export default function ForgotPassword() {
  const emailRef = useRef(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setError('');
      setMessage('');
      setLoading(true);
      await forgotPassword(emailRef.current.value);
      setMessage('check your inbox for a reset password email');
    } catch {
      setError('failed to reset password');
    }
    setLoading(false);
  };
  return (
    <CenterContainer>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Forgot Password</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email' className='mb-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required ref={emailRef} />
            </Form.Group>

            <Button type='submit' className='w-100 mt-4' disabled={loading}>
              Reset Password
            </Button>
          </Form>
          <div className='w-100 text-center mt-2'>
            <Link to='/login'>Log in</Link>
          </div>
        </Card.Body>
      </Card>
    </CenterContainer>
  );
}

import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { CenterContainer } from '..';

export default function UpdateProfile() {
  const { updateUserEmail, updateUserPassword, currentUser } = useAuth();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const promises = [];
    if (emailRef.current.value !== currentUser.email)
      promises.push(updateUserEmail(currentUser, emailRef.current.value));
    if (passwordRef.current.length !== 0)
      promises.push(updateUserPassword(currentUser, passwordRef.current.value));

    Promise.all(promises)
      .then(() => {
        history.push('/user');
      })
      .catch(() => {
        setError('failed to update profile');
      })
      .finally(() => setLoading(false));
  };
  return (
    <CenterContainer>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email' className='mb-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                required
                ref={emailRef}
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id='password' className='mb-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                placeholder='leave blank if no change is required'
              />
            </Form.Group>

            <Button type='submit' className='w-100 mt-4' disabled={loading}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to='/user'>Cancel</Link>
      </div>
    </CenterContainer>
  );
}

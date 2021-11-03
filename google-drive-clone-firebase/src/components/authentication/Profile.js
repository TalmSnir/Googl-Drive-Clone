import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { CenterContainer } from '..';

export default function Profile() {
  const history = useHistory();
  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      history.push('/login');
    } catch {
      setError('failed to logout');
    }
  };
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();

  return (
    <CenterContainer>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <div className='text-center w-100'>
            <strong>Email: {currentUser.email}</strong>
          </div>
          <Link to='/update-profile' className='btn btn-primary mt-4 w-100'>
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button variant='link' onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </CenterContainer>
  );
}

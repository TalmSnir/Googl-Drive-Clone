import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavbarComp() {
  return (
    <Navbar
      expand='sm'
      bg='light'
      className='justify-content-between align-items-center px-4'>
      <Navbar.Brand as={Link} to='/'>
        Google Drive clone
      </Navbar.Brand>

      <Nav>
        <Nav.Link as={Link} to='/user'>
          Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

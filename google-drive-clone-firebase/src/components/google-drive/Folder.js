import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FolderFill } from 'react-bootstrap-icons';

export default function Folder({ folder }) {
  return (
    <Button
      as={Link}
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder },
      }}
      variant='outline-dark'
      className='text-truncate w-100  d-flex align-items-center gap-2'>
      <FolderFill size={16} className='flex-shrink-0' /> {folder.name}
    </Button>
  );
}

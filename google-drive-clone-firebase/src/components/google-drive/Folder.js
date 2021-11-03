import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FolderFill, XLg } from 'react-bootstrap-icons';

export default function Folder({ folder, handleDelete }) {
  return (
    <div className=' w-100 btn btn-outline-dark d-flex align-items-center gap-2'>
      <FolderFill size={16} className='flex-shrink-0' />
      <Link
        to={{
          pathname: `/folder/${folder.id}`,
          state: { folder },
        }}
        variant='outline-dark'
        className='text-truncate w-100 text-decoration-none text-secondary '>
        {folder.name}
      </Link>
      <Button
        variant='outline-dark'
        size='sm'
        style={{ border: 'none' }}
        onClick={() => handleDelete(folder)}>
        <XLg className='text-secondary' />
      </Button>
    </div>
  );
}

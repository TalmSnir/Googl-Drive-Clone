import React from 'react';

import {
  FileEarmarkFill,
  FileEarmarkImageFill,
  FileEarmarkPdfFill,
  FileEarmarkPptFill,
  FileEarmarkWordFill,
  XLg,
} from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
export default function File({ file, handleDelete }) {
  const fileExtension = file.name.split('.').pop();
  const fileTypes = {
    pdf: FileEarmarkPdfFill,
    pptx: FileEarmarkPptFill,
    jpeg: FileEarmarkImageFill,
    png: FileEarmarkImageFill,
    word: FileEarmarkWordFill,
  };
  const Icon = fileTypes[fileExtension]
    ? fileTypes[fileExtension]
    : FileEarmarkFill;
  return (
    <div className=' w-100 btn btn-outline-dark d-flex align-items-center gap-2'>
      <Icon size={16} className='flex-shrink-0' />
      <a
        href={file.url}
        target='_blank'
        rel='noreferrer'
        className=' w-100 text-truncate text-secondary  text-decoration-none'>
        {file.name}
      </a>
      <Button
        variant='outline-dark'
        size='sm'
        style={{ border: 'none' }}
        onClick={() => handleDelete(file)}>
        <XLg className='text-secondary' />
      </Button>
    </div>
  );
}

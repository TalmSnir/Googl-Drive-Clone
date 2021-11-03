import React from 'react';
import {
  NavbarComp as Navbar,
  AddFolderButton,
  AddFileButton,
  Folder,
  FolderBreadcrumbs,
  File,
} from '.';
import { Container } from 'react-bootstrap';
import { useFolder } from '../../hooks';
import { useParams, useLocation } from 'react-router-dom';

export default function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const [FolderState, handleDeleteFile, handleDeleteFolder] = useFolder(
    folderId,
    state.folder
  );
  const { folder, childFolders, childFiles } = FolderState;
  return (
    <>
      <Navbar />
      <Container fluid>
        <div className='d-flex align-items-center pt-4 px-2'>
          <FolderBreadcrumbs currentFolder={folder} />

          <AddFolderButton currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
        </div>
        {childFolders && childFolders.length > 0 && (
          <div className='d-flex flex-wrap'>
            {childFolders.map(folder => {
              return (
                <div
                  key={folder.id}
                  style={{ maxWidth: '250px' }}
                  className='p-2'>
                  <Folder folder={folder} handleDelete={handleDeleteFolder} />
                </div>
              );
            })}
          </div>
        )}
        {childFiles &&
          childFiles.length > 0 &&
          childFiles &&
          childFiles.length > 0 && <hr />}
        {childFiles && childFiles.length > 0 && (
          <div className='d-flex flex-wrap'>
            {childFiles.map(file => {
              return (
                <div
                  key={file.id}
                  style={{ maxWidth: '250px' }}
                  className='p-2'>
                  <File file={file} handleDelete={handleDeleteFile} />
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}

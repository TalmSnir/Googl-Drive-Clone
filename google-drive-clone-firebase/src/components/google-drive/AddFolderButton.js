import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { FolderPlus } from 'react-bootstrap-icons';
import { db } from '../../firebase';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { ROOT_FOLDER } from '../../hooks/useFolder';

export default function AddFolderButton({ currentFolder }) {
  const [openModal, setOpenModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  const handleModal = () => {
    setOpenModal(prev => !prev);
  };
  const handleChange = e => {
    setFolderName(e.target.value);
  };
  const addFolder = async e => {
    e.preventDefault();
    try {
      const path = [...currentFolder.path];
      if (currentFolder !== ROOT_FOLDER) {
        path.push({ name: currentFolder.name, id: currentFolder.id });
      }
      await addDoc(db.folders, {
        name: folderName,
        userId: currentUser.uid,
        parentId: currentFolder.id,
        createdAt: serverTimestamp(),
        path: path,
      });
    } catch {
      setError("something went wrong, folder hasn't been added, try again");
    }
    handleModal();
    setFolderName('');
    setError('');
  };
  return (
    <>
      {error && <Alert variant='danger'>error</Alert>}
      <Modal show={openModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Folder</Modal.Title>
        </Modal.Header>
        <Form onSubmit={addFolder}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder name</Form.Label>
              <Form.Control
                type='text'
                required
                value={folderName}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit'>Add Folder</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Button onClick={handleModal} variant='outline-primary'>
        <FolderPlus />
      </Button>
    </>
  );
}

import React, { useState } from 'react';
import { ProgressBar, Toast, ToastContainer } from 'react-bootstrap';
import { FileEarmarkPlus } from 'react-bootstrap-icons';
import { storage, db } from '../../firebase';
import {
  addDoc,
  serverTimestamp,
  query,
  where,
  updateDoc,
  getDoc,
  getDocs,
  doc,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../context/AuthContext';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { v4 as uuid } from 'uuid';
export default function AddFileButton({ currentFolder }) {
  const { currentUser } = useAuth();
  const [filesProgress, setFilesProgress] = useState([]);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setFilesProgress([]);
    setError(false);
  };
  const handleUpload = e => {
    const file = e.target.files[0];

    if (currentFolder == null || file == null) return;
    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join(`/`)}/${file.name}`
        : `${currentFolder.path.join(`/`)}/${currentFolder.name}/${file.name}`;
    const storageRef = ref(storage, `/files/${currentUser.uid}/${filePath}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const id = uuid();
    setFilesProgress(prevProgress => {
      return [
        ...prevProgress,
        { id: id, progress: 0, name: file.name, error: '' },
      ];
    });
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilesProgress(prevFiles => {
          return prevFiles.map(file => {
            if (file.id === id) return { ...file, progress: progress };
            return file;
          });
        });
      },
      error => {
        setFilesProgress(prevFiles => {
          return prevFiles.map(file => {
            if (file.id === id) {
              return { ...file, error: error };
            }
            return file;
          });
        });
        setError(true);
      },
      async () => {
        setFilesProgress(prevFiles =>
          [...prevFiles].filter(file => file.id !== id)
        );

        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        const q = query(
          db.files,
          where('name', '==', file.name),
          where('userId', '==', currentUser.uid),
          where('folderId', '==', currentFolder.id)
        );
        const qSnapShot = await getDocs(q);
        console.log(qSnapShot, qSnapShot.docs[0]);
        const existingFile = qSnapShot ? qSnapShot.docs[0] : null;

        if (existingFile) {
          await updateDoc(existingFile.ref, {
            url: downloadUrl,
            createdAt: serverTimestamp(),
          });
        } else {
          addDoc(db.files, {
            url: downloadUrl,
            name: file.name,
            createdAt: serverTimestamp(),
            folderId: currentFolder.id,
            userId: currentUser.uid,
            path: `/files/${currentUser.uid}/${filePath}`,
          });
        }
      }
    );
  };

  return (
    <>
      <label htmlFor='fileInput' className='btn btn-outline-primary ms-2'>
        <FileEarmarkPlus />
      </label>
      <input
        id='fileInput'
        name='fileInput'
        type='file'
        onChange={handleUpload}
        style={{ opacity: 0, position: 'absolute', left: '-9999px' }}
      />

      <ToastContainer
        position={'bottom-start'}
        className='zindex-modal rounded w-25 '>
        <Toast
          onClose={handleClose}
          show={filesProgress && filesProgress.length > 0}>
          <Toast.Header closeButton={filesProgress.length > 0 && error}>
            Uploading files
          </Toast.Header>
          <Toast.Body>
            {filesProgress &&
              filesProgress.length > 0 &&
              filesProgress.map(file => (
                <>
                  <span
                    className='text-truncate d-block'
                    style={{ maxWidth: '150px' }}>
                    {file.name}
                  </span>
                  <ProgressBar
                    key={file.id}
                    animated={!file.error}
                    variant={file.error ? 'danger' : 'primary'}
                    now={file.error ? 100 : file.progress}
                    label={
                      file.error ? 'error' : `${Math.floor(file.progress)}%`
                    }
                  />
                </>
              ))}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

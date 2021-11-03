import { useReducer, useEffect } from 'react';
import { db, storage } from '../firebase';
import {
  doc,
  getDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useAuth } from '../context/AuthContext';

const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
  SET_CHILD_FOLDERS: 'set-child-folders',
  SET_CHILD_FILES: 'set-child-files',
};

export const ROOT_FOLDER = { name: 'Root', id: null, path: [] };

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: action.payload.folderId,
        folder: action.payload.folder,
        childFolders: [],
        childFiles: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return { ...state, folder: action.payload.folder };
    case ACTIONS.SET_CHILD_FOLDERS:
      return { ...state, childFolders: action.payload.childFolders };
    case ACTIONS.SET_CHILD_FILES:
      return { ...state, childFiles: action.payload.childFiles };
    default:
      return state;
  }
}

export function useFolder(folderId = null, folder = null) {
  const { currentUser } = useAuth();

  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }
    getDoc(doc(db.folders, folderId))
      .then(doc => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: db.formatDoc(doc) },
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    const q = query(
      db.folders,
      where('parentId', '==', folderId),
      where('userId', '==', currentUser.uid)
      //   orderBy('createdAt')
    );

    return onSnapshot(q, qSnapShot => {
      return dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: { childFolders: qSnapShot.docs.map(db.formatDoc) },
      });
    });
  }, [folderId, currentUser]);

  useEffect(() => {
    const q = query(
      db.files,
      where('folderId', '==', folderId),
      where('userId', '==', currentUser.uid)
      //   orderBy('createdAt')
    );

    return onSnapshot(q, qSnapShot => {
      return dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: { childFiles: qSnapShot.docs.map(db.formatDoc) },
      });
    });
  }, [folderId, currentUser]);

  const handleDeleteFile = async file => {
    try {
      const fileRef = ref(storage, file.path);
      await deleteObject(fileRef);
      await deleteDoc(doc(db.files, file.id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteFolder = async folder => {
    try {
      //deleting all the files inside the folder
      //   const fileRef = ref(storage, file.path);
      //   await deleteObject(fileRef);
      //   await deleteDoc(doc(db.files, file.id));
    } catch (err) {
      console.log(err);
    }
  };

  return [state, handleDeleteFile, handleDeleteFolder];
}

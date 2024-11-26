import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const getProfile = async (uid) => {
  const docRef = doc(db, 'profiles', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const saveProfile = async (uid, profileData) => {
  const docRef = doc(db, 'profiles', uid);
  await setDoc(docRef, profileData);
};
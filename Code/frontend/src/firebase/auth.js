/* istanbul ignore file */
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
        if (err.code === 'auth/network-request-failed') {
            throw new Error("Network error, please try again later.");
        }
        throw err;
    }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        if (err.code === 'auth/network-request-failed') {
            throw new Error("Network error, please try again later.");
        }
        throw err;
    }
};

export const doSignOut = async () => {
    try {
        return await auth.signOut();
    } catch (err) {
        if (err.code === 'auth/network-request-failed') {
            throw new Error("Network error, please try again later.");
        }
        throw err;
    }
};

export const getProfile = async (uid) => {
    const docRef = doc(db, 'profiles', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
};

export const saveProfile = async (uid, profileData) => {
    const docRef = doc(db, 'profiles', uid);
    await setDoc(docRef, profileData);
};


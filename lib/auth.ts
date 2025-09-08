"use client";
import { auth, db } from './firebase';
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

export type UserRole = 'member' | 'trainer' | 'admin';

export type AppUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  mylci?: string; // unique ID
  createdAt?: any;
};

export function onAuth(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}

export async function getUserProfile(uid: string): Promise<AppUser | null> {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as AppUser) : null;
}

// Enforce MyLCI uniqueness using a mapping collection: mylci/{id} -> { uid }
async function claimMyLCI(mylci: string, uid: string) {
  const mylciRef = doc(db, 'mylci', mylci);
  const userRef = doc(db, 'users', uid);
  await runTransaction(db, async (tx) => {
    const lock = await tx.get(mylciRef);
    if (lock.exists()) {
      throw new Error('This MyLCI number is already registered.');
    }
    tx.set(mylciRef, { uid, createdAt: serverTimestamp() });
    tx.set(userRef, { mylci }, { merge: true });
  });
}

export async function registerWithEmail(params: {
  email: string;
  password: string;
  displayName: string;
  mylci: string; // must be unique
}) {
  const { email, password, displayName, mylci } = params;
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) await updateProfile(cred.user, { displayName });

  // Create profile first with role = member by default
  const userRef = doc(db, 'users', cred.user.uid);
  await setDoc(userRef, {
    uid: cred.user.uid,
    email,
    displayName,
    role: 'member',
    createdAt: serverTimestamp(),
  } as AppUser);

  // Attempt to claim MyLCI (unique)
  await claimMyLCI(mylci, cred.user.uid);
  return cred.user;
}

export async function loginWithEmail(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  await ensureUserDoc(user);
  return user;
}

export async function loginWithMicrosoft() {
  const provider = new OAuthProvider('microsoft.com');
  const { user } = await signInWithPopup(auth, provider);
  await ensureUserDoc(user);
  return user;
}

async function ensureUserDoc(user: User) {
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      email: user.email ?? null,
      displayName: user.displayName ?? null,
      photoURL: user.photoURL ?? null,
      role: 'member',
      createdAt: serverTimestamp(),
    } satisfies AppUser);
  }
}

export async function logout() {
  await signOut(auth);
}
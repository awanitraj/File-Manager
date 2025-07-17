'use client';

import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { useEffect, useState } from 'react';

export default function AuthButtons() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      {user ? (
        <>
          <p className="text-green-600">Signed in as: {user.email}</p>
          <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
        </>
      ) : (
        <button onClick={signInWithGoogle} className="bg-blue-600 text-white px-4 py-2 rounded">Sign In with Google</button>
      )}
    </div>
  );
}

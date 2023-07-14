import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/config/firebase';

export const useRatings = () => {
  const [userRatings, setUserRatings] = useState({});
  const [user, setUser] = useState(null);

  const fetchUserRatings = async (userId) => {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const ratings = userDoc.data().ratings || {};
      setUserRatings(ratings);
    } else {
      setUserRatings({});
    }
  };

  const addRating = async (gameId, rating) => {
    if (!user) {
      alert('Faça login para avaliar um jogo!');
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const ratings = userDoc.data().ratings || {};
      ratings[gameId] = rating;

      await updateDoc(userRef, {
        ratings: ratings,
      });

      setUserRatings(ratings);
    } else {
      const ratings = {};
      ratings[gameId] = rating;

      await setDoc(userRef, {
        email: user.email,
        name: user.displayName,
        favorites: [],
        ratings: ratings,
      });

      setUserRatings(ratings);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserRatings(currentUser.uid);
      } else {
        setUserRatings({});
      }
    });
  }, []);

  return { userRatings, addRating };
};


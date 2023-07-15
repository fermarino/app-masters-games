import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const useRatings = () => {
  const [userRatings, setUserRatings] = useState({});
  const [gameRatings, setGameRatings] = useState({});

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

  const calculateGameRatings = useCallback(() => {
    const ratingsCount = {};
    const ratingsSum = {};

    Object.entries(userRatings).forEach(([gameId, rating]) => {
      if (ratingsCount[gameId]) {
        ratingsCount[gameId] += 1;
        ratingsSum[gameId] += rating;
      } else {
        ratingsCount[gameId] = 1;
        ratingsSum[gameId] = rating;
      }
    });

    const gameRatings = {};

    Object.entries(ratingsCount).forEach(([gameId, count]) => {
      const average = ratingsSum[gameId] / count;
      gameRatings[gameId] = {
        count,
        average,
      };
    });

    setGameRatings(gameRatings);
  }, [userRatings]);

  const addRating = async (gameId, rating) => {
    if (!auth.currentUser) {
      alert('Faça login para avaliar um jogo!');
      return;
    }

    const userRef = doc(db, 'users', auth.currentUser.uid);
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

      await db.collection('users').doc(auth.currentUser.uid).set({
        email: auth.currentUser.email,
        name: auth.currentUser.displayName,
        favorites: [],
        ratings: ratings,
      });

      setUserRatings(ratings);
    }
  };

  const removeRating = async (gameId) => {
    if (!auth.currentUser) {
      alert('Faça login para remover sua avaliação!');
      return;
    }

    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const ratings = userDoc.data().ratings || {};

      if (ratings[gameId]) {
        delete ratings[gameId];

        await updateDoc(userRef, {
          ratings: ratings,
        });

        setUserRatings(ratings);
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchUserRatings(currentUser.uid);
      } else {
        setUserRatings({});
        setGameRatings({});
      }
    });
  }, []);

  useEffect(() => {
    calculateGameRatings();
  }, [userRatings, calculateGameRatings]);

  return { userRatings, gameRatings, addRating, removeRating };
};

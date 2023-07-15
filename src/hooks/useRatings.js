import { useState, useEffect } from 'react';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

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

  const updateGameRatings = async (gameId, ratings) => {
    const gameRef = doc(db, 'games', gameId);
    const gameDoc = await getDoc(gameRef);
  
    if (gameDoc.exists()) {
      const gameData = gameDoc.data();
      const previousCount = gameData.num_ratings || 0;
      const previousRatings = gameData.ratings || [];
  
      const newCount = Object.keys(ratings).length;
      const newRatings = Object.entries(ratings);
  
      // Merge the existing and new ratings
      const updatedRatings = [
        ...previousRatings,
        ...newRatings.map(([userId, rating]) => ({ userId, rating })),
      ];
  
      // Calculate the total ratings and average rating
      const newTotal = updatedRatings.reduce((sum, { rating }) => sum + rating, 0);
      const newAverage = newTotal / newCount;
  
      // Update the game document
      await updateDoc(gameRef, {
        num_ratings: newCount,
        ratings: updatedRatings,
        total_ratings: newTotal,
        average_rating: newAverage,
      });
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
      await updateGameRatings(gameId, ratings);
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

  const removeRating = async (gameId) => {
    if (!user) {
      alert('Faça login para remover sua avaliação!');
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const ratings = userDoc.data().ratings || {};

      if (ratings[gameId]) {
        delete ratings[gameId];

        await updateDoc(userRef, {
          ratings: ratings,
        });

        setUserRatings(ratings);
        await updateGameRatings(gameId, ratings);
      }
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

  return { userRatings, addRating, removeRating };
};

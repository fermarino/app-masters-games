import { useState, useEffect } from 'react';
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const useFavorites = () => {
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [user, setUser] = useState(null);

  const fetchFavoriteGames = async (userId) => {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const favorites = userDoc.data().favorites || [];
      setFavoriteGames(favorites);
    } else {
      setFavoriteGames([]);
    }
  };

  const addFavorite = async (gameId) => {
    if (!user) {
      alert('Faça login para favoritar um jogo!');
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const favorites = userDoc.data().favorites || [];
      const gameIndex = favorites.indexOf(gameId);

      if (gameIndex !== -1) {
        await updateDoc(userRef, {
          favorites: arrayRemove(gameId),
        });
        setFavoriteGames(favorites.filter((id) => id !== gameId));
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(gameId),
        });
        setFavoriteGames([...favorites, gameId]);
      }
    } else {
      await setDoc(userRef, {
        email: user.email,
        name: user.displayName,
        favorites: [gameId],
      });
      setFavoriteGames([gameId]);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchFavoriteGames(currentUser.uid);
      } else {
        setFavoriteGames([]);
      }
    });

    return () => unsubscribe(); // Cancela o listener ao desmontar o componente
  }, []);

  useEffect(() => {
    if (user) {
      fetchFavoriteGames(user.uid);
    }
  }, [user]);

  return { favoriteGames, addFavorite, user };
};

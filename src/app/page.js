'use client';

import styles from './page.module.css';

import GamesData from '@/services/GamesData';
import GamesList from '@/components/GamesList/GamesList';
import { auth, db } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

const Home = () => {
  const [user, setUser] = useState(null);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  
  const { games, isLoading, error } = GamesData();
  const hasGames = games.length > 0;


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

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchFavoriteGames(currentUser.uid);
        fetchUserRatings(currentUser.uid);
      } else {
        setUser(null);
        setFavoriteGames([]);
        setUserRatings({});
      }
    });
  }, []);


  const handleFavorite = async gameId => {
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
          favorites: arrayRemove(gameId)
        });
        setFavoriteGames(favorites.filter(id => id !== gameId));
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(gameId)
        });
        setFavoriteGames([...favorites, gameId]);
      }
    } else {
      await setDoc(userRef, {
        email: user.email,
        name: user.displayName,
        favorites: [gameId]
      });
      setFavoriteGames([gameId]);
    }
  };

  const handleRating = async (gameId, rating) => {
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



  if (isLoading) {
    return <div className={styles.loader} />;
  }

  if (error) {
    return <span className={styles.customError}>{error}</span>;
  }

  return <GamesList games={games} user={user} onFavorite={handleFavorite} favoriteGames={favoriteGames} userRatings={userRatings} onRating={handleRating} />;
};

export default Home;

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
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm/LoginForm';
import Register from '@/components/RegisterForm/SignUp';
import { useState, useEffect } from 'react';

const Home = () => {
  const [user, setUser] = useState(null);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isSignupFormVisible, setIsSignupFormVisible] = useState(false);
  const { games, isLoading, error } = GamesData();
  const hasGames = games.length > 0;

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogin = () => {
    setIsLoginFormVisible(true);
  };

  const handleSignup = () => {
    setIsSignupFormVisible(true);
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      router.push('/');
    });
  };

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
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(gameId)
        });
      }
    } else {
      await setDoc(userRef, {
        email: user.email,
        name: user.displayName,
        favorites: [gameId]
      });
    }
  };

  if (isLoading) {
    return <div className={styles.loader} />;
  }

  if (error) {
    return <span className={styles.customError}>{error}</span>;
  }

  return <GamesList games={games} user={user} onFavorite={handleFavorite} />;
};

export default Home;

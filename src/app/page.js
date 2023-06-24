'use client';

import React from 'react';
import GamesData from '@/components/GameData/GamesData';
import GamesList from '@/components/GamesList/GamesList';

const Home = () => {
  const { games, isLoading, error } = GamesData();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <span>{error}</span>;
  }

  if (games.length > 0) {
    return (
        <GamesList games={games} />
    );
  }

  return ;
};

export default Home;

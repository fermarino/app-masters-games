'use client'
import FavoritesPage from '@/components/FavoritesPage/FavoritesPage';
import GamesData from '@/services/GamesData';

const Favorites = () => {
  const { games } = GamesData();

  return <FavoritesPage games={games} />;
};

export default Favorites;

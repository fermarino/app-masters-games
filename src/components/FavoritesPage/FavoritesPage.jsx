'use client'

import { useEffect } from 'react';
import GamesList from '@/components/GamesList/GamesList';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useRatings } from '@/hooks/useRatings'; 

const FavoritesPage = ({ games }) => {
  const { favoriteGames } = useFavorites();
  const { userRatings, addRating } = useRatings();
  const { user } = useAuth();

  const handleRating = (gameId, ratingValue) => {
    addRating(gameId, ratingValue);
  };

  const filteredGames = games?.filter((game) => favoriteGames.includes(game.id));

  useEffect(() => {
    document.title = 'Meus Favoritos';
  }, []);

  return (
    <div>
      <GamesList games={filteredGames} user={user} onRating={handleRating} userRatings={userRatings} favoriteGames={favoriteGames} />
    </div>
  );
};


export default FavoritesPage;

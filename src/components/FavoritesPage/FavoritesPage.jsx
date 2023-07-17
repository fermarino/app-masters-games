'use client'

import { useEffect } from 'react';
import GamesList from '@/components/GamesList/GamesList';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/hooks/useAuth';
import { useRatings } from '@/hooks/useRatings'; 
import { useRouter } from 'next/navigation';


const FavoritesPage = ({ games }) => {
  const { favoriteGames } = useFavorites();
  const { userRatings, addRating } = useRatings();
  const { user, isLoading } = useAuth();

  const router = useRouter()

  const handleRating = (gameId, ratingValue) => {
    addRating(gameId, ratingValue);
  };

  const filteredGames = games?.filter((game) => favoriteGames.includes(game.id));

  useEffect(() => {
    document.title = 'Masters Games - Favoritos';
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [user, isLoading, router]);

  return (
    <div>
      <GamesList games={filteredGames} user={user} onRating={handleRating} userRatings={userRatings} favoriteGames={favoriteGames} />
    </div>
  );
};


export default FavoritesPage;

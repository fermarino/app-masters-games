import { useState } from 'react';
import styles from './GamesList.module.css';

import { useFavorites } from '@/hooks/useFavorites';

import Game from '../Game/Game';
import Header from '../Header/Header';
import BackToTop from '../BackToTop/BackToTop';

const GamesList = ({ games, user, onRating, userRatings, favoriteGames }) => {
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState('All');
  const [showFavorites, setShowFavorites] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const { addFavorite } = useFavorites();

  const lowerSearch = search.toLowerCase();

  const handleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const filteredGames = games.filter((game) => {
    const matchTitle = game?.title?.toLowerCase().includes(lowerSearch);
    const matchGenre =
      isActive === 'All' || game.genre.toLowerCase() === isActive.toLowerCase();
    return matchTitle && matchGenre;
  });

  const filteredGenres = games.reduce((genres, game) => {
    if (!genres.includes(game.genre)) {
      genres.push(game.genre);
    }
    return genres;
  }, []);

  const handleClickFilter = (genre) => {
    setIsActive(genre);
  };

  return (
    <>
      <Header
        onSearch={handleSearch}
        genres={filteredGenres}
        handleClickFilter={handleClickFilter}
        user={user}
        showFavorites={showFavorites}
        handleFavorites={handleFavorites}
      />

      <main>
        <div className={styles.container}>
          <div className={styles.gamesList}>
          {filteredGames.map((game) => (
              <Game
                game={game}
                id={game.id}
                key={game.id}
                isFavorite={favoriteGames?.includes(game.id)}
                onFavorite={addFavorite}
                onRating={onRating}
                userRating={userRatings[game.id]}
                user={user}
                isExpanded={expandedCardId === game.id}
                setExpandedCardId={setExpandedCardId}
              />
            ))}
            <BackToTop />
          </div>
        </div>
      </main>
    </>
  );
};

export default GamesList;
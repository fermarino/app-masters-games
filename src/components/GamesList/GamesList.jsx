import { useState } from 'react'
import styles from './GamesList.module.css'

import { useFavorites } from '@/hooks/useFavorites';

import Game from '../Game/Game'
import Header from '../Header/Header'
import BackToTop from '../BackToTop/BackToTop'

const GamesList = ({ games, user, onRating, userRatings }) => {

  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState('All');
  const [showFavorites, setShowFavorites] = useState(false);

  const { favoriteGames, addFavorite } = useFavorites();



  const lowerSearch = search.toLowerCase();

  const handleFavorites = () => {
    setShowFavorites(!showFavorites);
  };


  const handleSearch = (value) => {
    setSearch(value);
  }


  const filteredGames = games.filter((game) => game.title.toLowerCase().includes(lowerSearch))

  const filteredGenres = games.reduce((genres, game) => {
    if (!genres.includes(game.genre)) {
      genres.push(game.genre);
    }
    return genres;
  }, []);


  const handleClickFilter = (genre) => {
    setIsActive(genre);
  };


  const filteredGamesGenre = showFavorites
    ? filteredGames.filter((game) => favoriteGames.includes(game.id))
    : filteredGames.filter(
        (game) =>
          isActive === 'All' || game.genre.toLowerCase() === isActive.toLowerCase()
      );

  return (
    <>
      <Header
        onSearch={handleSearch}
        genres={filteredGenres}
        handleClickFilter={handleClickFilter}
        user={user}
        showFavorites={showFavorites}
        handleFavorites={handleFavorites}/>

      <main>
        <div className={styles.container}>
          <div className={styles.gamesList}>
            {filteredGamesGenre.map((game) => (
              <Game
                game={game}
                id={game.id}
                key={game.id}
                title={game.title}
                genre={game.genre}
                thumbnail={game.thumbnail}
                short_description={game.short_description}
                isFavorite={favoriteGames.includes(game.id)}
                onFavorite={addFavorite}
                onRating={onRating}
                userRating={userRatings[game.id]}
                user={user}
              />
            ))}
            <BackToTop />
          </div>
        </div>
      </main>
    </>
  )
}

export default GamesList
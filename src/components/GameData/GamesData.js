"use client"

import { useState, useEffect } from 'react';

const gamesApi = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data';

const GamesData = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchGames = async () => {
    setError('');
    const start = performance.now();

    try {
      const response = await fetch(gamesApi, {
        headers: {
          'dev-email-address': 'fnandomarino@gmail.com',
        },
      });

      const end = performance.now();
      const time = end - start;
      console.log(`A chamada durou: ${time}ms`); // verificar duração - apagar dps

      if (time > 5000) {
        throw new Error('O servidor demorou para responder, tente mais tarde.');
      }

      if (
        response.status === 500 ||
        response.status === 502 ||
        response.status === 503 ||
        response.status === 504 ||
        response.status === 507 ||
        response.status === 508 ||
        response.status === 509
      ) {
        console.log(response.status); // verificar status do erro - apagar depois
        throw new Error('O servidor falhou em responder, tente recarregar a página.');
      } else if (!response.ok) {
        console.log(response.status);
        throw new Error('O servidor não conseguiu responder por agora, tente novamente mais tarde.');
      }

      const data = await response.json();

      setGames(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return { games, isLoading, error };
};

export default GamesData;

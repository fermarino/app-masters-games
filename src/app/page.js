"use client"

import React, {useState} from 'react'
import styles from './page.module.css'
import GamesList from '@/components/GamesList/GamesList';

const gamesApi = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data';

export default function Home() {
  
  const [games, setGames] = useState ([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGames = async () => {
    setIsLoading(true);
    setError(null);
    const start = performance.now();
    
    try {
      const response = await fetch (gamesApi, {
        headers: {
          'dev-email-address':
          'fnandomarino@gmail.com'
        }
      });
      
      const end = performance.now();
      const time = end - start;
      console.log(`A chamada durou: ${time}ms`); // verificar duração - apagar dps

      if (time > 5000) {
        throw new Error('O servidor demorou para responder, tente mais tarde');
      }

      if (response.status === 500 ||
          response.status === 502 ||
          response.status === 503 ||
          response.status === 504 ||
          response.status === 507 ||
          response.status === 508 ||
          response.status === 509
        ) {
          console.log(response.status)// verificar stauts do erro - apagar depois
          throw new Error('O servidor fahou em responder, tente recarregar a página');
        } else if (!response.ok) {
          console.log(response.status)
          throw new Error('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde')
        }  

      const data = await response.json ();

      setGames(data);
      console.log(data) //exibir dados - apagar depois.
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
    setIsLoading(false);
  };

  let content = <p>Clique no botão para carregar os jogos</p>

  if(games.length > 0) {
    content = <GamesList games={games}/>
  }

  if (error) {
    content = <span>{error}</span>
  }

  if(isLoading) {
    content = <p>Carregando...</p>
  }
  
  return (
    <>
      <section>
        <button onClick={fetchGames}>Carregar Jogos</button>
      </section>
      <section>
        {content}
      </section>
    </>
  )
}

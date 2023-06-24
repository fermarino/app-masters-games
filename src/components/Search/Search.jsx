import { useState } from 'react';

import styles from '@/components/Search/Search.module.css'

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearch(inputValue);
    onSearch(inputValue);
  };

  return (
    <input
      className={styles.searchBar}
      type="text"
      value={search}
      onChange={handleInputChange}
      placeholder="Pesquisar Jogos"
    />
  );
};

export default Search;

import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearch(inputValue);
    onSearch(inputValue);
  };

  return (
    <input
      type="text"
      value={search}
      onChange={handleInputChange}
      placeholder="Pesquise o jogo..."
    />
  );
};

export default SearchInput;

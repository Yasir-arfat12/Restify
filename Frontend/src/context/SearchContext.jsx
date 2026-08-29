// context/SearchContext.jsx
import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  // Backend-friendly state structure initialization
  const [searchCriteria, setSearchCriteria] = useState({
    state: '',
    city: '',
    date: '',
    time: ''
  });
// const [searchCriteria, setSearchCriteria] = useState({
//   state: 'California',
//   city: 'Los Angeles',
//   date: '2026-05-20',
//   time: '14:00'
// });

  // Helper function to clear search after booking completion
  const clearSearch = () => {
    setSearchCriteria({ state: '', city: '', date: '', time: '' });
  };

  return (
    <SearchContext.Provider value={{ searchCriteria, setSearchCriteria, clearSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

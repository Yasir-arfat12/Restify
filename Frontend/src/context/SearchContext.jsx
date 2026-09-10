import React, {
  createContext,
  useContext,
  useState
} from "react";

const SearchContext = createContext(null);

const initialSearchCriteria = {
  state: "",
  city: "",
  date: "",
  time: ""
};

export function SearchProvider({ children }) {
  const [searchCriteria, setSearchCriteria] = useState(
    initialSearchCriteria
  );

  const updateSearchCriteria = (newCriteria) => {
    setSearchCriteria((previousCriteria) => ({
      ...previousCriteria,
      ...newCriteria
    }));
  };

  const clearSearch = () => {
    setSearchCriteria(initialSearchCriteria);
  };

  return (
    <SearchContext.Provider
      value={{
        searchCriteria,
        setSearchCriteria,
        updateSearchCriteria,
        clearSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      "useSearch must be used inside SearchProvider"
    );
  }

  return context;
}
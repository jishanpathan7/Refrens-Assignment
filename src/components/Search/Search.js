//* Packages Imports */
import React, { useState,useEffect } from "react";

//* Styles Imports */
import styles from "./Search.module.scss";

//* Debounce Function to Delay Search for API
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Search = ({ setPageNumber, setSearch, placeholder }) => {
  const [searchInput, setSearchInput] = useState("");

   // Adjust the delay as needed
  const debouncedSearchInput = useDebounce(searchInput, 800);

  useEffect(() => {
    setPageNumber(1);
    setSearch(debouncedSearchInput);
  }, [debouncedSearchInput, setPageNumber, setSearch]);

  return (
    <form className={styles.searchTerm}>
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        className={`${styles.input}`}
        placeholder={placeholder}
        type="text"
     />
    </form>
  );
};

export default Search;

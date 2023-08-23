import React, { useState } from "react";
import styles from "./searchbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRedo } from "@fortawesome/free-solid-svg-icons";
import { usehandlerSearchSubmit, useReloadCountriesHandler } from "../handlers/handlers";

const SearchBar = ({onPageChange}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const searchSubmit = usehandlerSearchSubmit(setNoResults);
  const handlerClick = useReloadCountriesHandler();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const ReloadCountries = () => {
      handlerClick();
      onPageChange(1); 
      setNoResults(false); 
  };

  return (
    <form onSubmit={(e) => searchSubmit(e, searchQuery, onPageChange)} className={styles.searchForm}>
      <div className={styles.searchBar}>
      <input className={styles.searchInput} type="text" placeholder="Buscar país por nombre..." value={searchQuery}
          onChange={handleInputChange}
      />

    <div className={styles.searchButtonsContainer}>
        <button type="submit" className={styles.searchButton}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <button type="button" onClick={ReloadCountries} className={styles.reloadButton}>
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>
    </div>

      {noResults && <p>No se encontraron resultados de la búsqueda</p>}
    </form>
  );
};

export default SearchBar;

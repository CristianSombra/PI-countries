import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountryByName, getCountries } from "../../redux/actions";
import styles from "./searchbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRedo } from "@fortawesome/free-solid-svg-icons";
import { useReloadCountriesHandler } from "../handlers/handlers";

const SearchBar = ({onPageChange}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const dispatch = useDispatch();
  const handlerClick = useReloadCountriesHandler();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const apiData = await dispatch(searchCountryByName(searchQuery));

     
      if (apiData && apiData.data && apiData.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (error) {
     
      console.log("Error al buscar país por nombre:", error);
      setNoResults(true); 
    }
  };

  const handleReloadCountries = async () => {

    try {
      await dispatch(getCountries());
      handlerClick();
      onPageChange(1); 
      setNoResults(false); 
    } catch (error) {
      console.log("Error al recargar países:", error);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
      <div className={styles.searchBar}>
      <input
    className={styles.searchInput}
    type="text"
    placeholder="Buscar país por nombre..."
    value={searchQuery}
    onChange={handleInputChange}
  />


<div className={styles.searchButtonsContainer}>
    <button type="submit" className={styles.searchButton}>
      <FontAwesomeIcon icon={faSearch} />
    </button>
    <button type="button" onClick={handleReloadCountries} className={styles.reloadButton}>
      <FontAwesomeIcon icon={faRedo} />
    </button>
  </div>
</div>

      {noResults && <p>No se encontraron resultados de la búsqueda</p>}
    </form>
  );
};

export default SearchBar;

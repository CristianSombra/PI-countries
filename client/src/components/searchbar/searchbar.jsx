import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountryByName } from "../../redux/actions";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    // Realizamos la búsqueda de países por nombre
    try {
      const apiData = await dispatch(searchCountryByName(searchQuery));

      // Verificamos si se encontraron resultados o no
      if (apiData && apiData.data && apiData.data.length === 0) {
        setNoResults(true); // Si no hay resultados, establecemos el estado 'noResults' a true
      } else {
        setNoResults(false); // Si hay resultados, establecemos el estado 'noResults' a false
      }
    } catch (error) {
      // Manejamos el error de la solicitud a la API
      console.log("Error al buscar país por nombre:", error);
      setNoResults(true); // Si ocurre un error, también establecemos 'noResults' a true
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Buscar país por nombre..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button type="submit">Buscar</button>

      {noResults && <p>No se encontraron resultados de la búsqueda</p>}
    </form>
  );
};

export default SearchBar;
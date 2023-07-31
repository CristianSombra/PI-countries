import React, { useEffect } from "react";
import Card from "../../components/card/card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handlerClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  return (
    <div>
      <Link to="/create">Crear actividad turística</Link>
      <h1>Esta es la vista de HOME</h1>
      <button onClick={(e) => handlerClick(e)}>Volver a cargar todos los paises</button>

      <div>
        <select>
          <option value="asc">Ascendente por Nombre</option>
          <option value="desc">Descendente por Nombre</option>
        </select>
        <select>
          <option value="asc">Ascendente por cantidad de población</option>
          <option value="desc">Descendente por cantidad de población</option>
        </select>
        <select>
          <option value="cont">Filtrar por continente</option>
          <option value="act">Filtrar por actividad turística</option>
        </select>
      </div>

      <div className="cards-container">
      {allCountries &&
        allCountries.map((country) => (
          <Card
            key={country.id}
            name={country.name}
            image={country.image}
            continent={country.continent}
            showDetails={false}
          />
        ))}
          
      </div>
    // </div>
  );
}

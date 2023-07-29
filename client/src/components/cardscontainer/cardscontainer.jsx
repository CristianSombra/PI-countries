import React, { useEffect } from "react";
import Card from "../card/card";
import style from "./cardscontainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from "../../redux/actions"; // Asegúrate de importar la función getCountries desde el archivo actions.js

const CardsContainer = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries()); // Dispatch la acción para obtener los países cuando el componente se monta
  }, [dispatch]);

  return (
    <div className={style.container}>
      {countries.map((country) => (
        <Card
          key={country.id}
          id={country.id}
          name={country.name}
          image={country.image}
          continent={country.continent}
          capital={country.capital}
          subregion={country.subregion}
          area={country.area}
          population={country.population}
          activities={country.activities}
        />
      ))}
    </div>
  );
};

export default CardsContainer;

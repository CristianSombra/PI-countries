import React, { useEffect } from "react";
import Card from "../card/card";
import style from "./cardscontainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from "../../redux/actions";

const CardsContainer = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className={style.container}>
      {countries.map((country) => (
        <Card
          key={country.id}
          name={country.name}
          image={country.image}
          continent={country.continent}
          capital={country.capital}
          subregion={country.subregion}
          area={country.area}
          population={country.population}
          activities={country.activities}
          showDetails={true} // Mostrar todos los detalles
        />
      ))}
    </div>
  );
};

export default CardsContainer;

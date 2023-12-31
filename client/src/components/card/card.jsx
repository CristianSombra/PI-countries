import React from "react";
import style from "./card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {

  const activities = props.activities || [];

  return (
    <div className={style.card}>
      <div className={style.flagImageContainer}>
      <Link to={`/detail/${props.id}`}>
        <img src={props.image} alt={props.name} className={style.flagImage} />
        </Link>
      </div>
      <div className={style.textContainer}>
        <h2>{props.name}</h2>
        <p>Continent: {props.continent}</p>
        {props.showDetails ? (
          <>
            <p>Capital: {props.capital}</p>
            <p>Subregion: {props.subregion}</p>
            <p>Area: {props.area}</p>
            <p>Population: {props.population}</p>
            {activities.length > 0 ? (
              <div className={style.activities}>
                <h4>Activities:</h4>
                <ul>
                  {activities.map((activity) => (
                    <li key={activity.id}>
                      Name: {activity.name}, Difficulty: {activity.difficulty}, Duration: {activity.duration}, Season: {activity.season}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No hay Actividades registradas</p>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Card;


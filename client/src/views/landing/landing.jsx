/* landing.jsx */
import React from "react";
import { Link } from "react-router-dom";
import style from "./landing.module.css";

export default function Landing() {
  return (
    <div className={style.landing}>
      <div className={style["landing-content"]}>
        <h1 className={style.patrickhand}>Bienvenido al buscador de información de Países</h1>
        <Link to="/home">
          <button>INGRESAR</button>
        </Link>
      </div>
    </div>
  );
};
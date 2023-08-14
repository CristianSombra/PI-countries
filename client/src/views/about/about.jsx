import React from "react";
import { Link } from "react-router-dom";
import styles from './about.module.css';

const About = () => {
  return (
    <div className={styles.centerContainer}>
      <div className={styles.aboutCard}>
        <h1>PROYECTO INDIVIDUAL COUNTRIES</h1>
        <p className={styles.aboutMessage}>
          Esta Landing Page fue creada con el objetivo de buscar países mediante el filtrado por continente o actividad turística. Además, puedes encontrar mediante el buscador el país que desees.
        </p>
      </div>
      <div className={styles.goHomeBottom}>
        <Link to="/Home">Volver a Home</Link>
      </div>
    </div>
  );
};

export default About;


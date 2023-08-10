import React from "react";
import { Link } from "react-router-dom";
import s from './about.module.css';

const About = () => {
  return (
    <div>
      <h1>Aqui se supone que voy a poner algo bonito sobre mi</h1>
      <Link to="/home" className={s.linkButton}>Volver a Home</Link>
    </div>
  );
};

export default About;

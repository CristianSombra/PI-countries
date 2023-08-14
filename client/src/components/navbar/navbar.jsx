import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.mainContainer} ${isSticky ? styles.sticky : ""} ${styles.navbar}`}>
      <div className={styles.linksContainer}>
        <Link to="/home" className={`${styles.link} ${styles.navbarButton}`}>
          Inicio
        </Link>
        <Link to="/create" className={`${styles.link} ${styles.navbarButton}`}>
          Crear Actividad
        </Link>
        <Link to="/about" className={`${styles.link} ${styles.navbarButton}`}>
          Acerca de
        </Link>
        <Link to="/" className={`${styles.link} ${styles.navbarButton}`}>
          Salir
        </Link>
      </div>
    </div>
);

};

export default Navbar;
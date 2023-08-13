import { Link } from "react-router-dom";
import favicon from "../../assets/navbar-img.jpg";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.imageContainer}>
        <img src={favicon} alt="Favicon del navbar" />
      </div>
      <div className={styles.linksContainer}>
        <Link to="/home" className={styles.link}>
          HOME
        </Link>
        <Link to="/create" className={styles.link}>
          FORM
        </Link>
        <Link to="/about" className={styles.link}>
          ABOUT
        </Link>
        <Link to="/" className={styles.link}>
          LOGOUT
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

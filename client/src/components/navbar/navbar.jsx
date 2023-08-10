import { Link } from "react-router-dom";
import style from "./navbar.module.css";


const Navbar = () => {
    return(
        <div className={style.mainContainer}>
            <Link to="/home" className={style.link} >HOME</Link>
            <Link to="/create" className={style.link} >FORM</Link>
            <Link to="/about" className={style.link} >ABOUT</Link>
            <Link to="/" className={style.link} >LOGOUT</Link>
        </div>
    )
}

export default Navbar;
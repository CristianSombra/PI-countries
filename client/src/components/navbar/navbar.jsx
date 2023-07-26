import { Link } from "react-router-dom";
import style from "./navbar.module.css";


const Navbar = () => {
    return(
        <div className={style.mainContainer}>
            <Link to="/home" >HOME</Link>
            <Link to="/create" >FORM</Link>
            <Link to="/detail" >DETAIL</Link>
        </div>
    )
}

export default Navbar;
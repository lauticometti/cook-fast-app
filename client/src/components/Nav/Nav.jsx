import { Link, useLocation } from "react-router-dom";
import chefIcon from "../../assets/chef-icon.svg";
import { MYOButton } from "../";
import styles from "./Nav.module.css";

export function Nav(props) {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.iconLink}>
        <img src={chefIcon} alt="chef icon"  className={styles.icon}/>
      </Link>

      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link to="/" className={styles.listItemLink}>
            CookFast
          </Link>
        </li>

        <li className={styles.listItem}>
          <Link to="/home" className={styles.listItemLink}>
            Recipes
          </Link>
        </li>
      </ul>

      { location.pathname === "/" ? null : location.pathname ===
        "/make-your-own" ? <MYOButton text="Show us your tricks" /> 
        : <MYOButton /> }
    </nav>
  );
}

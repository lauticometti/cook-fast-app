import { Link, useLocation } from "react-router-dom";
import chefIcon from "../../assets/chef-icon.svg";
import { MYOButton } from "../";
import styles from "./Nav.module.css";

export function Nav() {
  const location = useLocation();

  return (
    <nav className={styles.nav}>

      <ul className={styles.list}>
        <li className={styles.listItemIcon}>
          <Link to="/" className={styles.iconLink}>
            <img src={chefIcon} alt="chef icon"  className={styles.icon}/>
          </Link>
        </li>
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

      { location.pathname === "/make-your-own" ? 
        <MYOButton text="Show us your tricks" /> : 
        <MYOButton /> }
    </nav>
  );
}

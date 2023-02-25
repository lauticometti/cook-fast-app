import { Link } from "react-router-dom";
import styles from "./MYOButton.module.css";

export function MYOButton(props) {
  return (
    <Link to="/make-your-own" className={styles.linkButton}>
      <button className={styles.button}>
        Make Your Own
      </button>
    </Link>
  )
}
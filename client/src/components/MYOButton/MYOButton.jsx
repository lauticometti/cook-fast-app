import { Link } from "react-router-dom";
import styles from "./MYOButton.module.css";

export function MYOButton({text='Make Your Own'}) {
  return (
    <Link to="/make-your-own" className={styles.linkButton}>
      <button className={text === 'Make Your Own' ? styles.button : styles.button2}>
        {text}
      </button>
    </Link>
  )
}
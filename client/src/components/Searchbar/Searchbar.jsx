import icon from "../../assets/magnifying-glass.svg";
import styles from "./Searchbar.module.css";

export default function Searchbar(props) {
  return (
    <div className={styles.container}>
      <img src={icon} alt="magnifying glass icon" />
      <input type="text" placeholder='Search...' className={styles.input}/>
    </div>
  )
}
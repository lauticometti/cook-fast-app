import styles from "./Filter.module.css";
import icon from "../../assets/order-icon.svg"

export default function Filter(props) {
  return (
    <div className={styles.filterBox}>
      <img src={icon} alt="" className={styles.icon}/>
      <span className={styles.span}>Filter</span>
    </div>
  )
}
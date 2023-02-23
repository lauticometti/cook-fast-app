import styles from "./Order.module.css";
import icon from "../../assets/order-icon.svg"

export default function Order(props) {
  return (
    <div className={styles.orderBox}>
      <img src={icon} alt="" className={styles.icon}/>
      <span className={styles.span}>Order</span>
    </div>
  )
}


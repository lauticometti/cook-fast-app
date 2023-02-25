import styles from "./Order.module.css";
import icon from "../../assets/order-icon.svg"
import upArrow from "../../assets/up-arrow.svg"
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Modal from "../Modal/Modal";

export default function Order(props) {

  const [show, setShow] = useState(false)

  return (
    <div>
      <button onClick={() => setShow(true)} className={styles.orderBox}>
        <img src={icon} alt="" className={styles.icon}/>
        <span className={styles.span}>Order</span>
        <div onClick={e => e.stopPropagation()} className={styles.upArrowContainer}>
          <img src={upArrow} alt="" className={styles.upArrow}/>
        </div>
      </button>

      <Modal onClose={() => setShow(false)} show={show} title="Order">
        <ul className={styles.modalList}>
          <li className={styles.modalListItem}>
            <label htmlFor="az" className={styles.label}>
              <p>Alphabetically</p>
              <input type="checkbox" name="order" id="az" className={styles.checkboxInput}/>
            </label>
          </li>

          <li className={styles.modalListItem}>
            <label htmlFor="healthier" className={styles.label}>
                <p>Healthier</p>
                <input type="checkbox" name="order" id="healthier" className={styles.checkboxInput}/>
              </label>
          </li>
        </ul>
      </Modal>
    </div>
  )
}


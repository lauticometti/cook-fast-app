import icon from "../../assets/order-icon.svg";
import { Modal } from "../";

import styles from "./Order.module.css";
import { useState } from "react";
import { orderByName } from "../../redux/actions";

// note: on this component, Im using input field just because it was quickly for styled but
// I dont take care of your behavior

export function Order({setOrder, order}) {
  
  const [show, setShow] = useState(false)

  const handleOrder = (event) => {
    const { target } = event;

    if (target.id === "alphabetic") {
      setOrder({
        ...order,
        alphabetic: true,
        healthier: false,
      });
    } else {
      setOrder({
        ...order,
        alphabetic: false,
        healthier: true,
      });
    }
  };

  return (
    <div>
      <button onClick={() => setShow(true)} className={styles.orderBox}>
        <img src={icon} alt="" className={styles.icon} />
        <span className={styles.span}>Order</span>
        <div
          onClick={(event) => {
            event.stopPropagation();
            if(order.orientation === 'up') setOrder({
              ...order,
              orientation: 'down'
            }) 
            else {
              setOrder({
                ...order,
                orientation: 'up'
              })
            }
          }}
          className={styles.upArrowContainer}
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={
              order.orientation === "up" ? styles.upArrow : styles.downArrow
            }
          >
            <path d="M6.96875 11.15V22.3H15.3312V11.15H22.3L11.15 0L0 11.15H6.96875Z" />
          </svg>
        </div>
      </button>

      <Modal onClose={() => setShow(false)} show={show}>
        <ul className={styles.modalList}>
          <li className={styles.modalListItem}>
            <label htmlFor="alphabetic" className={styles.label}>
              <p>Alphabetically</p>
              <input
                type="radio"
                name="order"
                id="alphabetic"
                className={styles.radioInput}
                onFocus={handleOrder}
              />
            </label>
          </li>

          <li className={styles.modalListItem}>
            <label htmlFor="healthier" className={styles.label}>
              <p>Healthier</p>
              <input
                type="radio"
                name="order"
                id="healthier"
                className={styles.radioInput}
                onFocus={handleOrder}
              />
            </label>
          </li>
        </ul>
      </Modal>
    </div>
  );
}

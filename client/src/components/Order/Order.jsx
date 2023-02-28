import icon from "../../assets/order-icon.svg";
import { Modal } from "../";

import styles from "./Order.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { orderByHealthScore, orderByName } from "../../redux/actions";

// note: on this component, Im using input field just because it was quickly for styled but
// I dont take care of its behavior

export function Order() {
  
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [order, setOrder] = useState('up')
  const [typeOrder, setTypeOrder] = useState('')

  const handleOrderOrientation = () => {
    let newOrder = order === 'up' ? 'down' : 'up'
    setOrder(newOrder)
  }

  useEffect(() => {
    switch(typeOrder) {
      case 'alphabetic':
        dispatch(orderByName(order))
        break;
      case 'healthier':
        dispatch(orderByHealthScore(order)) 
        break;
      default: 
        dispatch(orderByHealthScore(order)) 
        break;
    }}, [order, typeOrder])

  const handleOrderInput = (event) => {
    const value = event.target.id
    setTypeOrder(value) 
  }

  return (
    <div>
      <button onClick={() => setShow(true)} className={styles.orderBox}>
        <img src={icon} alt="" className={styles.icon} />
        <span className={styles.span}>Order</span>
        <div
          className={styles.upArrowContainer}
          onClick={(e) => {
            e.stopPropagation()
            handleOrderOrientation()
          }}
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={
              order === "up" ? styles.upArrow : styles.downArrow
            }
          >
            <path d="M6.96875 11.15V22.3H15.3312V11.15H22.3L11.15 0L0 11.15H6.96875Z" />
          </svg>
        </div>
      </button>

      <Modal onClose={() => setShow(false)} show={show}>
        <ul className={styles.modalList}>
          <li className={styles.modalListItem}>
            <label htmlFor="alphabetic" className={styles.label} >
              <p>Alphabetically</p>
              <input
                type="radio"
                name="order"
                id="alphabetic"
                className={styles.radioInput}
                onClick={handleOrderInput}
              />
            </label>
          </li>

          <li className={styles.modalListItem}>
            <label htmlFor="healthier" className={styles.label} >
              <p>Healthier</p>
              <input
                type="radio"
                name="order"
                id="healthier"
                className={styles.radioInput}
                onClick={handleOrderInput}
              />
            </label>
          </li>
        </ul>
      </Modal>
    </div>
  );
}

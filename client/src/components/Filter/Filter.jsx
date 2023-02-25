import { useState } from "react";
//import { useSelector } from "react-redux";
import icon from "../../assets/order-icon.svg"
import { Dropdown, Modal } from "../";

import styles from "./Filter.module.css";

export function Filter(props) {

  const [show, setShow] = useState(false)
  //const diets = useSelector(state => state.diets)
 
  return (
    <div>
      <button onClick={() => setShow(true)} className={styles.filterBox}>
        <img src={icon} alt="" className={styles.icon}/>
        <span className={styles.span}>Filter</span>
      </button>
      <Modal onClose={() => setShow(false)} show={show} >
        <Dropdown title="Diets" items={["carne", "legumbre", "midieta", "huevos", "sinleche", "1", "2", '3', '5', '10']} type="checkbox"/>
        <Dropdown title="Creator" items={["API", "user"]}/>
      </Modal>
    </div>
  )
}
import { useEffect, useState } from "react";
import icon from "../../assets/order-icon.svg"
import { Dropdown, Modal } from "../";

import styles from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterByCreator, filterByDiets, getDiets } from "../../redux/actions";

export function Filter({setCurrentPage}) {

  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const diets = useSelector(state => state.diets)
  const [currentDiets, setCurrentDiets] = useState([])
  const [creatorFilter, setCreatorFilter] = useState('')

  useEffect(() => {
    dispatch(getDiets())
    dispatch(filterByDiets(currentDiets))
    dispatch(filterByCreator(creatorFilter))
    setCurrentPage(1)
  }, [dispatch, currentDiets, creatorFilter])



  return (
    <div>
      <button onClick={() => setShow(true)} className={styles.filterBox}>
        <img src={icon} alt="" className={styles.icon}/>
        <span className={styles.span}>Filter</span>
      </button>
      <Modal onClose={() => setShow(false)} show={show} >
        <Dropdown title="Diets" items={diets} type="checkbox" setCurrentDiets={setCurrentDiets} currentDiets={currentDiets}/>
        <Dropdown title="Creator" items={["API", "user", "All"]} setCreatorFilter={setCreatorFilter} creatorFilter={creatorFilter} />
      </Modal>
    </div>
  )
}
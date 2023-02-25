import {Nav, Searchbar, Filter, Order, Cards} from '../'
import { alphabeticSort, numericSort } from '../../helpers'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";
import styles from "./Home.module.css";

export function Home(props) {

  const dispatch = useDispatch()
  let storeRecipes = useSelector(state => state.allRecipes)

  useEffect(() => {
   dispatch(getRecipes())
  }, [dispatch])

  const [order, setOrder] = useState({
    alphabetic: true,
    healthier: true,
    orientation: 'up'
  })

  const [recipes, setRecipes] = useState([...storeRecipes]) 

  useEffect(() => {
    if(order.alphabetic) setRecipes(alphabeticSort(storeRecipes, order.orientation))
    if(order.healthier) setRecipes(numericSort(storeRecipes, order.orientation))
  },[order])


  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.header}>
        <h2 className={styles.h2}>Find <span className={styles.h2orangeSpan}>best recipes</span> <span className={styles.h2span}>for cooking</span></h2>
        <Searchbar />
      </div>

      <div className={styles.main}>
        <Order setOrder={setOrder} order={order} />
        <Filter />
      </div>

      <Cards recipes={recipes.length ? recipes : storeRecipes}/>

    </div>
  )
}
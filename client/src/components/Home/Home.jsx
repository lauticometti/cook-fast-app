import Nav from "../Nav/Nav";
import Searchbar from '../Searchbar/Searchbar'
import Filter from '../Filter/Filter'
import Order from "../Order/Order";
import Cards from "../Cards/Cards";
import styles from "./Home.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";

export default function Home(props) {

  const dispatch = useDispatch()
  const recipes = useSelector(state => state.allRecipes)

  useEffect(() => {
   dispatch(getRecipes())
  }, [])

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.header}>
        <h2 className={styles.h2}>Find <span className={styles.h2orangeSpan}>best recipes</span> <span className={styles.h2span}>for cooking</span></h2>
        <Searchbar />
      </div>

      <div className={styles.main}>
        <Filter />
        <Order />
      </div>

      <Cards recipes={recipes}/>

    </div>
  )
}
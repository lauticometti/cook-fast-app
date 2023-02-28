import { Nav, Searchbar, Filter, Order, Cards, Paginate} from "../";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";
import styles from "./Home.module.css";

export function Home() {
  const dispatch = useDispatch();
  let allRecipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1)
  const [recipesPerPage, setRecipesPerPage] = useState(9)
  const indexLastRecipe = currentPage * recipesPerPage
  const indexFirstRecipe = indexLastRecipe - recipesPerPage
  const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe) 

  const paginate = (number) => {
    setCurrentPage(number)
  }


  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.header}>
        <h2 className={styles.h2}>
          Find <span className={styles.h2orangeSpan}>best recipes</span>
          <span className={styles.h2span}>for cooking</span>
        </h2>
        <Searchbar setCurrentPage={setCurrentPage}/>
      </div>

      <div className={styles.main}>
        <Order />
        <Filter />
      </div>

      <Cards recipes={currentRecipes.length ? currentRecipes : 'Loading'} />
      <Paginate recipesPerPage={recipesPerPage} lengthRecipes={allRecipes.length} paginate={paginate} />
    </div>
  );
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Nav } from "../";
import { capitalize } from "../../helpers";
import { getRecipeById } from "../../redux/actions";

import styles from "./Detail.module.css";
export function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  let recipe = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [dispatch, id]);

  return (
    <div>
      <Nav />
      {recipe ? (
        <>
          <h1 className={styles.title}>{recipe.name}</h1>

          <section className={styles.top}>
            <div className={styles.cardContainer}>
              <span className={styles.healthScore}>
                Health Score: {recipe.healthScore}
              </span>
              <div className={styles.imgContainer}>
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className={styles.img}
                />
              </div>
              <span className={styles.spanId}>#{recipe.id}</span>
              <div className={styles.dietsContainer}>
                <h3 className={styles.dietsTitle}>Diets:</h3>
                <ul className={styles.dietList}>
                  {recipe.diets.map((diet) => (
                    <li
                      key={diet + recipe.diets.indexOf(diet)}
                      className={styles.dietItem}
                    >
                      {capitalize(diet)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.summaryContainer}>
              <h3 className={styles.summary}>Summary:</h3>
              <p
                className={styles.summaryText}
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              ></p>
            </div>
          </section>

          <section className={styles.recipesSection}>
            <div className={styles.stepsBox}>
              <span>Steps:</span>
            </div>
            <ol className={styles.steps}>
              {recipe.steps.map((el) => (
                <li key={el.number + el.step.slice(0, 8)}>{el.step}</li>
              ))}
            </ol>
          </section>
        </>
      ) :
        <p>The recipe is loading...</p>
      }

    </div>
  );
}

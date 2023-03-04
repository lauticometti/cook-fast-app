import { Nav } from "../";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

export function Landing() {
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <Nav />
        <main className={styles.main}>
          <span className={styles.spanCookToday}>
            What do you wanna cook today?
          </span>

          <div className={styles.titles}>
            <h1 className={styles.h1}>
              <span className={styles.cook}>Cook</span>
              <span className={styles.fast}>Fast</span>
            </h1>
            <h2 className={styles.h2}>
              <span className={styles.h2Cook}>Cook</span>
              <span className={styles.h2AtHome}>at home</span>
            </h2>
          </div>

          <p className={styles.mainP}>
            Search in our recipes wiki and know fastly how to cook your next
            favorite food
          </p>

          <Link to="/home" className={styles.startCookingBtn}>
            <button className={styles.button}>Start cooking</button>
          </Link>
        </main>
      </div>
    </div>
  );
}

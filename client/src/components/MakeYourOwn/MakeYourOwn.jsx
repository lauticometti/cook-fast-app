import { Nav, Form} from "../";
import eyes from "../../assets/eyes-looking-down.svg";
import styles from "./MakeYourOwn.module.css";

export function MakeYourOwn() {
  
  return (
    <div>
      <Nav />
      <div className={styles.eyesContainer}>
        <img src={eyes} alt="" className={styles.eyes} />
      </div>

      <h1 className={styles.title}>
        <span className={styles.spanTitle1}>It's your turn, create</span>
        <span className={styles.spanTitle2}>your own recipe</span>
      </h1>
      <Form />
    </div>
  );
}

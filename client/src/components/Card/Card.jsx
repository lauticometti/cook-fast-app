import styles from "./Card.module.css";
import leftArrow from "../../assets/left-arrow-icon.svg";
import { capitalize } from "../../helpers.js"
import { Link } from "react-router-dom";


export function Card({ healthScore, image, name, diets, id }) {
  const handlerFlip = (event) => {
    let btn;

    event.target.nodeName === "IMG"
      ? (btn = event.target.offsetParent)
      : (btn = event.target);

    const cardInner = btn.offsetParent.offsetParent;

    let transform = cardInner.style.transform;

    transform === "rotateY(-180deg)"
      ? (cardInner.style.transform = "rotateY(0deg)")
      : (cardInner.style.transform = "rotateY(-180deg)");
  };

  return (
    <div className={styles.cardOuter}>
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <span className={styles.healthScore}>
            HEALTH SCORE: <span />
            <span className={styles.healthScoreSpan}>{healthScore}</span>
          </span>
          <Link to={`../detail/${id}`} > 
            <img src={image} alt={name} className={styles.image} />
          </Link>
          <h2 className={styles.name}>{name}</h2>
          <button onClick={handlerFlip} className={styles.seeDietsBtn}>
            See diets
          </button>
        </div>

        <div className={styles.cardBack}>
          <p className={styles.p}>
            This recipes is valid for the following diets:
          </p>
          <ul className={styles.list}>               {/* I cant show more of seven diets on the card */}
            {diets.length <= 7
              ? diets.map((diet) => (
                  <li key={diet + diets.indexOf(diet)}>{capitalize(diet)}</li>
                ))
              : [...diets
                  .slice(0, 7), `and more...`]
                  .map((diet) => (
                    <li key={diet + diets.indexOf(diet)}>{capitalize(diet)}</li>
                  ))}
          </ul>
          <button onClick={handlerFlip} className={styles.seeDietsBtn}>
            <img src={leftArrow} alt="" className={styles.arrow} />
          </button>
        </div>
      </div>
    </div>
  );
}

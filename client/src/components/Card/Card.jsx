import styles from "./Card.module.css";
import leftArrow from "../../assets/left-arrow-icon.svg";

export default function Card({ healthScore, image, name, diets }) {

  const handlerFlip = (event) => {
    let btn;

    event.target.nodeName === 'IMG' ? 
    btn = event.target.offsetParent :
    btn = event.target

    const cardInner = btn.offsetParent.offsetParent

    let transform = cardInner.style.transform

    transform === 'rotateY(-180deg)' ?
    cardInner.style.transform = 'rotateY(0deg)' :  
    cardInner.style.transform = 'rotateY(-180deg)'
  }

  return (
    <div className={styles.cardOuter}>
      <div className={styles.cardInner}>

        <div className={styles.cardFront}>
          <span className={styles.healthScore}>HEALTH SCORE: <span/>
            <span className={styles.healthScoreSpan}>{healthScore}</span>
          </span>
          <img src={image} alt={name} className={styles.image}/>
          <h2 className={styles.name}>{name}</h2>
          <button onClick={handlerFlip} className={styles.seeDietsBtn}>See diets</button>
        </div>

        <div className={styles.cardBack}>
          <p className={styles.p}>This recipes is valid for the following diets:</p>
          <ul className={styles.list}>
            <li>Estas</li>
            <li>Son</li>
            <li>Dietas</li>
            <li>Maximo</li>
            <li>Puede</li>
            <li>Haber</li>
            <li>Siete</li>
          </ul>
          <button onClick={handlerFlip} className={styles.seeDietsBtn}><img src={leftArrow} alt="" className={styles.arrow}/></button> {/* INSERT LEFT ARROW */}
        </div>

      </div>
    </div>
  );
}

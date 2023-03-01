import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Nav } from "../";
import eyes from "../../assets/eyes-looking-down.svg";
import { capitalize } from "../../helpers";
import { getDiets } from "../../redux/actions";
import styles from "./Form.module.css";

export function Form() {

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(typeof event.target, Array.isArray(event.targer)) 
  }

  function handleRangeChange(event) {
    event.preventDefault()
    let target = event.target
    const rangeValue = document.getElementById('rangeValue')
    if (target.type !== 'range') {
      target = document.getElementById('healthScore')
    } 
    const min = target.min
    const max = target.max
    const val = target.value
    rangeValue.value = val
    
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
  }

  

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch])
  
  const diets = useSelector(state => state.diets)

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


      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="NAME" className={styles.inputName} />
        

        {/* SUMMARY */}
        <textarea
          type="text"
          placeholder="SUMMARY"
          className={styles.inputSummary}
        />

        {/* STEPS */}
        <textarea type="text" placeholder="STEPS" className={styles.inputSteps} />
        

        {/* IMAGE */}
        <label htmlFor="inputImage" className={styles.labelImage}>
          IMAGE
          <span className={styles.labelImageSpan}>+</span>
          <input type="file" placeholder="IMAGE" id="inputImage" className={styles.inputImage} />
        </label>


        {/* RANGE */}
        <label htmlFor="healthScore" className={styles.labelRange}>
          <span className={styles.rangeSpan}>HEALTH SCORE</span>
          <output onInput={handleRangeChange} id="rangeValue" className={styles.rangeNumber}>70</output>

          <span className={styles.rangeMin}>1</span>
          <input onInput={handleRangeChange} type="range" id="healthScore" min="0" max="100" className={styles.inputRange} />
          <span className={styles.rangeMax}>100</span>
        </label>


        {/* DIETS */}
        <div className={styles.dietsContainer}>
          <p className={styles.diets}>Diets</p>
          {
            diets.length ?
            diets.map(el => (
              <label key={el} htmlFor={el} className={styles.dietLabel}>
                <p>{capitalize(el)}</p>
                <input type="checkbox" id={el} className={styles.dietCheck}/>
              </label>
              )) :
            <p className={styles.loading}>Loading diets...</p>
          }
        </div>


        {/* CUSTOM DIETS */}
        <input
          type="text"
          placeholder="ADD CUSTOM DIETS"
          id="diets"
          className={styles.inputCustomDiets}
        />

          
        <button type="submit" className={styles.formButton}>All ready, create recipe!</button>
      </form>
    </div>
  );
}

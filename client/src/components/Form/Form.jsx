import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { capitalize } from "../../helpers";
import { getDiets } from "../../redux/actions";
import styles from "./Form.module.css";

export function Form() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const diets = useSelector((state) => state.diets);

  const [dietsCheck, setDietsCheck] = useState([
    diets.lenght && diets.map((el) => false),
  ]);

  const [inputs, setInputs] = useState({
    name: "",
    summary: "",
    image: "",
    healthScore: 50,
    diets: [],
    customDiets: [],
    steps: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    summary: "",
    image: "",
    diets: "",
    customDiets: "",
    steps: "",
  });

  // ========= ======= ========= //
  // ========= ======= ========= //

  // ========= HANDLES ========= //

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setInputs({
      ...inputs,
      name,
    });
  };

  const handleSummaryChange = (event) => {
    const summary = event.target.value;
    setInputs({
      ...inputs,
      summary,
    });
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      setInputs({
        ...inputs,
        image: event.target.files[0],
      });
    }
  };

  const handleRangeChange = (event) => {
    event.preventDefault();
    let target = event.target;

    setInputs({
      ...inputs,
      healthScore: target.value,
    });

    const min = target.min;
    const max = target.max;
    const val = target.value;

    target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
  };

  const handleDietsInput = (event) => {
    const diet = event.target.id;

    const currentIndex = inputs.diets.indexOf(diet);
    const newMarked = [...dietsCheck];

    if (inputs.diets.includes(diet)) {
      setInputs({
        ...inputs,
        diets: inputs.diets.filter((el) => el !== diet),
      });
      newMarked[currentIndex] = false;
      setDietsCheck(newMarked);
    } else {
      setInputs({
        ...inputs,
        diets: [...inputs.diets, diet],
      });
      newMarked[currentIndex] = true;
      setDietsCheck(newMarked);
    }
  };

  const handleDietAddOnEnter = (event) => {
    if ((event.charCode || event.keyCode) === 13) handleCustomDietAdd(event);
  };

  const handleCustomDietAdd = (event) => {
     let diet;
    if (event.target.type === "text") {
      diet = event.target.value;
      event.target.value = "";
    } else {
      diet = event.target.previousSibling.value;
      event.target.previousSibling.value = "";
    }



    const dietsCopy = inputs.diets.map((el) => el.toLowerCase());
    const customDietsCopy = inputs.customDiets.map((el) => el.toLowerCase());

    if (!diet) {
      setErrors({
        ...errors,
        customDiets: "A diet cant to be a empty string",
      });
      return;
    }

    if (inputs.customDiets.length === 8) {
      setErrors({
        ...errors,
        customDiets: "Can't add more of 8 custom diets.",
      });
      return;
    }

    if (diet.length > 20) {
      setErrors({
        ...errors,
        customDiets: `A diet cant to have more of 20 characters`,
      });
      return;
    }

    if (dietsCopy.includes(diet.toLowerCase)) {
      setErrors({
        ...errors,
        customDiets: `${diet} is a original diet from the api.`,
      });
      return;
    }

    if (customDietsCopy.includes(diet.toLowerCase())) {
      setErrors({
        ...errors,
        customDiets: `${diet} already has been created previously.`,
      });
      return;
    }

    setInputs({
      ...inputs,
      customDiets: [...inputs.customDiets, diet],
    });
  };

  const handleStepAddOnEnter = (event) => {
    if ((event.charCode || event.keyCode) === 13) handleStepAdd(event);
  };

  const handleStepAdd = (event) => {
    let step;
    if (event.target.type === "textarea") {
      step = event.target.value;
      event.target.value = "";
    } else {
      step = event.target.previousSibling.value;
      event.target.previousSibling.value = "";
    }

    if (step === "" || step === "\n") {
      setErrors({
        ...errors,
        steps: "A step cant to be a empty string",
      });
      return;
    }

    setInputs({
      ...inputs,
      steps: [...inputs.steps, step],
    });
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
      <div className={styles.blockNaSuRa}>
        {/* NAME */}
        <input
          type="text"
          placeholder="NAME"
          onChange={handleNameChange}
          value={inputs.name}
          className={styles.inputName}
        />

        {/* SUMMARY */}
        <textarea
          type="text"
          placeholder="SUMMARY"
          onChange={handleSummaryChange}
          className={styles.inputSummary}
        />

        {/* RANGE */}
        <label htmlFor="healthScore" className={styles.rangeLabel}>
          <span className={styles.rangeSpan}>HEALTH SCORE</span>
          <output
            onInput={handleRangeChange}
            id="rangeValue"
            className={styles.rangeNumber}
          >
            {inputs.healthScore}
          </output>

          <span className={styles.rangeMin}>1</span>
          <input
            onInput={handleRangeChange}
            type="range"
            id="healthScore"
            min="0"
            max="100"
            value={inputs.healthScore}
            className={styles.inputRange}
          />
          <span className={styles.rangeMax}>100</span>
        </label>

        {/* STEPS */}
        <div className={styles.stepsContainer}>
          <label htmlFor="step" className={styles.stepLabel}>
            <textarea
              type="text"
              placeholder="STEPS"
              id="step"
              className={styles.inputSteps}
              onKeyDown={handleStepAddOnEnter}
            />
            <button className={styles.stepButton} onClick={handleStepAdd}>
              +
            </button>
          </label>

          <ol className={styles.createdStepsList}>
            {inputs.steps.length
              ? inputs.steps.map((el, i) => (
                  <li key={el + i} className={styles.createdStepListItem}>
                    {capitalize(el)}
                  </li>
                ))
              : null}
          </ol>
        </div>
      </div>

      <div className={styles.blockImDi}>
        {/* IMAGE */}
        <label htmlFor="inputImage" className={styles.imageLabel}>
          IMAGE
          <span className={styles.imageLabelSpan}>+</span>
          <input
            type="file"
            placeholder="IMAGE"
            id="inputImage"
            onChange={handleFileChange}
            className={styles.inputImage}
          />
        </label>

        {/* DIETS */}
        <div className={styles.dietsContainer}>
          <p className={styles.diets}>Diets</p>
          {diets.length ? (
            diets.map((el) => (
              <label key={el} htmlFor={el} className={styles.dietsLabel}>
                <p>{capitalize(el)}</p>
                <input
                  type="checkbox"
                  id={el}
                  onClick={handleDietsInput}
                  className={styles.dietCheck}
                />
              </label>
            ))
          ) : (
            <p className={styles.loading}>Loading diets...</p>
          )}
        </div>

        {/* CUSTOM DIETS */}
        <div>
          <label htmlFor="customDiet" className={styles.dietLabel}>
            <input
              type="text"
              placeholder="ADD CUSTOM DIETS"
              id="customDiet"
              onKeyDown={handleDietAddOnEnter}
              className={styles.inputCustomDiets}
            />
            <button className={styles.dietButton} onClick={handleCustomDietAdd}>
              +
            </button>
          </label>

          <ul className={styles.createdDietsList}>
            {inputs.customDiets.length
              ? inputs.customDiets.map((el, i) => (
                  <li key={el + i} className={styles.createdDietListItem}>
                    {capitalize(el)}
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>

      <button type="submit" className={styles.formButton}>
        All ready, create recipe!
      </button>
    </form>
  );
}

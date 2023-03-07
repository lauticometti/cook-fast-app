import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { capitalize } from "../../helpers";
import { createRecipe, getDiets } from "../../redux/actions";
import styles from "./Form.module.css";
import closeIcon from "../../assets/close-icon.svg";
import {
  imageValidator,
  nameValidator,
  stepValidator,
  summaryValidator,
} from "../../formValidators";

export function Form() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch, getDiets]);

  const diets = useSelector((state) => state.diets);

  const [dietsCheck, setDietsCheck] = useState([
    diets.length && diets.map((el) => false),
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

  const [readyToSubmit, setReadyToSubmit] = useState("");

  // ========= ======= ========= //
  // ========= ======= ========= //

  // ========= HANDLES ========= //

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(errors).some((el) => !!el)) setReadyToSubmit(false);
    else {
      const numeredSteps = inputs.steps.map((el, i) => ({
        number: i + 1,
        step: el,
      }));

      const data = {
        name: inputs.name,
        image: inputs.image,
        summary: inputs.summary,
        healthScore: inputs.healthScore + "",
        steps: numeredSteps,
        diets: [...inputs.diets, ...inputs.customDiets],
      };

      dispatch(createRecipe(data));

      setInputs({
        name: "",
        summary: "",
        image: "",
        healthScore: 50,
        diets: [],
        customDiets: [],
        steps: [],
      });

      setDietsCheck(dietsCheck.map((el) => false));
    }
  };

  const handleNameChange = (event) => {
    event.preventDefault();
    const name = event.target.value;

    setInputs({
      ...inputs,
      name,
    });

    try {
      nameValidator(name);
      setErrors({
        ...errors,
        name: "",
      });
    } catch (error) {
      setErrors({
        ...errors,
        name: error.message,
      });
    }
  };

  const handleSummaryChange = (event) => {
    const summary = event.target.value;
    setInputs({
      ...inputs,
      summary,
    });

    try {
      summaryValidator(summary);
      setErrors({
        ...errors,
        summary: "",
      });
    } catch (error) {
      setErrors({
        ...errors,
        summary: error.message,
      });
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    try {
      imageValidator(file);
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          setInputs({
            ...inputs,
            image: reader.result,
          });
        },
        false
      );
      if (file) reader.readAsDataURL(file);

      setErrors({
        ...errors,
        image: "",
      });
    } catch (error) {
      setErrors({
        ...errors,
        image: error.message,
      });
    }
  };

  const closeInputImage = (event) => {
    event.preventDefault();
    setInputs({
      ...inputs,
      image: "",
    });
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
    event.preventDefault();
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
    event.preventDefault();
    let step;
    if (event.target.type === "textarea") step = event.target.value;
    else step = event.target.previousSibling.value;

    try {
      stepValidator(step)
      setInputs({
        ...inputs,
        steps: [...inputs.steps, step],
      });
      setErrors({
        ...errors,
        steps: ''
      })

    } catch (error) {
      setErrors({
        ...errors,
        steps: error.message
      })
    }


    



    if (event.target.type === "textarea") event.target.value = '';
    else event.target.previousSibling.value = ''

  };

  return (
    <form autoComplete="off" className={styles.form}>
      <div className={styles.blockNaSuRa}>
        {/* NAME */}
        <input
          type="text"
          placeholder="NAME"
          onChange={handleNameChange}
          value={inputs.name}
          className={styles.inputName}
        />
        {errors.name ? <span className="nameError">{errors.name}</span> : null}

        {/* SUMMARY */}
        <textarea
          type="text"
          placeholder="SUMMARY"
          value={inputs.summary}
          onChange={handleSummaryChange}
          className={styles.inputSummary}
        />
        {
          errors.summary ? <span className={styles.summaryError}>{errors.summary}</span> : null
        }

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
          {
            errors.steps ? <span className={styles.stepError}>{errors.steps}</span> : null
          }

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
        {inputs.image === "" ? (
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
        ) : (
          <div className={styles.imagePreviewContainer}>
            <img
              src={inputs.image}
              alt="recipe image"
              className={styles.imagePreview}
            />
            <img
              src={closeIcon}
              alt="X"
              className={styles.imagePreviewClose}
              onClick={closeInputImage}
            />
          </div>
        )}
        {errors.image ? (
          <span className={styles.imageError}>{errors.image}</span>
        ) : null}

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

      <button
        type="submit"
        onClick={handleSubmit}
        className={styles.formButton}
      >
        All ready, create recipe!
      </button>
      {readyToSubmit === false ? (
        <p className={styles.submitError}>Complete all fields!</p>
      ) : readyToSubmit === true ? (
        <p className={styles.submitReady}>Ready to submit</p>
      ) : null}
    </form>
  );
}

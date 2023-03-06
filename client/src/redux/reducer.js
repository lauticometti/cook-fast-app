import { alphabeticSort, numericSort } from "../helpers";
import {
  GET_RECIPES,
  GET_DIETS,
  ERROR_HANDLER,
  GET_RECIPES_NAME,
  ORDER_BY_NAME,
  ORDER_BY_HEALTH_SCORE,
  FILTER_BY_DIETS,
  GET_RECIPE_ID,
  CREATE_RECIPE,
  FILTER_BY_CREATOR,
} from "./action-types";

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: "",
  error: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RECIPES:
      const currentRecipes = payload.filter(
        (payloadRecipe) =>
          !state.recipes.some(
            (stateRecipe) => stateRecipe.name === payloadRecipe.name
          )
      );

      currentRecipes.forEach((el) =>
        el.diets.forEach((diet) => diet.toLowerCase())
      );
      state.recipes.forEach((el) =>
        el.diets.forEach((diet) => diet.toLowerCase())
      );

      return {
        ...state,
        recipes: [...state.recipes, ...currentRecipes],
        allRecipes: [...state.recipes, ...currentRecipes],
        error: false,
      };

    case GET_RECIPES_NAME:
      payload.forEach((el) => el.diets.forEach((diet) => diet.toLowerCase()));
      return {
        ...state,
        recipes: payload,
        error: false,
      };

    case GET_RECIPE_ID:
      payload.diets.forEach((diet) => diet.toLowerCase());

      return {
        ...state,
        detail: payload,
        error: false,
      };

    case GET_DIETS:
      const filteredDiets = payload.filter(
        (diet) => !state.diets.includes(diet)
      );
      return {
        ...state,
        diets: [...state.diets, ...filteredDiets],
        error: false,
      };

    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [payload, ...state.recipes],
        allRecipes: [payload, ...state.allRecipes],
        error: false,
      };

    case FILTER_BY_DIETS:
      const filteredRecipes = state.allRecipes.filter((recipe) =>
        payload.every((payloadDiet) => recipe.diets.includes(payloadDiet))
      );

      return {
        ...state,
        recipes: filteredRecipes,
        error: false,
      };

    case FILTER_BY_CREATOR:
      let creatorRecipes;

      if (payload === 'user') { 
        creatorRecipes = state.allRecipes.filter(
        (recipe) => recipe.createdOnDB
      )}
      else if (payload === 'API') {
        creatorRecipes = state.allRecipes.filter(
        (recipe) => !recipe.createdOnDB)
      } else creatorRecipes = state.recipes
      
      return {
        ...state,
        recipes: creatorRecipes,
      };

    case ORDER_BY_NAME:
      let alphabeticRecipes = alphabeticSort(state.allRecipes, payload);
      return {
        ...state,
        recipes: alphabeticRecipes,
        error: false,
      };

    case ORDER_BY_HEALTH_SCORE:
      let scoreRecipes = numericSort(state.allRecipes, payload);
      return {
        ...state,
        recipes: scoreRecipes,
        error: false,
      };

    case ERROR_HANDLER:
      return {
        ...state,
        error: payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;

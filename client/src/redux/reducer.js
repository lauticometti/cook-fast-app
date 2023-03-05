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

      return {
        ...state,
        recipes: [...state.recipes, ...currentRecipes],
        allRecipes: [...state.recipes, ...currentRecipes],
        error: false,
      };

    case GET_RECIPES_NAME:
      return {
        ...state,
        recipes: payload,
      };

    case GET_RECIPE_ID:
      return {
        ...state,
        detail: payload,
        error: false,
      };

    case GET_DIETS:
      return {
        ...state,
        diets: [...new Set([...state.diets, ...payload])],
        error: false,
      };
      
    case CREATE_RECIPE: 
      return {
        ...state,
        recipes: [payload, ...state.recipes],
        allRecipes: [payload, ...state.allRecipes]
      }

    case FILTER_BY_DIETS:
      const filteredRecipes = state.allRecipes.filter((recipe) =>
        payload.every((payloadDiet) => recipe.diets.includes(payloadDiet))
      );

      return {
        ...state,
        recipes: filteredRecipes,
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

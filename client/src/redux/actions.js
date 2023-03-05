import {
  GET_RECIPES,
  GET_DIETS,
  ORDER_BY_NAME,
  ORDER_BY_HEALTH_SCORE,
  ERROR_HANDLER,
  GET_RECIPES_NAME,
  FILTER_BY_DIETS,
  GET_RECIPE_ID,
  CREATE_RECIPE,
} from "./action-types";
import axios from 'axios'
import data from "../data.js";

export const getRecipes = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/recipes') 
    return dispatch({
      type: GET_RECIPES,
      payload: response.data,
    });
  } catch (error) {
    dispatch(errorHandler(error)); // set as 'true' a property named 'error' in the store until another action change it
  }
};

export const getRecipesByName = (recipeName) => async (dispatch) => {
  try {
    const response = data.data.filter((el) =>
      el.name.toLowerCase().includes(recipeName.toLowerCase())
    ); /* await axios.get(`http://localhost:3001/recipes?name=${recipeName}` */
    return dispatch({
      type: GET_RECIPES_NAME,
      payload: response,
    });
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const getRecipeById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/recipes/${id}`)  /*  data.data.find(el => el.id == +id) */
    return dispatch({
      type: GET_RECIPE_ID,
      payload: response.data
    })
  } catch (error) {
    dispatch(errorHandler(error));
  }
}

export const getDiets = () => async (dispatch) => {
  try {
    const response = data; /* await axios.get('http://localhost:3001/diets') */
    return dispatch({
      type: GET_DIETS,
      payload: [
        ...new Set(
          response.data
            .map((el) => el.diets)
            .reduce((acc, cur) => acc.concat(cur), [])
        ),
      ],
    });
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const createRecipe = (formData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/recipes', formData)
    return dispatch({
      type: CREATE_RECIPE,
      payload: response.data
    })
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

export const filterByDiets = (diets) => {
  return { type: FILTER_BY_DIETS, payload: diets }
}

export const orderByName = (orderType) => {
  return { type: ORDER_BY_NAME, payload: orderType };
};

export const orderByHealthScore = (orderType) => {
  return { type: ORDER_BY_HEALTH_SCORE, payload: orderType };
};

const errorHandler = (err) => {
  return { type: ERROR_HANDLER, payload: err.message };
};

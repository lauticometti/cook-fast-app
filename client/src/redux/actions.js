import { GET_RECIPES, GET_RECIPES_NAME, GET_RECIPE_ID, GET_DIETS, FILTER_BY_DIETS, FILTER_BY_CREATOR, ORDER_BY_NAME, ORDER_BY_HEALTH_SCORE, ERROR_HANDLER } from './action-types'
import axios from 'axios'
import data from '../data.js'

export const getRecipes = () => async (dispatch) => {
  try {
    const response = data /* await axios.get('http://localhost:3001/recipes') */
    return dispatch({
      type: GET_RECIPES,
      payload: response.data
    })
  } catch (error) {
    dispatch(errorHandler(error)) // set as 'true' a property named 'error' in the store until another action change it  
  }  
} 

const getRecipesName = (name) => {

} 

const getRecipeId = (id) => {

} 

const getDiets = (diets) => {
  return { type: GET_DIETS, payload: diets }
} 

const filterByDiets = (diets) => {

} 

const filterByCreator = (creator) => {

} 

const orderByName = (orderType) => {

} 

const orderByHealthScore = (orderType) => {

} 

const errorHandler = (err) => {
  return { type: ERROR_HANDLER, payload: err.message}
}

// ===============  functions that using thunk  ================== //

/* export const getDiets_fn = (dispatch) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/diets')
      dispatch(getDiets(response.data))
    } catch (error) {
      dispatch(errorHandler()) // set as 'true' a property named 'error' in the store until another action change it  
    }  
  }
} */




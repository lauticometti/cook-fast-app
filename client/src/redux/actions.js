import { GET_RECIPES, GET_DIETS, ORDER_BY_NAME, ORDER_BY_HEALTH_SCORE, ERROR_HANDLER } from './action-types'
//import axios from 'axios'
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

export const getDiets = (diets) => {
  return { type: GET_DIETS, payload: diets }
} 

export const orderByName = (orderType) => {
  return { type: ORDER_BY_NAME, payload: orderType }
} 

export const orderByHealthScore = (orderType) => {
  return { type: ORDER_BY_HEALTH_SCORE, payload: orderType }
} 

const errorHandler = (err) => {
  return { type: ERROR_HANDLER, payload: err.message}
}






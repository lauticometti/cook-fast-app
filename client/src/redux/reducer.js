import { GET_RECIPES, GET_DIETS, ERROR_HANDLER,  } from './action-types'
import { alphabeticSort, numericSort } from '../helpers'


const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  error: false
}

const reducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: [...new Set([...state.recipes, ...payload])],
        allRecipes: [...new Set([...state.recipes, ...payload])],
        error: false,
      }

    case GET_DIETS:
      return {
        ...state,
        diets: [...state.diets, ...payload],
        error: false
      }

    // case ORDER_BY_NAME:
      
    //   let alphabeticRecipes = alphabeticSort(state.allRecipes, payload)
    //   return {
    //     ...state,
    //     recipes: alphabeticRecipes,
    //     error: false
    //   }  


    // case ORDER_BY_HEALTH_SCORE:

    //   let scoreRecipes = numericSort(state.allRecipes, payload)
    //   return {
    //     ...state,
    //     recipes: scoreRecipes,
    //     error: false
    //   }

    case ERROR_HANDLER:
      return {
        ...state,
        error: payload
      }
      
    default: 
      return {...state}
  }
} 

export default reducer
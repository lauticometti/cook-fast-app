import { GET_RECIPES, GET_RECIPES_NAME, GET_RECIPE_ID, GET_DIETS, FILTER_BY_DIETS, ORDER_BY_NAME, ORDER_BY_HEALTH_SCORE, FILTER_BY_CREATOR, ERROR_HANDLER,  } from './action-types'

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
        allRecipes: [...new Set([...state.recipes, ...payload])],
        error: false,
      }

    case GET_RECIPES_NAME:
      break;  
    case GET_RECIPE_ID:
      break;

    case GET_DIETS:
      return {
        ...state,
        diets: [...state.diets, ...payload]
      }
          
    case FILTER_BY_DIETS:
      break;
    
    case FILTER_BY_CREATOR:
      break;

    case ORDER_BY_NAME:
      break;

    case ORDER_BY_HEALTH_SCORE:
      break;

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
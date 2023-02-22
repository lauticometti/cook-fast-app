import { GET_RECIPES, GET_RECIPES_NAME, GET_RECIPE_ID, GET_DIETS, FILTER_BY_DIETS, FILTER_BY_CREATOR, ORDER_BY_NAME, ORDER_BY_HEALTH_SCORE } from './action-types'

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_RECIPES:
      break;
    case GET_RECIPES_NAME:
      break;  
    case GET_RECIPE_ID:
      break;
    case GET_DIETS:
      break;    
    case FILTER_BY_DIETS:
      break;
    case FILTER_BY_CREATOR: 
      break;
    case ORDER_BY_NAME:
      break;
    case ORDER_BY_HEALTH_SCORE:
      break;
    default: 
      return {...state}
  }
} 

export default reducer
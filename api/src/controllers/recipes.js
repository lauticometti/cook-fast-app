require('dotenv').config();
const axios = require('axios')
const Recipe = require('../models/Recipe')

const { API_KEY } = process.env;

const getRecipeById = async (id) => {

  if (!id || !id.match(/^\d+$/g)) throw Error('id not received or not a number')

  try {
    const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)


    // const { id, title, summary, healthScore, image } = recipe.data
    const diets = recipe.data.diets
    
    if (recipe.data.vegetarian) diets.push('vegetarian')

    const steps = recipe.data.analyzedInstructions[0].steps.map(step => ({
      number: step.number,
      step: step.step,
      length: step.length ? {number: step.length.number, unit: step.length.unit} : null
    }))

    return {
      id: recipe.data.id,
      title: recipe.data.title,
      summary: recipe.data.summary,
      healthScore: recipe.data.healthScore,
      image: recipe.data.image,
      diets,
      steps
    }
  }
  catch (err) {
    if(err.message === `A recipe with the id ${id} does not exist.`) {
      // return await Recipe.findByPk(id)
      return 'buscar receta en la db'
    }
  }
}

const getRecipesByName = (name) => {
  if (!id || !id.match(/^\d+$/g)) throw Error('id not received or not a number')

  try {
    const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)


    // const { id, title, summary, healthScore, image } = recipe.data
    const diets = recipe.data.diets
    
    if (recipe.data.vegetarian) diets.push('vegetarian')

    const steps = recipe.data.analyzedInstructions[0].steps.map(step => ({
      number: step.number,
      step: step.step,
      length: step.length ? {number: step.length.number, unit: step.length.unit} : null
    }))

    return {
      id: recipe.data.id,
      title: recipe.data.title,
      summary: recipe.data.summary,
      healthScore: recipe.data.healthScore,
      image: recipe.data.image,
      diets,
      steps
    }
  }
  catch (err) {
    if(err.message === `A recipe with the id ${id} does not exist.`) {
      // return await Recipe.findByPk(id)
      return 'buscar receta en la db'
    }
  }
}

const createRecipe = (name, summary, healthScore, steps, image, diets) => {
  
}


module.exports = { getRecipeById }
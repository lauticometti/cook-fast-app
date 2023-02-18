require('dotenv').config();
const axios = require('axios');
const { Op } = require('sequelize');
const { Recipe, Diet } = require('../db')
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

const getRecipesByName = async (name) => {
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

const createRecipe = async (name, image, summary, healthScore, steps, diets) => {

  const data = [name, image, summary, healthScore, steps, diets]

  if ( data.includes(undefined) || !steps.length || !diets.length ) {
    throw Error('Data incomplete or not sent')
  } 

  const createdRecipeData = (await Recipe.create({
    name,
    image,
    summary,
    healthScore,
    steps
  })).dataValues //only is needs dataValues property, that's where our recipes are located. 

  const newDiets = []

  for (let diet of diets) {
    let newDiet = await Diet.findOrCreate(
      { where: {name: diet.toLowerCase()} }
    )

    newDiets.push(newDiet[0]) 
    //newDiet is an array with two values: the diet, and a bolean that indicate us if the diet was found it or created it 
  }

  return {
    ...createdRecipeData,
    diets: newDiets
  }
}


module.exports = { getRecipeById, createRecipe}
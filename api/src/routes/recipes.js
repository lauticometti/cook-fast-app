const { Router } = require('express')
const { getRecipeById, createRecipe, } = require('../controllers/recipes')

const recipesRouter = Router()

recipesRouter.get('/:idRecipe', async (req, res) => {
  try {
    const { idRecipe } = req.params
    const recipe = await getRecipeById(idRecipe);
    if (recipe) res.status(200).json(recipe)
    else throw Error(`recipe with id ${idRecipe} not found`)
  } catch (error) {
      res.status(404).json({error: error.message})
  }
})

// recipesRouter.get('/', async (req, res) => {
  // try {
  //   const { name } = req.query;
  //   if ( !name ) throw Error('Name not received')

  //   const recipes = await getRecipesByName(name)
  //   if( !recipes.length ) throw Error(`Recipes with name ${name} not found`)
    
  //   res.status(200).json(recipes)
  // } catch (error) {
  //   res.status(404).json({error: error.message})
  // }
//   res.send('toma tus recetitas')
// })

recipesRouter.post('/', async (req, res) => {
  try {
    const { name, image, summary, healthScore, steps, diets } = req.body
    const createdRecipe = await createRecipe(name, image, summary, healthScore, steps, diets)

    res.status(200).json(createdRecipe)  
  } catch (error) {
    res.status(404).json({error: error.message})
  }
})

module.exports = recipesRouter

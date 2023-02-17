const { Router } = require('express')
const { getRecipeById } = require('../controllers/recipes')

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

recipesRouter.get('/', async (req, res) => {
  // try {
  //   const { name } = req.query;
  //   if ( !name ) throw Error('Name not received')

  //   const recipes = await getRecipesByName(name)
  //   if( !recipes.length ) throw Error(`Recipes with name ${name} not found`)
    
  //   res.status(200).json(recipes)
  // } catch (error) {
  //   res.status(404).json({error: error.message})
  // }
  res.send('toma tus recetitas')
})

recipesRouter.post('/', async (req, res) => {
  // try {
  //   const { name, summary, healthScore, steps, image, diets } = req.body

  //   const data = [nombre, summary, healthScore, steps, image, diets]
  //   const indexSteps = data.indexOf(steps)
  //   const indexDiets = data.indexOf(diets)

  //   if ( data.includes(undefined) || !data[indexSteps].length || !data[indexDiets].length ) {
  //     throw Error('Data incomplete or not sent')
  //   }

  //   const createdRecipe = await createRecipe(name, summary, healthScore, steps, image, diets)
  //   if (createdRecipe) res.status(200).json({message: 'Recipe created successfully', createdRecipe})
  //   else throw Error('Recipe could not be created')
  // } catch (error) {
  //   res.status(404).json({error: error.message})
  // }
  res.send('post is working')
})

module.exports = recipesRouter

require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
const { isNumber, isUUIDV4 } = require("../helpers");

const getRecipes = async (name) => {
  let apiRecipes = (
    await axios.get(`
    https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
  ).data.results; // the recipes is inside 'data'.'results' propertys

  let dbRecipes;

  if (name) {
    apiRecipes = apiRecipes.filter((el) =>
      el.title.toLowerCase().includes(name.toLowerCase())
    );

    dbRecipes = await Recipe.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Diet,
          attributes: ["name"],
        },
      ],
    });
  } else {
    dbRecipes = await Recipe.findAll({
      include: [
        {
          model: Diet,
          attributes: ["name"],
        },
      ],
    });
  }

  const cleanedApiRecipes = apiRecipes.map((el) => {
    let recipe = {
      id: el.id,
      name: el.title,
      image: el.image,
      summary: el.summary,
      healthScore: el.healthScore,
      steps: el.analyzedInstructions[0]?.steps.map((step) => ({
        number: step.number,
        step: step.step,
      })),
      diets: el.diets,
    };
    if (el.vegetarian) recipe.diets.push("vegetarian");

    return recipe;
  });

  const cleanedDbRecipes = dbRecipes.map((el) => {
    return {
      id: el.id,
      name: el.name,
      image: el.image,
      summary: el.summary,
      healthScore: el.healthScore,
      steps: el.steps,
      diets: el.Diets.map(diet => diet.name),
      createdOnDB: el.createdOnDB
    };
  });

  return [...cleanedDbRecipes, ...cleanedApiRecipes];
};

const getRecipeById = async (id) => {
  
  if (!isNumber(id) && !isUUIDV4(id)) {
    throw Error(`the param ${id} is neither a numeric id nor a uuidv4`);
  }

  const idType = isUUIDV4(id) ? "UUIDV4" : isNumber(id) ? "Numeric ID" : null;

  switch (idType) {
    case "Numeric ID":
      const recipe = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );

      const diets = recipe.data.diets;

      if (recipe.data.vegetarian) diets.push("vegetarian");

      const steps = recipe.data.analyzedInstructions[0].steps.map((step) => ({
        number: step.number,
        step: step.step,
      }));

      return {
        id: recipe.data.id,
        name: recipe.data.title,
        summary: recipe.data.summary,
        healthScore: recipe.data.healthScore,
        image: recipe.data.image,
        diets,
        steps,
      };

    case "UUIDV4": 
      const dbRecipe = await Recipe.findByPk(id, {
        include: [{ model: Diet, attributes: ["name"] }],
      });

      const cleanedDbRecipe = {
          id: dbRecipe.id,
          name: dbRecipe.name,
          image: dbRecipe.image,
          summary: dbRecipe.summary,
          healthScore: dbRecipe.healthScore,
          steps: dbRecipe.steps,
          diets: dbRecipe.Diets.map(diet => diet.name),
          createdOnDB: dbRecipe.createdOnDB
        }
      
      return cleanedDbRecipe
      
    default:
      return "Neither Numeric ID nor UUIDV4";
  }
};

const createRecipe = async (
  name,
  image,
  summary,
  healthScore,
  steps,
  diets
) => {
  const data = [name, image, summary, healthScore, steps, diets];

  if (data.includes(undefined) || !steps.length || !diets.length) {
    throw Error("Data incomplete or not sent");
  }

  const createdRecipeData = await Recipe.create({
    name,
    image,
    summary,
    healthScore,
    steps,
  });

  const newDiets = [];

  for (let diet of diets) {
    let newDiet = await Diet.findOrCreate({
      where: { name: diet.toLowerCase() },
    });

    newDiets.push(newDiet[0]);
    //newDiet is an array with two values: the diet, and a bolean that indicate us if the diet was found it or created it
  }

  newDiets.forEach((diet) => createdRecipeData.addDiet(diet));

  const recipe = createdRecipeData.dataValues; //only is needs dataValues property, that's where our recipes are located.
  return {
    ...recipe,
    diets: newDiets.map((el) => el.name),
  };
};

module.exports = { getRecipes, getRecipeById, createRecipe };

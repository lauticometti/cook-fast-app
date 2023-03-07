require("dotenv").config();
const axios = require("axios");
const { Diet } = require("../db");
const { API_KEY } = process.env;

// AS THE API DOESN'T GIVE US AN ENDPOINT TO GET ALL THE DIETS, I THOUGHT OF THE FOLLOWING METHOD:
// ASK FOR THE FIRST 100 RECIPES, PUT ALL THE DIETS OF THESE RECIPES IN AN ARRAY AND THEN CREATE
// A NEW SET, THIS WAY WE CAN SAVE THE DIETS IN OUR DATABASE...

// ADVICE: ONLY 100 RECIPES MAY NOT BE ENOUGH TO OBTAIN ALL THE API DIETS. BUT, AT THIS MOMENT, IT IS WORKING.
// NOTE: VEGETARIAN DIET IS NOT PRESENT IN THE 'DIETS' ARRAY, BUT IT'S IN A PROPERTY CALL 'vegetarian'.
// WE CAN TO ASSUME THAT IS AN API ERROR AND PUT VEGETARIAN DIET MANUALLY IN OUR DATABASE, OR WE CAN TAKE VEGETARIAN PROPERTY
// OF ONE RECIPE AND MAKE THE JOB... I CHOOSE THE SECOND WAY.

const getDiets = async () => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );

  const allRecipes = response.data.results; // the api call return us the recipes inside 'data'.'results' propertys

  const recipeDiets = allRecipes
    .map((recipe) => recipe.diets)
    .reduce((a, b) => a.concat(b), []); //get all diets of the first 100 recipes

  const cleanedDiets = [...new Set(recipeDiets)]; //delete repeated diets

  if (allRecipes.find((el) => el.vegetarian)) cleanedDiets.push("vegetarian"); 
  //there is a diet called 'vegetarian' that is not in the 'diets' array, so, we need add it manually

  for (let el of cleanedDiets) {
    await Diet.findOrCreate({where:{name: el.toLowerCase()}}); // use findOrCreate to dont get an error if the diets already is in the database
  }

  let dbDiets = await Diet.findAll()

  dbDiets = dbDiets.map(el => el.name)

  return dbDiets; //return the diets
};

module.exports = getDiets;

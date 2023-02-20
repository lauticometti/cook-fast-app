const { Recipe, Diet, conn } = require("../../src/db.js");
const { expect } = require("chai");

const recipeName = "Rice with eggs and chicken";
const recipe1 = {
  name: recipeName,
  image:
    "https://img-global.cpcdn.com/recipes/435cfddfbaa19528/1200x630cq70/photo.jpg",
  summary: "High carbohydrates and high protein fast food",
  healthScore: "100",
  steps: [
    { number: 1, step: "Bring the three ingredients to a boil separately" },
    {
      number: 2,
      step: "Strain the rice, cut the eggs into pieces and chop the chicken",
    },
    { number: 3, step: "Mix everything in a bowl, add salt and serve" },
  ],
};

describe('Models: ', () => {
  describe("Recipe model:", () => {
    let created;
    before(async () => {
      created = await Recipe.create(recipe1);
    });
  
    describe("all propertys (name, image, summary, healthScore, steps and diets) should be required", () => {
      it("creating a recipe without all propertys should to throw an error", async () => {
        let message = "I am pending";
        try {
          await Recipe.create({ name: "Pasta", healthScore: 40 });
          message = "I was fulfilled";
        } catch (error) {
          message = "I was rejected";
        }
  
        expect(message).to.be.eql("I was rejected");
      });
  
      it("creating a recipe on a correct way should be succesful", async () => {
        expect(created.dataValues)
          .to.be.an("object")
          .to.include.all.keys(
            "id",
            "name",
            "image",
            "summary",
            "healthScore",
            "steps"
          );
      });
    });
  
    describe('after creating a recipe, should be able to relate it to some diets', () => {
      let diet;
      before( async () => { 
        diet = await Diet.findOrCreate({ where: { name: "hypercaloric" } }) 
      })
  
      it("the diet should exist at database", async () => {
        expect(diet[0].dataValues).to.be.an('object').to.include.all.keys('id', 'name')
      });
  
      it('the recipeId of the junction table should to be equal to the recipe id', async () => {
        const recipeDiet = await created.addDiet(diet[0])
        const recipeId = created.dataValues.id
        expect(recipeDiet[0].dataValues.RecipeId).to.be.eql(recipeId)
      })
  
    })
  
  });
  
  describe('Diet model:', () => { 
    before(async () => {
      await conn.sync({force: true})
    })
    it('should to throw an error if name property is not passed', async () => {
      let message = "I am pending";
        try {
          await Diet.create();
          message = "I was fulfilled";
        } catch (error) {
          message = "I was rejected";
        }
  
        expect(message).to.be.eql("I was rejected");
    })
  
    it('should to throw an error trying to create twice the same diet ', async () => {
      let message = "I am pending";
        try {
          await Diet.create({name: 'Hypocaloric'});
          await Diet.create({name: 'Hypocaloric'});
          message = "I was fulfilled";
        } catch (error) {
          message = "I was rejected";
        }
  
        expect(message).to.be.eql("I was rejected");
    })
  
    it('should to create succesfully a diet if the data is correct', async () => {
      let message = "I am pending";
        try {
          await Diet.create({name: 'sugar free'});
          message = "I was fulfilled";
        } catch (error) {
          message = "I was rejected";
        }
  
        expect(message).to.be.eql("I was fulfilled");
    })
  
  })
})

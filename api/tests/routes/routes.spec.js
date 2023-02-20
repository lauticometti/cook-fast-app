const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe } = require("../../src/db.js");

const agent = session(app);
const recipeName = "Rice with eggs and chicken";
const recipe = {
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
  diets: ["high protein", "high calories", "gimrat food"],
};

describe("Routes:", () => {
  before(async () => {
    await Recipe.sync({ force: true })
  })

  describe("GET petition:", () => {
    let responseName;
    let responseId;

    before(async () => {
      await Recipe.create(recipe)
      responseName = await agent.get("/recipes?name=egg");
      responseId = await agent.get("/recipes/1");
    });

    describe("by name, to /recipes?name=egg", () => {
      it("should return an array with 3 elements", () => {
        expect(responseName.body).to.be.an("array").to.have.lengthOf(3);
      });

      it('a recipe should be named "Rice with eggs and chicken"', () => {
        expect(responseName.body[0].name).to.be.eql(recipeName);
      });
    });

    describe("by id, to /recipes/1", () => {
      it('should get one recipe named "Fried Anchovies with Sage"', () => {
        expect(responseId.body.title).to.be.eql("Fried Anchovies with Sage");
      });

      it("should to be an object...", () => {
        expect(responseId.body).to.be.an("object");
      });

      it("...that have all propertys of a Recipe", () => {
        expect(responseId.body).to.include.all.keys(
          "id",
          "title",
          "summary",
          "healthScore",
          "image",
          "diets",
          "steps"
        );
      });
    });

    describe("without params, to /recipes...", () => {

      describe('...with one recipe into the database', () => {
        let responseAll;
        before(async () => {
          responseAll = await agent.get("/recipes"); //make petition
        });

        it(`the first element should to have the name ${recipeName}`, () => {
          expect(responseAll.body[0].name).to.be.eql(recipeName)
        })

        it("should to get an array with 101 objects", () => {
          expect(responseAll.body).to.be.an("array").to.have.lengthOf(101);
        });

      })

      describe("...with the database empty, without recipes", () => {
        let responseAll;
        before(async () => {
          await Recipe.sync({ force: true }) //clean the database
          responseAll = await agent.get("/recipes"); //make petition
        });
        it("should to get an array with 100 objects", () => {
          expect(responseAll.body).to.be.an("array").to.have.lengthOf(100);
        });

        it("at first place, should to have an recipe named: Cannellini Bean and Asparagus Salad with Mushrooms", () => {
          expect(responseAll.body[0].name).to.be.eql(
            "Cannellini Bean and Asparagus Salad with Mushrooms"
          );
        });
      });
    });
  });

  describe("POST petition:", () => {
    describe("to /recipes", () => {
      let body;
      const attributes = [
        "name",
        "image",
        "summary",
        "healthScore",
        "steps",
        "diets",
      ];
  
      before(async () => {
        body = (await agent.post("/recipes").send(recipe)).body;
      });
  
      it("should to create a new recipe", () => {
        expect(body)
          .to.be.an("object")
          .to.include.keys(...attributes);
      });
  
      it('"steps" property should be an array...', () => {
        expect(body.steps).to.be.an("array");
      });
  
      it("...and its first child should be an object", () => {
        expect(body.steps[0]).to.be.an("object");
      });
  
      it('...with the keys "step" and "number"', () => {
        expect(body.steps[0]).to.include.all.keys("step", "number");
      });
    });
  });
})

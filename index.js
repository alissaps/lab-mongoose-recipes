const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    try {
      const createRecipe = await Recipe.create({
        title: "Vegan Brownies",
        level: "Amateur Chef",
        ingredients: [
          "2 cups unbleached all-purpose flour",
          "2 cups white sugar",
          "¾ cup unsweetened cocoa powder",
          "1 teaspoon baking powder",
          "1 teaspoon salt",
          "1 cup water",
          "1 cup vegetable oil",
          "1 teaspoon vanilla extract",
        ],
        cuisine: "French",
        dishType: "dessert",
        image:
          "https://img.cybercook.com.br/receitas/690/brownie-low-carb-com-nozes.jpeg",
        duration: 30,
        creator: "Alissa",
      });

      console.log(`Title: ${createRecipe.title}`)

      const addRecipes = await Recipe.insertMany(data);
      addRecipes.map((element) => {
        console.log(`Title: ${element.title}`)
      });

      const updateRecipes = await Recipe.findOneAndUpdate(
        {title: "Rigatoni alla Genovese"},
        {duration: 100},
        {new: true}
      );

      console.log(`Receita Atualizada: ${updateRecipes}`)

      const removeRecipe = await Recipe.deleteOne(
        {title: "Carrot Cake"}
      )
      console.log(removeRecipe)

    }catch (err) {
      console.log(err);
    }

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
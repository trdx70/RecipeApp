const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredient = require('./ingredient');

const RecipeSchema = new Schema({
    name: String,
    about: String,
    description: String,
    origin: String,
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: 'ingredient'
    }]
});

RecipeSchema.statics.findIngredients = function(id) {
    return this.findById(id)
      .populate('ingredients')
      .then( recipe => recipe.ingredients)
}

module.exports = mongoose.model('recipe', RecipeSchema)
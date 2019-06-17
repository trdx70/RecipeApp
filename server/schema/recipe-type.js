const mongoose = require('mongoose');
const graphql = require('graphql');
const IngredientsType = require('./ingredient-type');
const Recipe = require('../models/recipe');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
} = graphql;

const RecipeType = new GraphQLObjectType({
   name: 'Recipe',
   fields: () => ({
       id: { type: GraphQLID },
       name: { type: GraphQLString },
       about: {  type: GraphQLString },
       description: { type: GraphQLString },
       origin: { type: GraphQLString },
       ingredients: {
           type: new GraphQLList(IngredientsType),
           resolve(parentValue, args) {
               return Recipe.findIngredients(parentValue.id)
               //console.log(parentValue);
           }
       }
   })
});

module.exports = RecipeType;

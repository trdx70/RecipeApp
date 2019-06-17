const mongoose = require('mongoose');
const graphql = require('graphql');
const RecipeType = require('./recipe-type');
const Recipe = require('../models/recipe');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} = graphql;

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        recipes: {
            type: new GraphQLList(RecipeType),
            resolve(parentValue, args) {
                return Recipe.find({});
            }
        },
        recipe: {
            type: RecipeType,
            args:{
                id: { type: GraphQLID }
            },
            resolve(parentValue, args) {
                return Recipe.findById(args.id);
            }
        }
    }
})

module.exports = RootQueryType;
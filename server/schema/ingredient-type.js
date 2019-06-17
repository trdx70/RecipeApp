const mongoose = require('mongoose');
const graphql = require('graphql');
const Ingredient = require('../models/ingredient');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql;

const IngredientsType = new GraphQLObjectType({
    name: 'Ingredients',
    fields: () => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString },
        measurement: { type: GraphQLString },
        reci: {
            type: require('./recipe-type'),
            resolve(parentValue) {
                return Ingredient.findById(parentValue.id)
                   .populate('recipe')
                   .then(ingredient => ingredient.recipe)
            }
        }
    })
});

module.exports = IngredientsType;

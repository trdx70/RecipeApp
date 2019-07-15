const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString
} = graphql;

const Recipe = require('../models/recipe');
const RecipeType = require('./recipe-type');
const IngredientType = require('./ingredient-type');
const Ingredient = require('../models/ingredient');
const UserType = require('./user-type');
const AuthMe = require('../service/passportAuth');

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addRecipe: {
            type: RecipeType,
            args: {
                name: {type: GraphQLString},
                about: {type: GraphQLString},
                description: {type: GraphQLString},
                origin: {type: GraphQLString},
            },
            resolve(parentValue, args) {
                return (new Recipe({...args})).save()
            }
        },
        addRecipeIngredients: {
           type: IngredientType,
           args: {
               id: {type: GraphQLID},
               name: {type: GraphQLString},
               measurement: {type: GraphQLString},
           },
           resolve(parentValue, {id, name, measurement}) {
               //console.log(parentValue, args);
               return Recipe.findById(id)
                  .populate('ingredients')
                  .then(recipe => {
                      const ingredients = new Ingredient({name, measurement});
                      recipe.ingredients.push(ingredients);
                      return Promise.all([ingredients.save(),recipe.save()])
                          .then(([ingredients, recipe]) => ingredients)
                  })
           }
        },
        deleteRecipe: {
            type: RecipeType,
            args: { 
                id: {type: GraphQLID}
            },
            resolve(parentValue, {id}) {
                //console.log(parentValue, args);
                return Recipe.deleteOne({_id: id })
               
            }
        },
        //***************User Part Mutations*********************** */
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, {email, password}, req) {
               return AuthMe.login({email, password, req})
            }
 
        },
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, {email, password}, req) {
                return AuthMe.signup({email,password,req})
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, req) {
                const { user } = req;
                req.logout();
                return user;
            }
        }
    }
});

module.exports = MutationType;
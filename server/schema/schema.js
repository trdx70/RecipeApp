const { GraphQLSchema } = require('graphql');
const mutations = require('./mutation');
const RootQueryType = require('./rootQuery-type');

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: mutations
})
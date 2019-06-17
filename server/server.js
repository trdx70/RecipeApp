const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressGraphQL = require('express-graphql');
const publicPath = path.join(__dirname, '..', 'public')

const schema = require('./schema/schema');

const app = express();

//for cross origin req
app.use(cors());

//for mongo use
//const MONGO_CONN = 'mongodb://localhost:27017/recipe';
const MONGO_CONN = 'mongodb://strinidad:_10oclockNOW@ds139037.mlab.com:39037/recipe';
if (!MONGO_CONN) {
    throw new Error('Please provide your Mongodb connection string');
}
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_CONN, {useNewUrlParser: true});
mongoose.connection
     .once('open', () => console.log('Connected to MongoDB...'))
     .on('error', error => console.log('Error connecting to MongoDB'))

//bodyParser
app.use(bodyParser.json());

//for Graphql
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
    pretty: true
}));

//catch other route
app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'))
})

module.exports = app;

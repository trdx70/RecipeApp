const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressGraphQL = require('express-graphql');
const MongoStore = require('connect-mongo')(session);
const publicPath = path.join(__dirname, '..', 'public')
const key = require('./config/key');

const schema = require('./schema/schema');
const passportAuth = require('./service/passportAuth');

const app = express();

//for cross origin req
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

//for mongo use
//const MONGO_CONN = 'mongodb://localhost:27017/recipe';
const MONGO_CONN = key.mongoURI;
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

// app.use(
//     cookieSession({
//        maxAge: 30 * 24 * 60 * 60 * 1000,
//        keys: [key.cookieKey],
//        domain: 'http://localhost:8080'
//     })
// );

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'aaabbbccc',
    store: new MongoStore({
      url: MONGO_CONN,
      autoReconnect: true
    })
  }));
  

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object. 
app.use(passport.initialize());
app.use(passport.session());

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

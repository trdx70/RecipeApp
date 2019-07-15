const mongoose = require('mongoose');
require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('user');

//used to provide some identifying token that can be saved
// in the users session. 
passport.serializeUser((user, done) => {
   done(null, user.id);
});

//Given only a user's ID, we must return
// the user object.  This object is placed on 'req.user'.
passport.deserializeUser((id, done) => {
   User.findById(id, (err, user) => {
      done(null, user);
   })
});

// Instructs Passport how to authenticate a user using a locally saved email
// and password combination.  This strategy is called whenever a user attempts to
// log in.  We first find the user model in MongoDB that matches the submitted email,
// then check to see if the provided password/email matches the saved password/email. There
// are two obvious failure points here: the email might not exist in our DB or
// the password might not match the saved one.  In either case, we call the 'done'
// callback, including a string that messages why the authentication process failed.
// This string is provided back to the GraphQL client.
passport.use((new LocalStrategy({usernameField: 'email'},
    (email, password, done) => {
        User.findOne({ email: email.toLowerCase() }, (err, user) => {
           if (err) {
               return done(err);
           }

           if (!user) {
               return done(null, false, 'Invalid Credentials');
           }

           user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err); }
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false, 'Invalid credentials.');
          });
        })
    }
)));

// Logs in a user.  This will invoke the 'local-strategy' defined above in this
// file. The 'passport.authenticate'
// function returns a function, as its intended to be used as a middleware with
// Express.  We have another compatibility layer here to make it work nicely with
// GraphQL, as GraphQL always expects to see a promise for handling async code.
function login({ email, password, req }) {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user) => {
        if (!user) { reject('Invalid credentials.') }
  
        req.login(user, () => resolve(user));
      })
      
    ({ body: { email, password } });
    });
  }

function signup({email, password, req}) {
      const user = new User({email, password});
      if (!email || !password) {
          throw new Error('Please provide email and password');
      }
      return User.findOne({email})
          .then(userExist => {
              if (userExist) { 
                throw new Error('Email already exist');
              } else {
                return user.save();
              }
          })
          .then(user => {
              return new Promise((resolve, reject) => {
                  req.login(user, (err) => {
                      if (err) { 
                         reject(err); 
                      } else {
                        resolve(user);
                      }
                  });
              })
          })
          
  }

  module.exports = {login, signup};
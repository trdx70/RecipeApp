import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo'
import { ApolloClient} from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat} from 'apollo-link';
import { BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import key from '../server/config/key';

import Header from './src/components/Header';
import RecipeList from './src/components/RecipeList';
import RecipeCreate from './src/components/RecipeCreate';
import RecipeDetail from './src/components/RecipeDetails';
import Signup from './src/components/Signup';
import Dashboard from './src/components/Dashboard';

// const networkInterface = createNetworkInterface({
//     uri: '/graphql',
//     opts: {
//         credentials: 'same-origin' //tells GraphQL to pass cookie to backend server
//     }
// })

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token') || null,
      }
    });
  
    return forward(operation);
  })

const cache = new InMemoryCache();

const httpLink = new HttpLink({ 
    uri: key.apolloClientUri,
    credentials: 'same-origin'
});


const client = new ApolloClient({
    dataIdFromObject: o => o.id,
    cache,
    link: concat(authMiddleware, httpLink)

})

const Login = () => {
    return (
        <div>Login</div>
    )
}

const App = () => {
    return (
        <div className="container">
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Header />
                    <div>
                        <Route path="/" exact component={RecipeList}/>
                        <Route path="/recipes/new" component={RecipeCreate} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/recipe/:id" component={RecipeDetail} />
                    </div>
                </BrowserRouter>
            </ApolloProvider>
        </div>    
    )
}

ReactDOM.render( 
        <App /> ,document.getElementById('root')
);
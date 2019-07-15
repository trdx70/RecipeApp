import React from 'react';
import {ApolloProvider} from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter, Route} from 'react-router-dom';

import key from '../../../server/config/key';
import Header from './Header';
import RecipeList from './RecipeList';
import RecipeCreate from './RecipeCreate';
import RecipeDetail from './RecipeDetails';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Login from './Login';

const cache = new InMemoryCache({
    dataIdFromObject: o => o.id
});

const httpLink = new HttpLink({
    credentials: 'include', 
    uri: key.apolloClientUri
});

const client = new ApolloClient({
    link: httpLink,
    cache
})

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
                        <Route path="/dashboard/:user" component={Dashboard} />
                        <Route path="/recipe/:id" component={RecipeDetail} />
                    </div>
                </BrowserRouter>
            </ApolloProvider>
        </div>    
    )
}

export default App;
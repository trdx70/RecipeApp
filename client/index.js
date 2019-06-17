import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo'
import ApolloClient from 'apollo-boost';
import { BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import '../node_modules/materialize-css/dist/css/meterialize.min.css';

import Header from './src/components/Header';
import RecipeList from './src/components/RecipeList';
import RecipeCreate from './src/components/RecipeCreate';
import RecipeDetail from './src/components/RecipeDetails';

const client = new ApolloClient({
   
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
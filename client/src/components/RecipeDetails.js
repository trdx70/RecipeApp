import React from 'react';
import { graphql } from 'react-apollo';
import fetchRecipeDetail from '../queries/fetchRecipeDetail';
import AddIngredient from './AddRecipeINgredients';

class RecipeDetail extends React.Component {

    render() {
        if (!this.props.data.recipe) return <div>Loading...</div>
        const {name,about, ingredients, id} = this.props.data.recipe;
        return (
            <div>
               <h3>{name}</h3>
               <h6>{about}</h6>
               <br />
               <h6>Ingredients:</h6>
               <ul>
                    {ingredients.map(ingredient => {
                       return <li key={ingredient.id}>{ingredient.name}............... {ingredient.measurement}</li>
                    })}
               </ul>
               <AddIngredient recipeId={id}/>
            </div>
        )
    }
}

export default graphql(fetchRecipeDetail,{
    options: props => {
        return {
            variables: { id: props.match.params.id}
        }
    }
})(RecipeDetail);
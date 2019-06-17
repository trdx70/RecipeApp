import React, {Component} from 'react';
import { graphql,compose} from 'react-apollo';
import { Link } from 'react-router-dom';
import fetchRecipeList from '../queries/fetchRecipeList';
import deleteRecipe from '../queries/deleteRecipe';

class RecipeList extends Component {

    onDeleteRecipe(id) {
         this.props.deleteRecipe({
             variables: {
                 id
             }
         }).then(() => this.props.recipeList.refetch())

    }

    render() {
        const { loading, error} = this.props.recipeList;
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error...</div>

        return (
            <div >
                 <div>
                    <ul className="collection">
                        {this.props.recipeList.recipes.map(rec => {
                            return (
                               <li className="collection-item" key={rec.id}>
                                <Link to={`/recipe/${rec.id}`}>
                                   {rec.name}
                                  </Link>
                                <i className="material-icons" onClick={() => this.onDeleteRecipe(rec.id)}>delete</i>  
                               </li>
                               )
                        })}
                    </ul>
                 </div>
                <div>
                    <Link to="/recipes/new" className="btn-floating btn-large green right">
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            </div>
        )
    }
}
        

export default compose(
    graphql(fetchRecipeList,{name:"recipeList"}),
    graphql(deleteRecipe, {name: "deleteRecipe"})
)(RecipeList);
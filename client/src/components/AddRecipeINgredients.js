import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import addRecipeIngredient from '../queries/addRecipeIngredient';
import fetchRecipeDetail from '../queries/fetchRecipeDetail';

class AddRecipeIngredients extends Component {
    
    state = {
        name: '',
        measure: ''
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.mutate({
            variables: {
                id: this.props.recipeId,
                name: this.state.name,
                measurement: this.state.measure
            },
            refetchQueries: [{query: fetchRecipeDetail, variables:{id:this.props.recipeId}}]
        });
        this.setState({
            name: '',
            measure: ''
        })
    }

    render() {
        return (
            <form id="recFormIng">
                <div className="input-field">
                   <input value={this.state.name} onChange={evt => this.setState({name: evt.target.value})}/>
                   <label className="active">Ingredient name</label>
                </div>
                <div className="input-field">
                   <input value={this.state.measure} onChange={evt => this.setState({measure: evt.target.value})}/>
                   <label className="active">Measurement</label>
                </div>
                <a className="btn-floating btn-large waves-effect waves-light
                              green right">
                          <i className="material-icons" onClick={this.onSubmit.bind(this)}>add</i>
                    </a>

            </form>
        )
    }
}

export default graphql(addRecipeIngredient)(AddRecipeIngredients);
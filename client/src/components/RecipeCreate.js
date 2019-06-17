import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import addRecipe from '../queries/addRecipe';
import fetchRecipeList from '../queries/fetchRecipeList';

class RecipeCreate extends Component {
    state = {
       name: '',
       about: '',
       desc: '',
       origin: ''
    }

    onSubmit(evt) {
       evt.preventDefault();

        this.props.mutate({
           variables: {
               name: this.state.name,
               about: this.state.about,
               description: this.state.desc,
               origin: this.state.origin
           },
           refetchQueries: [{query: fetchRecipeList}]
       }).then(() => this.props.history.push('/'))
       
    }

    render() {
        return (
           <div>
                <h5>Create new recipe</h5>
                <form className="col s12" id="recFormRec">
                    <div className="row">
                        <div className="input-field col s12" >
                            <input value={this.state.name}
                                    onChange={evt => this.setState({name: evt.target.value})} />
                            <label className="active">Recipe name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12" >
                            <input value={this.state.about} 
                                    onChange={evt => this.setState({about: evt.target.value})} />
                            <label className="active">About</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12" >
                            <input value={this.state.desc} 
                                    onChange={evt => this.setState({desc: evt.target.value})} />
                            <label className="active">Description</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input value={this.state.origin} 
                                    onChange={evt => this.setState({origin: evt.target.value})} />
                            <label className="active">Origin</label>
                        </div>
                    </div>
                    <a className="btn-floating btn-large waves-effect waves-light green right">
                          <i className="material-icons" onClick={this.onSubmit.bind(this)}>add</i>
                    </a>
                    
                </form>
           </div>
        )
    }
}

export default graphql(addRecipe)(RecipeCreate);
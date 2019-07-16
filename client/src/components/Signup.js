import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import AuthCommonForm from './AuthCommonForm';
import signupMutate from '../../mutations/Signup';
import currentUser from '../../queries/currentUser';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: []
        }
    }

    componentWillUpdate(nextProps) {
       console.log(nextProps.data.user);
       const userName = nextProps.data.user.email.split('@')[0];
        if (nextProps.data.user) {
            nextProps.history.push(`/dashboard/${userName}`);
        }
        
    }
   
    onSubmit({email, password}) {
       this.props.mutate({
           variables: {
               email,
               password
           },
           refetchQueries: [{query: currentUser}]
       }).catch( res => {
           const errors = res.graphQLErrors.map(err => { return err.message })
           this.setState({errors});
       });

    }

    render() {
        return (
            <div>
                <h3>Signup Form</h3>
                <AuthCommonForm onSubmit={this.onSubmit.bind(this)} errors={this.state.errors} />
            </div>
        )
    }
}

export default compose(
    graphql(currentUser),
    graphql(signupMutate))(Signup);
 
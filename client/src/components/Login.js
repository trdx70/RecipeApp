import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';

import AuthCommonForm from './AuthCommonForm';
import currentUser from '../../queries/currentUser';
import login from '../../mutations/Login';
import { graphQLResultHasError } from 'apollo-utilities';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: []
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.data.user) {
            nextProps.history.push('/dashboard');
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
           const errors = res.graphQLErrors.map(err => err.message);
           this.setState({errors});
       })
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthCommonForm onSubmit={this.onSubmit.bind(this)} errors={[]}/>
            </div>
        )
    }
}

export default compose(
    graphql(currentUser),
    graphql(login))(Login);
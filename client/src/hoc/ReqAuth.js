import React, { Component} from 'react';
import {graphql} from 'react-apollo';

import currentUser from '../../queries/currentUser';

export default (WrappedComponent) => {
    class RequireAuth extends Component {

        componentWillUpdate(nextProps) {
            console.log(nextProps);
            if (!nextProps.data.loading && !nextProps.data.user) {
                nextProps.history.push('/login');
            }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    return graphql(currentUser)(RequireAuth);

}
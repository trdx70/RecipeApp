import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {graphql} from 'react-apollo';

import currentUser from '../../queries/currentUser';
import logoutUser from '../../mutations/Logout';


class Header extends Component {
    onLogout() {
        this.props.mutate({
            refetchQueries: [{query: currentUser}]
        })
    }

    renderButtons() {
       const { loading, user } = this.props.data;
       if (loading) { return <div /> }
       if ( !user ) {
           return (
               <div>
                 <li><Link to="/signup">Signup</Link></li>
                 <li><Link to="/login">Login</Link></li>
               </div>

           )    
       } else {
           return (
               <li><a onClick={this.onLogout.bind(this)}>Logout</a></li>
           )
       }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                <a href="#" className="brand-logo">Recipe App</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                   {this.renderButtons()}
                </ul>
                </div>
          </nav>
        )
    }
}

export default graphql(logoutUser)(
 graphql(currentUser)(Header)
);
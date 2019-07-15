import React, {Component} from 'react';

class Dashboard extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <h3>Welcome to Dashboard, {this.props.match.params.user}</h3>
            </div>
        )
    }
}

export default Dashboard;
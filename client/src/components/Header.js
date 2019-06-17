import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <nav>
            <div className="nav-wrapper">
            <a href="#" className="brand-logo">Recipe App</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/">Home</Link></li>
            </ul>
            </div>
      </nav>
    )
}

export default Header;
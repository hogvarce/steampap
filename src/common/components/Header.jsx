import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav className="nav-wrapper teal lighten-2">
        <div className="container">
            <Link to="/" className="brand-logo">Steam friends</Link>
        </div>
    </nav>
);

export default Header;


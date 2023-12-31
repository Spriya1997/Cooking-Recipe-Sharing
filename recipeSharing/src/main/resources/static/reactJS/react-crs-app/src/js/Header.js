import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Header() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-brand">
                SavorShare
            </div>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Recipe
                        </div>
                        <div className="dropdown-menu" aria-labelledby="profileDropdown">
                            <Link to={"/viewRecipe"} className="dropdown-item">
                                My Recipe
                            </Link>
                            <Link to={"/addRecipe"} className="dropdown-item">
                                Post Recipe
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Profile
                        </div>
                        <div className="dropdown-menu" aria-labelledby="profileDropdown">
                            <Link to={"/viewProfile"} className="dropdown-item">
                                View Profile
                            </Link>
                            <Link to={"/editProfile"} className="dropdown-item">
                                Edit Profile
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link to={"/notification"} className="nav-link">
                            Notification
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link">
                            LogOut
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
//}

export default Header;

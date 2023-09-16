import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { AiOutlineHome } from "react-icons/ai";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import {MdLogout} from "react-icons/md";

function Header() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to="/home" className="navbar-brand">
                SavorShare {' '}{' '}
                <AiOutlineHome />
            </Link>
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
                            <FaRegUser style={{ fontSize : "20px" }} />
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
                            <FaRegBell style={{ fontSize : "20px" }} />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link">
                            <MdLogout style ={{ fontSize: "20px"}} />
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
//}

export default Header;

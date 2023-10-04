import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { AiOutlineHome } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { PiCookingPotBold, PiBowlFoodBold } from "react-icons/pi";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Notification from './Notification.js';

function Header() {

    const renderTooltip = (text) => (
        <Tooltip>
            {text}
        </Tooltip>
    );

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark py-0">
            <div className='ml-3 navbar-brand' style={{ color: "white" }}>
                <PiCookingPotBold style={{ fontSize: "30" }} className='mr-2' />
                {' '}SavorShare
            </div>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link mt-1">
                            <OverlayTrigger placement="bottom" overlay={renderTooltip("Home")}>
                                <div>
                                    <AiOutlineHome style={{ fontSize: "28px", fontWeight: "bold" }} />
                                </div>
                            </OverlayTrigger>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle ml-2 mr-1 mt-1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <PiBowlFoodBold style={{ fontSize: "28px" }} />
                        </div>
                        <div className="dropdown-menu" aria-labelledby="profileDropdown">
                            <Link to={"/viewRecipe"} className="dropdown-item">
                                My Recipes
                            </Link>
                            <Link to={"/addRecipe"} className="dropdown-item">
                                Add Recipe
                            </Link>
                            <Link to={"/favoriteRecipes"} className="dropdown-item">
                                Favorites
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle mt-1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FaRegUser style={{ fontSize: "21px" }} />
                        </div>
                        <div className="dropdown-menu" aria-labelledby="profileDropdown">
                            <Link to={"/viewProfile"} className="dropdown-item">
                                My Profile
                            </Link>
                            <Link to={"/editProfile"} className="dropdown-item">
                                Edit Profile
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link">
                            <Notification />
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link mt-1">
                            <OverlayTrigger placement="bottom" overlay={renderTooltip("LogOut")}>
                                <div>
                                    <MdLogout style={{ fontSize: "24px" }} />
                                </div>
                            </OverlayTrigger>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}


export default Header;

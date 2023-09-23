import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { AiOutlineHome } from "react-icons/ai";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { PiCookingPotBold } from "react-icons/pi";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Header() {

    const renderTooltip = (text) => (
        <Tooltip>
            {text}
        </Tooltip>
    );

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className='ml-3 navbar-brand' style={{ color: "white" }}>
                    <PiCookingPotBold style={{fontSize: "30"}}/>
                     {' '}SavorShare
            </div>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            <OverlayTrigger placement="bottom" overlay={renderTooltip("Home")}>
                                <div>
                                    <AiOutlineHome style={{ fontSize: "25px" }} />
                                </div>
                            </OverlayTrigger>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Recipe
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
                        <div className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FaRegUser style={{ fontSize: "20px" }} />
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
                            <OverlayTrigger placement="bottom" overlay={renderTooltip("Notification")}>
                                <div>
                                    <FaRegBell style={{ fontSize: "20px" }} />
                                </div>
                            </OverlayTrigger>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link">
                            <OverlayTrigger placement="bottom" overlay={renderTooltip("LogOut")}>
                                <div>
                                    <MdLogout style={{ fontSize: "20px" }} />
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

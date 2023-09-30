import React from "react";
import { useNavigate } from 'react-router-dom';
import '../css/Notification.css';


function CustomNotification (props) {
  const navigate = useNavigate();
  const navigateToRecipeDetails = (recipeId) => navigate('/recipeDetails/' + recipeId);

  return (
  <div className ="notificationList" onClick={() => navigateToRecipeDetails(props.recipeId)}>
    <li className="notification" >
      <span className="notification-title">{props.title}</span>
      <span className="notification-startedTime">{props.startedTime}</span>
    </li>
  </div>);
}

export default CustomNotification;
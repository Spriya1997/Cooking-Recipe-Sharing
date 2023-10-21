import React from "react";
import { useUser } from '../UserContext.js';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../css/Notification.css';


function CustomNotification(props) {
  var userId = useUser();
  const navigate = useNavigate();
  const baseUrl = "http://localhost:8080/api/users/";

  const UpdateSeenStatus = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(baseUrl + userId + '/notifications/' + props.notificationId + '/notifySeen', { withCredentials: true });

      if (response.status === 200) {
        console.log(response.data.id);
        props.updateNotifications();
        navigate('/recipeDetails/' + props.recipeId);
      }
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="notificationList" onClick={UpdateSeenStatus}>
      <li className="notification" >
        <span className="notification-title">{props.title}</span>
        <span className="notification-startedTime">{props.startedTime}</span>
      </li>
    </div>);
}

export default CustomNotification;
import React, { useState, useEffect } from 'react'
import className from "classnames";
import axios from 'axios';
import CustomNotification from './CustomNotification.js';
import { useUser } from '../UserContext';
import '../css/Notification.css';

const Notification = () => {

  var userId = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [notificationsResponse, setnotificationsResponse] = useState([]);
  const [notifications, setNotifications] = useState([]); // an array for storing notifications
  const baseUrl = "http://localhost:8080/api/users/";

  useEffect(() => {
    console.log("userId " + userId);
    if (userId) {
      console.log(" view notification userid:" + userId);

      axios.get(baseUrl + userId + '/notifications/getNotifications')
        .then(response => {
          setnotificationsResponse(response.data);
          console.log("notification details " + response.data);
        })
        .catch(error => {
          console.error('Error fetching users Notification:', error);
        });
    }
  }, [userId]);

  useEffect(() => {
    console.log(notificationsResponse);
    setNotifications(notificationsResponse.map(notification => {
        var date = new Date(notification.createdTimestamp);
        var notificationObj = {
          title: null,
          startedTime: date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString(),
          recipeId : notification.recipeId
        }
        if (notification.isFavorite !== false) {
          notificationObj.title = notification.userFullName + ' favorited ' + notification.recipeName;
          
        }
        if (notification.isFavorite !== true) {
          notificationObj.title = notification.userFullName + ' unfavorited ' + notification.recipeName;
        }
        if (notification.ratings !== null) {
          notificationObj.title = notification.userFullName + ' rated ' + notification.recipeName + ' ' + notification.ratings + ' stars';
        }
        if (notification.comments !== null) {
          notificationObj.title = notification.userFullName + ' commented on ' + notification.recipeName;
        }
      return notificationObj;
    }));
  }, [notificationsResponse]);

  return (
    <div class="notificationItem">
    <span className="FaRegBell"  onClick={() => setIsVisible((prev) => !prev)}>
      <span
        role="img"
        aria-label="notifications"
        className={className({ "has-notifications": notifications.length })}
      >
        <svg
          viewBox="0 0 16 23"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          color="inherit"
          title="Notifications"
          class="sc-AxjAm kITaNo"
        >
          <path
            d="M9.03657 1.06667C9.03657 1.10232 9.03487 1.13756 9.03155 1.17231C11.3998 1.66446 13.1829 3.81795 13.1829 6.4V8.53333L15.3507 12.2512C15.7652 12.9622 15.2675 13.8667 14.4618 13.8667H8H1.53818C0.732452 13.8667 0.234778 12.9622 0.649321 12.2512L2.81711 8.53333L2.81711 6.4C2.81711 3.81795 4.60022 1.66446 6.96844 1.17231C6.96512 1.13756 6.96342 1.10232 6.96342 1.06667C6.96342 0.477563 7.42751 0 8 0C8.57248 0 9.03657 0.477563 9.03657 1.06667ZM8.00001 16C7.23265 16 6.56267 15.571 6.20421 14.9333H9.79581C9.43735 15.571 8.76737 16 8.00001 16Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>
      
      {isVisible && (
       
        <div class="notification-hub">
          <ul>
            {notifications &&
              notifications.map((notif) => (
               
                  <CustomNotification title={notif.title} startedTime={notif.startedTime} recipeId={notif.recipeId} />
                
              ))}
          </ul>
        </div>
      )}
    
    </span>
    </div>
  );
};

export default Notification;

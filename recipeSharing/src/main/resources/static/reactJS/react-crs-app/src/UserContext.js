import React, { createContext, useContext} from 'react';
import UserProfile from './js/UserProfile';

var Id = undefined;
const UserContext = createContext();

export function UserProvider(userId) {
  console.log("user : "+ userId);
  Id = userId;
  return (
    <UserContext.Provider value= {userId}>
        <UserProfile />
    </UserContext.Provider>
  );
}

export function useUser() {
  var test = useContext(UserContext);
  console.log( "User context " + test + " " + Id);  
  //return useContext(UserContext);
  return Id;
}

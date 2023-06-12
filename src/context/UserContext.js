// UserContext.js
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Loader from '../components/loader';
import Moviepage from '../components/Moviepage';
import Showpage from '../components/Showpage';
import Mainpage from '../components/Mainpage';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  console.log("protecteddddddddddddddddd");
  console.log({children});
  const [loggedin,setLoggedin]=useState(false);
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);


  const handleSubmit=(formData,navigate)=>{
    axios({
        url: "http://localhost:8000/sign-in/create-session",
        method: "POST",
        // Attaching the form data
        data: formData,
        withCredentials: true,
    })

        // Handle the response from backend here
        .then((res) => {
        if(res.data.status==='success'){
          setLoggedin(true);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
        })

        // Catch errors if any
        .catch((err) => { });
    }
  useEffect(()=>{
    axios({url: "http://localhost:8000/protected",
    headers:{
    },
    withCredentials: true,})
        // Handle the response from backend here
        .then((res) => {
            console.log(res.data);
            if(res.data.status==='success'){
              setUser(res.data.user);
            }
            setLoading(false);
        })
        // Catch errors if any
        .catch((err) => { });

},[loggedin]);
  return <UserContext.Provider value={{loggedin,user,loading,handleSubmit}}>
   {children}
    </UserContext.Provider>;

// return 
// <div>
// <Loader/>
// </div>
}

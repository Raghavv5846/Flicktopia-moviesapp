// UserContext.js
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Loader from '../components/loader';
import Moviepage from '../pages/Moviepage/Moviepage';
import Showpage from '../pages/Showpage/Showpage';
import Mainpage from '../pages/Mainpage/Mainpage';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  console.log("protecteddddddddddddddddd");
  console.log({children});
  const [loggedin,setLoggedin]=useState(false);
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);


  const handleSubmit=(formData,navigate)=>{
    axios({
        url: `${process.env.REACT_APP_HOST}/sign-in/create-session`,
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
    axios({url: `${process.env.REACT_APP_HOST}/protected`,
    headers:{
    },
    withCredentials: true,})
        // Handle the response from backend here
        .then((res) => {
            console.log(res.data);
            if(res.data.status==='success'){
              setUser(res.data.user);
              console.log("userr",user);
              if(res.data.user){
                setLoggedin(true);
              }
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

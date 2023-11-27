import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { login } from "../slices/userDetail";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { review } from "../slices/userDetail";
import {load} from "../slices/userDetail";
import { isLoggedIn } from "../slices/userDetail";
const Login = () => {
  const [users, setUsers] = useState({});
  const[loggedinUser, setLoggedInUser]=useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const getUserData=(e)=>{
    setUsers({...users, [e.target.name]:e.target.value})
    console.log(users);
      }
     // const loguser = useSelector((state) => state.userDetail);

     useEffect(() => {
        // Fetch restaurants data when the component mounts
        dispatch(load());
      }, []);
     
  const handleSubmit = (e) => {
   // e.preventDefault();
   
    dispatch(login({username:users.username,password:users.password}));
    if(isLoggedIn=="true"){
    setLoggedInUser(users.username);
    //console.log(loggedinUser);
   navigate('/homepage');
    }
  };
 
  return (
   
      <div>
            <input
                type="text"
                name="username"
                placeholder="USERNAME"
                value={users.username}
                onChange={(e)=>getUserData(e)}
            />
            <br></br>
            <br></br>
            <input
                type="text"
                name="password"
                placeholder="password"
                value={users.password}
                onChange={(e)=>getUserData(e)}
            />
            <br></br>
            <br></br>
            <button onClick={handleSubmit}>Login</button>
           
            <div>
    
     
            
       </div>     

    </div>
  );
}

export default Login;

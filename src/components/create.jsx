import {useState} from "react";
import userDetail from "../slices/userDetail";
import {register} from '../slices/userDetail';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Create.css'
const Create = () => {
  const [users, setUsers]=useState({});
  const dispatch = useDispatch();
  const Navigate=useNavigate();
const getUserData=(e)=>{
  setUsers({...users, [e.target.name]:e.target.value})
  console.log(users);
    }
    const handleSubmit=()=>{
        console.log("this works");
        dispatch(register({username:users.username,email:users.email,password:users.password}));
        Navigate('/login');
    };
    return (
        
      <div>
        <link rel="stylesheet" type="text/css" href="Create.css"></link>
        <h2 className="my-2">Register user</h2>
        
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
            <br></br>
            
            <input
                type="text"
                name="email"
                placeholder="email"
                value={users.email}
                onChange={(e)=>getUserData(e)}
            />
            <br></br>
            <br></br>
            <br></br>
            

            <input
                type="text"
                name="password"
                placeholder="PASSWORD"
                value={users.password}
                onChange={(e)=>getUserData(e)}
            />
            <br></br>
            <br></br>
            <br></br>
           
            <button onClick={handleSubmit}>Register</button>
            
            
        </div>
      </div>
    );
  };
  
  export default Create;
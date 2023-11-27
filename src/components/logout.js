import { isLoggedIn } from "../slices/userDetail";
import { login} from "../slices/userDetail";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Logout=()=>{
const navigate=useNavigate();
const handleLogout=()=>{
    isLoggedIn=null;
    if(isLoggedIn==null){
     navigate('/login');   
    }
}

    return(
    <div>
     <Link to="/login" className="nav-link"></Link>   
</div>
);
}
export default Logout;
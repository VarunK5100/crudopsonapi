
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Create from './create';
import Login from './login';
import TotalReviews from './totalReviewsDashboard';

const Navbar = () => {




    return (
        
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h4 className="navbar-brand">Restaurant Review System</h4>
    
                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
                    <li className="nav-item">
                      <Link to="/register" className="nav-link">
                        Register
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/TotalReviews" className="nav-link">
                        All Restaurant Reviews
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
    
            
          </div>
        
      );
};

export default Navbar;
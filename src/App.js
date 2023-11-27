import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Create from './components/create';
import Login from './components/login';
import Homepage from './components/homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReviewDashboard from './components/reviewDashboard';
import EditReviewPage from './components/editPage';
import TotalReviewsDashboard from './components/totalReviewsDashboard';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
        
        <Route path="/" element={<Create />} />
          <Route exact path="/Register" element={<Create />} />
          <Route exact path="/TotalReviews" element={<TotalReviewsDashboard/>}/>
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/homepage" element={<Homepage/>}/>
          <Route exact path="/reviewDashboard" element ={<ReviewDashboard/>}/>
          <Route exact path="/editPage" element={<EditReviewPage/>}/>
        </Routes>
        
      </BrowserRouter>
      
    </div>
  );
}

export default App;

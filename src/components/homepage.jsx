import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { login } from "../slices/userDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { review } from "../slices/userDetail";
import { userName } from "../slices/userDetail";
//import { selectLoggedInUser } from "../slices/userDetail";
function Homepage() {
 
    const [restaurants, setRestaurants]=useState([]);
    const [reviews,setReviews]=useState([]);
    //const [reviewCount, setReviewCount] = useState(0);

    const [Restreview, setReview]=useState({
        name: "",
        reviewHeadline: "",
        review: "",
        rating: "",
    });
    const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const dispatch = useDispatch();
  


  
  //const loguser = useSelector((state) => state.userDetail.loggedInUser);
//   console.log(loguser)
//   loguser.map((user) => {
//     console.log(user.username);
//     return null; // React expects a return value for map
// });
  const getUserDataForReview=(e)=>{
    setReview({...Restreview, [e.target.name]:e.target.value})
    
  }
  const handleSubmitForReview = (e) => {

    e.preventDefault();
    // setReviewCount((prevCount) => {
    //     const newCount = prevCount + 1;
    //     localStorage.setItem("reviewCount", newCount);
    //     return newCount;
    //   });
    dispatch(review({username: userName, name: selectedRestaurant, reviewHeadline: Restreview.reviewHeadline, review: Restreview.review, rating: Restreview.rating}));
    
   
  };
  
  useEffect(() => {
    // Fetch restaurants data when the component mounts
    handleReviewAPI();
  }, []);

//   const loggedInUser = useSelector((state) => state.userDetail.loggedInUser);
//   const userName = loggedInUser.username || "";
  const handleReviewAPI=()=>{
   const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTZhNDg2MjM4ZmZjMDllNDM5NmRjMSIsInVzZXJuYW1lIjoiMDAyODc3NTEzUyIsImlhdCI6MTcwMDE3NzAzNiwiZXhwIjoxNzAxNDczMDM2fQ.DmIQByiOXaGdoODD-dMc43guZHy2GDOsLam3aNoI5BE';

// Replace 'your_api_key_here' with your actual API key

fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/resturants', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': apiKey
    // Add any other headers required by the API
  },
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Handle the data from the API
    console.log(data);
    const restaurantsData=data.data;
    setRestaurants(restaurantsData);
    const Restaurants=restaurants.map(restaurant => restaurant.name);
    console.log(Restaurants);

    
  })
  .catch(error => {
    // Handle errors
    console.error('There was a problem with the fetch operation:', error);
  });
  }
  
  
return(
  <div>
    <link rel="stylesheet" type="text/css" href="reviewDashboard.css"></link>
  <h2>Write a Review</h2>
  <select
    id="ratingDropdown"
    style={{ width: '480px',height: '40px' }}
    onChange={(e) => {
      getUserDataForReview(e);
      // Update the selected restaurant when the dropdown changes
      setSelectedRestaurant(e.target.value);
    }}
  >
    <option value="Pick Restaurant">Pick Restaurant</option>
    {/* Default option */}
    {restaurants.map((restaurant) => (
      <option key={restaurant._id} value={restaurant.name}>
        {restaurant.name}
      </option>
    ))}
  </select>

  <input
    type="text"
    name="reviewHeadline"
    placeholder="Review Headline"
    value={Restreview.reviewHeadline}
    onChange={(e) => getUserDataForReview(e)}
  />
  <input
    type="text"
    name="review"
    placeholder="Review"
    value={Restreview.review}
    onChange={(e) => getUserDataForReview(e)}
  />
  <input
    type="text"
    name="rating"
    placeholder="Rating"
    value={Restreview.rating}
    onChange={(e) => getUserDataForReview(e)}
        ></input>
        <p></p>
  <button onClick={handleSubmitForReview}>Submit Review</button>
  <br></br>
  <br></br>
  <Link to={"/reviewDashboard"}>review dashboard</Link>
</div>
);
}
export default Homepage;


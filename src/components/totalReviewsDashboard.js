import React, { useState, useEffect } from 'react';
import { deleteReview } from '../slices/userDetail';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userName } from '../slices/userDetail';

const TotalReviewsDashboard=()=> {
  const [reviews, setReviews] = useState([]);
  const [restaurants, setRestaurants]=useState([]);
  const [ratings, setRatings]=useState([]);
  const dispatch = useDispatch();
  const navigate=useNavigate();
   
  const uniqueRestaurantNames = [...new Set(reviews.map((restaurant) => restaurant.name))];
  const uniqueRatings = [...new Set(reviews.map((review) => review.rating))];

  useEffect(() => {
    // Fetch restaurants data when the component mounts
    handleDisplayReviewAPI();
    handleRestaurantListAPI();
  }, []);

  const handleRestaurantChange = (e) => {
    const selectedName = e.target.value;
    setRestaurants(selectedName);
    // You can use selectedName elsewhere as needed
  };
  const handleRatingChange=(e)=>{
    const selectedRating=e.target.value;
    setRatings(selectedRating);
  }
  const handleRestaurantListAPI = () => {
    const apiKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTZhNDg2MjM4ZmZjMDllNDM5NmRjMSIsInVzZXJuYW1lIjoiMDAyODc3NTEzUyIsImlhdCI6MTcwMDE3NzAzNiwiZXhwIjoxNzAxNDczMDM2fQ.DmIQByiOXaGdoODD-dMc43guZHy2GDOsLam3aNoI5BE';

    fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/resturantReview', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
        // Add any other headers required by the API
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the data from the API
        console.log(data);
        const restaurantsData=data.data;
        setRestaurants(restaurantsData);
        //console.log(reviewsData);
        // reviewsData.forEach((review, index) => {
        //     review_username = review.username;
        //     restaurantName=review.name;
        //     review_reviewHeadline = review.reviewHeadline;
        //     reviewRating = review.rating;
        //     review_review = review.review;
            
        // });
        })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const handleDisplayReviewAPI = () => {
    const apiKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTZhNDg2MjM4ZmZjMDllNDM5NmRjMSIsInVzZXJuYW1lIjoiMDAyODc3NTEzUyIsImlhdCI6MTcwMDE3NzAzNiwiZXhwIjoxNzAxNDczMDM2fQ.DmIQByiOXaGdoODD-dMc43guZHy2GDOsLam3aNoI5BE';

    fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/resturantReview', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
        // Add any other headers required by the API
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the data from the API
        console.log(data);
        const reviewsData = data.data || [];
        setReviews(reviewsData);
        //console.log(reviewsData);
        })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  
  return (
    <div>
        <link rel="stylesheet" type="text/css" href="reviewDashboard.css"></link>
      <label htmlFor="restaurantDropdown">Select Restaurant:</label>
      
      <select id="restaurantDropdown" onChange={handleRestaurantChange} value={restaurants} style={{ width: '480px',height: '40px' }} >
      
        <option value="Pick Restaurant">Pick Restaurant</option>
        {uniqueRestaurantNames.map((restaurantName, index) => (
          <option key={index} value={restaurantName}>
            {restaurantName}
          </option>
        ))}
      </select>

      <label htmlFor="ratingDropdown">Select Rating:</label>
     
      <select id="ratingDropdown" onChange={handleRatingChange} value={ratings} style={{ width: '480px',height: '40px' }}>
      
        <option value="Pick Rating">Pick Rating</option>
        {uniqueRatings.map((rating, index) => (
          <option key={index} value={rating}>
            {rating}
          </option>
        ))}
      </select>
      {reviews.length > 0 ? (
        <ul>
          {reviews
            .filter((review) => review.name==restaurants).filter((review)=>review.rating=ratings)
            .map((review, index) => (
              <li key={index}>
                {/* Display individual review properties */}
              
                
                <h2> {review.reviewHeadline}</h2>
                <h3>{review.username}</h3>
                <p>{review.rating}</p>
                <p>{review.review}</p>
                
               <br></br>
                {/* Add more properties as needed */}
              </li>
            ))}
        </ul>
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
}
export default TotalReviewsDashboard;
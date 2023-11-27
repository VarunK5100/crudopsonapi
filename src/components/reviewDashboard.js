import React, { useState, useEffect } from 'react';
import { deleteReview } from '../slices/userDetail';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userName } from '../slices/userDetail';
import './reviewDashboard.css'
var review_username="";
var restaurantName="";
var review_reviewHeadline="";
var reviewRating="";
var review_review="";
var reviewId="";
function ReviewDashboard() {
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const navigate=useNavigate();
   
  useEffect(() => {
    // Fetch restaurants data when the component mounts
    handleDisplayReviewAPI();
  }, []);
const handleEditReview=(e)=>{
    reviewId=e.target.value;
    console.log(reviewId)
    navigate('/editPage');
}
  const handleDeleteReview = (e) => {
    console.log(e.target.value);
    
    dispatch(deleteReview(e.target.value));
    setReviews((prevReviews) => prevReviews.filter((review) => review._id !== e.target.value));
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
        reviewsData.forEach((review, index) => {
            review_username = review.username;
            restaurantName=review.name;
            review_reviewHeadline = review.reviewHeadline;
            reviewRating = review.rating;
            review_review = review.review;
            
        });
        })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  
  return (
    <div>
        <link rel="stylesheet" type="text/css" href="reviewDashboard.css"></link>
      <p>Review Dashboard</p>
      {reviews.length > 0 ? (
        <ul>
          {reviews
            .filter((review) => review.username==userName)
            .map((review, index) => (
              <li key={index}>
                <br></br>
                <br></br>
                {/* Display individual review properties */}
                <p>Username {review.username}</p>
                {review_username=review.username}
                <p>Review headline: {review.reviewHeadline}</p>
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.review}</p>
                
                <button value={review._id} onClick={(e) => handleEditReview(e)}>Edit</button>
                <button value={review._id} onClick={(e) => handleDeleteReview(e)}>
                  Delete
                </button>
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
export var reviewId;
export var review_reviewHeadline;
export var reviewRating;
export var review_review;
export var restaurantName;

export default ReviewDashboard;

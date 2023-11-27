import React, { useState, useEffect } from 'react';
import { deleteReview } from '../slices/userDetail';
import { useDispatch } from 'react-redux';
import { update } from '../slices/userDetail';
import { userName } from '../slices/userDetail';
function ReviewDashboard() {
  const [reviews, setReviews] = useState([]);
  const [editableReviewId, setEditableReviewId] = useState(null); // Track the editable review
  const dispatch = useDispatch();
    const  [updatedReviews, setUpdatedReviews]=useState([]);
  useEffect(() => {
    // Fetch restaurants data when the component mounts
    handleDisplayReviewAPI();
  }, []);
  useEffect(() => {
    setUpdatedReviews([...reviews]);
  }, [reviews]);
  const handleDeleteReview = (e) => {
    console.log(e.target.value);
    dispatch(deleteReview(e.target.value));
    setReviews((prevReviews) => prevReviews.filter((review) => review._id !== e.target.value));
  };

  const handleEditReview = (reviewId) => {
    setEditableReviewId(reviewId);
  };
  const handleSaveButton=(reviewId,index)=>{
    dispatch(update({_id: reviewId, 
        username : userName,
        name: reviews.name, 
        reviewHeadline: reviews.reviewHeadline, 
        review: reviews.review,
        rating: reviews.reviewRating}));
        console.log(reviews);
        setEditableReviewId(null);
  }
  const handleInputChange=(e,field,index)=>{
    var updatedReviewsCopy = [...updatedReviews];
                      const reviewIndex = updatedReviewsCopy.findIndex((r) => r._id === updatedReviews[index]._id);
                      updatedReviewsCopy[reviewIndex][field] = e.target.value;
                      setReviews(updatedReviewsCopy);
  }
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
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div>
        
      <p>Review Dashboard</p>
      {reviews.length > 0 ? (
        <ul>
          {reviews
            .filter((review) => review.rating === '3/5')
            .map((review, index) => (
              <li key={index}>
                {/* Display individual review properties */}
                <p>Username {review.username}</p>
                {/* <p>Review headline: {editableReviewId === review._id ? (
                <input
                    type="text"
                    value={review.reviewHeadline}
                    onChange={(e) => {
                        const updatedReviewsCopy = [...updatedReviews];
                        const index = updatedReviewsCopy.findIndex((r) => r._id === review._id);
                        updatedReviewsCopy[index].rating = e.target.value;   
                    }} 
                    />
                    ):review.reviewHeadline}</p>
                  
                <p>Rating: {editableReviewId === review._id ? (
                <input
                    type="text"
                    value={review.rating}
                    onChange={(e) => {
                      var updatedReviewsCopy = [...updatedReviews];
                      const index = updatedReviewsCopy.findIndex((r) => r._id === review._id);
                      updatedReviewsCopy[index].rating = e.target.value;
                      setUpdatedReviews(updatedReviewsCopy)
                      setReviews(updatedReviews);
                    }}
                    />
                    ):review.rating}</p> */}
                <p>Comment: {editableReviewId === review._id ? (
                 <React.Fragment>
                 <input
                    type="text"
                    value={review.review}
                    onChange={(e)=>{}}
                      
                  />
                  <button onClick={(e) => handleInputChange(e, 'review', index)}>
                Update
      </button>
      </React.Fragment>
                ) : review.review}</p>
                <p>id: {review._id}</p>
                {editableReviewId !== review._id ? (
                  <button onClick={() => handleEditReview(review._id)}>Edit</button>
                ) : (
                  <button onClick={() => handleSaveButton(review._id, index)}>Save</button>
                )}
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

export default ReviewDashboard;
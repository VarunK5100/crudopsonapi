import React, { useState } from 'react';
import { userName } from '../slices/userDetail';
import { reviewId } from "../components/reviewDashboard";
import { review_review } from '../components/reviewDashboard';
import { review_reviewHeadline } from '../components/reviewDashboard';
import { reviewRating } from '../components/reviewDashboard';
import { restaurantName } from '../components/reviewDashboard';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { update } from '../slices/userDetail';
const EditReviewPage=()=> {
    const [formData, setFormData] = useState({
        reviewHeadline: review_reviewHeadline ,
        review: review_review,
        rating: reviewRating,
      });
      const dispatch = useDispatch();
  const navigate=useNavigate();
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        console.log(formData);
      };
 const handleSubmit=()=>{
    console.log('code is reaching till here');
    console.log(formData.reviewHeadline);
    console.log(formData.rating);
    console.log(reviewId);
    dispatch(update({username: userName, name:restaurantName, reviewHeadline:formData.reviewHeadline, review:formData.review, rating: formData.rating, _id:reviewId }));
    console.log(formData);
 }
//  const handleClear = (field) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [field]: '', // Clear the specific field
//     }));
//   };
      return (
        <div>
          <h2>Edit Review</h2>
          <div>
            <label>
              Review Headline:
              <input
                type="text"
                name="reviewHeadline"
                value={formData.reviewHeadline}
                onChange={handleChange}
               
              />
              </label>
          
            
            <br />
    
            <label>
              Review:
              <textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
                
              />
            </label>
            <br />
    
            <label>
              Rating:
              <input
                type="text"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                
              />
            </label>
            <br />
            <button type="submit" onClick={handleSubmit}>Submit Review</button>
          </div>
        </div>
      );
}
export default EditReviewPage;
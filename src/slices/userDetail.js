import {createSlice} from "@reduxjs/toolkit";

var data = [];
var userName="";
 var isLoggedIn="false";
const userDetail= createSlice({
    name: "userDetail",
    initialState: {
        users:[],
        loggedInUser:[],
        reviewDisplay:[],
        reviewId: "",
    },

    reducers: {
        register: (state, action)=>{
            const data=action.payload;
            state.users = [...state.users, data];
            //state.users.push(data);
            console.log("Data pushed into state.users:", state.users);
            console.log("data retrieved"+ data);
            console.log(state.users.map((users)=>users.data));
           
            var userdata={
                username: data.username,
                password: data.password,
                email: data.email
            }
            const postData = async () => {
                try {
                  const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/users', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTZhNDg2MjM4ZmZjMDllNDM5NmRjMSIsInVzZXJuYW1lIjoiMDAyODc3NTEzUyIsImlhdCI6MTcwMDE3NzAzNiwiZXhwIjoxNzAxNDczMDM2fQ.DmIQByiOXaGdoODD-dMc43guZHy2GDOsLam3aNoI5BE"
                      // Add any other headers required by your API (e.g., authorization headers)
                    },
                    body: JSON.stringify(userdata), // Convert data to JSON format
                  });
           
                  if (response.ok) {
                    const responseData = await response.json();
                    console.log('Data posted successfully:', responseData);
                    // Handle successful response from the API
                  } else {
                    console.error('Failed to post data:', response.statusText);
                    // Handle errors if the request fails
                  }
                } catch (error) {
                  console.error('Error posting data:', error);
                  // Handle any network or other errors
                }
              };
              postData();
        },
        login: (state, action)=>{    
         
            var userdata={
                username: action.payload.username,
                password: action.payload.password,
               
            } 
            const userExists = data.some((user) => user.username === userdata.username && user.password === userdata.password);
            //console.log(userdata.username);
                    if(userExists){
                        console.log('login successful');
                        isLoggedIn="true";
                        userName=userdata.username;
                        console.log("checking if I can export this:",userdata.username);
                       // console.log(userdata.username);
                        //state.currentUser=[...state.currentUser, userdata.username]
                        //state.currentUser=userdata.username;
                       // console.log(state.currentUser.map((users)=>users.data));
                       
                    }
                    else{
                        console.log('login failed');
                    }
                    // Handle successful response from the API
                  },
               
            
              //state.loggedInUser.push({username:userdata.username,password:userdata.password});
        
         load: (state, action) => {
      
   
      const getUsers = async () => {
        try {
          const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/users', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTZhNDg2MjM4ZmZjMDllNDM5NmRjMSIsInVzZXJuYW1lIjoiMDAyODc3NTEzUyIsImlhdCI6MTcwMDE3NzAzNiwiZXhwIjoxNzAxNDczMDM2fQ.DmIQByiOXaGdoODD-dMc43guZHy2GDOsLam3aNoI5BE"
              // Add any other headers required by your API (e.g., authorization headers)
            } // Convert data to JSON format
          });
          
          if (response.ok) {
            const users = await response.json();            
            data = users.data;
            console.log('All users:', users);
         
          } else {
            console.error('Failed to fetch users:', response.statusText);
            // Handle errors if the request fails
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          // Handle any network or other errors
        }
      };
      getUsers();
      console.log("loading..")
      
      console.log("load:"+data) 
      
      
    },
    
    
  

        review: (state, action)=>{
            const data=action.payload;
            //state.reviewDisplay = [...state.reviewDisplay, data];
            state.reviewDisplay.push(data);
            //console.log("data retrieved"+ data);
            //console.log(state.reviewDisplay.map((users)=>users.data));
            console.log(state.reviewDisplay.map((reviewDisplay)=>
            {return(reviewDisplay.rating)
            }
            ));
            var userdata={
                username: data.username,
                name: data.name,
                rating: data.rating,
                reviewHeadline: data.reviewHeadline,
                review: data.review,
                
            }
            
            const reviewData = async () => {
                try {
                  const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/resturantReview', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTZhNDg2MjM4ZmZjMDllNDM5NmRjMSIsInVzZXJuYW1lIjoiMDAyODc3NTEzUyIsImlhdCI6MTcwMDE3NzAzNiwiZXhwIjoxNzAxNDczMDM2fQ.DmIQByiOXaGdoODD-dMc43guZHy2GDOsLam3aNoI5BE"
                      // Add any other headers required by your API (e.g., authorization headers)
                    },
                    body: JSON.stringify(userdata), // Convert data to JSON format
                  });
           
                  if (response.ok) {
                    const responseData = await response.json();
                    console.log('Data posted successfully:', responseData);
                    // Handle successful response from the API
                  } else {
                    console.error('Failed to post data:', response.statusText);
                    // Handle errors if the request fails
                  }
                } catch (error) {
                  console.error('Error posting data:', error);
                  // Handle any network or other errors
                }
              };
              reviewData();
        },
        displayReview: (state, action)=>{
            const data=action.payload;
            state.reviewDisplay = [...state.users, data];
            state.reviewDisplay.push(data);
            console.log("data retrieved"+ data);
            console.log(state.reviewDisplay.map((users)=>users.data));
            var userdata={
                username: data.username,
                password: data.password,
                email: data.email,
            }
            
            const reviewData = async () => {
                try {
                  const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/resturantReview', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTZhNDg2MjM4ZmZjMDllNDM5NmRjMSIsInVzZXJuYW1lIjoiMDAyODc3NTEzUyIsImlhdCI6MTcwMDE3NzAzNiwiZXhwIjoxNzAxNDczMDM2fQ.DmIQByiOXaGdoODD-dMc43guZHy2GDOsLam3aNoI5BE"
                      // Add any other headers required by your API (e.g., authorization headers)
                    },
                    // Convert data to JSON format
                  });
           
                  if (response.ok) {
                    const responseData = await response.json();
                    console.log('Data retrieved successfully:', responseData);
                    //const existingUsers = JSON.parse(responseData);
                  }
                } catch (error) {
                  console.error('Error posting data:', error);
                  // Handle any network or other errors
                }
              };
              reviewData();
        },
        deleteReview: (state, action)=>{
            const data=action.payload;
            state.reviewId=data;
            const reviewDelete = async () => {
                try{
    const response =
    await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/resturantReview/${state.reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTZhNDg2MjM4ZmZjMDllNDM5NmRjMSIsInVzZXJuYW1lIjoiMDAyODc3NTEzUyIsImlhdCI6MTcwMDE3NzAzNiwiZXhwIjoxNzAxNDczMDM2fQ.DmIQByiOXaGdoODD-dMc43guZHy2GDOsLam3aNoI5BE',
        // Add any other headers required by the API
      },
    })
    if (response.ok) {
        const responseData = await response.json();
        console.log('Data retrieved successfully:', responseData);
        console.log('Review deleted successfully');
        // If you want to update your local state after deletion, you can fetch the reviews again or filter out the deleted review
        //setReviews((prevReviews) => prevReviews.filter((review) => review._id !== e.target.value));
      }
                
           }       catch (error) {
                    console.error('Error posting data:', error);
                    // Handle any network or other errors
                  }
            };
            reviewDelete();
        },
        update: (state, action)=>{
            const data=action.payload;
            //state.reviewDisplay = [...state.reviewDisplay, data];
            state.reviewDisplay.push(data);
            
            //console.log("data retrieved"+ data);
            //console.log(state.reviewDisplay.map((users)=>users.data));
          
            //console.log("data retrieved"+ data);
            //console.log(state.reviewDisplay.map((users)=>users.data));
            var userdata={
                username: data.username,
                name: data.name,
                rating: data.rating,
                reviewHeadline: data.reviewHeadline,
                review: data.review,
                _id: data._id,
                
            }
            console.log(data);
            const updateData = async () => {
                try {
                    console.log(userdata._id);
                  const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/resturantReview/${userdata._id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTZhNDg2MjM4ZmZjMDllNDM5NmRjMSIsInVzZXJuYW1lIjoiMDAyODc3NTEzUyIsImlhdCI6MTcwMDE3NzAzNiwiZXhwIjoxNzAxNDczMDM2fQ.DmIQByiOXaGdoODD-dMc43guZHy2GDOsLam3aNoI5BE"
                      // Add any other headers required by your API (e.g., authorization headers)
                    },
                    body: JSON.stringify(userdata), // Convert data to JSON format
                  });
           
                  if (response.ok) {
                    const responseData = await response.json();
                    console.log('Data posted successfully:', responseData);
                    // Handle successful response from the API
                  } else {
                    console.error('Failed to post data:', response.statusText);
                    // Handle errors if the request fails
                  }
                } catch (error) {
                  console.error('Error posting data:', error);
                  // Handle any network or other errors
                }
              };
              updateData();
        },
        

        
    },
    
    
});
export const { register, login, load, review, displayReview, deleteReview, update} = userDetail.actions;
export var isLoggedIn;
export var userName;
export default userDetail.reducer;

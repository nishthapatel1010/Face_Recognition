import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileUploadForm = () => {
  const [image, setImage] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false); // State to check if the user is signed in
  const navigate = useNavigate();

  // Check if the user is signed in
  useEffect(() => {
    // Example after successful login
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2Y4NDVhYzczOTI0ZGI3ZDc5NTQ2MyIsImlhdCI6MTczMjIxNjI2MiwiZXhwIjoxNzMyMjE5ODYyfQ.dz2hFNkcAWpIHmzJ4_cNTQ0BdPXh0jsnJ39WFkUZfpU'; // Replace with your actual token from the server
// localStorage.setItem('authToken', token);
const token = localStorage.getItem('token');
console.log("Token stored:",token);

    // Here, we assume that the user is considered signed in if a token exists in localStorage
    // const token = localStorage.getItem('authToken');  // Replace with actual authentication check
  //  console.log(token)
    if (!token) {
      alert("You are not signed in. Please sign in first.");
      navigate('/signin');
    } else {
      setIsSignedUp(true);
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Send POST request with FormData
      const response = await axios.post('http://localhost:5000/api/upload/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      alert('Image uploaded successfully');
      
      // Navigate to a success page or any other page after successful upload
      navigate('/user');  // Replace '/dashboard' with your actual route after upload
    } catch (error) {
      console.log('Error uploading file:', error);
      alert('Failed to upload the image. Please try again.');
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      {isSignedUp ? (
        <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
          <input 
            type="file" 
            name="profilePicture" 
            onChange={handleFileChange} 
          />
          <button type="submit">Upload</button>
        </form>
      ) : (
        <p>Please sign in to upload a file.</p>
      )}
    </div>
  );
};

export default FileUploadForm;

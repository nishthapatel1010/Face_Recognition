import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileUploadForm = () => {
  const [image, setImage] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false); // State to check if the user has signed up
  const navigate = useNavigate();

  // Check if the user is signed up
  React.useEffect(() => {
    // Replace this with your actual signup verification logic
    const user = false; // Change this condition based on your logic
    if (!user) {
      alert("You are not registered. Please sign up first.");
      navigate('/signup');
    } else {
      setIsSignedUp(true);
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignedUp) {
      alert("You are not registered. Please sign up first.");
      navigate('/signup');
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
      
      // Navigate to the sign-in page after successful upload
      navigate('/signin'); // Replace '/signin' with your actual route for the sign-in page
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
        <p>Please sign up to upload a file.</p>
      )}
    </div>
  );
};

export default FileUploadForm;
  
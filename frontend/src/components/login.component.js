import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import '../css/login.css';
import { Link, useNavigate } from 'react-router-dom';

const MyForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Creating an object to hold form data
    const formData = {
      email: email,
      password: password
    };

    // Submitting the form data using Axios
    axios.post('http://localhost:5000/api/login', formData)
      .then(response => {
        // Handle response
        console.log('Form submitted successfully:', response);
        // Check if there is a success message in the response
        if (response.data.message) {
          // Display success message
          setErrorMessage(response.data.message);
          navigate('/home');
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting form:', error);
        // Check if the error contains a custom message from the server
        if (error.response && error.response.data.error) {
          // Display custom error message from server
          setErrorMessage(error.response.data.error);
        } else {
          // Display a generic error message
          setErrorMessage('An error occurred. Please try again.');
        }
      });
  };

  return (
    <div className='outerDiv'>
      <div className='innerDiv'>
        <form onSubmit={handleSubmit}>
          <div className="login-label">
            <label htmlFor="exampleInputEmail1">Login</label>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
          <div className='submitButon'>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyForm;

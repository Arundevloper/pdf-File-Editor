import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Creating an object to hold user registration data
    const userData = {
      name: name,
      email: email,
      password: password,
      gender: gender
    };

    // Submitting user registration data to the backend
    fetch('http://localhost:5000/api/register', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        if (response.ok) {
          // Registration successful
          console.log('Registration successful');
          navigate('/', { state: { message: 'Registration successful' } }); // Navigate to login component with success message
        } else {
          // Registration failed
          return response.json().then(data => {
            throw new Error(data.error || 'Registration failed');
          });
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error registering user:', error);
        if (error instanceof Error) {
          setErrorMessage(error.message); // Set error message if it's an Error instance
        } else {
          setErrorMessage('An unknown error occurred while registering user'); // Set generic error message if error is not an instance of Error
        }
      });
  };

  return (
    <div className="outerDiv">
      <div className="innerDiv">
        <form onSubmit={handleSubmit}>
          <div className="login-label">
            <label htmlFor="exampleInputEmail1">Register</label>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputName">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleGender">Gender</label>
            <select
              className="form-control"
              id="exampleGender"
              value={gender}
              onChange={(e) => setGender(e.target.value)} >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
          <div className='submitButon'>
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

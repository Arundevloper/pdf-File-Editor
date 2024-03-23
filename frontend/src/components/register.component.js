import React, { useState } from 'react';
import '../css/login.css';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

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
          // You can redirect the user to a login page or perform other actions here
        } else {
          // Registration failed
          console.error('Registration failed');
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error registering user:', error);
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
          

          <div className='submitButon'>
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default RegistrationForm;

import React, { useState } from 'react';
import '../css/login.css';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Here you can perform any validation or processing before submitting the form data

    // Creating a FormData object to hold form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('gender', gender);

    // Submitting the form data
    fetch('your-submit-url', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        // Handle response as needed
        console.log('Form submitted successfully:', response);
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting form:', error);
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
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
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

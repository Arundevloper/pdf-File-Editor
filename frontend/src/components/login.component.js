import React, { useState } from 'react';
import axios from 'axios';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';

const MyForm = ({ updateNavbarKey }) => { // Pass updateNavbarKey as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      email: email,
      password: password
    };

    //Check user credentials
    axios.post('https://pdf-file-editor-eqpx.vercel.app/api/login', formData, { // Modified URL
        withCredentials: true
      })
      .then(response => {
        console.log('Form submitted successfully:', response);

        if (response.data.message) {
          // Trigger update of Navbar key upon successful login
          updateNavbarKey();
          navigate('/home');
          setErrorMessage(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error submitting form:', error);

        if (error.response && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
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
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyForm;

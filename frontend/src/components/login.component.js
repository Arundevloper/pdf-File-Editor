import React, { useState } from 'react';
import '../css/login.css';

const MyForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Here you can perform any validation or processing before submitting the form data

    // Creating a FormData object to hold form data
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

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
          <div className='submitButon'>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyForm;

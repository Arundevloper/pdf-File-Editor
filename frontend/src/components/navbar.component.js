import React, { useState } from 'react';
import '../css/navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [username, setUsername] = useState(""); // State to manage username

  const handleLogout = () => {
    // Handle logout action
    setIsLoggedIn(false);
    setUsername("");
  };

  const handleLogin = () => {
    // For demonstration, let's assume login is successful
    setIsLoggedIn(true);
    setUsername("Arun"); // Assuming the username is Arun after login
  };

  return (
    <div>
      <nav className="navbar1 navbar-expand-lg  navbar-light">
        <div className="outerBox"> {/* Wrap a div around the content */}
          <div className="box1">
            <a className="navbar-brand" href="#">PdfEditor</a>
          </div>
          <div className="box2" >
            <ul className="navbar-nav ul-list ">
              {isLoggedIn ? ( // If logged in, show username and logout button
                <>
                  <li className="nav-item usernav1">
                    <a className="nav-link usernav" href="#"><span className="username">Welcome-</span><span className='usernames'>{username}</span></a>
                  </li>
                  <li className="nav-item" >
                    <a className="nav-link logout" href="#" onClick={handleLogout}>Logout</a>
                  </li>
                </>
              ) : ( // If not logged in, show register option
                <li className="nav-item" >
                  <a className="nav-link logout" href="#" onClick={handleLogin}>Register</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

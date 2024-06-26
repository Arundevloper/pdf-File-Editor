import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [username, setUsername] = useState(""); // State to manage username
  const [isRegisterPage, setIsRegisterPage] = useState(false); // State to track register page
  const navigate = useNavigate(); // Initialize useNavigate hook
  const location = useLocation(); // Initialize useLocation hook

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('https://pdf-file-editor-eqpx.vercel.app/api/checkLoginStatus', { withCredentials: true });

        const data = response.data;
        if (data.loggedIn) {
          setIsLoggedIn(true);
          setUsername(data.username);
        } else {
          setIsLoggedIn(false);
          setUsername("");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, [isLoggedIn]); // Listen for changes in isLoggedIn state

  useEffect(() => {
    // Check if the current path is '/register'
    setIsRegisterPage(location.pathname === '/register');
  }, [location.pathname]); // Listen for changes in location.pathname

  
  const handleLogout = async () => {
    try {
      // Make a request to the backend API to logout
      const response = await fetch('https://pdf-file-editor-eqpx.vercel.app/api/logout', {
        method: 'GET',
        credentials: 'include', // Use 'include' to send cookies with the request
      });
  
      // Check if the request was successful
      if (response.ok) {
        // Clear local state or perform any other necessary actions
        setIsLoggedIn(false);
        setUsername("");
        
        // Navigate the user to the desired page (home page)
        navigate('/');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
};





  const handleRegister = () => {
    
    if (isRegisterPage) {
      navigate('/');
    } else {
      navigate('/register');
    }
  };
   const handleMerge = () => {
      navigate('/mergepdf');
   };

  return (
    <div>
      <nav className="navbar1 navbar-expand-lg  navbar-light">
        <div className="outerBox">
          <div className="box1">
            <a className="navbar-brand" >PdfEditor</a>
          </div>
          <div className="box2" >
            <ul className="navbar-nav ul-list ">
              {isLoggedIn ? (
                <>
                  <li className="nav-item usernav1">
                    <a className="nav-link usernav" ><span className="username">Welcome-</span><span className='usernames'>{username}</span></a>
                  </li>
                  <li className="nav-item" >
                    <a className="nav-link logout"  onClick={handleMerge}>MergePDF</a>
                  </li> 
                  <li className="nav-item" >
                    <a className="nav-link logout"  onClick={handleLogout}>Logout</a>
                  </li>
                </>
              ) : (
                <li className="nav-item" >
                  <a className="nav-link logout"  onClick={handleRegister}>
                    {isRegisterPage ? "Login" : "Register"}
                  </a>
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

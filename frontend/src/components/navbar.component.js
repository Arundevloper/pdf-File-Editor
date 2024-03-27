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
        const response = await axios.get('http://localhost:5000/api/checkLoginStatus', {withCredentials: true});
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

  const handleLogout = () => {
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    setUsername("");
    navigate('/');
  };

  const handleRegister = () => {
    // Navigate to the register page if not already on it, or to the login page if already on the register page
    if (isRegisterPage) {
      navigate('/home');
    } else {
      navigate('/register');
    }
  };
  // const handleMerge = () => {
  //     navigate('/mergepdf');
  // };

  return (
    <div>
      <nav className="navbar1 navbar-expand-lg  navbar-light">
        <div className="outerBox">
          <div className="box1">
            <a className="navbar-brand" href="#">PdfEditor</a>
          </div>
          <div className="box2" >
            <ul className="navbar-nav ul-list ">
              {isLoggedIn ? (
                <>
                  <li className="nav-item usernav1">
                    <a className="nav-link usernav" href="#"><span className="username">Welcome-</span><span className='usernames'>{username}</span></a>
                  </li>
                  {/* <li className="nav-item" >
                    <a className="nav-link logout" href="#" onClick={handleMerge}>MergePDF</a>
                  </li> */}
                  <li className="nav-item" >
                    <a className="nav-link logout" href="#" onClick={handleLogout}>Logout</a>
                  </li>
                </>
              ) : (
                <li className="nav-item" >
                  <a className="nav-link logout" href="#" onClick={handleRegister}>
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

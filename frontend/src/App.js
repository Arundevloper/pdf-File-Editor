import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar.component';
import Footer from './components/footer.component';
import Login from './components/login.component';
import RegistrationForm from './components/register.component';
import DynamicTable from './components/table.component';
import PageSelector from './components/extract.component';
import PDFPageOrder from './components/pageorder.component';
import MainComponent from './components/pageorder.component';


function App() {
  const [navbarKey, setNavbarKey] = useState(0); // Key for Navbar component

  // Function to update Navbar key
  const updateNavbarKey = () => {
    setNavbarKey(prevKey => prevKey + 1);
  };

  return (
    <>
      <Router>
       
        <Navbar key={navbarKey} />

        {/* Render Routes */}
        <Routes>
          <Route
            path='/'
            element={<Login updateNavbarKey={updateNavbarKey} />}
          />
          <Route path='/register' element={<RegistrationForm />} />
          <Route path='/home' element={<DynamicTable />} />
          <Route path='/extract/:fileName' element={<PageSelector />} />
          <Route path='/page' element={<PDFPageOrder />} />
          <Route path='/listview' element={<MainComponent />} />
        
         
          
        </Routes>
        {/* <Footer/> */}
      </Router>
    </>
  );
}

export default App;

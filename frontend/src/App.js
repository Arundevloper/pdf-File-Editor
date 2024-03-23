
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar.component';
import Login from './components/login.component';
import RegistrationForm from './components/register.component';
import DynamicTable from './components/table.component';
import PageSelector from './components/extract.component';

function App() {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/home' element={<DynamicTable />} />
        <Route path='/extract' element={<PageSelector />} />
        <Route path='/login' element={<Login />} />

      </Routes>


    </Router>
  );
}

export default App;

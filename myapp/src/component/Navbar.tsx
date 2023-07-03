 


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
 

const Navbar: React.FC = () => {
   
  const isLoggedIn = localStorage.getItem('login') === 'true';
  // const [isLoggedIn,setIsLoggedIn]=useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('login','false');
    // setIsLoggedIn(true);
    navigate('/login');
  };
  return (
  

      <AppBar  style={{background:'DodgerBlue',color:'white'}}  position="static" >
        <Toolbar   >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          {!isLoggedIn && (
          <Button color="inherit" component={Link} to="/home">Home</Button>
          )}
            {isLoggedIn && (
          <Button color="inherit" component={Link}     to="/login">Login</Button>
            )}
              {isLoggedIn && (
          <Button color="inherit" component={Link} to="/">Register</Button>
              )}
                {!isLoggedIn && (
               <Button color="inherit" component={Link}  to="/logout" >Logout</Button>
                )}
        </Toolbar>
      </AppBar>
      
     
  );
};

export default Navbar;

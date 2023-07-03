import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    // sessionStorage.clear();

    
    // localStorage.clear();

     
    // document.cookie = '';
    localStorage.setItem('login','true');
     navigate('/');
     console.log('Logout');
     
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import Logout from './component/Logout';
// import StudentDetailPage from './component/Student';
 
 
const handleRegister = (formData :any) => {
  
  console.log(formData);
};


function App() {
  return (
    <div>
      
      <Router>
          
        <Navbar />
       
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


 

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Access the content state from the Redux store
  const content = useSelector((state :any) => state.content.content);
  console.log('This is content data', content);

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (event :any) => {
    event.preventDefault();

    // Username validation (required)
    if (!username) {
      setUsernameError('Please enter a username');
      return;
    }

    // Password validation (required, minimum 6 characters)
    if (!password) {
      setPasswordError('Please enter a password');
      return;
    }

    let storedPassword;

    if (content === 'Session') {
      storedPassword = sessionStorage.getItem(username);
      console.log(storedPassword);
    } else if (content === 'Cookies') {
      const cookies = document.cookie.split(';');
      storedPassword = null;

      cookies.forEach((cookie) => {
        const [name, value] = cookie.trim().split('=');
        const cookieUsername = decodeURIComponent(name);

        if (cookieUsername === username) {
          storedPassword = decodeURIComponent(value);
        }
      });
    } else {
      storedPassword = localStorage.getItem(username);
    }

    if (storedPassword === password) {
      console.log('Password matched');
      toast.success('Login successful!');
      localStorage.setItem('login', 'false');
      toast.success('Login successful!');
      navigate('/home');
      
    } else {
      console.log('Password did not match');
      setLoginError('Username or password is incorrect');
      toast.error('Invalid username or password!');
    }

    setUsername('');
    setPassword('');
  };

  const isSubmitDisabled = !username || !password;

  return (
    <> <ToastContainer /> 
    <form onSubmit={handleSubmit}>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
      <Typography variant="h5" component="h2" style={{ marginBottom: '16px' }}>
          Login 
        </Typography>
        <TextField
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
          error={!!usernameError}
          helperText={usernameError}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
          error={!!passwordError}
          helperText={passwordError}
        />
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: '16px' }}
          disabled={isSubmitDisabled}
        >
          Login
        </Button>
      </Box>
    </form>
    </>
  );
};

export default Login;

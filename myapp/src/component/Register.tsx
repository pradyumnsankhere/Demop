 
import React, { useState } from 'react';
import { TextField, Button, Box, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface RegistrationFormProps {
  onRegister: (username: string, email: string, password: string) => void;
}

const Register: React.FC<RegistrationFormProps> = ({ onRegister}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !email || !password) {
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    if (content === 'Session') {
      sessionStorage.setItem(email, password);
    } else if (content === 'Cookies') {
      const date = new Date();
      date.setTime(date.getTime() + (1 ?? 30) * 24 * 60 * 60 * 1000);
      let expires = 'expires=' + date.toUTCString();
      document.cookie = email + '=' + password + ';' + expires + ';path=/';
    } else if (content === 'Local Storage') {
      localStorage.setItem(email, password);
    } else {
      sessionStorage.setItem(email, password);
    }

    setUsername('');
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');

    navigate(`/login?content=${encodeURIComponent(content)}`);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = (e: any) => {
    setAnchorEl(null);
    setContent(e.target.textContent);
  };


  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
      <Typography variant="h5" component="h2" style={{ marginBottom: '16px' }}>
          Register
        </Typography>
        <TextField
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError('');
          }}
          margin="normal"
          required
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError('');
          }}
          margin="normal"
          required
          error={!!passwordError}
          helperText={passwordError}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: '16px' }}
          disabled={!username || !email || !password}
        >
          Register
        </Button>
        <Box>
        <Button onClick={handleMenuOpen}>Open Menu</Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>Session</MenuItem>
          <MenuItem onClick={handleMenuClose}>Cookies</MenuItem>
          <MenuItem onClick={handleMenuClose}>Local Storage</MenuItem>
        </Menu>
      </Box>
      </Box>
      {/* <Box>
        <Button onClick={handleMenuOpen}>Open Menu</Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>Session</MenuItem>
          <MenuItem onClick={handleMenuClose}>Cookies</MenuItem>
          <MenuItem onClick={handleMenuClose}>Local Storage</MenuItem>
        </Menu>
      </Box> */}
    </form>
  );
};

export default Register;


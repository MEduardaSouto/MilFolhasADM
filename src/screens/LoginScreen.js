import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import PasswordIcon from '@mui/icons-material/Password';

import { fetchUser } from '../actions/listActions';

const LoginScreen = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const clearForm = () => {
    setUsername('');
    setPassword('');
  };

  const handleLogin = async () => {
    try {
      const response = await fetchUser(username, password);

      if (response) {
        navigate('/CategoryScreen');
        clearForm();
        setError('');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Seu login ou senha estão incorretos');
    }
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" style={styles.text}>BEM VINDO</Typography>
      <TextField
        label="Nome de usuário"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onFocus={() => setError('')}
        style={styles.input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Senha"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => setError('')}
        style={styles.input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        disabled={!Boolean(username && password)}
        onClick={handleLogin}
        variant="contained"
        style={styles.button}
      >
        Login
      </Button>
      <Button
        onClick={() => navigate('/SignUpScreen')}
        variant="contained"
        style={styles.button}
      >
        Cadastro
      </Button>
      {error !== '' && <Typography variant="body1" style={styles.error}>{error}</Typography>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  text: {
    marginBottom: 30,
    fontSize: 40,
    color: '#401E01'
  },
  input: {
    marginBottom: 20,
    width: 400,
  },
  button: {
    marginBottom: 20,
    width: 400,
    fontSize: 18,
    // backgroundColor: '#DBB001', 
    color: '#401E01'
  },
  error: {
    color: 'red',
  },
};

export default LoginScreen;

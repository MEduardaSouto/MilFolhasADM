import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { fetchUser } from '../actions/listActions';

const LoginScreen = () => {
  const navigate  = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetchUser(username, password);

      if (response) {
        navigate('/CategoryScreen');
        setUsername('');
        setPassword('');
        setError('');
      }
    } catch (error) {
      console.error(error);
      setError('Seu login ou senha estão incorretos');
    }
  };

  return (
    <div className="container">
      <TextField
        className="input"
        label="Nome de usuário"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onFocus={() => setError('')}
      />
      <TextField
        className="input"
        label="Senha"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => setError('')}
      />
      <Button
        disabled={!Boolean(username && password)}
        onClick={handleLogin}
        variant="contained"
        className="button"
      >
        Login
      </Button>
      <Button
        onClick={() => navigate('/SignUpScreen')}
        variant="contained"
        className="button"
      >
        Cadastro
      </Button>
      {error !== '' && <Typography variant="body1" className="error">{error}</Typography>}
    </div>
  );
};

export default LoginScreen;

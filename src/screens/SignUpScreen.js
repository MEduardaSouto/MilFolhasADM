import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PasswordIcon from '@mui/icons-material/Password';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';

import { registerUser } from '../actions/listActions';

const SignUpScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const clearForm = () => {
    setName('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }

      const response = await registerUser(name, password);

      if (response) {
        navigate('/');
        clearForm();
        setError('');
      }
    } catch (error) {
      console.error('Erro ao cadastrar. Tente novamente.', error);
      setError('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" style={styles.heading}>
        CADASTRO
      </Typography>
      <TextField
        label="Nome de usuário"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
      <TextField
        label="Confirmar Senha"
        type="password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        disabled={!Boolean(name && password && confirmPassword)}
        onClick={handleRegister}
        variant="contained"
        style={styles.button}
      >
        Cadastrar
      </Button>
      <Typography className="error" style={styles.error}>
        {error}
      </Typography>
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
  heading: {
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
  },
  error: {
    color: 'red',
  },
};

export default SignUpScreen;

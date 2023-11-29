import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { registerUser } from '../actions/listActions';

const SignUpScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }

      const response = await registerUser(name, password);

      if (response) {
        navigate('/');
        setName('');
        setPassword('');
        setConfirmPassword('');
        setError('');
      }
    } catch (error) {
      console.error(error);
      setError('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div style={styles.container}>
      <Input
        placeholder="Nome de usuário"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onFocus={() => setError('')}
        style={styles.input}
      />
      <Input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => setError('')}
        style={styles.input}
      />
      <Input
        placeholder="Confirmar Senha"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onFocus={() => setError('')}
        style={styles.input}
      />
      <Button
        disabled={!Boolean(name && password && confirmPassword)}
        onClick={handleRegister}
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
    padding: 20,
  },
  input: {
    marginBottom: 20,
    width: 300,
  },
  button: {
    marginBottom: 20,
    width: 300,
  },
  error: {
    color: 'red',
  },
};

export default SignUpScreen;

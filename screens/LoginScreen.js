import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from '@rneui/base';
import axios from 'axios';
import { fetchUser } from '../actions/listActions';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const instance = axios.create({
    baseURL: 'https://todo-app-wx01.onrender.com',
  });

  const handleLogin = async () => {
    try {
      const response = await fetchUser(username, password);

      if (response.name) {
        navigation.navigate('Seu Totem');
      } else {
        setError('Usuário ou senha inválidos');
      }
    } catch (error) {
      console.error(error);
      setError('Ocorreu um erro ao fazer login');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <Input
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button
        style={styles.button}
        onPress={handleLogin}
        color="#008080"
      >
        Login
      </Button>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '##00b3b3',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  button: {
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#00b3b3',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;

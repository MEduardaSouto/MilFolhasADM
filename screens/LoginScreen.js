import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button } from '@rneui/base';
import { fetchUser } from '../actions/listActions';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetchUser(username, password);
      console.log(response)

      if (response) {
        navigation.navigate('Seu Totem');
        setUsername('');
        setPassword('');
        setError('')
      }
    } catch (error) {
      console.error(error);
      setError('Seu login ou senha estão incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={(text) => setUsername(text)}
        onFocus={() => setError('')}
      />
      <Input
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        onFocus={() => setError('')}
      />
      <Button
        title="Login"
        disabled={!Boolean(username && password)}
        onPress={handleLogin}
        containerStyle={styles.button}
      />
      <Button
        title="Cadastro"
        onPress={() => { navigation.navigate('Cadastro') }}
        containerStyle={styles.button}
      />
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
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  button: {
    padding: 10,
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center'
  },
});

export default LoginScreen;

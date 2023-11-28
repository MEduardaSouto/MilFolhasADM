import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button } from '@rneui/base';
import { registerUser } from '../actions/listActions';

const RegisterScreen = ({ navigation }) => {
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
      console.log(response);

      if (response) {
        navigation.navigate('Seu Totem');
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
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="Nome de usuário"
        value={name}
        onChangeText={(text) => setName(text)}
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
      <Input
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        onFocus={() => setError('')}
      />
      <Button
        title="Cadastrar"
        disabled={!Boolean(name && password && confirmPassword)}
        onPress={handleRegister}
        containerStyle={styles.button}
      />
      <Text style={styles.error}>{error}</Text>
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
    width: '100%',
  },
  button: {
    padding: 10,
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default RegisterScreen;

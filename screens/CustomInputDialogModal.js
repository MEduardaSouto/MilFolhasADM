import React, { useState } from 'react';
import { Modal, View, TextInput, Button, Text, StyleSheet } from 'react-native';

const CustomInputDialogModal = ({ visible, onClose, onSubmit }) => {
  const [nome, setNome] = useState('');

  const handleInputChange = (text) => {
    setNome(text);
  };

  const handleSubmit = () => {
    onSubmit(nome);
    setNome('');
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.container}>
          <Text style={styles.text}>Digite o nome da nova lista</Text>
          <TextInput onChangeText={handleInputChange} value={nome} style={styles.textInput}/>
          <View style={styles.viewButtons}>
            <Button title="Cancelar" onPress={onClose} style={styles.buttons} color="#008080"/>
            <Button title="Criar" onPress={handleSubmit} style={styles.buttons} color="#008080"/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(3, 3, 3, 0.1)',
  },
  container: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 45,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: 'flex',
    gap: 20
  },
  text: {
    fontSize: 18,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2,
    width: '100%'
  },
  viewButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 32
  },
  buttons: {
    borderRadius: 10,
    color:"#008080",
  }
});

export default CustomInputDialogModal;

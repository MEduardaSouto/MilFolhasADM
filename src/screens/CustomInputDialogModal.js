import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CustomInputDialogModal = ({ visible, onClose, onSubmit }) => {
  const [nome, setNome] = useState('');

  const handleInputChange = (e) => {
    setNome(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(nome);
    setNome('');
  };

  return (
    <Modal open={visible} onClose={onClose}>
      <div style={styles.centeredView}>
        <div style={styles.container}>
          <Typography style={styles.text}>Digite o nome da nova lista</Typography>
          <TextField onChange={handleInputChange} value={nome} style={styles.textInput} size="small" />
          <div style={styles.viewButtons}>
            <Button variant="contained" onClick={handleSubmit} style={styles.buttons}>
              Criar
            </Button>
            <Button variant="contained" onClick={onClose} style={styles.buttons}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const styles = {
  centeredView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: 300,
  },
  text: {
    fontSize: 18,
    marginBottom: 20
  },
  textInput: {
    marginBottom: 20,
    width: '100%',
  },
  buttons: {
    width: '100%',
    marginBottom: 10,
    color: '#2a2419',
    backgroundColor: '#eca400'
  }
};

export default CustomInputDialogModal;

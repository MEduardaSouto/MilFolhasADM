import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import './CustomInputDialogModal.css'; // Adicione este import para estilos

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
      <div className="centeredView">
        <div className="container">
          <Typography style={styles.text}>Digite o nome da nova lista</Typography>
          <TextField onChange={handleInputChange} value={nome} style={styles.textInput} />
          <div className="viewButtons">
            <Button variant="contained" color="default" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Criar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const styles = {
  text: {
    fontSize: 18,
  },
  textInput: {
    marginBottom: 20,
    width: '100%',
  },
};

export default CustomInputDialogModal;

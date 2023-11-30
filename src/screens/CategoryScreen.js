import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomInputDialogModal from './CustomInputDialogModal';

import { fetchListas, adicionarLista, removerLista } from '../actions/listActions';

const CategoryScreen = () => {
  const navigate = useNavigate();
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const listasData = await fetchListas();
      setListas(listasData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleAdicionarLista = () => {
    setDialogVisible(true);
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
  };

  const handleDialogSubmit = async (nome) => {
    setDialogVisible(false);
    try {
      setLoading(true);
      const novaLista = await adicionarLista(nome);
      setListas([...listas, novaLista]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleRemoverLista = async (id) => {
    try {
      setLoading(true);
      await removerLista(id);
      setListas(listas.filter((lista) => lista.id !== id));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleListaClick = (listaName) => {
    navigate(`/TodoListScreen/${listaName}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.middleContainer}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {listas.length > 0 ? (
              listas.map((lista) => (
                <div style={styles.listItem} key={lista.id}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleListaClick(lista.name)}
                    style={styles.buttonContainer}
                  >
                    {lista.name}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      width: '25%',
                      height: 70,
                      opacity: 0.7,
                    }}
                    onClick={() => handleRemoverLista(lista.id)}
                  >
                    x
                  </Button>
                </div>
              ))
            ) : (
              <div>
                <Typography style={styles.noListText}>Nenhuma área encontrada.</Typography>
              </div>
            )}
          </>
        )}
      </div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleAdicionarLista}
        style={styles.buttonAdd}
      >
        Adicionar área
      </Button>
      <CustomInputDialogModal
        visible={dialogVisible}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
      />
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginRight: '0.5%',
    marginBottom: 20,
    width: '100%',
  },
  buttonAdd: {
    width: '100%',
    marginTop: 10,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: '80%',
    marginBottom: 10,
  },
  noListText: {
    marginBottom: 20,
  },
};

export default CategoryScreen;

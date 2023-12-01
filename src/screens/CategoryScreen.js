import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomInputDialogModal from './CustomInputDialogModal';
import CircularProgress from '@mui/material/CircularProgress';

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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoverLista = async (id) => {
    try {
      setLoading(true);
      await removerLista(id);
      setListas(listas.filter((lista) => lista.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleListaClick = (listaName) => {
    navigate(`/TodoListScreen/${listaName}`);
  };

  return (
    <div style={styles.container}>
      <div>
        {loading ? (
          <div style={styles.loading}>
            <CircularProgress size={50} />
          </div>
        ) : (
          <>
            {listas.length > 0 ? (
              listas.map((lista) => (
                <div style={styles.listItem} key={lista.id}>
                  <Button
                    variant="contained"
                    onClick={() => handleListaClick(lista.name)}
                    style={styles.buttonContainer}
                  >
                    {lista.name}
                  </Button>
                  <Button
                    variant="contained"
                    style={styles.buttonRemove}
                    onClick={() => handleRemoverLista(lista.id)}
                  >
                    x
                  </Button>
                </div>
              ))
            ) : (
              <div style={styles.loading}>
                <Typography style={styles.noListText}>Nenhuma área encontrada.</Typography>
              </div>
            )}
          </>
        )}
      </div>

      <div style={styles.buttonAddContainer}>
        <Button
          variant="outlined"
          onClick={handleAdicionarLista}
          style={styles.buttonAdd}
        >
          Adicionar área
        </Button>
      </div>
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
    padding: 40,
    position: 'relative',
  },
  loading: {
    display: 'flex',
    alignSelf: 'flex-start',
    height: '50vh',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    position: 'relative',
  },
  buttonContainer: {
    width: '100%',
  },
  buttonRemove: {
    width: '25%',
    height: 70,
    opacity: 0.7,
    marginLeft: 10
  },
  buttonAdd: {
    minWidth: '95%',
    bottom: 10,
    position: 'fixed',
    height: 80,
  },
  buttonAddContainer : {
    display: 'flex',
    justifyContent: 'center',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  noListText: {
    fontSize: 20
  },
};

export default CategoryScreen;

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon  from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';

import { styled } from '@mui/material/styles';

import {
  addNewItem,
  fetchListIdByName,
  fetchItemsByListId,
  deleteItemById,
} from '../actions/listActions';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const TodoListScreen = () => {
  const { category } = useParams();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [itemValue, setItemValue] = useState('');
  const [image, setImage] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const getListIdAndFetchItems = async () => {
    try {
      setLoadingPage(true)
      const listId = await fetchListIdByName(category);

      if (!listId) {
        console.error('Lista não encontrada');
        return;
      }

      localStorage.setItem('ListId', listId);
      const items = await fetchItemsByListId(listId);
      setTasks(items);
    } catch (error) {
      console.error('Erro ao obter lista e itens:', error);
    } finally {
      setLoadingPage(false)
    }
  };

  useEffect(() => {
    getListIdAndFetchItems();
  }, [category]);

  const addTaskAndSave = async () => {
    try {
      setLoadingButton(true);
      const listId = localStorage.getItem('ListId');

      if (!listId) {
        console.error('Lista não encontrada');
        return;
      }

      const newItem = {
        name: task,
        value: itemValue,
        image: image,
      };

      const data = await addNewItem(listId, newItem);
      setTasks([...tasks, data]);
      setTask('');
      setItemValue('');
      setImage(null);
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    } finally {
      setLoadingButton(false);
    }
  };

  const deleteTask = async (itemId) => {
    try {
      setLoadingPage(true);
      const listId = localStorage.getItem('ListId');
      await deleteItemById(listId, itemId);
      const updatedTasks = tasks.filter((t) => t.id !== itemId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    } finally {
      setLoadingPage(false)
    }
  };

  const handleImagePick = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Image = e.target.result;
      setImage(base64Image);
    };

    reader.readAsDataURL(file);
  };

  const inputRef = useRef(null);

  const pickImage = () => {
    inputRef.current.click();
  };

  const renderTask = (task) => (
    <ListItem key={task.id} divider style={styles.tasks}>
      <div>
        <Typography style={styles.taskName}>
          {task.name}
        </Typography>
        <Typography
          style={styles.taskValue}
        > 
          {`R$${task.value}`}
        </Typography>
        {task.image && <img src={task.image} alt="Task" style={styles.taskImage} />}
      </div>
      <Button onClick={() => deleteTask(task.id)}  variant="contained" startIcon={<DeleteIcon />} >
        Excluir
      </Button>
    </ListItem>
  );

  return (
    <div style={styles.container}>
      <Typography variant="h2" style={styles.title}>
        {category}
      </Typography>
      <TextField
        label="Item"
        variant="outlined"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={styles.inputContainer}
      />
      <TextField
        label="Valor do Item (Apenas número)"
        variant="outlined"
        value={itemValue}
        onChange={(e) => setItemValue(e.target.value)}
        style={styles.inputContainer}
      />
      {image && <img src={image} alt="Selected" style={styles.selectedImage} />}
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Escolha sua imagem
        <VisuallyHiddenInput onClick={pickImage} />
      </Button>
      <input 
        type='file'
        ref={inputRef}
        onChange={handleImagePick}
        style={{display: 'none'}}
      />
      <Button
        disabled={!Boolean(task && itemValue)}
        variant="contained"
        onClick={addTaskAndSave}
        style={styles.button}
      >
        {loadingButton ? <CircularProgress size={24} color="inherit"/> : 'Adicionar'}
      </Button>
      <div style={styles.listContainer}>
        {loadingPage ? <CircularProgress size={50} style={styles.loadingPage}/> :
        tasks.map((task) => renderTask(task))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 40,
  },
  title: {
    marginBottom: 20,
  },
  inputContainer: {
    display: 'flex',
    marginBottom: 10,
    padding: 0,
  },
  button: {
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20
  },
  listContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 30
  },
  tasks: {
    display: 'flex',
    gap: 30
  },
  taskName: {
    fontSize: 20,
  },
  taskValue: {
    fontSize: 12
  },
  taskImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  selectedImage: {
    width: 150,
    height: 150,
    display: 'block'
  },
  loadingPage: {
    alignSelf: 'center',
    marginTop: '10%'
  }
};

export default TodoListScreen;

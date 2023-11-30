import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

// import FileInput from 'react-file-input';

import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
// import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';

import { addNewItem, fetchListIdByName, fetchItemsByListId, deleteItemById, updateItemById } from '../actions/listActions';

const TodoListScreen = () => {
  const { category } = useParams();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [itemValue, setItemValue] = useState('');
  const [image, setImage] = useState(null);

  const renderTask = (task, index) => (
    <ListItem key={index} divider>
      <Checkbox
        checked={task.is_checked}
        onChange={() => toggleTask(index, task.id, task.is_checked)}
      />
      <div>
        <Typography style={task.is_checked ? styles.completedTask : null}>
          {task.name}
        </Typography>
        <Typography>{`R$ ${task.value}`}</Typography>
        {task.image && <img src={task.image} alt="Task" style={styles.taskImage} />}
      </div>
      <Button onClick={() => deleteTask(index, task.id)}>
        x
      </Button>
    </ListItem>
  );

  const addTaskAndSave = async () => {
    try {
      const listId = await fetchListIdByName(category);
      if (!listId) {
        console.error('Lista não encontrada 2');
        return;
      }

      const newItem = {
        name: task,
        value: itemValue,
        image: image,
      };

      await addNewItem(listId, newItem);
      setTasks([...tasks, newItem]);
      setTask('');
      setItemValue('');
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (index, itemId) => {
    const listId = await fetchListIdByName(category);
    await deleteItemById(listId, itemId);
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTask = async (index, itemId, isChecked) => {
    const check = !isChecked;
    await updateItemById(itemId, check);

    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, is_checked: check } : t
    );

    setTasks(updatedTasks);
  };

  const handleImagePick = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Image = e.target.result;
      console.log(base64Image, 'image')
      setImage(base64Image);
    };

    reader.readAsDataURL(file);
  };
  
  const inputRef = useRef(null)

  const pickImage = () => {
    inputRef.current.click()
  };

  useEffect(() => {
    const getListItems = async () => {
      try {
        const listId = await fetchListIdByName(category);
        if (!listId) {
          console.error('Lista não encontrada 1');
          return;
        }

        const items = await fetchItemsByListId(listId);
        setTasks(items);
      } catch (error) {
        console.error(error);
      }
    };

    getListItems();
  }, [category]);

  return (
    <div style={styles.container}>
      <Typography variant="h2" style={styles.title}>
        {category}
      </Typography>
      <Input
        placeholder="Item"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={styles.inputContainer}
      />
      <Input
        placeholder="Valor do Item (Apenas número)"
        value={itemValue}
        onChange={(e) => setItemValue(e.target.value)}
        style={styles.inputContainer}
      />
      <Button onClick={pickImage} style={styles.button}>
        Escolher Imagem
      </Button>
      <div>
        <input 
          type='file'
          ref={inputRef}
          onChange={handleImagePick}
          style={{display: 'none'}}
        />
      </div>
      {image && <img src={image} alt="Selected" style={styles.selectedImage} />}
      <Button
        disabled={!Boolean(task && itemValue)}
        onClick={addTaskAndSave}
        style={styles.button}
      >
        Adicionar
      </Button>
      <div style={styles.listContainer}>
        {tasks.map((task, index) => renderTask(task, index))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    marginLeft: 10,
  },
  inputContainer: {
    marginBottom: 20,
    padding: 0,
  },
  button: {
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  listContainer: {
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  taskImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    margin: 10,
    marginLeft: 0,
  },
};

export default TodoListScreen;

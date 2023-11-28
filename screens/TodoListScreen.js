import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Input, ListItem, Text, CheckBox } from '@rneui/base';
import { v4 as uuidv4 } from 'uuid';
import { addNewItem, fetchListIdByName, fetchItemsByListId, deleteItemById, updateItemById } from '../actions/listActions';
import ImagePicker from 'react-native-image-picker';

export default function TodoListScreen({ route }) {
  const { category } = route.params;
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [itemValue, setItemValue] = useState('');
  const [image, setImage] = useState(null);

  const renderTask = (task, index) => {

    return (
      <ListItem key={index} bottomDivider>
        <CheckBox
          checked={task.is_checked}
          onPress={() => toggleTask(index, task.id, task.is_checked)}
        />
        <ListItem.Content>
          <ListItem.Title
            style={task.is_checked ? styles.completedTask : null}
          >
            {task.name}
          </ListItem.Title>
          <Text>
            {`R$ ${task.value}`}
          </Text>
          <Image source={{ uri: task.image }} style={{ width: 50, height: 50, marginRight: 10 }} />
        </ListItem.Content>
        <Button title="Excluir" onPress={() => deleteTask(index, task.id)} />
      </ListItem>
    );
  };

  const addTaskAndSave = async () => {
    try {
      const listId = await fetchListIdByName(category);
      if (!listId) {
        console.error('Lista não encontrada');
        return;
      }

      const newItem = {
        id: uuidv4(),
        name: task,
        value: itemValue,
        image: image, // Adicionando o URI da imagem ao objeto do item
      };
      await addNewItem(listId, newItem)
      setTasks([...tasks, newItem]);
      setTask('');
      setItemValue('');
      setImage(null); // Limpar a imagem após adicioná-la
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (index, itemId) => {
    const listId = await fetchListIdByName(category);
    await deleteItemById(listId, itemId);
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };
  
  const toggleTask = async (index, itemId, isChecked) => {
    const check = Boolean(!isChecked);
    await updateItemById(itemId, check);

    const updatedTasks = tasks.map((task) => {
      if (task.id === itemId) {
        return { ...task, is_checked: check };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const chooseImage = () => {
    ImagePicker.showImagePicker({}, response => {
      if (response.uri) {
        setImage(response.uri);
      }
    });
  };

  useEffect(() => {
    const getListItems = async () => {
      try {
        const listId = await fetchListIdByName(category);
        if (!listId) {
          console.error('Lista não encontrada');
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
    <View style={styles.container}>
      <Text h2 style={styles.title}>
        {category}
      </Text>
      <Input
        placeholder="Item"
        value={task}
        onChangeText={(value) => setTask(value)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Valor do Item (Apenas número)"
        value={itemValue}
        onChangeText={(value) => setItemValue(value)}
        containerStyle={styles.inputContainer}
      />
      <Button title="Escolher Imagem" onPress={chooseImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button
        title="Adicionar"
        disabled={!Boolean(task && itemValue)}
        onPress={addTaskAndSave}
        containerStyle={styles.button}
      />
      <View style={styles.listContainer}>
        {tasks.map((task, index) => renderTask(task, index))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    marginLeft: 10
  },
  inputContainer: {
    marginBottom: 20,
    padding: 0
  },
  button: {
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10
  },
  listContainer: {
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  itemValue: {
    fontSize: 12,
    marginLeft: -10,
  },
});
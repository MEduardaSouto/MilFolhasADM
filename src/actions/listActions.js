import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const instance = axios.create({
  baseURL: 'https://milfolhasserver.onrender.com',
  // baseURL: 'http://192.168.0.7:3000'
});

let userId = '';

export const getUserId = () => userId;

export const fetchListas = async () => {
  try {
    const response = await instance.get(`/user/${getUserId()}/lists`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const adicionarLista = async (name) => {
  try {
    const id = uuidv4();
    const response = await instance.post(`/user/${getUserId()}/list`, { id, name });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removerLista = async (listId) => {
  try {
    await instance.delete(`/user/${getUserId()}/list/${listId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchListIdByName = async (name) => {
  try {
    const response = await instance.get(`/user/${getUserId()}/lists`);
    const lists = response.data;
    console.log('aquiii', lists)
    const list = lists.find((list) => list.name === name);
    return list ? list.id : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchItemsByListId = async (listId) => {
  try {
    const response = await instance.get(`/user/${getUserId()}/list/${listId}/items`);
    const items = response.data;
    return items;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteItemById = async (listId, itemId) => {
  try {
    await instance.delete(`/user/${getUserId()}/list/${listId}/item/${itemId}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateItemById = async (listId, itemId, isChecked) => {
  try {
    await instance.put(`/user/${getUserId()}/list/${listId}/item/${itemId}`, { isChecked });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchUser = async (username, password) => {
  try {
    const response = await instance.post('/user/login', { username, password });
    userId = response.data.id;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerUser = async (name, password) => {
  try {
    const id = uuidv4();
    const response = await instance.post(`/user`, {id, name, password });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addNewItem = async (listId, newItem) => {
  const id = uuidv4();
  const { name, value, image } = newItem;

  const formData = new FormData();
  formData.append('id', id);
  formData.append('name', name);
  formData.append('value', value);
  formData.append('image', image);

  try {
    const response = await instance.post(`/user/${getUserId()}/list/${listId}/item`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    userId = response.data.id;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

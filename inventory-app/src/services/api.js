import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; 

export const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/items');
      return response.data.items || []; 
    } catch (error) {
      throw error;
    }
  };


export const createItem = async (newItem) => {
  const response = await axios.post(`${BASE_URL}/items`, newItem);
  return response.data;
};


export const deleteItem = async (itemId) => {
  await axios.delete(`${BASE_URL}/item/${itemId}`);
};


export const updateItem = async (barcode, updatedItemData) => {
    try {
      const response = await axios.put(`http://localhost:8000/item/${barcode}`, updatedItemData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar o item:', error);
      throw error;
    }
  };
import React, { useState, useEffect } from 'react';
import { ItemList } from '../components/ItemList';
import { fetchItems, updateItem } from '../services/api';
import { toast } from 'react-toastify';

export function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar os itens:', error);
        setError('Falha ao carregar os itens.');
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  const handleUpdateItem = async (updatedItem) => {
    try {
      await updateItem(updatedItem.barcode, updatedItem);

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.barcode === updatedItem.barcode ? updatedItem : item
        )
      );
      toast.success('Item atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o item:', error);
      toast.error('Erro ao atualizar o item.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div>
      <ItemList
        items={items}
        setItems={setItems}
        onUpdateItem={handleUpdateItem}
        onDelete={(item) => console.log('Delete Item:', item)} 
        onEdit={(item) => console.log('Edit Item:', item)} 
      />
    </div>
  );
}

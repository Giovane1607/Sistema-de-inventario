import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { updateItem, deleteItem, createItem, fetchItems } from '../services/api'; 
import { toast } from 'react-toastify';

export function ItemList({ items, setItems, onDelete, onAddItem }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    barcode: '',
    description: '',
    quantity: '',
    unit: ''
  });

  const handleDeleteClick = (item) => {
    setSelectedItem(item); 
    setModalOpen(true);  
  };
  
  const confirmDelete = async () => {
    try {
      if (selectedItem && selectedItem.id) {  
        await deleteItem(selectedItem.id);  
        setItems((prevItems) => prevItems.filter((item) => item.id !== selectedItem.id));  
        toast.success('Item excluído com sucesso!');  
      } else {
        console.error("O item selecionado não possui um ID válido.");  
        toast.error('Erro: Item sem ID válido.');
      }
    } catch (error) {
      console.error('Erro ao excluir o item:', error);  
      toast.error('Erro ao excluir o item.'); 
    }
    setModalOpen(false);  
  };
  
  const cancelDelete = () => {
    setSelectedItem(null); 
    setModalOpen(false);  
  };

  const handleAddItem = async () => {
    try {
      if (!newItem.barcode || !newItem.description || !newItem.quantity || !newItem.unit) {
        toast.error('Preencha todos os campos.');
        return;
      }
  
      console.log('Enviando novo item:', newItem);
      const addedItem = await createItem(newItem);
      
      console.log('Resposta da API:', addedItem);
  
      if (addedItem) {

        const updatedItems = await fetchItems();
        setItems(updatedItems);
  
        setAddModalOpen(false);
        setNewItem({
          barcode: '',
          description: '',
          quantity: '',
          unit: ''
        });
  
        toast.success('Item adicionado com sucesso!');
      } else {
        toast.error('Erro ao adicionar o item.');
      }
    } catch (error) {
      console.error('Erro ao adicionar o item:', error);
      toast.error('Erro ao adicionar o item.');
    }
  };


  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleUpdateItem = async () => {
    try {
      if (selectedItem && selectedItem.barcode) {
        await updateItem(selectedItem.barcode, selectedItem);
        setEditModalOpen(false);

        toast.success('Item atualizado com sucesso!');
 
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.barcode === selectedItem.barcode ? selectedItem : item
          )
        );
      } else {
        console.error("O item selecionado não possui um barcode válido.");
      }
    } catch (error) {
      console.error('Erro ao atualizar o item:', error);
  

      toast.error('Erro ao atualizar o item.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Itens</h1>
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Adicionar Item
        </button>
      </div>

      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2">CÓDIGO DE BARRAS</th>
            <th className="px-4 py-2">DESCRIÇÃO</th>
            <th className="px-4 py-2">QUANTIDADE</th>
            <th className="px-4 py-2">UNIDADE</th>
            <th className="px-4 py-2">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="text-center hover:bg-gray-50 transition-colors duration-200">
              <td className="border px-4 py-2">{item.barcode}</td>
              <td className="border px-4 py-2">{item.description}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">{item.unit}</td>
              <td className="border px-4 py-2 flex justify-center space-x-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="bg-transparent text-gray-600 hover:text-blue-500 transition-colors duration-200 p-2 rounded-full focus:outline-none"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDeleteClick(item)}
                  className="bg-transparent text-gray-600 hover:text-red-500 transition-colors duration-200 p-2 rounded-full focus:outline-none"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Confirmação de Exclusão */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirmação</h2>
            <p>Tem certeza de que deseja excluir o item {selectedItem?.description}?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição de Item */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Editar Item</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Código de Barras:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={selectedItem?.barcode || ''}
                  disabled 
                  onChange={(e) => setSelectedItem({ ...selectedItem, barcode: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Descrição:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={selectedItem?.description || ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Quantidade:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  value={selectedItem?.quantity || ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, quantity: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Unidade:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={selectedItem?.unit || ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, unit: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleUpdateItem}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Adicionar Item */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Adicionar Novo Item</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Código de Barras:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={newItem.barcode}
                  onChange={(e) => setNewItem({ ...newItem, barcode: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Descrição:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Quantidade:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Unidade:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
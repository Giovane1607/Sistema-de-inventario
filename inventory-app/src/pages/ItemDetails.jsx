import React, { useState } from 'react';

export function ItemDetails({ item, onSave, onCancel }) {
  const [editableItem, setEditableItem] = useState({ ...item });

  const handleSave = () => {
    onSave(editableItem);
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg max-w-lg w-full text-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Editar Item {editableItem.id}</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner text-left">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Código de Barras:</label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={editableItem.barcode}
            onChange={(e) => setEditableItem({ ...editableItem, barcode: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Descrição:</label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={editableItem.description}
            onChange={(e) => setEditableItem({ ...editableItem, description: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Quantidade:</label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={editableItem.quantity}
            onChange={(e) => setEditableItem({ ...editableItem, quantity: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Unidade:</label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={editableItem.unit}
            onChange={(e) => setEditableItem({ ...editableItem, unit: e.target.value })}
          />
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
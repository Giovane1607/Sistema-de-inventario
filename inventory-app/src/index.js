import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Estilos globais ou Tailwind CSS
import App from './App';  // Importar o componente App principal

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />  {/* O App global com rotas */}
  </React.StrictMode>
);
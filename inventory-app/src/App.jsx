import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';  // Importando o ToastContainer
import 'react-toastify/dist/ReactToastify.css';   // Importando o CSS do react-toastify
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ItemDetails } from './pages/ItemDetails';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Conteúdo principal */}
        <main className="container mx-auto flex-grow py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items/:id" element={<ItemDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer fixado */}
        <Footer />

        {/* Toast container para exibir os toasts */}
        <ToastContainer
          position="top-right"
          autoClose={3000}    
          hideProgressBar={false}      
          newestOnTop={false}
        />
      </div>
    </Router>
  );
}

export default App;

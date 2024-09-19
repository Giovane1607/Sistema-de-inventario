import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Inventário. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
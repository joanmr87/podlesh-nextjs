// NavBar.tsx o NavBar.jsx
import React, { useState } from 'react';

export default function AppPage() {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAllChange = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);

    // Actualizar todos los clientes con el nuevo valor de notificar
    const updatedClients = clients.map(client => ({
      ...client,
      notificar: newValue
    }));
    setClients(updatedClients);
  };

function NavBar() {
    return (
        <nav className="bg-indigo-600 p-4 shadow-lg">
            <a className="text-white font-bold text-xl" href="#">Podlesch</a>
        </nav>
    );
}

export default NavBar;

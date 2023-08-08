import React, { useState } from 'react';

function ClientList({ clients = [], selectAll, onToggleSelectAll }) {
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const handleEditClick = (id, currentPhone) => {
    setEditingId(id);
    setEditingValue(currentPhone);
  };

  const handleSaveClick = async (id, clientName) => {
    // Actualizar el archivo `guiaTelefonica.json` a través de la API route
    const response = await fetch('/api/updatePhone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clientName, newPhone: editingValue }),


    });

    setEditingId(null);
    setEditingValue('');

    if (response.ok) {
      // Actualizar el estado local si la operación fue exitosa.
      const updatedClients = clients.map((client) => {
        if (client.id === id) {
          return { ...client, telefono: editingValue };
        }
        return client;
      });
      setClients(updatedClients);
    } else {
      // Manejo de error en caso de fallo.
      const data = await response.json();
      console.error(data.message);
    }

    setEditingId(null);
    setEditingValue('');
  };


  return (
    <div className="w-full lg:w-3/4 xl:w-2/3 mx-auto mt-8 shadow-lg overflow-hidden rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-1/6 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-300">ID</th>
            <th className="w-1/3 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-300">Cliente</th>
            <th className="w-1/6 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-300">Deuda</th>
            <th className="w-1/6 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-300">Teléfono</th>
            <th className="w-1/3 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-300 flex items-center justify-start">
              Notificar
              <input
                type="checkbox"
                id="checkAll"
                checked={selectAll}
                onChange={onToggleSelectAll}
                className="ml-3 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {clients.map(client => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="w-1/6 px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.id}</td>
              <td className="w-1/3 px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.name}</td>
              <td className="w-1/6 px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.deuda}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === client.id ? (
                  <>
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                    />
                    <button onClick={() => handleSaveClick(client.id, client.name)}>Guardar</button>
                  </>
                ) : (
                  <>
                    {client.telefono || "No disponible"}
                    <button onClick={() => handleEditClick(client.id, client.telefono)}>Editar</button>
                  </>
                )}
              </td>
              <td className="w-1/3 px-6 py-4 whitespace-nowrap flex items-center justify-start">
                <input
                  type="checkbox"
                  checked={client.notificar}
                  className="mr-3 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                Notificar
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientList;

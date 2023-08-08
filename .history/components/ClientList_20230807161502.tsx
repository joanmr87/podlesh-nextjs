import React from 'react';

function ClientList({ clients = [], selectAll, onToggleSelectAll }) {

  return (
    <div className="max-w-xl mx-auto mt-8 shadow-lg overflow-hidden rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deuda</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
              Notificar
              <input 
                type="checkbox" 
                id="checkAll" 
                checked={selectAll}
                onChange={onToggleSelectAll}
                className="ml-2"
              />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map(client => (
            <tr key={client.id}>
              <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{client.deuda}</td>
              <td className="px-6 py-4 whitespace-nowrap">{client.telefono}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" checked={client.notificar} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientList;

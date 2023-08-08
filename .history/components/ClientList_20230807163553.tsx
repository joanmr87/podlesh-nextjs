import React from 'react';

function ClientList({ clients = [], selectAll, onToggleSelectAll }) {

  return (
    <div className="w-full lg:w-3/4 xl:w-2/3 mx-auto mt-8 shadow-lg overflow-hidden rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-100">
          <tr>
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
              <td className="w-1/3 px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.name}</td>
              <td className="w-1/6 px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.deuda}</td>
              <td className="w-1/6 px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.telefono}</td>
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

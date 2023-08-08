// ClientList.tsx o ClientList.jsx
import React from 'react';

function ClientList({ clients = [] }) {
  
    return (
        <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deuda</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Notificar
                            <input className="ml-2 border-gray-300 rounded-md" type="checkbox" id="checkAll" />
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
                                <input className="border-gray-300 rounded-md" type="checkbox" checked={client.notificar} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );           
}

export default ClientList;

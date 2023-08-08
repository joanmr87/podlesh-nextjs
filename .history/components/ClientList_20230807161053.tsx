// ClientList.tsx o ClientList.jsx
import React from 'react';

function ClientList({ clients = [], selectAll, onToggleSelectAll }) {

  return (
    <table className="table table-bordered min-w-full">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Deuda</th>
          <th>Teléfono</th>
          <th className="flex items-center">
            <input 
              type="checkbox" 
              id="checkAll" 
              checked={selectAll}
              onChange={onToggleSelectAll}
              className="mr-2"
            />
            Notificar
          </th>
        </tr>
      </thead>
      <tbody>
        {clients.map(client => (
          <tr key={client.id}>
            <td>{client.name}</td>
            <td>{client.deuda}</td>
            <td>{client.telefono}</td>
            <td>
              <input type="checkbox" checked={client.notificar} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ClientList;

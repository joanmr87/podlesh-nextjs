function ClientList({ clients = [] }) {
    function ClientList({ clients = [] }) {
        return (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Deuda</th>
                <th>Teléfono</th>
                <th>
                  Notificar
                  <input type="checkbox" id="checkAll" />
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
      
  }
  
  export default ClientList;
  
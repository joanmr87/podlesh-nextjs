export default function AppPage() {
  return (
    <div>
      <h1>Guía Telefónica</h1>
      
      {/* Aquí va tu tabla */}
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
          {/* Los datos serán insertados aquí desde el archivo .xlsx */}
        </tbody>
      </table>

      {/* Cualquier otra funcionalidad o componente que quieras agregar */}
    </div>
  );
}

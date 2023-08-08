"use client"
import React, { useState } from 'react'; // Agrega esta línea para importar React y useState
import NavBar from '../components/NavBar';
import FileUploader from '../components/FileUploader';
import ClientList from '../components/ClientList';
import NotificationButton from '../components/NotificationButton';

export default function AppPage() {
    const [clients, setClients] = useState([]); // Usamos useState para manejar el estado de los clientes
    
    const handleFileUpload = (event) => {
      let fileInput = document.getElementById('fileInput');
      if (fileInput.files.length === 0) {
          alert('Por favor, selecciona un archivo primero.');
          return;
      }
      let file = fileInput.files[0];
  
      let reader = new FileReader();
      reader.onload = function(e) {
          let data = e.target.result;
          let workbook = XLSX.read(data, { type: 'binary' });
          
          let firstSheetName = workbook.SheetNames[0];
          let worksheet = workbook.Sheets[firstSheetName];
          let jsonData = XLSX.utils.sheet_to_json(worksheet);
  
          let clientesNegativos = jsonData.filter(cliente => cliente["Saldos"] < 0);
  
          let tableBody = document.querySelector('table tbody');
          tableBody.innerHTML = ""; // Limpiar el contenido actual
  
          let guiaTelefonica = {};  
  
          clientesNegativos.forEach(cliente => {
              let row = document.createElement('tr');
              
              let clienteCell = document.createElement('td');
              clienteCell.textContent = cliente["Razón Social"];
              row.appendChild(clienteCell);
      
              let saldoCell = document.createElement('td');
              saldoCell.textContent = cliente["Saldos"];
              row.appendChild(saldoCell);
      
              // Modificación en la creación de la celda del teléfono
              let telefonoCell = document.createElement('td');
              
              let inputTelefono = document.createElement('input');
              inputTelefono.setAttribute('type', 'text');
              inputTelefono.setAttribute('value', guiaTelefonicaEstatica[cliente["Razón Social"]] || "Teléfono no disponible");
              inputTelefono.setAttribute('data-cliente', cliente["Razón Social"]);
              telefonoCell.appendChild(inputTelefono);
              
              let guardarBtn = document.createElement('button');
              guardarBtn.textContent = "Guardar";
              guardarBtn.onclick = function() {
                  guiaTelefonicaEstatica[cliente["Razón Social"]] = inputTelefono.value;
                  // Aquí puedes agregar cualquier otra acción necesaria, como guardar en una base de datos o informar al usuario.
                  alert('Número de teléfono guardado para ' + cliente["Razón Social"]);
              };
              telefonoCell.appendChild(guardarBtn);
              
              row.appendChild(telefonoCell);
              
              let checkboxCell = document.createElement('td');
              let checkbox = document.createElement('input');
              checkbox.setAttribute('type', 'checkbox');
              checkbox.checked = true;
              checkboxCell.appendChild(checkbox);
              row.appendChild(checkboxCell);
  
              tableBody.appendChild(row);
  
              guiaTelefonica[cliente["Razón Social"]] = "";   // Llena la guía con nombres sin números de teléfono
          });
          
          //console.log(JSON.stringify(guiaTelefonica, null, 2));  // Esto imprimirá la guía en la consola
      };
  
      reader.readAsBinaryString(file);
  }
  
    const sendNotifications = () => {
      // Lógica para enviar notificaciones
    };
  
    return (
      <div>
        <NavBar />
        <FileUploader onFileSelected={handleFileUpload} />
        {clients.length ? <ClientList clients={clients} /> : <p>No hay clientes cargados</p>}
        <NotificationButton onClick={sendNotifications} />
      </div>
    );
}

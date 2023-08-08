// @jsxImportSource next/server
"use client"


import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import NavBar from '../components/NavBar';
import FileUploader from '../components/FileUploader';
import ClientList from '../components/ClientList';
import NotificationButton from '../components/NotificationButton';
import guiaTelefonicaEstatica from '../utils/guiaTelefonica.json';


interface Cliente {
  "Cod": string;
  "Razón Social": string;
  "Saldos": number;
  // ... Puedes añadir más campos si es necesario
}



export default function AppPage() {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [selectAll, setSelectAll] = useState(false);


  const handleFileUpload = (event) => {
    let fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
      alert('Por favor, selecciona un archivo primero.');
      return;
    }
    let file = fileInput.files[0];

    let reader = new FileReader();
    reader.onload = function (e) {
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

        let idCell = document.createElement('td');
        idCell.textContent = cliente["Cod"];
        row.appendChild(idCell);

        let clienteCell = document.createElement('td');
        clienteCell.textContent = cliente["Razón Social"];
        row.appendChild(clienteCell);

        let saldoCell = document.createElement('td');
        saldoCell.textContent = cliente["Saldos"];
        row.appendChild(saldoCell);

        let telefonoCell = document.createElement('td');

        let inputTelefono = document.createElement('input');
        inputTelefono.setAttribute('type', 'text');
        inputTelefono.setAttribute('value', guiaTelefonicaEstatica[cliente["Razón Social"]] || "Teléfono no disponible");
        inputTelefono.setAttribute('data-cliente', cliente["Razón Social"]);
        telefonoCell.appendChild(inputTelefono);

        let guardarBtn = document.createElement('button');
        guardarBtn.textContent = "Guardar";
        guardarBtn.onclick = function () {
          guiaTelefonicaEstatica[cliente["Razón Social"]] = inputTelefono.value;
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

        guiaTelefonica[cliente["Cod"]] = {
          "name": cliente["Razón Social"],
          "telefono": ""
        }; // Llena la guía con nombres sin números de teléfono
      });

      console.log(JSON.stringify(guiaTelefonica, null, 2));  // Esto imprimirá la guía en la consola
    };

    reader.readAsBinaryString(file);
  }
}


const sendNotifications = () => {
  // Lógica para enviar notificaciones
};

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

return (
  <div className="flex flex-col items-center justify-center py-8 px-4 lg:px-32 space-y-4">
    <NavBar />
    <FileUploader onFileSelected={handleFileUpload} />
    {clients.length
      ? <ClientList clients={clients} selectAll={selectAll} onToggleSelectAll={handleSelectAllChange} />
      : <p className="w-full lg:w-3/4 xl:w-2/3 mx-auto mt-6 text-gray-600">No hay clientes cargados</p>}
    <NotificationButton onClick={sendNotifications} className="mt-4" />
  </div>
);
}


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
  id: string; // o number, dependiendo de cómo esté estructurado tu Excel.
  "Razón Social": string;
  "Saldos": number;
  // Puedes añadir más campos si es necesario
}



export default function AppPage() {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [selectAll, setSelectAll] = useState(false);


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert('Por favor, selecciona un archivo primero.');
            return;
        }

        const reader = new FileReader();

        reader.onload = function(e) {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          let clientesNegativos = jsonData.filter(cliente => cliente["Saldos"] < 0).map(cliente => ({
            name: cliente["Razón Social"],
            deuda: cliente["Saldos"],
            telefono: guiaTelefonicaEstatica[cliente["Razón Social"]] || "Número no disponible",
            notificar: true
          }));
      
          setClients(clientesNegativos);
      };
      

        reader.readAsBinaryString(file);
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


// @jsxImportSource next/server
"use client"


import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import NavBar from '../components/NavBar';
import FileUploader from '../components/FileUploader';
import ClientList from '../components/ClientList';
import NotificationButton from '../components/NotificationButton';


interface Cliente {
  "Razón Social": string;
  "Saldos": number;
  // Puedes añadir más campos si es necesario
}



export default function AppPage() {
    const [clients, setClients] = useState<Cliente[]>([]);


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
            let clientesNegativos = jsonData.filter(cliente => cliente["Saldos"] < 0) as Cliente[];


            setClients(clientesNegativos);
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

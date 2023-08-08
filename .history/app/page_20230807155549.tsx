

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
  "Razón Social": string;
  "Saldos": number;
}

export default function AppPage() {
    const [clients, setClients] = useState<Cliente[]>([]);

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (!file) {
          alert('Por favor, selecciona un archivo primero.');
          return;
      }

    }

    const sendNotifications = () => {
        // ... (sin cambios aquí)
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <NavBar />
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <FileUploader onFileSelected={handleFileUpload} />
                <div className="mt-4">
                    {clients.length ? <ClientList clients={clients} /> : <p className="text-center text-gray-500">No hay clientes cargados</p>}
                </div>
                <div className="mt-6">
                    <NotificationButton onClick={sendNotifications} />
                </div>
            </div>
        </div>
    );
}

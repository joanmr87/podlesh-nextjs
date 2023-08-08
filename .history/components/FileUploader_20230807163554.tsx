// FileUploader.tsx o FileUploader.jsx
import React from 'react';

function FileUploader({ onFileSelected }) {
  return (
    <div className="w-full lg:w-3/4 xl:w-2/3 mx-auto">
            <label 
                className="block text-gray-700 font-medium mb-2" 
                htmlFor="file-upload">
                Cargar Archivo
            </label>
            <input 
                className="p-2 border rounded-md focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition duration-150"
                type="file" 
                id="file-upload"
                accept=".xlsx, .csv" 
                onChange={onFileSelected} 
            />
        </div>
    );
}

export default FileUploader;

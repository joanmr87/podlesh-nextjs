// pages/api/updatePhone.ts

import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { clientName, newPhone } = req.body;

    if (!clientName || !newPhone) {
      return res.status(400).json({ message: 'Nombre de cliente y nuevo teléfono son requeridos.' });
    }

    const filePath = path.join(process.cwd(), 'utils', 'guiaTelefonica.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileData);

    data[clientName] = newPhone;
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(200).json({ message: 'Número actualizado exitosamente.' });
  } else {
    res.status(405).json({ message: 'Método no permitido.' });
  }
};

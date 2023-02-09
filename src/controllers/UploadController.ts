/* eslint-disable no-console */
import { Request } from 'express';
import fs from 'fs';

import { FirebaseStorageService } from '../services/FirebaseStorageService';

const firebaseActive = process.env.firebaseActive === 'true';
const name_app = process.env.name_app || 'Sorveteria';

export async function uploadImage(data: any, columnImage: string, request: Request) {
  const storageService = new FirebaseStorageService();
  if (firebaseActive) {
    const nomeArquivo = `${name_app}_${Date.now()}`;
    data[columnImage] = (await storageService.uploadImage(nomeArquivo, request.file)) || '';
  } else {
    const nomeArquivo = `${Date.now()}_${request.file.originalname}`;
    const base64 = request.file.buffer.toString('base64');
    fs.writeFile(`./src/uploads/images/${nomeArquivo}`, base64, 'base64', err => {
      if (err) console.log('Error upload image repository ->', err.message);
    });
    data[columnImage] = `uploads/images/${nomeArquivo}` || '';
  }
  return data[columnImage];
}

export async function removeImage(id: number, entitie: any, columnImage: string) {
  const storageService = new FirebaseStorageService();
  if (entitie[columnImage]?.indexOf('http') !== -1)
    await storageService.deleteImage(entitie[columnImage]);
  else
    fs.unlink(`src/${entitie[columnImage]}`, err => {
      if (err) console.log('Error deleted image repository ->', err.message);
    });
}

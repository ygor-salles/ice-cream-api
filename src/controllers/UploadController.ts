/* eslint-disable no-console */
import { Request } from 'express';
import fs from 'fs';

import { FirebaseStorageService } from '../services/FirebaseStorageService';
import { PurchaseService } from '../services/PurchaseService';

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

export async function removeImage(id: number, purchaseService: PurchaseService) {
  const storageService = new FirebaseStorageService();
  const purchaseFound = await purchaseService.readById(id);
  if (purchaseFound.nf_url.slice(0, 4) === 'http')
    await storageService.deleteImage(purchaseFound.nf_url);
  else
    fs.unlink(purchaseFound.nf_url, err => {
      if (err) console.log('Error deleted image repository ->', err.message);
    });
}

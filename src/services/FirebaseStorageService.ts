/* eslint-disable no-console */
/* eslint-disable no-undef */
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'dotenv/config';
import { ApiError } from '../validators/Exceptions/ApiError';

firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  // measurementId: process.env.measurementId
});

const name_app = process.env.name_app || 'Sorveteria';
const folder_app = process.env.folder_app || 'sorveteria';

class FirebaseStorageService {
  private storageRef = firebase.app().storage().ref();

  async uploadImage(name: string, arquivo: Express.Multer.File) {
    try {
      const encoded = arquivo.buffer.toString('base64');
      const base64 = `data:${arquivo.mimetype};base64,${encoded}`;
      const response = await this.storageRef
        .child(`${folder_app}/${name}`)
        .putString(base64, 'data_url');
      return await response.ref.getDownloadURL();
    } catch (err: any) {
      console.log(err.message || 'Falha ao enviar imagem para o Firebase');
      return null;
    }
  }

  async deleteImage(urlImage: string) {
    const name_organization = `${name_app}_`;
    const start = urlImage.indexOf(name_organization) + name_organization.length;
    const dataImg = urlImage.substring(start, start + 13);

    try {
      await this.storageRef.child(`${folder_app}/${name_organization}${dataImg}`).delete();
    } catch (err: any) {
      console.log(err.message || 'Falha ao deletar imagem do Firebase');
    }
  }

  async getImageUrl(nameFile: string) {
    try {
      return await this.storageRef.child(`${folder_app}/${nameFile}`).getDownloadURL();
    } catch (err: any) {
      console.log(err.message || 'Falha ao visualizar imagem do Firebase');
      return null;
    }
  }
}

export { FirebaseStorageService };

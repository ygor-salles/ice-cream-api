"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeImage = exports.uploadImage = void 0;
const fs_1 = __importDefault(require("fs"));
const FirebaseStorageService_1 = require("../services/FirebaseStorageService");
const firebaseActive = process.env.firebaseActive === 'true';
const name_app = process.env.name_app || 'Sorveteria';
async function uploadImage(data, columnImage, request) {
    const storageService = new FirebaseStorageService_1.FirebaseStorageService();
    if (firebaseActive) {
        const nomeArquivo = `${name_app}_${Date.now()}`;
        data[columnImage] = (await storageService.uploadImage(nomeArquivo, request.file)) || '';
    }
    else {
        const nomeArquivo = `${Date.now()}_${request.file.originalname}`;
        const base64 = request.file.buffer.toString('base64');
        fs_1.default.writeFile(`./src/uploads/images/${nomeArquivo}`, base64, 'base64', err => {
            if (err)
                console.log('Error upload image repository ->', err.message);
        });
        data[columnImage] = `uploads/images/${nomeArquivo}` || '';
    }
    return data[columnImage];
}
exports.uploadImage = uploadImage;
async function removeImage(id, entitie, columnImage) {
    const storageService = new FirebaseStorageService_1.FirebaseStorageService();
    if (entitie[columnImage] && entitie[columnImage].indexOf('http') !== -1) {
        await storageService.deleteImage(entitie[columnImage]);
    }
    else if (entitie[columnImage]) {
        fs_1.default.unlink(`src/${entitie[columnImage]}`, err => {
            if (err)
                console.log('Error deleted image repository ->', err.message);
        });
    }
}
exports.removeImage = removeImage;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOAD_IMAGE = void 0;
const multer_1 = __importDefault(require("multer"));
const UPLOAD_IMAGE = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { files: 1024 * 1024 * 10 },
    fileFilter: (request, file, cb) => {
        const extensionImage = [
            'image/png',
            'image/jpg',
            'image/jpeg',
            'image/pjpeg',
            'image/gif',
            'image/svg+xml',
        ].find(formAccept => formAccept === file.mimetype);
        if (extensionImage) {
            cb(null, true);
        }
        cb(null, false);
    },
});
exports.UPLOAD_IMAGE = UPLOAD_IMAGE;

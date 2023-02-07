import multer from 'multer';

const UPLOAD_IMAGE = multer({
  storage: multer.memoryStorage(),
  limits: { files: 1024 * 1024 * 10 }, // 10 MB
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

export { UPLOAD_IMAGE };

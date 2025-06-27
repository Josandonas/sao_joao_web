/**
 * Middleware para upload de arquivos
 * Utiliza Multer para gerenciar uploads de imagens e vídeos
 */

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { AppError } = require('./errorHandler');

// Configuração de armazenamento para imagens
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../public/images');
    
    // Criar diretório se não existir
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Gerar nome de arquivo único com timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Configuração de armazenamento para vídeos
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../public/videos');
    
    // Criar diretório se não existir
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Gerar nome de arquivo único com timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Filtro para validar tipos de arquivo de imagem
const imageFileFilter = (req, file, cb) => {
  // Aceitar apenas imagens
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Tipo de arquivo não suportado. Apenas imagens JPEG, PNG, GIF e WEBP são permitidas.', 400), false);
  }
};

// Filtro para validar tipos de arquivo de vídeo
const videoFileFilter = (req, file, cb) => {
  // Aceitar apenas vídeos
  const allowedMimeTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Tipo de arquivo não suportado. Apenas vídeos MP4, WEBM, MOV e AVI são permitidos.', 400), false);
  }
};

// Configuração do Multer para upload de imagens
const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Configuração do Multer para upload de vídeos
const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: videoFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  }
});

/**
 * Middleware para tratamento de erros do Multer
 */
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(new AppError('Arquivo muito grande. Tamanho máximo permitido: 5MB para imagens e 50MB para vídeos.', 400));
    }
    return next(new AppError(`Erro no upload de arquivo: ${err.message}`, 400));
  }
  next(err);
};

module.exports = {
  uploadImage,
  uploadVideo,
  handleMulterError
};

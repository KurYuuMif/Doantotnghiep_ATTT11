import express from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/authMiddleware.js';
import { uploadFile, getUserFiles, deleteFile, downloadFile } from '../controllers/fileController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authenticate, upload.single('file'), uploadFile);
router.get('/my-files', authenticate, getUserFiles);
router.delete('/delete/:id', authenticate, deleteFile);
router.get('/download/:id', authenticate, downloadFile);

export default router;
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import fileRoutes from './routes/files.js';
import keyRoutes from './routes/keys.js';
import { connectDB } from './models/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.use('/auth', authRoutes);
app.use('/files', fileRoutes);
app.use('/keys', keyRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

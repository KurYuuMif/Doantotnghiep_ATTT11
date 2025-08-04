import fs from 'fs';
import path from 'path';
import { db } from '../models/db.js';
import { encryptFile } from '../services/encryptFile.js';
import { decryptFile } from '../services/decryptFile.js';
const uploadDir = path.resolve('uploads');

// 1. Upload file
export const uploadFile = async (req, res) => {
  const { keyId } = req.body;
  const file = req.file;

  const [keyRows] = await db.execute(
    'SELECT * FROM ckeys WHERE key_id = ? AND user_id = ?',
    [keyId, req.user.id]
  );
  if (!keyRows.length) return res.status(403).send('Invalid key');

  const key = keyRows[0].key_value;
  const encryptedPath = `${uploadDir}/${file.filename}.enc`;
  await encryptFile(file.path, encryptedPath, key);

  await db.execute(
    'INSERT INTO files (filename, path, user_id, key_id) VALUES (?, ?, ?, ?)',
    [file.originalname, encryptedPath, req.user.id, keyId]
  );
  fs.unlinkSync(file.path);
  res.status(201).send('✅ File uploaded and encrypted');
};

// 2. Get user's file list
export const getUserFiles = async (req, res) => {
  const [rows] = await db.execute(
  `SELECT f.id, f.filename, k.key_name 
  FROM files f 
  LEFT JOIN ckeys k ON f.key_id = k.key_id 
  WHERE f.user_id = ?`,
  [req.user.id]
  );
  res.json(rows);
};

// 3. Delete file by id
export const deleteFile = async (req, res) => {
  const id = req.params.id;
  const [rows] = await db.execute(
    'SELECT path FROM files WHERE id = ? AND user_id = ?',
    [id, req.user.id]
  );
  if (!rows.length) return res.status(404).send('File not found');

  fs.unlinkSync(rows[0].path);
  await db.execute('DELETE FROM files WHERE id = ?', [id]);
  res.send('File deleted');
};

// 4. Download file by id
export const downloadFile = async (req, res) => {
  const id = req.params.id;
  const [rows] = await db.execute(
    `SELECT f.filename, f.path, k.key_value 
    FROM files f 
    JOIN ckeys k ON f.key_id = k.key_id 
    WHERE f.id = ? AND f.user_id = ?`,
    [id, req.user.id]
  );
  if (!rows.length) return res.status(404).send('File or key not found');

  const decryptedPath = `${rows[0].path}.dec`;
  await decryptFile(rows[0].path, decryptedPath, rows[0].key_value);
  res.download(decryptedPath, rows[0].filename, () => fs.unlinkSync(decryptedPath));
};

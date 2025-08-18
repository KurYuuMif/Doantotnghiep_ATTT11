import fs from 'fs';
import path from 'path';
import { getDB } from '../models/db.js';
import { encryptFile } from '../services/encryptFile.js';
import { decryptFile } from '../services/decryptFile.js';
const uploadDir = path.resolve('uploads');

export const uploadFile = async (req, res) => {
  const db = getDB();
  const { keyId } = req.body;
  const file = req.file;

  const [keyRows] = await db.execute(
    'SELECT * FROM ckeys WHERE key_id = ? AND user_id = ?',
    [keyId, req.user.id]
  );
  if (!keyRows.length) return res.status(403).send('Invalid key');

  const key = keyRows[0].key_value;
  const encryptedPath = `${uploadDir}/${file.filename}.enc`;

  const originalSize = fs.statSync(file.path).size; // bytes
  const sizeInMB = (originalSize / (1024 * 1024)).toFixed(2); //bytes to MB

  const startTime = Date.now();
  await encryptFile(file.path, encryptedPath, key);
  const encryptionTime = ((Date.now() - startTime) / 1000).toFixed(2); // giây

  await db.execute(
    'INSERT INTO files (filename, path, user_id, key_id, time, size) VALUES (?, ?, ?, ?, ?, ?)',
    [file.originalname, encryptedPath, req.user.id, keyId, encryptionTime, sizeInMB]
  );
  fs.unlinkSync(file.path);

  res.status(201).json({
    message: '✅ File đã được tải lên và mã hóa thành công!',
    size: sizeInMB + ' MB',
    encryptionTime: encryptionTime + ' giây'
  });
};


export const getUserFiles = async (req, res) => {
  const db = getDB();
  const [rows] = await db.execute(
    `SELECT f.id, f.filename, k.key_name, f.time, f.size
     FROM files f 
     LEFT JOIN ckeys k ON f.key_id = k.key_id 
     WHERE f.user_id = ?`,
    [req.user.id]
  );
  res.json(rows);
};

export const deleteFile = async (req, res) => {
  const db = getDB();
  const id = req.params.id;
  const [rows] = await db.execute(
    'SELECT path FROM files WHERE id = ? AND user_id = ?',
    [id, req.user.id]
  );
  if (!rows.length) return res.status(404).send('Không tìm thấy file');

  fs.unlinkSync(rows[0].path);
  await db.execute('DELETE FROM files WHERE id = ?', [id]);
  res.send('File đã được xóa thành công');
};

export const downloadFile = async (req, res) => {
  const db = getDB();
  const id = req.params.id;
  const [rows] = await db.execute(
    `SELECT f.filename, f.path, k.key_value 
     FROM files f 
     JOIN ckeys k ON f.key_id = k.key_id 
     WHERE f.id = ? AND f.user_id = ?`,
    [id, req.user.id]
  );
  if (!rows.length) return res.status(404).send('Không tìm thấy file hoặc key');

  const decryptedPath = `${rows[0].path}.dec`;

  const startTime = Date.now();

  await decryptFile(rows[0].path, decryptedPath, rows[0].key_value);

  const decryptionTime = ((Date.now() - startTime) / 1000).toFixed(2);

  res.setHeader('X-Decryption-Time', decryptionTime);

  res.download(decryptedPath, rows[0].filename, () => fs.unlinkSync(decryptedPath));
};

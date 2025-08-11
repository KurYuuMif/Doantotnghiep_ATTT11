import { getDB } from '../models/db.js';

export const getKeys = async (req, res) => {
  const db = getDB();
  const [rows] = await db.execute('SELECT key_id, key_name, key_value FROM ckeys WHERE user_id = ?', [req.user.id]);
  res.json(rows);
};

export const createKey = async (req, res) => {
  const db = getDB();
  const { key_name } = req.body;
  const userId = req.user?.id;
  const key_value = generateRandomKey(16);

  try {
    await db.execute(
      'INSERT INTO ckeys (user_id, key_name, key_value) VALUES (?, ?, ?)',
      [userId, key_name, key_value]
    );
    res.status(201).send('Tạo khóa thành công');
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi database');
  }
};

function generateRandomKey(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < length; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

export const deleteKey = async (req, res) => {
  const db = getDB();
  const keyId = req.params.id;
  const userId = req.user?.id;

  try {
    const [rows] = await db.execute('SELECT key_name, key_value FROM ckeys WHERE key_id = ? AND user_id = ?', [keyId, userId]);
    if (!rows.length) return res.status(404).send('Không tìm thấy key');

    await db.execute('DELETE FROM ckeys WHERE key_id = ? AND user_id = ?', [keyId, userId]);
    res.send('Key đã được xóa thành công');
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi database');
  }
};

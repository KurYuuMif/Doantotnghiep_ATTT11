import { db } from '../models/db.js';


// 1. Get all keys for the user
export const getKeys = async (req, res) => {
  const [rows] = await db.execute('SELECT key_id, key_name, key_value FROM ckeys WHERE user_id = ?', [req.user.id]);
  res.json(rows);
};

// 2. Create a new key
export const createKey = async (req, res) => {
  const { key_name } = req.body;
  const userId = req.user?.id;
  const key_value = generateRandomKey(16);

  // console.log('key_name:', key_name);
  // console.log('user id:', userId);
  // console.log('key_value:', key_value);

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

//Function to generate a random key
function generateRandomKey(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < length; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

// 3. Delete a key by ID
export const deleteKey = async (req, res) => {
  const keyId = req.params.id;
  const userId = req.user?.id;

  // console.log('keyId:', keyId);
  // console.log('userId:', userId);

  try {
    const [rows] = await db.execute('SELECT key_name, key_value FROM ckeys WHERE key_id = ? AND user_id = ?', [keyId, userId]);
    if (!rows.length) return res.status(404).send('Không tìm thấy key');

    await db.execute('DELETE FROM ckeys WHERE key_id = ? AND user_id = ?', [keyId, userId]);
    res.send('Key đã được xóa thành công');

  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi database');
  }
}
import fs from 'fs';
import { rrpbaesDecryptBlock } from './rrpbaes_decrypt.js';

export async function decryptFile(inputPath, outputPath, keyText) {
  const BLOCK_SIZE = 16;
  const input = fs.readFileSync(inputPath);

  // Đọc 4 byte đầu để lấy độ dài thật
  const originalLength = input.readUInt32BE(0);
  const encryptedData = input.slice(4);
  const output = Buffer.alloc(encryptedData.length);

  const key = Buffer.alloc(16, 0);
  Buffer.from(keyText).copy(key); // copy tối đa 16 byte

  for (let i = 0; i < encryptedData.length; i += BLOCK_SIZE) {
    const block = Buffer.alloc(BLOCK_SIZE);
    encryptedData.copy(block, 0, i, i + BLOCK_SIZE);
    const decrypted = rrpbaesDecryptBlock(block, key);
    decrypted.copy(output, i);
  }

  // Ghi ra file đúng độ dài gốc
  fs.writeFileSync(outputPath, output.slice(0, originalLength));
}

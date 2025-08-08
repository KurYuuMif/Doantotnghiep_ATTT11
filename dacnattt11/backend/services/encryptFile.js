import fs from 'fs';
import { rrpbaesEncryptBlock } from './rrpbaes_encrypt.js';

export async function encryptFile(inputPath, outputPath, keyText) {
  const BLOCK_SIZE = 16;
  const input = fs.readFileSync(inputPath); // đọc toàn bộ file (binary)
  const fileLength = input.length; // độ dài gốc
  const paddedLength = Math.ceil(fileLength / BLOCK_SIZE) * BLOCK_SIZE;
  const output = Buffer.alloc(paddedLength);

  const key = Buffer.alloc(16, 0);
  Buffer.from(keyText).copy(key); // copy tối đa 16 byte

  for (let i = 0; i < paddedLength; i += BLOCK_SIZE) {
    const block = Buffer.alloc(BLOCK_SIZE, 0);
    input.copy(block, 0, i, i + BLOCK_SIZE); // tự động padding bằng 0 nếu thiếu
    const encrypted = rrpbaesEncryptBlock(block, key);
    encrypted.copy(output, i);
  }

  // Ghi độ dài gốc (4 byte đầu)
  const header = Buffer.alloc(4);
  header.writeUInt32BE(fileLength); // Big-endian
  const finalOutput = Buffer.concat([header, output]);

  fs.writeFileSync(outputPath, finalOutput);
}

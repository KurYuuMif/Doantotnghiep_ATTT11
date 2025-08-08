import crypto from 'crypto';

// Hoán vị bit (BitPermutation) 
function bitPermutation(block) {
  const perm = [2, 0, 1, 3, 6, 4, 5, 7, 10, 8, 9, 11, 14, 12, 13, 15];
  const result = Buffer.alloc(16);
  for (let i = 0; i < 16; i++) {
    result[i] = block[perm[i]];
  }
  return result;
}

// AddRoundKey – XOR block với khóa
function addRoundKey(block, key) {
  const result = Buffer.alloc(16);
  for (let i = 0; i < 16; i++) {
    result[i] = block[i] ^ key[i];
  }
  return result;
}

// SubBytes + ShiftRows
function subBytesShiftRows(block, key) {
  const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
  cipher.setAutoPadding(false);
  return cipher.update(block);
}

// Hàm mã hóa block theo sơ đồ RRPBAES
export function rrpbaesEncryptBlock(block, key) {
  let state = Buffer.from(block);

  // Round 1: AddRoundKey
  state = addRoundKey(state, key);

  // Rounds 2–5: SubBytes → ShiftRows → BitPermutation → AddRoundKey
  for (let i = 0; i < 4; i++) {
    state = subBytesShiftRows(state, key);
    state = bitPermutation(state);
    state = addRoundKey(state, key);
  }

  // Round 6: SubBytes → ShiftRows → AddRoundKey
  state = subBytesShiftRows(state, key);
  state = addRoundKey(state, key);

  return state;
}



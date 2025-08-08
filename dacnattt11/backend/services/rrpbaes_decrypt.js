import crypto from 'crypto';

// Hoán vị ngược (Inverse BitPermutation)
function inverseBitPermutation(block) {
  const perm = [2, 0, 1, 3, 6, 4, 5, 7, 10, 8, 9, 11, 14, 12, 13, 15];
  const invPerm = new Array(16);
  for (let i = 0; i < 16; i++) {
    invPerm[perm[i]] = i;
  }
  const result = Buffer.alloc(16);
  for (let i = 0; i < 16; i++) {
    result[i] = block[invPerm[i]];
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

// SubBytes + ShiftRows ngược 
function inverseSubBytesShiftRows(block, key) {
  const decipher = crypto.createDecipheriv('aes-128-ecb', key, null);
  decipher.setAutoPadding(false);
  return decipher.update(block);
}

// Hàm giải mã block theo sơ đồ RRPBAES
export function rrpbaesDecryptBlock(block, key) {
  let state = Buffer.from(block);

  // Round 6: Inverse AddRoundKey → Inverse SubBytes + ShiftRows
  state = addRoundKey(state, key);
  state = inverseSubBytesShiftRows(state, key);

  // Rounds 5–2: Inverse AddRoundKey → Inverse BitPermutation → Inverse SubBytes + ShiftRows
  for (let i = 0; i < 4; i++) {
    state = addRoundKey(state, key);
    state = inverseBitPermutation(state);
    state = inverseSubBytesShiftRows(state, key);
  }

  // Round 1: Inverse AddRoundKey
  state = addRoundKey(state, key);

  return state;
}

Công nghệ sử dụng
- Backend: 
    Node.js
    Express.js
- Frontend: 
    ReactJS
    Axios 
- Auth:
    bcryptjs (hashing)
    jsonwebtoken (JWT)
- File upload: Multer
- Quản lí biến môi trường: dotenv
- Database: MySQL
  
Thuật toán RRPBA (Reduced-Round Permutation-Based AES)
- Giảm vòng lặp (6 rounds).
- Bit Permutation: hoán vị bit trong từng byte theo bảng cố định.
- Kết hợp với XOR và sử dụng precomputed results để tăng tính ngẫu nhiên và tốc độ.
- Vẫn dùng chế độ Cipher Block Chaining (CBC) như AES.

Back http://localhost:3000 - Front http://localhost:3001
cd frontend > npm start - cd backend  > node index.js

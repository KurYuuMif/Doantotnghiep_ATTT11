export default function Home() {
  return (
  <div>
  <h1 className="text-2xl font-bold mb-4">Đồ án chuyên ngành - ATTT11: Xây dựng ứng dụng mã hóa tập tin lớn bằng thuật toán mã hóa AES mở rộng</h1>
  <h2 className="text-xl font-semibold mt-4"> Giảng viên hướng dẫn: Thạc sĩ Pham Tuấn Khiêm </h2>
  <h2 className="text-xl font-semibold mt-4"> Sinh viên thực hiện </h2>
    <ul className="list-disc ml-6 text-gray-700">
    <li><strong>2033210426</strong> - Nguyễn Đình Phát</li>
    <li><strong>2033216454</strong> - Nguyễn Hoàng Minh Khoa</li>
    </ul>
  <h2 className="text-xl font-semibold mt-4">Công nghệ sử dụng</h2>
  <ul className="list-disc ml-6 text-gray-700">
    <li><strong>Backend:</strong> Node.js, Express.js</li>
    <li><strong>Frontend:</strong> ReactJS, Axios</li>
    <li><strong>Auth:</strong> bcryptjs (hashing), jsonwebtoken (JWT)</li>
    <li><strong>File upload:</strong> Multer</li>
    <li><strong>Quản lí biến môi trường:</strong> dotenv</li>
    <li><strong>Database:</strong> MySQL</li>
  </ul>

  <h2 className="text-xl font-semibold mt-4">
    Thuật toán RRPBA (Reduced-Round Permutation-Based AES)
  </h2>
  <ul className="list-disc ml-6 text-gray-700">
    <li>Giảm vòng lặp (6 rounds).</li>
    <li>Bit Permutation: hoán vị bit trong từng byte theo bảng cố định.</li>
    <li>Kết hợp với XOR và sử dụng precomputed results để tăng tính ngẫu nhiên và tốc độ.</li>
    <li>Vẫn dùng chế độ Cipher Block Chaining (CBC) như AES.</li>
  </ul>

  <h2 className="text-xl font-semibold mt-4">
    Các tính năng chính
  </h2>
  <ul className="list-disc ml-6 text-gray-700">
    <li>Đăng nhập, đăng ký tài khoản.</li>
    <li>Upload, Download kết hợp với mã hóa sử dụng thuật toán RRPBA các loại file phổ biến như text, âm thành, video,...</li>
    <li>Tạo keys với tên tùy chỉnh, giá trị keys sinh ngẫu nhiên 16 kí tự</li>
    <li>Quản lý keys: xem, xóa keys đã tạo.</li>
    <li>Quản lý file: xem danh sách file đã upload, xóa file.</li>
  </ul>
</div>
  );
}
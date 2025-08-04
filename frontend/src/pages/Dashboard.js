import { Link } from 'react-router-dom';
export default function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-xl">Dashboard</h1>
      <ul className="list-disc ml-6">
        <li><Link to="/upload">Upload File</Link></li>
        <li><Link to="/files">File Manager</Link></li>
        <li><Link to="/keys">Key Manager</Link></li>
      </ul>
    </div>
  );
}
import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">

      <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-lg font-bold mb-6">
          <Link to="/dashboard">Dashboard</Link>
        </h2>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard/upload" className="hover:bg-gray-700 p-2 rounded">
            Upload File
          </Link>
          <Link to="/dashboard/files" className="hover:bg-gray-700 p-2 rounded">
            File Manager
          </Link>
          <Link to="/dashboard/keys" className="hover:bg-gray-700 p-2 rounded">
            Key Manager
          </Link>
        </nav>
      </div>

      <div className="flex-1 bg-gray-300 p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

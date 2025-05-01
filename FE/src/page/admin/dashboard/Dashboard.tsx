import { useState } from "react";
import Sidebar from "../components/sidebar";
import Header_admin from "../components/header_admin";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Quản lý trạng thái mở/đóng Sidebar

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Đảo trạng thái Sidebar
  };

  return (
    <>
<div className="flex min-h-screen">
        {/* Sidebar */}
        <div
          className={`bg-black_admin text-white_admin transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-0"
            } overflow-hidden`}
        >
          <Sidebar />
        </div>


        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Header_admin onToggleSidebar={handleToggleSidebar} />
          <div className="p-8">
            <h1 className="text-2xl font-bold">Dashboard Page</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
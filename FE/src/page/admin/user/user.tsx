import Sidebar from "../components/sidebar";
import Header_admin from "../components/header_admin";
import { useState } from "react";
import { users,userStatusColor } from "./const_user";
import { FaSort, FaSearch } from "react-icons/fa"; // Import icon sắp xếp

import "react-datepicker/dist/react-datepicker.css";
function User() {
  // sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  const [usersList, setUsersList] = useState(users);

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;


  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };


  const sortedDevices = [...usersList].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const order = direction === "asc" ? 1 : -1;
    const valA = a[key as keyof typeof a];
    const valB = b[key as keyof typeof b];
    return (valA < valB ? -1 : valA > valB ? 1 : 0) * order;
  });

  const totalPages = Math.ceil(sortedDevices.length / entriesPerPage);
  const paginatedDevices = sortedDevices.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
// tim kiem
  const [searchQuery, setSearchQuery] = useState("");

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setUsersList(filteredUsers);
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
        <div className={`flex-1 flex flex-col min-h-screen overflow-auto transition-all duration-300 `}>

          <Header_admin onToggleSidebar={handleToggleSidebar} />
          <div className="pb-4 pl-8 pr-8 font-sans  ">
            <div className="flex items-center justify-between  bg-gray-50 p-4 rounded-lg ">
              <div className="flex items-center ">
                <h1 className="text-2xl font-bold ">Danh sách người dùng</h1>
              </div>

              <div className="flex flex-wrap items-center gap-4 justify-end">
                
              <form onSubmit={handleSearch}>
  <div className="relative  ">
    <input
      type="text"
      placeholder="Nhập từ khóa tìm kiếm"
      required
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-[330px] pl-12 pt-3 pb-3 border border-gray-300 rounded-full text-black text-base"
    />
    <i className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base">
      <FaSearch />
    </i>
  </div>
</form>
              </div>


            </div>
          </div>


          <div className="flex flex-grow pl-8 pr-8 justify-center  items-start font-sans">

            {/* --- Container chính cho Filter và Bảng --- */}
            <div className="flex flex-col md:flex-row gap-8 items-start font-sans w-full max-w-[1200px] ">
              {/* --- Table Column --- */}
              <div className="flex-grow flex flex-col  ">
                {/* Header của bảng */}
                <div className="grid grid-cols-8  gap-4 p-4 h-16 text-sm font-semibold bg-[#F8FAFC] rounded-t-lg border border-gray-300 text-gray-600 items-center">
                  <div className="text-center">Tên ID</div>
                  <div
                    onClick={() => handleSort("fullName")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Họ và tên <FaSort className="ml-2" />
                  </div>
                  <div
                    onClick={() => handleSort("studentId")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Mã số sinh viên <FaSort className="ml-2" />
                  </div>

                  <div
                    onClick={() => handleSort("email")}
                    className="cursor-pointer flex items-center justify-center col-span-2"
                  >
                    Địa chỉ email <FaSort className="ml-2" />
                  </div>
                  <div
                    onClick={() => handleSort("status")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Trạng thái <FaSort className="ml-2" />
                  </div>
                  <div
                    className="cursor-pointer flex items-center justify-center col-span-2"
                  >
                    Thao tác
                  </div>
                </div>
               
                {/* Nội dung của bảng */}
                <div className="pl-4 pr-4 bg-white rounded-b-lg shadow-md border border-gray-300 border-t-0">
                  {paginatedDevices.map((user) => (
                    <div
                      key={user.id}
                      className="grid grid-cols-8 gap-4 py-4 border-b last:border-b-0 items-center"
                    >
                      <div className="text-center font-medium">ID {user.id}</div>
                      <div className="text-left">{user.fullName}</div>
                      <div className="text-center">{user.studentId}</div>
                      <div className="text-center col-span-2">{user.email}</div>

                      <div className="text-center">
                        <button
                          className={`px-2 py-1 rounded-md text-sm font-medium ${userStatusColor[user.status as keyof typeof userStatusColor] || "bg-gray-300 text-black"
                            }`}
                          disabled
                        >
                          {user.status}
                        </button>
                      </div>

                      <div className="flex justify-center items-center gap-2 col-span-2">
                      <button
                          className="button3 "
                          style={{
                            padding: "8px 16px", // Điều chỉnh khoảng cách bên trong nút
                            height: "40px", // Chiều cao cố định
                            width: "90px", // Chiều rộng tự động theo nội dung
                            backgroundColor: "rgb(37, 99, 235)",
                          }}
                        >
                          Mở khóa
                        </button>
                        <button
                          className="button3 "
                          style={{
                            padding: "8px 16px", // Điều chỉnh khoảng cách bên trong nút
                            height: "40px", // Chiều cao cố định
                            width: "90px", // Chiều rộng tự động theo nội dung
                          }}
                        >
                          Xóa quyền
                        </button>
                      </div>
                    </div>
                  ))}
                </div>


                <div className="flex justify-between items-center mt-5 px-2 text-sm text-gray-600">

                  {/* Hiển thị số lượng entries */}
                  <div>
                    Show{" "}
                    {Math.min(
                      (currentPage - 1) * entriesPerPage + 1,
                      sortedDevices.length
                    )}{" "}
                    to {Math.min(currentPage * entriesPerPage, sortedDevices.length)}{" "}
                    of {sortedDevices.length} entries
                  </div>
                  {/* Pagination */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 border rounded-md ${currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white"
                        }`}
                    >
                      &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-1 border rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"
                          }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-white"
                        }`}
                    >
                      &gt;
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default User;
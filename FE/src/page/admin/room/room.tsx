import Sidebar from "../components/sidebar";
import Header_admin from "../components/header_admin";
import { useState } from "react";
import { roomStatusColor, rooms, bookingStatusColor } from "./const_room";
import { FaSort, FaCaretDown, FaInfoCircle } from "react-icons/fa"; // Import icon sắp xếp

import "react-datepicker/dist/react-datepicker.css";
function User() {
  // sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  const [roomsList] = useState(rooms);

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;


  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };


  const sortedDevices = [...roomsList].sort((a, b) => {
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
                <h1 className="text-2xl font-bold ">Danh sách phòng</h1>
              </div>

              <div className="flex flex-wrap items-center gap-4 justify-end">
                <button className="buttondrop">
                  Cơ sở <FaCaretDown style={{ marginLeft: "5px" }} />
                </button>

                <button className="buttondrop">
                  Tòa <FaCaretDown style={{ marginLeft: "5px" }} />
                </button>

                <button className="buttondrop">
                  Phòng <FaCaretDown style={{ marginLeft: "5px" }} />
                </button>
              </div>


            </div>
          </div>


          <div className="flex flex-grow pl-8 pr-8 justify-center  items-start font-sans">

            {/* --- Container chính cho Filter và Bảng --- */}
            <div className="flex flex-col md:flex-row gap-8 items-start font-sans w-full max-w-[1100px] ">
              {/* --- Table Column --- */}
              <div className="flex-grow flex flex-col  ">
                {/* Header của bảng */}
                <div className="grid grid-cols-6  gap-4 p-4 h-16 text-sm font-semibold bg-[#F8FAFC] rounded-t-lg border border-gray-300 text-gray-600 items-center">
                  <div className="text-center">Tên ID</div>
                  <div
                    onClick={() => handleSort("roomNumber")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Số phòng <FaSort className="ml-2" />
                  </div>
                  <div
                    onClick={() => handleSort("bookingStatus")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Trạng thái sử dụng <FaSort className="ml-2" />
                  </div>

                  <div
                    onClick={() => handleSort("roomStatus")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Trạng thái hoạt động <FaSort className="ml-2" />
                  </div>

                  <div
                    className="cursor-pointer flex items-center justify-center col-span-2"
                  >
                    Thao tác
                  </div>
                </div>
               
                {/* Nội dung của bảng */}
                <div className="pl-4 pr-4 bg-white rounded-b-lg shadow-md border border-gray-300 border-t-0">
                  {paginatedDevices.map((room) => (
                    <div
                      key={room.id}
                      className="grid grid-cols-6 gap-4 py-4 border-b last:border-b-0 items-center"
                    >
                      <div className="text-center font-medium">ID {room.id}</div>
                      <div className="text-center">{room.roomNumber}</div>

                      
                      <div className="text-center">
                        <button
                          className={`px-2 py-1 rounded-md text-sm font-medium ${bookingStatusColor[room.bookingStatus as keyof typeof bookingStatusColor] || "bg-gray-300 text-black"
                            }`}
                          disabled
                        >
                          {room.bookingStatus}
                        </button>
                      </div>
                      <div className="text-center">
                        <button
                          className={`px-2 py-1 rounded-md text-sm font-medium ${roomStatusColor[room.roomStatus as keyof typeof roomStatusColor] || "bg-gray-300 text-black"
                            }`}
                          disabled
                        >
                          {room.roomStatus}
                        </button>
                      </div>
                      <div className="flex justify-center items-center gap-2 col-span-2">
                      <button
                          className="button3 "
                          style={{
                            padding: "8px 16px", // Điều chỉnh khoảng cách bên trong nút
                            height: "40px", // Chiều cao cố định
                            width: "100px", // Chiều rộng tự động theo nội dung
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
                            width: "100px", // Chiều rộng tự động theo nội dung
                          }}
                        >
                          Khóa phòng
                        </button>
                        <FaInfoCircle className="ml-4 text-gray-500 text-xl cursor-pointer" title="Chi tiết" />

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
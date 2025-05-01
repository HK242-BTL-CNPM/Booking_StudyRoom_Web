import Sidebar from "../components/sidebar";
import Header_admin from "../components/header_admin";
import { useState } from "react";
import { roomStatusColor, rooms, bookingStatusColor } from "./const_room";
import { FaSort, FaInfoCircle } from "react-icons/fa"; // Import icon sắp xếp
import Select from "react-select"; // Import Select component
import { csOptions, toaOptionsByCs } from "./Options";

import "react-datepicker/dist/react-datepicker.css";



// Define custom styles for react-select
const customStyles = {
  placeholder: (provided: any) => ({
    ...provided,
    color: "#1D4ED8",
    fontWeight: 500,
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
  control: (provided: any) => ({
    ...provided,
    borderRadius: 8,
    padding: "2px 4px",
  }),
};
function Room() {
  // sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);


  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;


  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const [selectedCs, setSelectedCs] = useState<string | null>(null);
  const [selectedToa, setSelectedToa] = useState<string | null>(null);
  const toaOptions = selectedCs ? toaOptionsByCs[selectedCs] : [];

  const filterRooms = () => { 
    let filteredRooms = rooms;
    
    if (selectedToa) {
      filteredRooms = filteredRooms.filter((room) =>
        room.roomNumber.startsWith(selectedToa)
      );
    }
    return filteredRooms;
  };
  
  const filteredRooms = filterRooms();
  
  const sortedDevices = [...filteredRooms].sort((a, b) => {
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

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const openPopup = (room: any) => {
    setSelectedRoom(room); // Lưu thông tin phòng được chọn
    setIsPopupOpen(true); // Hiển thị popup
  };
  
  const closePopup = () => {
    setIsPopupOpen(false); // Đóng popup
    setSelectedRoom(null); // Xóa thông tin phòng
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
                <h1 className="text-2xl font-bold ">Danh sách phòng</h1>
              </div>

              <div className="flex flex-row flex-wrap gap-3 justify-end px-16 pt-4">
            <Select
              className="w-36"
              styles={customStyles}
              placeholder="Cơ sở"
              options={csOptions}
              value={csOptions.find((c: { value: string }) => c.value === selectedCs) || null}
              onChange={(option) => {
                setSelectedCs(option?.value || null);
                setSelectedToa(null);
              }}
            />
            <Select
              className="w-36"
              styles={customStyles}
              placeholder="Toà"
              options={toaOptions}
              value={toaOptions.find((t: { value: string }) => t.value === selectedToa) || null}
              isDisabled={!selectedCs}
              onChange={(option) => {
                setSelectedToa(option?.value || null);
              }}
            />
            
          </div>


            </div>
          </div>


          <div className="flex flex-grow pl-8 pr-8 justify-center  items-start font-sans">

            {/* --- Container chính cho Filter và Bảng --- */}
            <div className="flex flex-col md:flex-row gap-8 items-start font-sans w-full max-w-[1100px] ">
              {/* --- Table Column --- */}
              <div className="flex-grow flex flex-col  ">
                {/* Header của bảng */}
                <div className="grid grid-cols-8  gap-4 p-4 h-16 text-sm font-semibold bg-[#F8FAFC] rounded-t-lg border border-gray-300 text-gray-600 items-center">
                  <div className="text-center">Tên ID</div>
                  <div
                    onClick={() => handleSort("cs")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Cơ sở <FaSort className="ml-2" />
                  </div>
                  <div
                    onClick={() => handleSort("toa")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Tòa <FaSort className="ml-2" />
                  </div>
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
                      className="grid grid-cols-8 gap-4 py-4 border-b last:border-b-0 items-center"
                    >
                      <div className="text-center font-medium">ID {room.id}</div>
                      <div className="text-center">{room.cs}</div>
                      <div className="text-center">{room.toa}</div>
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
                        <FaInfoCircle
  className="ml-4 text-gray-500 text-xl cursor-pointer"
  title="Chi tiết"
  onClick={() => openPopup(room)} // Mở popup với thông tin phòng
/>
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
      {isPopupOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg ">
      <h2 className="text-xl font-bold mb-4">Thông tin phòng</h2>
      {selectedRoom && (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-4">Phòng {selectedRoom.roomNumber}</h2>

    <div className="border-t border-b py-4 mb-6">
      <div className="grid grid-cols-5 gap-2 text-center">
        
        {/* LOẠI PHÒNG */}
        <div>
          
          <div className="text-sm font-medium text-gray-500">Loại Phòng</div>
          <div className="flex items-center">
  <span className="inline-flex items-center justify-center w-3 h-10 bg-gray-100 rounded-full mr-3">
    <i className="fas fa-users text-gray-600"></i> {/* Icon */}
  </span>
  <div className="text-base font-semibold">{selectedRoom.roomType || "Phòng họp nhóm"}</div> {/* Text */}
</div></div>

        {/* SỐ LƯỢNG */}
        <div>
          <div className="text-sm font-medium text-gray-500 mb-2">Số lượng</div>
          <div className="text-base font-semibold">{selectedRoom.capacity || "4 người"}</div>
        </div>

        {/* PHÒNG */}
        <div>
          <div className="text-sm font-medium text-gray-500 mb-2">Phòng</div>
          <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full">
            <i className="fas fa-map-marker-alt mr-2 text-gray-600"></i> 
            {selectedRoom.roomNumber || "H6-123, CS2"}
          </div>
        </div>

        {/* TRẠNG THÁI */}
        <div>
          <div className="text-sm font-medium text-gray-500 mb-2">Trạng thái</div>
          <div className="inline-flex items-center">
            <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
            <span className="text-green-500 font-semibold">{selectedRoom.roomStatus || "Trống"}</span>
          </div>
        </div>

        {/* THỜI GIAN */}
        <div>
          <div className="text-sm font-medium text-gray-500 mb-2">Thời gian đặt phòng</div>
          <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full">
            <i className="fas fa-clock mr-2 text-gray-600"></i> 
            {selectedRoom.bookingTime || "11:00 - 12:00"}
          </div>
        </div>

      </div>
    </div>

    {/* Danh sách thiết bị */}
    <div className="text-sm font-medium text-gray-700 mb-2">Danh sách Thiết bị:</div>
<div className="flex flex-wrap gap-4 text-gray-600">
  {selectedRoom.devices?.map((device: string, idx: number) => (
    <div key={idx} className="px-3 py-1 bg-gray-100 rounded-full">
      {device}
    </div>
  )) || (
    <>
      <div className="px-3 py-1 bg-gray-100 rounded-full">2x Máy lạnh</div>
      <div className="px-3 py-1 bg-gray-100 rounded-full">4x Đèn</div>
      <div className="px-3 py-1 bg-gray-100 rounded-full">1x Máy chiếu</div>
      <div className="px-3 py-1 bg-gray-100 rounded-full">8x Ổ cắm</div>
      <div className="px-3 py-1 bg-gray-100 rounded-full">1x Màn hình</div>
    </>
  )}
</div>


  </div>
)}

      <div className="flex justify-center mt-4">
        <button
          className="button2"
          onClick={closePopup}
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
}

export default Room;
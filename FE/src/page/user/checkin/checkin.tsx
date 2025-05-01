// import Sidebar from "../components/sidebar";
// import Header_admin from "../components/header_admin";
import Header from "../component/header"; // Adjust import path if needed
import Footer from "../component/footer"; // Adjust import path if needed
import { useState } from "react";
import { roomStatusColor, rooms, bookingStatusColor } from "./const_checkin";
import { FaSort, FaInfoCircle } from "react-icons/fa"; // Import icon sắp xếp
import Select from "react-select"; // Import Select component
// import { csOptions, toaOptionsByCs } from "./Options";

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
function Checkin() {
  // sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);


  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 3;


  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const [selectedCs, setSelectedCs] = useState<string | null>(null);
  const [selectedToa, setSelectedToa] = useState<string | null>(null);
  // const toaOptions = selectedCs ? toaOptionsByCs[selectedCs] : [];

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
    <><Header />
      <div className="flex">


        {/* Main Content */}
        <div className={`flex-1 flex flex-col  overflow-auto transition-all duration-300 `}>

          {/* <Header_admin onToggleSidebar={handleToggleSidebar} /> */}
          <div className="pb-4 pl-8 pr-8 font-sans  ">
            <div className="flex items-center justify-between  bg-gray-50 p-4 rounded-lg ">
              <div className="flex items-center ">
                <h1 className="text-2xl font-bold ">Checkin</h1>



              </div>
            </div>
          </div>


          <div className="flex flex-grow pl-8 pr-8 justify-center  items-start font-sans">

            {/* --- Container chính cho Filter và Bảng --- */}
            <div className="flex flex-col md:flex-row gap-8 items-start font-sans w-full max-w-[1100px] ">
              {/* --- Table Column --- */}
              <div className="flex-grow flex flex-col  ">
                {/* Header của bảng */}
                <div className="grid grid-cols-7  gap-4 p-4 h-16 text-sm font-semibold bg-[#F8FAFC] rounded-t-lg border border-gray-300 text-gray-600 items-center">
                  <div
                    onClick={() => handleSort("roomNumber")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Loại phòng <FaSort className="ml-2" />
                  </div>
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
                    onClick={() => handleSort("roomNumber")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Thời gian đặt <FaSort className="ml-2" />
                  </div>
                  <div
                    onClick={() => handleSort("roomNumber")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Ngày đặt <FaSort className="ml-2" />
                  </div>


                  <div
                    className="cursor-pointer flex items-center justify-center "
                  >
                    Thao tác
                  </div>
                </div>

                {/* Nội dung của bảng */}
                <div className="pl-4 pr-4 bg-white rounded-b-lg shadow-md border border-gray-300 border-t-0">
                  {paginatedDevices.map((room) => (
                    <div
                      key={room.id}
                      className="grid grid-cols-7 gap-4 py-4 border-b last:border-b-0 items-center"
                    >
                      <div className="text-center">{room.roomType}</div>

                      <div className="text-center">{room.cs}</div>
                      <div className="text-center">{room.toa}</div>
                      <div className="text-center">{room.roomNumber}</div>
                      <div className="text-center">{room.time}</div>
                      <div className="text-center">{room.date}</div>

                      <div className="flex justify-center items-center gap-2 ">
                        <button
                          className="button3 "
                          style={{
                            padding: "8px 16px", // Điều chỉnh khoảng cách bên trong nút
                            height: "40px", // Chiều cao cố định
                            width: "100px", // Chiều rộng tự động theo nội dung
                            backgroundColor: "rgb(37, 99, 235)",
                          }}
                        >
                          Checkin
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
      <div className="flex">


        {/* Main Content */}
        <div className={`flex-1 flex flex-col  overflow-auto transition-all duration-300 `}>

          {/* <Header_admin onToggleSidebar={handleToggleSidebar} /> */}
          <div className="pb-4 pl-8 pr-8 font-sans  ">
            <div className="flex items-center justify-between  bg-gray-50 p-4 rounded-lg ">
              <div className="flex items-center ">
                <h1 className="text-2xl font-bold ">Checkout</h1>



              </div>
            </div>
          </div>


          <div className="flex flex-grow pl-8 pr-8 justify-center  items-start font-sans">

            {/* --- Container chính cho Filter và Bảng --- */}
            <div className="flex flex-col md:flex-row gap-8 items-start font-sans w-full max-w-[1100px] ">
              {/* --- Table Column --- */}
              <div className="flex-grow flex flex-col  ">
                {/* Header của bảng */}
                <div className="grid grid-cols-7  gap-4 p-4 h-16 text-sm font-semibold bg-[#F8FAFC] rounded-t-lg border border-gray-300 text-gray-600 items-center">
                  <div
                    onClick={() => handleSort("roomNumber")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Loại phòng <FaSort className="ml-2" />
                  </div>
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
                    onClick={() => handleSort("roomNumber")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Thời gian đặt <FaSort className="ml-2" />
                  </div>
                  <div
                    onClick={() => handleSort("roomNumber")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Ngày đặt <FaSort className="ml-2" />
                  </div>


                  <div
                    className="cursor-pointer flex items-center justify-center "
                  >
                    Thao tác
                  </div>
                </div>

                {/* Nội dung của bảng */}
                <div className="pl-4 pr-4 bg-white rounded-b-lg shadow-md border border-gray-300 border-t-0">
                  {paginatedDevices.map((room) => (
                    <div
                      key={room.id}
                      className="grid grid-cols-7 gap-4 py-4 border-b last:border-b-0 items-center"
                    >
                      <div className="text-center">{room.roomType}</div>

                      <div className="text-center">{room.cs}</div>
                      <div className="text-center">{room.toa}</div>
                      <div className="text-center">{room.roomNumber}</div>
                      <div className="text-center">{room.time}</div>
                      <div className="text-center">{room.date}</div>

                      <div className="flex justify-center items-center gap-2 ">
                        <button
                          className="button3 "
                          style={{
                            padding: "8px 16px", // Điều chỉnh khoảng cách bên trong nút
                            height: "40px", // Chiều cao cố định
                            width: "100px", // Chiều rộng tự động theo nội dung
                          }}
                        >
                          Checkout
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
      
      <Footer />
    </>
  );
}

export default Checkin;
import Header from "../component/header";
import Footer from "../component/footer";
import { CiCalendar } from "react-icons/ci";
import { FaSort, FaLock, FaCircle } from "react-icons/fa"; // Import icon sắp xếp
import { rooms, roomTypes, statusColor, roomStatuses } from "./const_status";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { Link } from "react-router-dom";

function Status() {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  const [selectedRoomType, setSelectedRoomType] = useState("Tất cả phòng");
  const [selectedRoomStatus, setSelectedRoomStatus] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(8);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSort = (key: string) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredRooms = rooms.filter((room) => {
    const typeMatch =
      selectedRoomType === "Tất cả phòng" || room.type === selectedRoomType;
    const statusMatch =
      selectedRoomStatus === "Tất cả" || room.status === selectedRoomStatus;
    return typeMatch && statusMatch;
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const order = direction === "asc" ? 1 : -1;
    if (a[key as keyof typeof a] < b[key as keyof typeof b]) return -1 * order;
    if (a[key as keyof typeof a] > b[key as keyof typeof b]) return 1 * order;
    return 0;
  });
  const totalPages = Math.ceil(sortedRooms.length / entriesPerPage);
  const paginatedRooms = sortedRooms.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <>
      <Header />
      <div
        style={{
          padding: "1.5cm 4cm 2cm 4cm",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#F9FAFB", // Thêm màu nền nhạt
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: "30px",
          }}
        >
          {/* Date Picker */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <CiCalendar size={25} style={{ color: "#374151" }} />{" "}
            <div className="pl-2">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date || new Date())}
                minDate={new Date()} // Chỉ cho phép chọn từ ngày hiện tại trở đi
                maxDate={
                  new Date(new Date().setMonth(new Date().getMonth() + 1))
                }
                dateFormat="MMM, dd yyyy" // Định dạng ngày
                className="custom-datepicker rounded-xl px-2 py-1 border border-gray-300"
                placeholderText="Select a date"
              />
            </div>
            {/* Icon lịch */}
          </div>
        </div>

        {/* --- Container chính cho Filter và Bảng --- */}
        <div className="flex flex-col md:flex-row gap-8 items-start font-sans">
          {/* --- Filter Column --- */}
          <div className="md:w-1/3 p-5 border border-gray-300 rounded-lg bg-white shadow-md flex-shrink-0">
            <div className="flex justify-between items-center mb-5">
              <div className="bg-blue-500 text-white font-bold text-[1.1em] px-4 py-2 rounded-md">
                Room Filter
              </div>
              <button
                className="border-b border-gray-800 text-gray-700 cursor-pointer text-sm font-medium"
                onClick={() => {
                  setSelectedRoomType("Tất cả phòng");
                  setSelectedRoomStatus("Tất cả");
                }}
              >
                CLEAR ALL
              </button>
            </div>

            <div className="text-base font-semibold text-gray-700 mb-3 mt-5">
              Loại Phòng
            </div>
            <div className="flex flex-wrap gap-4">
              {roomTypes.map((type, index) => (
                <div
                  key={index}
                  className={`border border-gray-300 rounded-[16px] px-4 py-2 text-sm cursor-pointer  ${
                    selectedRoomType === type
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-100 text-gray-700 "
                  }`}
                  onClick={() => setSelectedRoomType(type)}
                >
                  {type}
                </div>
              ))}
            </div>

            <div className="text-base font-semibold text-gray-700 mb-3 mt-5">
              Trạng Thái Phòng
            </div>
            <div className="flex flex-wrap gap-4">
              {roomStatuses.map((status, index) => (
                <div
                  key={index}
                  className={`border border-gray-300 rounded-[16px] px-4 py-2 text-sm cursor-pointer  ${
                    selectedRoomStatus === status
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-100 text-gray-700 "
                  }`}
                  onClick={() => setSelectedRoomStatus(status)}
                >
                  {status}
                </div>
              ))}
            </div>
          </div>

          {/* --- Table Column --- */}
          <div className="flex-grow flex flex-col">
            <div className="grid grid-cols-4 gap-4 p-4 h-16 text-sm font-semibold bg-gray-100 rounded-t-lg border border-gray-300 text-gray-600 items-center">
              <div>Tên phòng</div>
              <div
                onClick={() => handleSort("type")}
                className="cursor-pointer flex items-center"
              >
                Loại phòng <FaSort style={{ marginLeft: "5px" }} />
              </div>
              <div
                onClick={() => handleSort("status")}
                className="cursor-pointer flex items-center"
              >
                Trạng thái <FaSort style={{ marginLeft: "5px" }} />
              </div>
              <div
                onClick={() => handleSort("time")}
                className="cursor-pointer flex items-center"
              >
                Thời gian <FaSort style={{ marginLeft: "5px" }} />
              </div>
            </div>

            <div className="bg-white rounded-b-lg shadow-md pl-4 border border-gray-300 border-t-0">
              {paginatedRooms.map((room) => (
                <div
                  key={room.id}
                  className="grid grid-cols-4 gap-4 py-4 border-b last:border-b-0 items-center"
                >
                  <div className="flex items-center gap-2 font-medium">
                    Phòng {room.id}
                  </div>
                  <div>{room.type}</div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium min-w-[90px] text-center ${
                        statusColor[room.status as keyof typeof statusColor] ||
                        "status-default"
                      }`}
                    >
                      {room.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    {room.time}
                    <div className="flex pl-2 items-center justify-between">
                      {/* Thêm icon bên phải */}
                      {room.status === "Đã đặt" && (
                        <FontAwesomeIcon
                          icon={faCalendarXmark}
                          className="text-gray-500 text-lg mr-12"
                        />
                      )}
                      {room.status === "Khóa" && (
                        <FaLock className="text-gray-500 text-lg mr-12" />
                      )}

                      {room.status === "Trống" && (
                        <FaCircle className="text-green-500 text-lg mr-12" />
                      )}
                    </div>
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
                  sortedRooms.length
                )}{" "}
                to {Math.min(currentPage * entriesPerPage, sortedRooms.length)}{" "}
                of {sortedRooms.length} entries
              </div>
              {/* Pagination */}
              <div style={{ display: "flex", gap: "5px" }}>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  style={{
                    padding: "5px 10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: currentPage === 1 ? "#f1f1f1" : "#fff",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    style={{
                      padding: "5px 10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      backgroundColor:
                        currentPage === index + 1 ? "#2563EB" : "#fff",
                      color: currentPage === index + 1 ? "#fff" : "#000",
                      cursor: "pointer",
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "5px 10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor:
                      currentPage === totalPages ? "#f1f1f1" : "#fff",
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  &gt;
                </button>
              </div>

              {/* Show entries dropdown */}
              <div>
                Show{" "}
                <select
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1); // Reset to first page
                  }}
                  className="px-1 py-0.5 mx-1 border border-gray-300 rounded-md"
                >
                  <option value={5}>5</option>
                  <option value={8}>8</option>
                  <option value={10}>10</option>
                </select>{" "}
                entries
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Status;

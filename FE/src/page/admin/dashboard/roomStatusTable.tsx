// File: RoomStatusTable.tsx
import React, { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";

// Định nghĩa kiểu dữ liệu cho một phòng (tùy chọn nhưng nên có)
interface Room {
  id: number;
  name: string;
  status: string; // Có thể dùng 'Hoạt động' | 'Bảo trì' | ... union type
  bookings: number;
}

function RoomStatusTable() {
  const rooms: Room[] = [
    { id: 1, name: "Phòng 812", status: "Hoạt động", bookings: 12 },
    { id: 2, name: "Phòng 810", status: "Hoạt động", bookings: 12 },
    { id: 3, name: "Phòng 811", status: "Hoạt động", bookings: 12 },
  ];

  // --- State cho Date Range Picker ---
  const [startDate, setStartDate] = useState<Date | null>(new Date()); // Ngày bắt đầu, ví dụ: hôm nay
  const [endDate, setEndDate] = useState<Date | null>(null); // Ngày kết thúc

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    // TODO: Gọi hàm để load lại dữ liệu bảng dựa trên start/end date mới
    console.log("Selected range:", start, end);
  };

  // Hàm định dạng ngày hiển thị trên nút (ví dụ đơn giản)
  const formatDateRange = (start: Date | null, end: Date | null): string => {
    if (start && end) {
      // Ví dụ: Dec 20 - Dec 31
      const startStr = start.toLocaleDateString("en-GB", {
        month: "short",
        day: "numeric",
      });
      const endStr = end.toLocaleDateString("en-GB", { day: "numeric" }); // Chỉ cần ngày cho phần cuối
      return `${startStr} - ${endStr}`;
    } else if (start) {
      // Nếu chỉ chọn 1 ngày
      return start.toLocaleDateString("en-GB", {
        month: "short",
        day: "numeric",
      });
    }
    return "Chọn ngày"; // Text mặc định
  };

  // Custom input để nút trông giống thiết kế
  const CustomDateInput = React.forwardRef<
    HTMLButtonElement,
    { value?: string; onClick?: () => void }
  >(({ value, onClick }, ref) => (
    <button
      className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200"
      onClick={onClick}
      ref={ref}
    >
      {value || formatDateRange(startDate, endDate)}{" "}
      {/* Hiển thị khoảng ngày đã chọn */}
      <FaRegCalendarAlt className="ml-2 text-gray-500" />
    </button>
  ));
  CustomDateInput.displayName = "CustomDateInput"; // Thêm displayName

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Thống kê tình trạng phòng
        </h2>
        <div className="roomStatusTableDatePicker">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            customInput={<CustomDateInput />}
            dateFormat="MMM d"
            popperPlacement="bottom-end"
          />
        </div>
      </div>
      {/* --- Table (giữ nguyên) --- */}
      <table className="w-full text-left table-auto">
        {/* ... thead và tbody ... */}
        <thead>
          <tr className="text-gray-500 text-sm border-b border-gray-200">
            <th className="pb-3 font-medium pt-2">No</th>
            <th className="pb-3 font-medium pt-2">Tên phòng</th>
            <th className="pb-3 font-medium pt-2">Trạng thái</th>
            <th className="pb-3 font-medium pt-2">Số lượt đặt</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} className="text-sm">
              <td className="py-3 text-gray-600">{room.id}</td>
              <td className="py-3 font-medium text-gray-800">{room.name}</td>
              <td className="py-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    room.status === "Hoạt động"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700" // Example for other statuses
                  }`}
                >
                  {room.status}
                </span>
              </td>
              <td className="py-3 text-gray-600">{room.bookings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoomStatusTable;

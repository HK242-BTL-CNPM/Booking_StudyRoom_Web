export const rooms = [
  { id: "A01", type: "Phòng cá nhân", status: "Đã đặt", time: "11:00 - 12:00" },
  { id: "B01", type: "Phòng mentor 1-1", status: "Trống", time: "-- : --" },
  { id: "C01", type: "Phòng học nhóm", status: "Trống", time: "-- : --" },
  { id: "D01", type: "Phòng thuyết trình", status: "Khóa", time: "-- : --" },
  {
    id: "A02",
    type: "Phòng cá nhân",
    status: "Đang sử dụng",
    time: "7:00 - 9:00",
  },
  {
    id: "A03",
    type: "Phòng cá nhân",
    status: "Đang sử dụng",
    time: "7:00 - 9:00",
  },
  {
    id: "B02",
    type: "Phòng mentor 1-1",
    status: "Đang sử dụng",
    time: "7:00 - 9:00",
  },
  { id: "C02", type: "Phòng học nhóm", status: "Đã đặt", time: "7:00 - 9:00" },
];
export const roomStatuses = [
  "Tất cả",
  "Trống",
  "Khóa",
  "Đã đặt",
  "Đang sử dụng",
];
export const statusColor = {
  "Trống": "bg-green-100 text-green-800", 
  "Khóa": "bg-gray-200 text-gray-600", 
  "Đã đặt": "bg-orange-100 text-orange-800", 
  "Đang sử dụng": "bg-blue-100 text-blue-800", 
};

export const roomTypes = [
  "Tất cả phòng",
  "Phòng cá nhân",
  "Phòng mentor 1-1",
  "Phòng học nhóm",
  "Phòng thuyết trình",
];

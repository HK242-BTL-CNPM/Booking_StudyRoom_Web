export const devices = [
  {
    id: 1,
    quantity: 1,
    devices: "Quạt",
    status: "Bình thường",
    activity: "Bật",
    cs: "CS1", // Cơ sở 1
    toa: "B1", // Tòa B1
    roomNumber: "B1-02", // Số phòng
  },
  {
    id: 2,
    quantity: 3,
    devices: "Máy chiếu",
    status: "Bình thường",
    activity: "Tắt",
    cs: "CS1",
    toa: "B1",
    roomNumber: "B1-03",
  },
  {
    id: 3,
    quantity: 5,
    devices: "Quạt",
    status: "Đang sửa chữa",
    activity: "Tắt",
    cs: "CS1",
    toa: "B3",
    roomNumber: "B3-02",
  },
  {
    id: 4,
    quantity: 7,
    devices: "Máy chiếu",
    status: "Bình thường",
    activity: "Bật",
    cs: "CS1",
    toa: "B3",
    roomNumber: "B3-03",
  },
  {
    id: 5,
    quantity: 9,
    devices: "Quạt",
    status: "Bình thường",
    activity: "Tắt",
    cs: "CS2",
    toa: "H1",
    roomNumber: "H1-02",
  },
  {
    id: 6,
    quantity: 2,
    devices: "TV",
    status: "Đang sửa chữa",
    activity: "Tắt",
    cs: "CS2",
    toa: "H1",
    roomNumber: "H1-03",
  },
  {
    id: 7,
    quantity: 4,
    devices: "Máy chiếu",
    status: "Lỗi",
    activity: "Tắt",
    cs: "CS2",
    toa: "H3",
    roomNumber: "H3-02",
  },
  {
    id: 8,
    quantity: 6,
    devices: "TV",
    status: "Bình thường",
    activity: "Tắt",
    cs: "CS2",
    toa: "H3",
    roomNumber: "H3-03",
  },
];
export const deviceStatuses = [
  "Tất cả",
  "Bình thường",
  "Đang sửa chữa",
];
export const deviceTypes = [
  "Tất cả",
  "Quạt",
  "Máy chiếu",
  "TV",
];
export const activityOptions = [
  "Tất cả",
  "Bật",
  "Tắt",
];

export const statusColor = {
  "Bình thường": "state3",
  "Đang sửa chữa": "state2",
  "Lỗi": "state1",
  "status-default": "",
};

export const actColor = {
  "Bật": "state3",
  "Tắt": "state1",
  "color-default": "",
};


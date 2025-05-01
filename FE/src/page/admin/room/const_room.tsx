export const rooms = [
  {
    id: 1,
    roomNumber: "B1-02",
    bookingStatus: "Đã đặt",
    roomStatus: "Hoạt động",
    cs: "CS1", // Cơ sở 1
    toa: "B1", // Tòa B1
    roomType: "Phòng họp nhóm",
  },
  {
    id: 2,
    roomNumber: "B1-03",
    bookingStatus: "Trống",
    roomStatus: "Hoạt động",
    cs: "CS1",
    toa: "B1",
    roomType: "Phòng tự học",
  },
  {
    id: 3,
    roomNumber: "B1-04",
    bookingStatus: "Đã đặt",
    roomStatus: "Bị khóa",
    cs: "CS1",
    toa: "B1",
    roomType: "Phòng thuyết trình",
  },
  {
    id: 4,
    roomNumber: "B3-02",
    bookingStatus: "Trống",
    roomStatus: "Hoạt động",
    cs: "CS1",
    toa: "B3",
    roomType: "Phòng thuyết trình",
  },
  {
    id: 5,
    roomNumber: "B3-03",
    bookingStatus: "Trống",
    roomStatus: "Bị khóa",
    cs: "CS1",
    toa: "B3",
    roomType: "Phòng tự học",
  },
  {
    id: 6,
    roomNumber: "H1-02",
    bookingStatus: "Đã đặt",
    roomStatus: "Bị khóa",
    cs: "CS2", // Cơ sở 2
    toa: "H1", // Tòa H1
    roomType: "Phòng tự học",
  },
  {
    id: 7,
    roomNumber: "H3-02",
    bookingStatus: "Trống",
    roomStatus: "Hoạt động",
    cs: "CS2",
    toa: "H3",
    roomType: "Phòng tự học",
  },
];



  export const bookingStatusColor = {
    "Đã đặt": "state1",
    "Trống": "state2",
    "status-default": "",
  };
  
  export const roomStatusColor = {
    "Hoạt động": "state3",
    "Bị khóa": "state1",
    "status-default": "",
  };
  
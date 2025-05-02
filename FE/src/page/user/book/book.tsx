// src/pages/user/book/book.tsx
import { useState, useEffect } from "react";
import Header from "../component/header"; // Adjust import path if needed
import Footer from "../component/footer"; // Adjust import path if needed
import FilterBar from "./filterBar";
import RoomList from "./roomList";
import RoomModal from "./roomModal";

export interface Room {
  id: number;
  name: string;
  facility: string;
  details: string;
  type: string;
  capacity: number;
  available: boolean;
}

// --- Mock Data (Keep or fetch from API) ---
// Use the locally defined interface
const initialRoomsData: Room[] = [
  // Dữ liệu gốc
  {
    id: 1,
    name: "Phòng tự học 1",
    facility: "CS2",
    details: "H6-123, CS2",
    type: "Phòng tự học",
    capacity: 4,
    available: true,
  },
  {
    id: 2,
    name: "Phòng họp nhóm 1",
    facility: "CS2",
    details: "H6-124, CS2",
    type: "Phòng họp nhóm",
    capacity: 4,
    available: true,
  },
  {
    id: 3,
    name: "Phòng thuyết trình 1",
    facility: "CS1",
    details: "B1-101, CS1",
    type: "Phòng thuyết trình",
    capacity: 10,
    available: true,
  },
  {
    id: 4,
    name: "Phòng mentor 1-1",
    facility: "CS2",
    details: "H6-126, CS2",
    type: "Phòng mentor 1-1",
    capacity: 2,
    available: true,
  },
  {
    id: 5,
    name: "Phòng tự học 2",
    facility: "CS1",
    details: "B4-205, CS1",
    type: "Phòng tự học",
    capacity: 6,
    available: true,
  },
  {
    id: 6,
    name: "Phòng họp nhóm 2",
    facility: "CS2",
    details: "H3-101, CS2",
    type: "Phòng họp nhóm",
    capacity: 8,
    available: true,
  },
  {
    id: 7,
    name: "Phòng tự học 3",
    facility: "CS2",
    details: "H6-125, CS2",
    type: "Phòng tự học",
    capacity: 4,
    available: true,
  },
  {
    id: 8,
    name: "Phòng họp nhóm 3",
    facility: "CS1",
    details: "B9-303, CS1",
    type: "Phòng họp nhóm",
    capacity: 6,
    available: true,
  },
  {
    id: 9,
    name: "Phòng mentor 1-1 (2)",
    facility: "CS2",
    details: "H6-127, CS2",
    type: "Phòng mentor 1-1",
    capacity: 2,
    available: true,
  }, // phòng này sẽ bị ẩn ban đầu
];

function Book() {
  const [allRoomsData] = useState<Room[]>(initialRoomsData);
  const [filteredAvailableRooms, setFilteredAvailableRooms] = useState<Room[]>(
    () => {
      return allRoomsData.filter((room) => room.available);
    }
  );

  const [selectedFacility, setSelectedFacility] = useState("Tất cả");
  const [buildings, setBuildings] = useState(["Tất cả"]);
  const [selectedBuilding, setSelectedBuilding] = useState("Tất cả");
  const [selectedRoomType, setSelectedRoomType] = useState("Tất cả");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // --- Effects ---
  useEffect(() => {
    // Effect cập nhật tòa nhà (giữ nguyên)
    if (selectedFacility === "CS1")
      setBuildings(["Tất cả", "B1", "B4", "B9", "B10"]);
    else if (selectedFacility === "CS2")
      setBuildings(["Tất cả", "H1", "H2", "H3", "H6"]);
    else setBuildings(["Tất cả"]);
    setSelectedBuilding("Tất cả");
  }, [selectedFacility]);

  useEffect(() => {
    // Reset page khi danh sách phòng thay đổi (giữ nguyên)
    setCurrentPage(1);
  }, [filteredAvailableRooms]);

  // --- Handlers ---
  const handleFacilityChange = (facility: string) => {
    setSelectedFacility(facility);
  };
  const handleBuildingChange = (building: string) => {
    setSelectedBuilding(building);
  };
  const handleRoomTypeChange = (roomType: string) => {
    setSelectedRoomType(roomType);
  };

  // Cập nhật handleSearch để lọc cả trạng thái available
  const handleSearch = () => {
    const filtered = allRoomsData.filter((room) => {
      const facilityMatch =
        selectedFacility === "Tất cả" ||
        room.facility.trim().toUpperCase() ===
          selectedFacility.trim().toUpperCase();

      const buildingMatch =
        selectedBuilding === "Tất cả" ||
        room.details
          .toUpperCase()
          .trim()
          .startsWith(selectedBuilding.toUpperCase() + "-");

      const roomTypeMatch =
        selectedRoomType === "Tất cả" ||
        room.type.trim().toUpperCase() ===
          selectedRoomType.trim().toUpperCase();

      const availableMatch = room.available;

      return facilityMatch && buildingMatch && roomTypeMatch && availableMatch;
    });
    setFilteredAvailableRooms(filtered);
  };

  const handleShowDetails = (room: Room) => {
    setSelectedRoom(room);
  };
  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  // Cập nhật handleBookRoom để LOẠI BỎ phòng khỏi danh sách hiển thị
  const handleBookRoom = (roomId: number) => {
    // LỌC BỎ phòng vừa đặt khỏi danh sách hiển thị
    setFilteredAvailableRooms((prevRooms) =>
      prevRooms.filter((room) => room.id !== roomId)
    );

    alert(`Phòng ID ${roomId} đã được đặt thành công!`);
    handleCloseModal(); // Đóng modal sau khi đặt
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // --- Render ---
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 120px)",
        }}
      >
        <main
          style={{
            padding: "20px 5%",
            flexGrow: 1,
            fontFamily: "Arial, sans-serif",
            marginTop: "12px",
          }}
        >
          <FilterBar
            // Đảm bảo truyền đúng các state và handler
            selectedFacility={selectedFacility} // Truyền state hiện tại
            buildings={buildings}
            selectedBuilding={selectedBuilding}
            selectedRoomType={selectedRoomType}
            startDate={startDate}
            startTime={startTime}
            endTime={endTime}
            onFacilityChange={handleFacilityChange} // Handler khi dropdown thay đổi
            onBuildingChange={handleBuildingChange}
            onRoomTypeChange={handleRoomTypeChange}
            onStartDateChange={setStartDate}
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
            onBuildingsChange={setBuildings} // Added missing prop
            onSearch={handleSearch} // Handler khi nút tìm kiếm được bấm
          />

          <RoomList
            rooms={filteredAvailableRooms} // Danh sách đã lọc
            currentPage={currentPage}
            onShowDetails={handleShowDetails}
            onBookRoom={handleBookRoom}
            onPageChange={handlePageChange}
          />
        </main>
        <Footer />
      </div>

      <RoomModal
        room={selectedRoom}
        onClose={handleCloseModal}
        onBookRoom={handleBookRoom} // Truyền handleBookRoom đã cập nhật
      />
    </>
  );
}

export default Book;



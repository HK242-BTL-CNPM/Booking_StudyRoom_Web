import { useState, useEffect } from "react";
import Header from "../component/header";
import Footer from "../component/footer";
import FilterBar from "./filterBar";
import RoomList from "./roomList";
import RoomModal from "./roomModal";
import { searchRooms, fetchBuildings, fetchRoomTypes, orderRoom } from "../../../api/apiService";
import { useAuth } from "../../../AuthContext";

export interface Room {
  id: number;
  name: string;
  facility: string;
  details: string;
  type: string;
  capacity: number;
  available: boolean;
}

function Book() {
  const { user } = useAuth(); // Lấy user từ AuthContext
  const [filteredAvailableRooms, setFilteredAvailableRooms] = useState<Room[]>([]);
  const [buildings, setBuildings] = useState<string[]>(["Tất cả"]);
  const [roomTypes, setRoomTypes] = useState<{ id: number; type_name: string }[]>([]);
  const [buildingsData, setBuildingsData] = useState<{ id: number; building_name: string }[]>([]);
  const [selectedFacility, setSelectedFacility] = useState("Tất cả");
  const [selectedBuilding, setSelectedBuilding] = useState("Tất cả");
  const [selectedRoomType, setSelectedRoomType] = useState("Tất cả");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Lấy danh sách loại phòng khi component mount
  useEffect(() => {
    const fetchRoomTypeData = async () => {
      try {
        const roomTypeData = await fetchRoomTypes();
        setRoomTypes(roomTypeData);
      } catch (error) {
        console.error('Failed to fetch room types:', error);
      }
    };

    fetchRoomTypeData();
  }, []);

  // Lấy danh sách tòa nhà khi selectedFacility thay đổi
  useEffect(() => {
    const fetchBuildingData = async () => {
      if (selectedFacility === "Tất cả") {
        try {
          // Gọi API cho tất cả cơ sở (giả sử fetchBuildings hỗ trợ mảng branchId)
          const [buildingsCS1, buildingsCS2] = await Promise.all([
            fetchBuildings(1),
            fetchBuildings(2),
          ]);
          const allBuildings = [...buildingsCS1, ...buildingsCS2];
          setBuildingsData(allBuildings);
          const buildingNames = ["Tất cả", ...allBuildings.map((b) => b.building_name)];
          setBuildings(buildingNames);
        } catch (error) {
          console.error('Failed to fetch buildings for all facilities:', error);
          setBuildings(["Tất cả"]);
          setBuildingsData([]);
        }
        return;
      }
  
      // Sửa ánh xạ branchId để khớp với giá trị từ API ("CS 1", "CS 2")
      const facilityMap: { [key: string]: number } = {
        "CS 1": 1,
        "CS 2": 2,
      };
      const branchId = facilityMap[selectedFacility] || 0;
  
      if (branchId === 0) {
        setBuildings(["Tất cả"]);
        setBuildingsData([]);
        return;
      }
  
      try {
        const buildingData = await fetchBuildings(branchId);
        setBuildingsData(buildingData);
        const buildingNames = ["Tất cả", ...buildingData.map((b) => b.building_name)];
        setBuildings(buildingNames);
      } catch (error) {
        console.error('Failed to fetch buildings:', error);
        setBuildings(["Tất cả"]);
        setBuildingsData([]);
      }
    };
  
    fetchBuildingData();
  }, [selectedFacility]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredAvailableRooms]);

  const handleFacilityChange = (facility: string) => {
    setSelectedFacility(facility);
    setSelectedBuilding("Tất cả");
  };

  const handleBuildingChange = (building: string) => {
    setSelectedBuilding(building);
  };

  const handleRoomTypeChange = (roomType: string) => {
    setSelectedRoomType(roomType);
  };

  const handleSearch = async () => {
    try {
      setSearchError(null);
  
      // Kiểm tra dữ liệu đầu vào
      if (!startDate || !startTime || !endTime) {
        setSearchError("Vui lòng chọn ngày và thời gian tìm kiếm.");
        return;
      }
  
      // Lấy branch_id
      let branchId = 0;
      if (selectedFacility === "Tất cả") {
        branchId = 0; // Không lọc theo cơ sở
      } else if (selectedFacility === "CS 1" || selectedFacility === "CS 2") {
        const facilityMap = {
          "CS 1": 1,
          "CS 2": 2,
        } as const;
        branchId = facilityMap[selectedFacility as "CS 1" | "CS 2"];
      } else {
        setSearchError("Cơ sở không hợp lệ.");
        return;
      }
  
      if (branchId === 0 && selectedFacility !== "Tất cả") {
        setSearchError("Cơ sở không hợp lệ.");
        return;
      }
  
      // Lấy building_id
      let buildingId = 0;
      console.log('buildingsData in handleSearch:', buildingsData);
      if (selectedBuilding !== "Tất cả") {
        const selectedBuildingData = buildingsData.find((b) => b.building_name === selectedBuilding);
        if (!selectedBuildingData) {
          setSearchError("Tòa nhà không hợp lệ.");
          console.log('Failed: Invalid building', { selectedBuilding, buildingsData });
          return;
        }
        buildingId = selectedBuildingData.id;
      }
  
      // Lấy type_id
      let typeId = 0;
      if (selectedRoomType !== "Tất cả") {
        const selectedRoomTypeData = roomTypes.find((rt) => rt.type_name === selectedRoomType);
        if (!selectedRoomTypeData) {
          setSearchError("Loại phòng không hợp lệ.");
          return;
        }
        typeId = selectedRoomTypeData.id;
      }
  
      // Parse ngày, tháng, năm
      const dateParts = startDate.split("-"); // yyyy-mm-dd
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10);
      const day = parseInt(dateParts[2], 10);
  
      // Parse thời gian
      const startHour = parseInt(startTime.split(":")[0], 10);
      const endHour = parseInt(endTime.split(":")[0], 10);
  
      // Gọi API searchRooms
      const roomsFromApi = await searchRooms({
        building_id: buildingId,
        branch_id: branchId,
        type_id: typeId,
        date_order: day,
        month_order: month,
        year_order: year,
        start_time: startHour,
        end_time: endHour,
        limitation: 10,
      });
  
      // Tạo danh sách tòa nhà tĩnh (dựa trên dữ liệu thực tế từ API)
      const buildingMap: { [key: number]: string } = {
        1: "B9",
        2: "B10",
        3: "B4",
        // Thêm các building_id khác nếu cần
      };
  
      // Ánh xạ dữ liệu từ API sang cấu trúc Room
      const mappedRooms: Room[] = roomsFromApi.map((room) => {
        const buildingName = buildingsData.find((b) => b.id === room.building_id)?.building_name || buildingMap[room.building_id] || `Tòa ${room.building_id}`;
        const facility = room.branch_id === 1 ? "CS 1" : "CS 2";
        const roomType = roomTypes.find((rt) => rt.id === room.type_id);
        const typeName = roomType ? roomType.type_name : `Loại ${room.type_id}`;
  
        return {
          id: room.id,
          name: `Phòng ${room.no_room} (${buildingName})`,
          facility: facility,
          details: `${buildingName}-${room.no_room}, ${facility}`,
          type: typeName,
          capacity: room.max_quantity,
          available: room.active,
        };
      });
  
      setFilteredAvailableRooms(mappedRooms);
    } catch (error) {
      console.error('Error searching rooms:', error);
      setSearchError("Vui lòng chọn giờ đặt phòng trước 60 phút");
      setFilteredAvailableRooms([]);
    }
  };

  const handleShowDetails = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  const handleOrderRoom = async (roomId: number) => {
    if (!startDate || !startTime || !endTime) {
      setSearchError("Vui lòng chọn ngày và thời gian trước khi đặt phòng.");
      return;
    }
  
    const dateParts = startDate.split("-");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const date = parseInt(dateParts[2], 10); // Lấy ngày từ startDate
    const startHour = parseInt(startTime.split(":")[0], 10);
    const endHour = parseInt(endTime.split(":")[0], 10);
  
    try {
      const response = await orderRoom({
        room_id: roomId,
        date: date,
        month: month,
        year: year,
        start_time: startHour,
        end_time: endHour,
      });
      console.log("Order room response:", response);
  
      setFilteredAvailableRooms((prevRooms) =>
        prevRooms.filter((room) => room.id !== roomId)
      );
      alert(response.msg || "Đặt phòng thành công!");
      handleCloseModal();
    } catch (error) {
      console.error("Error ordering room:", error);
      setSearchError("Không thể đặt phòng. Vui lòng thử lại. Kiểm tra console log.");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

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
            selectedFacility={selectedFacility}
            buildings={buildings}
            selectedBuilding={selectedBuilding}
            selectedRoomType={selectedRoomType}
            startDate={startDate}
            startTime={startTime}
            endTime={endTime}
            onFacilityChange={handleFacilityChange}
            onBuildingsChange={setBuildings}
            onBuildingChange={handleBuildingChange}
            onRoomTypeChange={handleRoomTypeChange}
            onStartDateChange={setStartDate}
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
            onSearch={handleSearch}
          />

          {searchError && (
            <p style={{ color: "red", textAlign: "center" }}>{searchError}</p>
          )}

          <RoomList
            rooms={filteredAvailableRooms}
            currentPage={currentPage}
            onShowDetails={handleShowDetails}
            onBookRoom={handleOrderRoom} // Truyền hàm orderRoom
            onPageChange={handlePageChange}
          />
        </main>
        <Footer />
      </div>

      <RoomModal
        room={selectedRoom}
        onClose={handleCloseModal}
        onBookRoom={handleOrderRoom} // Truyền hàm orderRoom
      />
    </>
  );
}

export default Book;
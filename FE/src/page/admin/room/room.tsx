import Sidebar from "../components/sidebar";
import Header_admin from "../components/header_admin";
import { useState, useEffect } from "react";
import { roomStatusColor } from "./const_room";
import { FaSort, FaInfoCircle } from "react-icons/fa";
import Select from "react-select";
import { useAuth } from "../../../AuthContext";
import { getAllRooms, fetchBuildings } from "../../../api/apiService";

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

// Define the option type
interface Option {
  value: string | null;
  label: string;
}

interface Room {
  id: number;
  branch_id: number;
  building_id: number;
  no_room: string;
  quantity: number;
  type_id: number;
  max_quantity: number;
  active: boolean;
}

interface Facility {
  branch_name: string;
  id: number;
}

interface Building {
  id: number;
  building_name: string;
  branch_id: number;
}

function Room() {
  const { token, user, facilities } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;
  const [selectedCs, setSelectedCs] = useState<string | null>(null);
  const [selectedToa, setSelectedToa] = useState<string | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [totalRooms, setTotalRooms] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Tạo options cho dropdown "Cơ sở" từ facilities, thêm "Tất cả"
  const csOptions: Option[] = [
    { value: null, label: "Tất cả" },
    ...facilities.map((facility: Facility) => ({
      value: facility.id.toString(),
      label: facility.branch_name,
    })),
  ];

  // Tạo options cho dropdown "Tòa" từ buildings, thêm "Tất cả"
  const toaOptions: Option[] = [
    { value: null, label: "Tất cả" },
    ...buildings.map((building: Building) => ({
      value: building.id.toString(),
      label: building.building_name,
    })),
  ];

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Lấy danh sách tòa khi chọn cơ sở
  useEffect(() => {
    const fetchBuildingsData = async () => {
      if (selectedCs && selectedCs !== "null") {
        try {
          const buildingsData = await fetchBuildings(parseInt(selectedCs));
          setBuildings(buildingsData);
        } catch (err: any) {
          setError(err.message || "Không thể tải danh sách tòa.");
        }
      } else {
        setBuildings([]);
      }
      setSelectedToa(null); // Reset tòa khi thay đổi cơ sở
    };
    fetchBuildingsData();
  }, [selectedCs]);

  // Lấy danh sách phòng từ API
  const fetchRooms = async () => {
    if (!user?.isAdmin || !token) {
      setError("Bạn không có quyền truy cập trang này.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const params = {
        branch_id: selectedCs && selectedCs !== "null" ? parseInt(selectedCs) : undefined,
        building_id: selectedToa && selectedToa !== "null" ? parseInt(selectedToa) : undefined,
        page: currentPage,
        limit: entriesPerPage,
      };
      const response = await getAllRooms(params);
      setRooms(response.data);
      setTotalRooms(response.metadata.total);
      setTotalPages(response.metadata.total_page);
    } catch (err: any) {
      setError(err.message || "Không thể tải danh sách phòng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [selectedCs, selectedToa, currentPage, user, token]);

  const sortedRooms = [...rooms].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const order = direction === "asc" ? 1 : -1;
    const valA = a[key as keyof typeof a];
    const valB = b[key as keyof typeof b];
    return (valA < valB ? -1 : valA > valB ? 1 : 0) * order;
  });

  const paginatedRooms = sortedRooms;

  // Hàm ánh xạ branch_id với branch_name
  const getBranchName = (branchId: number) => {
    const facility = facilities.find((f: Facility) => f.id === branchId);
    return facility ? facility.branch_name : branchId;
  };

  // Hàm ánh xạ building_id với building_name
  const getBuildingName = (buildingId: number) => {
    const building = buildings.find((b: Building) => b.id === buildingId);
    return building ? building.building_name : buildingId;
  };

  const openPopup = (room: Room) => {
    setSelectedRoom(room);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedRoom(null);
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;

  return (
    <>
      <div className="flex min-h-screen">
        <div
          className={`bg-black_admin text-white_admin transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-0"} overflow-hidden`}
        >
          <Sidebar />
        </div>

        <div className={`flex-1 flex flex-col min-h-screen overflow-auto transition-all duration-300`}>
          <Header_admin onToggleSidebar={handleToggleSidebar} />
          <div className="pb-4 pl-8 pr-8 font-sans">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">Danh sách phòng</h1>
              </div>

              <div className="flex flex-row flex-wrap gap-3 justify-end px-16 pt-4">
                <Select
                  className="w-36"
                  styles={customStyles}
                  placeholder="Cơ sở"
                  options={csOptions}
                  value={csOptions.find((c: Option) => c.value === selectedCs) || null}
                  onChange={(option: Option | null) => {
                    setSelectedCs(option?.value || null);
                  }}
                />
                <Select
                  className="w-36"
                  styles={customStyles}
                  placeholder="Toà"
                  options={toaOptions}
                  value={toaOptions.find((t: Option) => t.value === selectedToa) || null}
                  isDisabled={!selectedCs}
                  onChange={(option: Option | null) => {
                    setSelectedToa(option?.value || null);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-grow pl-8 pr-8 justify-center items-start font-sans">
            <div className="flex flex-col md:flex-row gap-8 items-start font-sans w-full max-w-[1100px]">
              <div className="flex-grow flex flex-col">
                <div className="grid grid-cols-7 gap-4 p-4 h-16 text-sm font-semibold bg-[#F8FAFC] rounded-t-lg border border-gray-300 text-gray-600 items-center">
                  <div className="text-center">Tên ID</div>
                  <div
                    onClick={() => handleSort("branch_id")}
                    className="cursor-pointer flex items-center justify-center whitespace-nowrap"
                  >
                    Cơ sở <FaSort className="ml-2" />
                  </div>
                  <div
                    onClick={() => handleSort("building_id")}
                    className="cursor-pointer flex items-center justify-center whitespace-nowrap"
                  >
                    Tòa <FaSort className="ml-2" />
                  </div>
                  <div
                    onClick={() => handleSort("no_room")}
                    className="cursor-pointer flex items-center justify-center whitespace-nowrap"
                  >
                    Số phòng <FaSort className="ml-2" />
                  </div>
                  <div
                    onClick={() => handleSort("active")}
                    className="cursor-pointer flex items-center justify-center whitespace-nowrap"
                  >
                    Trạng thái hoạt động <FaSort className="ml-2" />
                  </div>
                  <div className="cursor-pointer flex items-center justify-center col-span-2">
                    Thao tác
                  </div>
                </div>
                
                <div className="pl-4 pr-4 bg-white rounded-b-lg shadow-md border border-gray-300 border-t-0">
                  {paginatedRooms.map((room) => (
                    <div
                      key={room.id}
                      className="grid grid-cols-7 gap-4 py-4 border-b last:border-b-0 items-center"
                    >
                      <div className="text-center font-medium">ID {room.id}</div>
                      <div className="text-center">{getBranchName(room.branch_id)}</div>
                      <div className="text-center">{getBuildingName(room.building_id)}</div>
                      <div className="text-center">{room.no_room}</div>
                      <div className="text-center">
                        <button
                          className={`px-2 py-1 rounded-md text-sm font-medium ${roomStatusColor[room.active ? "Hoạt động" : "Bị khóa"] || "bg-gray-300 text-black"}`}
                          disabled
                        >
                          {room.active ? "Hoạt động" : "Bị khóa"}
                        </button>
                      </div>
                      <div className="flex justify-center items-center gap-2 col-span-2">
                        <button
                          className="button3"
                          style={{
                            padding: "8px 16px",
                            height: "40px",
                            width: "100px",
                            backgroundColor: "rgb(37, 99, 235)",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Mở khóa
                        </button>
                        <button
                          className="button3"
                          style={{
                            padding: "8px 16px",
                            height: "40px",
                            width: "100px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Khóa phòng
                        </button>
                        <FaInfoCircle
                          className="ml-4 text-gray-500 text-xl cursor-pointer"
                          title="Chi tiết"
                          onClick={() => openPopup(room)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-5 px-2 text-sm text-gray-600">
                  <div>
                    Show{" "}
                    {Math.min(
                      (currentPage - 1) * entriesPerPage + 1,
                      totalRooms
                    )}{" "}
                    to {Math.min(currentPage * entriesPerPage, totalRooms)}{" "}
                    of {totalRooms} entries
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 border rounded-md ${currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white"}`}
                    >
                      
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-1 border rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"}`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-white"}`}
                    >
                      
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Thông tin phòng</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Phòng {selectedRoom.no_room}</h2>

              <div className="border-t border-b py-4 mb-6">
                <div className="grid grid-cols-5 gap-2 text-center">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Loại Phòng</div>
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-3 h-10 bg-gray-100 rounded-full mr-3">
                        <i className="fas fa-users text-gray-600"></i>
                      </span>
                      <div className="text-base font-semibold">Phòng họp nhóm</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-2">Số lượng</div>
                    <div className="text-base font-semibold">{selectedRoom.quantity || "N/A"}</div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-2">Phòng</div>
                    <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full">
                      <i className="fas fa-map-marker-alt mr-2 text-gray-600"></i>
                      {selectedRoom.no_room || "N/A"}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-2">Trạng thái</div>
                    <div className="inline-flex items-center">
                      <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
                      <span className="text-green-500 font-semibold">{selectedRoom.active ? "Hoạt động" : "Bị khóa"}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-2">Thời gian đặt phòng</div>
                    <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full">
                      <i className="fas fa-clock mr-2 text-gray-600"></i>
                      <span>N/A</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-sm font-medium text-gray-700 mb-2">Danh sách Thiết bị:</div>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="px-3 py-1 bg-gray-100 rounded-full">2x Máy lạnh</div>
                <div className="px-3 py-1 bg-gray-100 rounded-full">4x Đèn</div>
                <div className="px-3 py-1 bg-gray-100 rounded-full">1x Máy chiếu</div>
                <div className="px-3 py-1 bg-gray-100 rounded-full">8x Ổ cắm</div>
                <div className="px-3 py-1 bg-gray-100 rounded-full">1x Màn hình</div>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button className="button2" onClick={closePopup}>
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
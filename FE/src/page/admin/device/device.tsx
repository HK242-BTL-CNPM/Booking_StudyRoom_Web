import Sidebar from "../components/sidebar";
import Header_admin from "../components/header_admin";
import { useState } from "react";
import { devices, statusColor, actColor, } from "./const_device";
import { FaSort } from "react-icons/fa"; // Import icon sắp xếp
import Select from "react-select"; // Import Select component
// import { csOptions, toaOptionsByCs, phongOptionsByCs } from "./Options";
// import { toaOptionsByCs, deviceOptionsByToa } from "./Options";
import { csOptions, toaOptionsByCs, phongOptionsByToa } from "./Options";
// import { devices } from "./const_device";
// import { devices as initialRooms } from "./const_device";
// const [rooms, setRooms] = useState(initialRooms);

import "react-datepicker/dist/react-datepicker.css";
function Device() {
  // sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  const [devicesList, setDevicesList] = useState(devices);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;
  // const [, setIsToggled] = useState(false);

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  const handleDeleteDevice = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thiết bị này? (Chưa xóa được)")) {
      // Cập nhật danh sách thiết bị
      const updatedDevices = devicesList.filter((device) => device.id !== id);
      setDevicesList(updatedDevices);
    }
  };

  const [popupCs, setPopupCs] = useState<string | null>(null);
  const [popupToa, setPopupToa] = useState<string | null>(null);
  const [popupRoom, setPopupRoom] = useState<string | null>(null);
  
  const toaOptionsInPopup = popupCs ? toaOptionsByCs[popupCs] : [];
  const roomOptions = devices
    .filter((r) => r.cs === popupCs && r.toa === popupToa)
    .map((r) => ({
      label: r.roomNumber,
      value: r.roomNumber,
    }));
  
  const [selectedCs, setSelectedCs] = useState<string | null>(null);
  const [selectedToa, setSelectedToa] = useState<string | null>(null);
  const [selectedPhong, setSelectedPhong] = useState<string | null>(null);



// const [device, setRooms] = useState<Room[]>(initialRooms);
  const filterDevices = () => {
    let filteredDevices = devicesList; // <- dùng devicesList thay vì devices
  
    if (selectedCs) {
      filteredDevices = filteredDevices.filter((device) => device.cs === selectedCs);
    }
    if (selectedToa) {
      filteredDevices = filteredDevices.filter((device) => device.toa === selectedToa);
    }
    if (selectedPhong) {
      filteredDevices = filteredDevices.filter((device) => device.roomNumber === selectedPhong);
    }
    return filteredDevices;
  };
  

const filteredDevices = filterDevices();
const sortedDevices = [...filteredDevices].sort((a, b) => {
  if (!sortConfig) return 0;
  const { key, direction } = sortConfig;
  const order = direction === "asc" ? 1 : -1;
  const valA = a[key as keyof typeof a];
  const valB = b[key as keyof typeof b];
  return (valA < valB ? -1 : valA > valB ? 1 : 0) * order;
});
interface DeviceItem {
  id: number;
  devices: string;
  quantity: number;
  status: string;
  activity: string;
  cs: string;
  toa: string;
  roomNumber: string;
}

interface Roomm {
  cs: string;
  toa: string;
  roomNumber: string;
  devicess: DeviceItem[];
}
const initialRooms: Roomm[] = [
  {
    cs: "Cơ sở 1",
    toa: "Tòa A",
    roomNumber: "101",
    devicess: [],
  },
  {
    cs: "Cơ sở 1",
    toa: "Tòa A",
    roomNumber: "102",
    devicess: [],
  },
];
const [rooms, setRooms] = useState<Roomm[]>(initialRooms);


  const totalPages = Math.ceil(sortedDevices.length / entriesPerPage);
  const paginatedDevices = sortedDevices.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [rooms, setRooms] = useState([]); // Add this state for rooms
  
  const [newDeviceName, setNewDeviceName] = useState("");
    // const toaOptions = selectedCs ? toaOptionsByCs[selectedCs] : [];
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
                <h1 className="text-2xl font-bold ">Danh sách thiết bị</h1>
              </div>

              <div className="flex flex-wrap items-center gap-4 justify-end">
                

              <div className="flex flex-row flex-wrap gap-3 justify-end px-16 pt-4">
  {/* Cơ sở */}
  <Select
    className="w-36"
    styles={customStyles}
    placeholder="Cơ sở"
    options={csOptions}
    value={selectedCs ? { value: selectedCs, label: selectedCs } : null}
    onChange={(option) => {
      setSelectedCs(option?.value || null);
      setSelectedToa(null);
      setSelectedPhong(null);
    }}
    getOptionLabel={(e) => e.label}
    getOptionValue={(e) => e.value}
  />

  {/* Toà */}
  <Select
    className="w-36"
    styles={customStyles}
    placeholder="Tòa"
    options={selectedCs ? toaOptionsByCs[selectedCs] || [] : []}
    value={selectedToa ? { value: selectedToa, label: selectedToa } : null}
    isDisabled={!selectedCs}
    onChange={(option) => {
      setSelectedToa(option?.value || null);
      setSelectedPhong(null); // Reset Phòng khi chọn lại Tòa
    }}
    getOptionLabel={(e) => e.label}
    getOptionValue={(e) => e.value}
  />

  {/* Phòng */}
  <Select
    className="w-36"
    styles={customStyles}
    placeholder="Phòng"
    options={selectedToa ? phongOptionsByToa[selectedToa] || [] : []}
    value={selectedPhong ? { value: selectedPhong, label: selectedPhong } : null}
    isDisabled={!selectedToa}
    onChange={(option) => {
      setSelectedPhong(option?.value || null);
    }}
    getOptionLabel={(e) => e.label}
    getOptionValue={(e) => e.value}
  />
</div>


                <button
                  className="button1"
                  style={{
                    whiteSpace: "nowrap",
                    marginLeft: "20px",
                    padding: "1px 16px", // Điều chỉnh khoảng cách bên trong nút
                    fontSize: "14px", // Kích thước chữ nhỏ hơn
                    height: "40px", // Chiều cao cố định
                    maxWidth: "120px", // Chiều rộng tự động theo nội dung
                  }}
                  onClick={() => {
                    // if (selectedPhong) {
                    //   console.log(`Thêm thiết bị vào phòng: ${selectedPhong}`);
                      setIsPopupOpen(true);
                      // Thực hiện các hành động khác nếu cần
                    // } else {
                    //   console.log("Vui lòng chọn phòng trước khi thêm thiết bị.");
                    // }
                   }
                }
                >
                  Thêm thiết bị
                </button>
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
                    onClick={() => handleSort("roomNumber")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Số phòng <FaSort className="ml-2" />
                  </div>
                  <div
                    onClick={() => handleSort("devices")}
                    className="cursor-pointer flex items-center justify-center col-span-2"
                  >
                    Thiết bị <FaSort className="ml-2" />
                  </div>
                  
                  <div
                    onClick={() => handleSort("quantity")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Số lượng <FaSort className="ml-2" />
                  </div>

                  <div
                    onClick={() => handleSort("status")}
                    className="cursor-pointer flex items-center justify-center "
                  >
                    Trạng thái <FaSort className="ml-2" />
                  </div>
                  <div
                    onClick={() => handleSort("activity")}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Hoạt động <FaSort className="ml-2" />
                  </div>
                  <div
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Thao tác
                  </div>
                </div>
               
                {/* Nội dung của bảng */}
                <div className="pl-4 pr-4 bg-white rounded-b-lg shadow-md border border-gray-300 border-t-0">
                  {paginatedDevices.map((device) => (
                    <div
                      key={device.id}
                      className="grid grid-cols-8 gap-4 py-4 border-b last:border-b-0 items-center"
                    >
                      <div className="text-center font-medium">ID {device.id}</div>
                      <div className="text-center">{device.roomNumber}</div>
                      <div className="text-center col-span-2">{device.devices}</div>
                      <div className="text-center">{device.quantity}</div>

                      <div className="text-center">
                        <button
                          className={`px-2 py-1 rounded-md text-sm font-medium  ${statusColor[device.status as keyof typeof statusColor] || "bg-gray-300 text-black"
                            }`}
                          disabled
                        >
                          {device.status}
                        </button>
                      </div>
                      <div className="text-center">
                        <button
                          className={`px-2 py-1 rounded-md text-sm font-medium ${actColor[device.activity as keyof typeof actColor] || "bg-gray-300 text-black"
                            }`}
                          disabled
                        >
                          {device.activity}
                        </button>
                      </div>

                      <div className="flex justify-center items-center ">
                        <button
                          onClick={() => handleDeleteDevice(device.id)}
                          className="button3 "
                          style={{
                            padding: "8px 16px", // Điều chỉnh khoảng cách bên trong nút
                            height: "40px", // Chiều cao cố định
                            width: "70px", // Chiều rộng tự động theo nội dung
                          }}
                        >
                          Xóa
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
      {isPopupOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg ">
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
  <Select
    className="w-full"
    styles={customStyles}
    placeholder="Chọn cơ sở"
    options={csOptions}
    value={csOptions.find((c) => c.value === popupCs) || null}
    onChange={(option) => {
      setPopupCs(option?.value || null);
      setPopupToa(null);
      setPopupRoom(null);
    }}
  />
  <Select
    className="w-full"
    styles={customStyles}
    placeholder="Chọn tòa"
    options={toaOptionsInPopup}
    value={toaOptionsInPopup.find((t) => t.value === popupToa) || null}
    isDisabled={!popupCs}
    onChange={(option) => {
      setPopupToa(option?.value || null);
      setPopupRoom(null);
    }}
  />
  <Select
    className="w-full"
    styles={customStyles}
    placeholder="Chọn phòng"
    options={roomOptions}
    value={roomOptions.find((r) => r.value === popupRoom) || null}
    isDisabled={!popupToa}
    onChange={(option) => {
      setPopupRoom(option?.value || null);
      setSelectedPhong(option?.value || null); // Cập nhật phòng được chọn

    }}
  />
</div>

      <h2 className="text-xl font-bold mb-4">Thêm thiết bị</h2>
      <input
        type="text"
        placeholder="Nhập tên thiết bị"
        value={newDeviceName}
        onChange={(e) => setNewDeviceName(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
      />
      <div className="flex justify-end gap-4">
        <button
          className="px-4 py-2 bg-gray-300 text-black rounded-md"
          onClick={() => setIsPopupOpen(false)} // Đóng popup
        >
          Hủy
        </button>
        <button
  className="px-4 py-2 bg-blue-500 text-white rounded-md"
  onClick={() => {
    if (newDeviceName.trim() && popupCs && popupToa && popupRoom) {
      const newDevice = {
        id: devicesList.length + 1,
        devices: newDeviceName,
        quantity: 1,
        status: "Bình thường",
        activity: "Tắt",
        cs: popupCs,
        toa: popupToa,
        roomNumber: popupRoom,
      };
  
      // Cập nhật danh sách thiết bị
      setDevicesList((prev) => [...prev, newDevice]);
  
      console.log(`Đã thêm thiết bị '${newDeviceName}' vào phòng ${popupRoom}`);
  
      // Reset form
      setNewDeviceName("");
      setPopupCs(null);
      setPopupToa(null);
      setPopupRoom(null);
      setIsPopupOpen(false);
    } else {
      alert("Vui lòng nhập tên thiết bị và chọn đầy đủ thông tin.");
    }
  }}
  
>
  Add
</button>
      </div>
    </div>
  </div>
)}
    </>
  );
}

export default Device;
import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Header_admin from "../components/header_admin";
import "./calendar.scss";
import { events } from "./eventAdmin";
import Select from "react-select";

import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewMonthGrid,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";

import "@schedule-x/theme-default/dist/index.css";
import { useAuth } from "../../../AuthContext";
import { fetchBuildings, getAllRooms, getOrdersByFilter } from "../../../api/apiService";

interface Building {
  id: number;
  building_name: string;
  branch_id: number;
}

interface Room {
  id: number;
  no_room: string;
  branch_id: number;
  building_id: number;
}

// Định nghĩa kiểu cho option của react-select
interface OptionType {
  value: string;
  label: string;
}

// Định nghĩa kiểu sự kiện (dựa trên eventAdmin.tsx)
interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  description: string;
  calendarId?: string;
}

function Booking() {
  const { facilities, user, token, isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCs, setSelectedCs] = useState<string | null>(null);
  const [selectedToa, setSelectedToa] = useState<string | null>(null);
  const [selectedPhong, setSelectedPhong] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null); // Chọn ngày
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null); // Chọn tháng
  const [selectedYear, setSelectedYear] = useState<string | null>(null); // Chọn năm
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [csLoading, setCsLoading] = useState<boolean>(true);
  const [csError, setCsError] = useState<string | null>(null);
  const [toaLoading, setToaLoading] = useState<boolean>(false);
  const [toaError, setToaError] = useState<string | null>(null);
  const [phongLoading, setPhongLoading] = useState<boolean>(false);
  const [phongError, setPhongError] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

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

  // Chuẩn bị csOptions từ facilities với kiểu OptionType
  const csOptions: OptionType[] = facilities.map(facility => ({
    value: facility.id.toString(),
    label: facility.branch_name,
  }));

  // Chuẩn bị toaOptions từ buildings với kiểu OptionType
  const toaOptions: OptionType[] = buildings.map(building => ({
    value: building.id.toString(),
    label: building.building_name,
  }));

  // Chuẩn bị phongOptions từ rooms với kiểu OptionType
  const phongOptions: OptionType[] = rooms.map(room => ({
    value: room.no_room,
    label: room.no_room,
  }));

  // Chuẩn bị dayOptions (1-31)
  const dayOptions: OptionType[] = Array.from({ length: 31 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));

  // Chuẩn bị monthOptions (1-12)
  const monthOptions: OptionType[] = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Tháng ${i + 1}`,
  }));

  // Chuẩn bị yearOptions (ví dụ: 2020-2030)
  const currentYear = new Date().getFullYear();
  const yearOptions: OptionType[] = Array.from({ length: 11 }, (_, i) => ({
    value: (currentYear + i).toString(),
    label: (currentYear + i).toString(),
  }));

  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);

  // Hàm gọi API và cập nhật sự kiện
  const handleSearch = async () => {
    setSearchError(null);

    if (!selectedCs || !selectedToa || !selectedPhong) {
      setSearchError("Vui lòng chọn đầy đủ Cơ sở, Toà, và Phòng.");
      return;
    }

    if (!selectedDay || !selectedMonth || !selectedYear) {
      setSearchError("Vui lòng chọn đầy đủ Ngày, Tháng, và Năm.");
      return;
    }

    // Tìm room_id từ branch_id, building_id, và no_room
    const branchId = parseInt(selectedCs);
    const buildingId = parseInt(selectedToa);
    const noRoom = selectedPhong;

    const room = rooms.find(
      (r) => r.branch_id === branchId && r.building_id === buildingId && r.no_room === noRoom
    );

    if (!room) {
      setSearchError("Không tìm thấy phòng phù hợp với lựa chọn.");
      return;
    }

    const roomId = room.id;

    const params = {
      room_id: roomId,
      year: parseInt(selectedYear),
      date_start: parseInt(selectedDay),
      date_end: parseInt(selectedDay),
      month_start: parseInt(selectedMonth),
      month_end: parseInt(selectedMonth),
    };

    try {
      const response = await getOrdersByFilter(params);

      // Chuyển đổi dữ liệu từ API thành định dạng sự kiện của ScheduleXCalendar với description
      const newEvents: Event[] = response.data.map(order => ({
        id: order.id.toString(),
        title: `Room ${order.room_id} - Order ${order.id}`,
        start: `${order.date}T${order.begin}:00`,
        end: `${order.date}T${order.end}:00`,
        description: `Đơn hàng ${order.id} - Trạng thái: ${order.is_used ? 'Đã sử dụng' : 'Chưa sử dụng'}`,
        calendarId: order.is_used ? "hieu" : "leisure",
      }));

      setFilteredEvents(newEvents);
    } catch (error: any) {
      setSearchError(error.message || "Không có lịch đặt nào cho phòng này.");
      setFilteredEvents([]);
    }
  };

  // Kiểm tra đăng nhập và facilities
  useEffect(() => {
    if (!user || !token || !isAuthenticated) {
      setCsLoading(false);
      setCsError("Vui lòng đăng nhập để xem danh sách cơ sở.");
      return;
    }

    if (facilities.length > 0) {
      setCsLoading(false);
    } else {
      setCsLoading(false);
      setCsError("Không có dữ liệu cơ sở.");
    }
  }, [user, token, isAuthenticated, facilities]);

  // Gọi API để lấy danh sách tòa khi selectedCs thay đổi
  useEffect(() => {
    const fetchBuildingsData = async () => {
      if (!selectedCs) {
        setBuildings([]);
        setToaLoading(false);
        setToaError(null);
        setSelectedToa(null);
        setSelectedPhong(null);
        setRooms([]);
        return;
      }

      const branchId = parseInt(selectedCs);
      setToaLoading(true);
      setToaError(null);
      try {
        const buildingsData = await fetchBuildings(branchId);
        setBuildings(buildingsData);
      } catch (error) {
        setToaError("Không thể tải danh sách tòa nhà.");
        setBuildings([]);
      } finally {
        setToaLoading(false);
      }
    };

    fetchBuildingsData();
  }, [selectedCs]);

  // Gọi API để lấy danh sách phòng khi selectedToa thay đổi
  useEffect(() => {
    const fetchRoomsData = async () => {
      if (!selectedCs || !selectedToa) {
        setRooms([]);
        setPhongLoading(false);
        setPhongError(null);
        setSelectedPhong(null);
        return;
      }

      const params = {
        branch_id: parseInt(selectedCs),
        building_id: parseInt(selectedToa),
      };
      setPhongLoading(true);
      setPhongError(null);
      try {
        const roomsData = await getAllRooms(params);
        setRooms(roomsData.data);
      } catch (error) {
        setPhongError("Không thể tải danh sách phòng.");
        setRooms([]);
      } finally {
        setPhongLoading(false);
      }
    };

    fetchRoomsData();
  }, [selectedCs, selectedToa]);

  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    defaultView: "month-grid",
    views: [
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: filteredEvents,
    calendars: {
      leisure: {
        colorName: "leisure",
        lightColors: {
          main: "#4CAF50",
          container: "#d2e7ff",
          onContainer: "#002859",
        },
      },
      hieu: {
        colorName: "hieu",
        lightColors: {
          main: "#FF5733",
          container: "#FF5733",
          onContainer: "#002859",
        },
      },
    },
    plugins: [eventsService, createEventModalPlugin()],
  });

  useEffect(() => {
    if (calendar) {
      calendar.events.set(filteredEvents);
    }
  }, [calendar, filteredEvents]);

  useEffect(() => {
    eventsService.getAll();
  }, [eventsService]);

  return (
    <>
      <div className="flex min-h-screen">
        <div
          className={`bg-black_admin text-white_admin transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-0"
          } overflow-hidden`}
        >
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col min-h-screen">
          <Header_admin onToggleSidebar={handleToggleSidebar} />

          <div className="flex flex-row flex-wrap gap-3 justify-end px-16 pt-4">
            <Select
              className="w-36"
              styles={customStyles}
              placeholder="Cơ sở"
              options={csOptions}
              value={csOptions.find((c: OptionType) => c.value === selectedCs) || null}
              onChange={(option: OptionType | null) => {
                setSelectedCs(option?.value || null);
                setSelectedToa(null);
                setSelectedPhong(null);
              }}
              isDisabled={csLoading || !!csError}
            />
            <Select
              className="w-36"
              styles={customStyles}
              placeholder="Toà"
              options={toaOptions}
              value={toaOptions.find((t: OptionType) => t.value === selectedToa) || null}
              isDisabled={toaLoading || !!toaError || !selectedCs}
              onChange={(option: OptionType | null) => {
                setSelectedToa(option?.value || null);
                setSelectedPhong(null);
              }}
            />
            <Select
              className="w-36"
              styles={customStyles}
              placeholder="Phòng"
              options={phongOptions}
              value={
                phongOptions.find((p: OptionType) => p.value === selectedPhong) || null
              }
              isDisabled={phongLoading || !!phongError || !selectedToa}
              onChange={(option: OptionType | null) => {
                setSelectedPhong(option?.value || null);
              }}
            />
            <Select
              className="w-36"
              styles={customStyles}
              placeholder="Ngày"
              options={dayOptions}
              value={dayOptions.find((d: OptionType) => d.value === selectedDay) || null}
              onChange={(option: OptionType | null) => {
                setSelectedDay(option?.value || null);
              }}
            />
            <Select
              className="w-36"
              styles={customStyles}
              placeholder="Tháng"
              options={monthOptions}
              value={monthOptions.find((m: OptionType) => m.value === selectedMonth) || null}
              onChange={(option: OptionType | null) => {
                setSelectedMonth(option?.value || null);
              }}
            />
            <Select
              className="w-36"
              styles={customStyles}
              placeholder="Năm"
              options={yearOptions}
              value={yearOptions.find((y: OptionType) => y.value === selectedYear) || null}
              onChange={(option: OptionType | null) => {
                setSelectedYear(option?.value || null);
              }}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={handleSearch}
            >
              Tìm
            </button>
          </div>

          {searchError && (
            <div className="text-red-500 text-center mt-4">
              {searchError}
            </div>
          )}

          <div className="sx-react-calendar-wrapper relative mx-auto pt-2 px-2">
            <ScheduleXCalendar calendarApp={calendar} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;
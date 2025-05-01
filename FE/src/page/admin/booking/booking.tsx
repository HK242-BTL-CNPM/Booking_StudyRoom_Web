import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Header_admin from "../components/header_admin";
import "./calendar.scss";
import { events } from "./eventAdmin";
import Select from "react-select";

import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";

import "@schedule-x/theme-default/dist/index.css";
import { csOptions, toaOptionsByCs, phongOptionsByCs } from "./locationOptions";

function Booking() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Quản lý trạng thái mở/đóng Sidebar

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Đảo trạng thái Sidebar
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

  const [selectedCs, setSelectedCs] = useState<string | null>(null);
  const [selectedToa, setSelectedToa] = useState<string | null>(null);
  const [selectedPhong, setSelectedPhong] = useState<string | null>(null);

  const toaOptions = selectedCs ? toaOptionsByCs[selectedCs] : [];
  const phongOptions =
    selectedCs && selectedToa ? phongOptionsByCs[selectedToa] : [];

  const [filteredEvents, setFilteredEvents] = useState(events);

  const filterEvents = () => {
    let filtered = events;

    if (selectedCs)
      filtered = filtered.filter((e) => e.title.includes(selectedCs));
    if (selectedToa)
      filtered = filtered.filter((e) => e.title.includes(selectedToa));
    if (selectedPhong)
      filtered = filtered.filter((e) => e.title.includes(selectedPhong));

    setFilteredEvents(filtered);
  };

  useEffect(() => {
    filterEvents();
  }, [selectedCs, selectedToa, selectedPhong]);

  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: filteredEvents,
    calendars: {
      leisure: {
        colorName: "leisure",
        lightColors: {
          main: "#4CAF50", // Màu xanh lá cho chế độ sáng
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
    eventsService.getAll(); // Load dữ liệu
  }, [eventsService]);

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div
          className={`bg-black_admin text-white_admin transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-0"
          } overflow-hidden`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Header_admin onToggleSidebar={handleToggleSidebar} />

          <div className="flex flex-row flex-wrap gap-3 justify-end px-16 pt-4">
            <Select
              className="w-36"
              styles={customStyles}
              placeholder="Cơ sở"
              options={csOptions}
              value={csOptions.find((c) => c.value === selectedCs) || null}
              onChange={(option) => {
                setSelectedCs(option?.value || null);
                setSelectedToa(null);
                setSelectedPhong(null);
              }}
            />
            <Select
              className="w-36"
              styles={customStyles}
              placeholder="Toà"
              options={toaOptions}
              value={toaOptions.find((t) => t.value === selectedToa) || null}
              isDisabled={!selectedCs}
              onChange={(option) => {
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
                phongOptions.find((t: any) => t.value === selectedPhong) || null
              }
              isDisabled={!selectedToa}
              onChange={(option) => {
                setSelectedPhong(option?.value || null);
              }}
            />
          </div>

          <div className="sx-react-calendar-wrapper relative mx-auto pt-2 px-2">
            <ScheduleXCalendar calendarApp={calendar} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;

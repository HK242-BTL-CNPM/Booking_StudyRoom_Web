import { useState, useEffect, useRef } from "react";
import "./calendar.scss";
import Header from "../component/header";
import Footer from "../component/footer";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { getAllOrders, fetchRoomById, fetchBuildings, fetchRoomTypes } from "../../../api/apiService";
import "@schedule-x/theme-default/dist/index.css";

import { useAuth } from "../../../AuthContext";

interface Order {
  id: number;
  date: string;
  end: string;
  is_cancel: boolean;
  room_id: number;
  user_id: number;
  begin: string;
  is_used: boolean;
}

interface RoomFromApi {
  branch_id: number;
  building_id: number;
  no_room: string;
  quantity: number;
  id: number;
  type_id: number;
  max_quantity: number;
  active: boolean;
}

interface Building {
  id: number;
  building_name: string;
  branch_id: number;
}

interface RoomType {
  id: number;
  type_name: string;
  max_capacity: number | null;
}

function History() {
  const { token, facilities } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const calendarRef = useRef<any>(null);

  const defaultDate = events.length > 0 ? new Date(events[0].start).toISOString().slice(0, 10) : "2025-05-01";

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: events,
    plugins: [createEventsServicePlugin(), createEventModalPlugin()],
    defaultView: "monthGrid",
    selectedDate: defaultDate,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) {
          console.error("No token available");
          return;
        }

        console.log("Calling getAllOrders with token:", token);
        const response = await getAllOrders();
        console.log("Orders fetched (raw):", response.data);

        const roomTypesResponse = await fetchRoomTypes();
        setRoomTypes(roomTypesResponse);
        console.log("Room types fetched:", roomTypesResponse);

        const ordersWithRoomDetails = await Promise.all(
          response.data.map(async (order: Order) => {
            const roomDetails = await fetchRoomById(order.room_id);
            return { ...order, roomDetails };
          })
        );
        console.log("Orders with room details:", ordersWithRoomDetails);

        const branchIds = [...new Set(ordersWithRoomDetails.map((order: any) => order.roomDetails.branch_id))];
        console.log("Branch IDs:", branchIds);
        const buildingsData = await Promise.all(
          branchIds.map(async (branchId: number) => {
            const buildings = await fetchBuildings(branchId);
            console.log(`Buildings for branch_id ${branchId}:`, buildings);
            return buildings;
          })
        );
        const allBuildings = buildingsData.flat();
        setBuildings(allBuildings);
        console.log("All buildings:", allBuildings);

        const mappedEvents = ordersWithRoomDetails.map((order: Order & { roomDetails: RoomFromApi }) => {
          const { roomDetails } = order;

          const branch = facilities.find((f) => f.id === roomDetails.branch_id)?.branch_name || "N/A";
          const building = allBuildings.find((b) => b.id === roomDetails.building_id)?.building_name || "N/A";
          const roomType = roomTypesResponse.find((rt) => rt.id === roomDetails.type_id)?.type_name || "N/A";

          return {
            id: order.id.toString(),
            title: `Phòng ${roomDetails.no_room} - ${order.is_cancel ? "Đã hủy" : "Đã đặt"} (${branch}, ${building}, ${roomType})`,
            start: new Date(`${order.date}T${order.begin}`).toISOString().slice(0, 19),
            end: new Date(`${order.date}T${order.end}`).toISOString().slice(0, 19),
            description: `User ID: ${order.user_id}, Trạng thái: ${
              order.is_cancel ? "Hủy" : "Hoạt động"
            }, Cơ sở: ${branch}, Tòa: ${building}, Loại: ${roomType}`,
            color: order.is_cancel ? "#F87171" : "#34D399",
          };
        });

        console.log("Mapped events:", mappedEvents);
        setEvents(mappedEvents);

        if (calendarRef.current) {
          calendarRef.current.events.set(mappedEvents);
          console.log("Events updated via ref:", mappedEvents);
        } else {
          console.warn("calendarRef is not available yet");
        }
      } catch (error) {
        console.error("Error fetching orders or room details:", error);
      }
    };

    fetchOrders();
  }, [token, facilities]);

  useEffect(() => {
    if (calendar) {
      calendarRef.current = calendar;
      console.log("Calendar ref assigned:", calendar);
    }
  }, [calendar]);

  // Bọc lịch trong div và ngăn hành vi mặc định của touch
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // Ngăn hành vi mặc định khi cuộn
  };

  return (
    <>
      <Header />
      <div className="px-4 md:px-16 lg:px-24 py-6 font-sans">
        <div
          className="sx-react-calendar-wrapper mx-auto pt-2 px-2"
          onTouchMove={handleTouchMove} // Ngăn hành vi cuộn mặc định
        >
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default History;
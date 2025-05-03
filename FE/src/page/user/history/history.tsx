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
import { getAllOrders } from "../../../api/apiService";
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

function History() {
  const { token } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const calendarRef = useRef<any>(null);

  // Khởi tạo calendar với events từ state
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: events, // Truyền events từ state
    plugins: [createEventsServicePlugin(), createEventModalPlugin()],
    defaultView: "week", // Đảm bảo view tuần được kích hoạt
  });

  // Gọi API và cập nhật sự kiện
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

        const mappedEvents = response.data.map((order: Order) => ({
          id: order.id.toString(),
          title: `Phòng ${order.room_id} - ${order.is_cancel ? "Đã hủy" : "Đã đặt"}`,
          start: new Date(`${order.date}T${order.begin}`).toISOString().slice(0, 19),
          end: new Date(`${order.date}T${order.end}`).toISOString().slice(0, 19),
          description: `User ID: ${order.user_id}, Trạng thái: ${order.is_cancel ? "Hủy" : "Hoạt động"}`,
          color: order.is_cancel ? "#F87171" : "#34D399",
        }));
        console.log("Mapped events:", mappedEvents);
        setEvents(mappedEvents); // Cập nhật state
        // Cập nhật lại calendar nếu ref đã sẵn sàng
        if (calendarRef.current) {
          calendarRef.current.events.set(mappedEvents);
          console.log("Events updated via ref:", mappedEvents);
        } else {
          console.warn("calendarRef is not available yet");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [token]);

  // Lưu ref khi calendar được gắn
  useEffect(() => {
    if (calendar) {
      calendarRef.current = calendar;
      console.log("Calendar ref assigned:", calendar);
    }
  }, [calendar]);

  return (
    <>
      <Header />
      <div className="px-4 md:px-16 lg:px-24 py-6 font-sans">
        <div className="sx-react-calendar-wrapper mx-auto pt-2 px-2">
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default History;
import { useState, useEffect } from "react";
import "./calendar.scss";
import events from "./event";
import Header from "../component/header";
import Footer from "../component/footer";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";

function History() {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: events,
    plugins: [
      eventsService,
      createEventModalPlugin(),
      // createDragAndDropPlugin()
    ],
  });

  useEffect(() => {
    // get all events
    eventsService.getAll();
  }, [eventsService]);
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

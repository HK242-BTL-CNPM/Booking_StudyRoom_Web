import { Routes, Route } from "react-router-dom";
import Book from "./page/user/book/book";
import History from "./page/user/history/history";
import Home from "./page/user/home/home";
import Login from "./page/auth/login";
import StatusRoom from "./page/user/status/status";
import ReportIssue from "./page/user/report/report";
import Profile from "./page/user/profile/profile";
import Dashboard from "./page/admin/dashboard/Dashboard";
import Booking from "./page/admin/booking/booking";
import User from "./page/admin/user/user";
import Room from "./page/admin/room/room";
import Device from "./page/admin/device/device";
import Notification from "./page/admin/notification/notification";
import Checkin from "./page/user/checkin/checkin";

import "./assets/css/output.css";
import PrivateRoute from "./page/auth/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/user" element={<User />} />
        <Route path="/room" element={<Room />} />
        <Route path="/device" element={<Device />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/checkin" element={<Checkin />} />

        {/* Các route không cần bảo vệ */}
        {/* Các route cần bảo vệ */}
        <Route
          path="/book"
          element={
            <PrivateRoute>
              <Book />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        <Route
          path="/status"
          element={
            <PrivateRoute>
              <StatusRoom />
            </PrivateRoute>
          }
        />
        <Route
          path="/report"
          element={
            <PrivateRoute>
              <ReportIssue />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
import { Routes, Route } from "react-router-dom";

import Login from "./page/auth/login";
import PrivateRoute from "./page/auth/PrivateRoute";

// --- Import các trang User---
import Book from "./page/user/book/book";
import History from "./page/user/history/history";
import Home from "./page/user/home/home";
import StatusRoom from "./page/user/status/status";
import ReportIssue from "./page/user/report/report";
import Profile from "./page/user/profile/profile";
import Checkin from "./page/user/checkin/checkin";

// --- Import các trang Admin---
import Dashboard from "./page/admin/dashboard/Dashboard";
import Booking from "./page/admin/booking/booking";
import User from "./page/admin/user/user";
import Room from "./page/admin/room/room";
import Device from "./page/admin/device/device";
import Notification from "./page/admin/notification/notification";
import { NotificationProvider } from "./page/admin/notification/NotificationContext";

import "./assets/css/output.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <NotificationProvider>
              <Dashboard />
            </NotificationProvider>
          }
        />
        <Route
          path="/booking"
          element={
            <NotificationProvider>
              <Booking />
            </NotificationProvider>
          }
        />
        <Route
          path="/user"
          element={
            <NotificationProvider>
              <User />
            </NotificationProvider>
          }
        />
        <Route
          path="/room"
          element={
            <NotificationProvider>
              <Room />
            </NotificationProvider>
          }
        />
        <Route
          path="/device"
          element={
            <NotificationProvider>
              <Device />
            </NotificationProvider>
          }
        />
        <Route
          path="/notification"
          element={
            <NotificationProvider>
              <Notification />
            </NotificationProvider>
          }
        />

        {/* Các route không cần bảo vệ */}
        {/* Các route cần bảo vệ của User */}
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
          path="/checkin"
          element={
            <PrivateRoute>
              <Checkin />
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

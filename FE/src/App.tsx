import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./page/auth/login";
import PrivateRoute from "./page/auth/PrivateRoute";
import AdminRoute from "./page/auth/AdminRoute";
import { useAuth } from "./AuthContext";

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
  const { user } = useAuth();
  return (
    <>
      <Routes>
        {/* Các route không cần bảo vệ */}
        <Route
          path="/"
          element={
            user?.isAdmin ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            )
          }
        />
        <Route path="/login" element={<Login />} />

        {/* Các route cần bảo vệ của Admin */}
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <NotificationProvider>
                <Dashboard />
              </NotificationProvider>
            </AdminRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <AdminRoute>
              <NotificationProvider>
                <Booking />
              </NotificationProvider>
            </AdminRoute>
          }
        />
        <Route
          path="/user"
          element={
            <AdminRoute>
              <NotificationProvider>
                <User />
              </NotificationProvider>
            </AdminRoute>
          }
        />
        <Route
          path="/room"
          element={
            <AdminRoute>
              <NotificationProvider>
                <Room />
              </NotificationProvider>
            </AdminRoute>
          }
        />
        <Route
          path="/device"
          element={
            <AdminRoute>
              <NotificationProvider>
                <Device />
              </NotificationProvider>
            </AdminRoute>
          }
        />
        <Route
          path="/notification"
          element={
            <AdminRoute>
              <NotificationProvider>
                <Notification />
              </NotificationProvider>
            </AdminRoute>
          }
        />

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

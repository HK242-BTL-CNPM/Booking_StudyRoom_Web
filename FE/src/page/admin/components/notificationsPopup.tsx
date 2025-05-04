// src/page/admin/notification/NotificationsPopup.tsx
import React from "react";
import { FaBell } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  mockNotifications,
  NotificationRowProps,
} from "../notification/mockNotifications";

// --- NotificationItem ---
function NotificationItem({
  icon,
  location,
  message,
  isNew,
  timestamp,
  onClick, // Thêm onClick
}: NotificationRowProps & { icon: React.ReactNode; onClick?: () => void }) {
  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
        isNew ? "bg-blue-100" : "hover:bg-gray-50"
      }`} // Đổi màu nền thành bg-blue-100
      onClick={onClick} // Gọi hàm onClick khi bấm
    >
      <div className="flex items-center justify-center bg-blue-200 text-blue-600 p-3 rounded-full flex-shrink-0">
        {icon}
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-sm font-semibold text-gray-800">{message}</p>
        <p className="text-xs text-gray-500">{location}</p>
        <p className="text-xs text-gray-400">{timestamp}</p>
      </div>
    </div>
  );
}
// --- Styled Components ---
const PopupContainer = styled.div`
  position: fixed;
  top: 5rem;
  right: 0rem;
  z-index: 9999;

  min-width: 320px;
  max-width: 32rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border: 1px solid #e5e7eb;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    right: 0.5rem;
    min-width: 90vw;
  }
`;

// (Các styled components khác: PopupTitle, PopupList, NoNotificationsText, SeeMoreButton giữ nguyên)
const PopupTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.75rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
`;

const PopupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 20rem;
  overflow-y: auto;
  margin-bottom: 0.75rem;
`;

const NoNotificationsText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  padding: 1rem 0;
`;

const SeeMoreButton = styled.button`
  width: 100%;
  text-align: center;
  background-color: #eff6ff;
  color: #2563eb;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  margin-top: auto;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #dbeafe;
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px #93c5fd;
  }
`;

// --- Component Chính ---
interface NotificationsPopupProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

const NotificationsPopup: React.FC<NotificationsPopupProps> = ({
  forwardedRef,
}) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState(mockNotifications); // Thêm state để quản lý thông báo

  // Lấy danh sách thông báo từ mockNotifications
  const handleNotificationClick = (index: number) => {
    setNotifications((prev) =>
      prev.map((noti, i) => (i === index ? { ...noti, isNew: false } : noti))
    );
  };

  const handleSeeMoreClick = () => {
    navigate("/notification");
  };

  return (
    <PopupContainer ref={forwardedRef}>
      <PopupTitle>Thông báo</PopupTitle>
      <PopupList>
        {notifications.length > 0 ? (
          notifications.map((noti, index) => (
            <NotificationItem
              key={index}
              icon={<FaBell size={16} />}
              senderName={noti.senderName}
              location={noti.location}
              message={noti.message}
              isNew={noti.isNew}
              timestamp={noti.timestamp}
              onClick={() => handleNotificationClick(index)} // Truyền hàm onClick
            />
          ))
        ) : (
          <NoNotificationsText>Không có thông báo mới.</NoNotificationsText>
        )}
      </PopupList>
      {notifications.length > 0 && (
        <SeeMoreButton onClick={handleSeeMoreClick}>Xem thêm</SeeMoreButton>
      )}
    </PopupContainer>
  );
};

export default NotificationsPopup;

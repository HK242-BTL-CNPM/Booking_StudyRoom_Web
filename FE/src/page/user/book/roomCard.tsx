// src/pages/user/book/RoomCard.tsx
import React from "react";
import { FaUsers, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import imageBook from "../../../assets/images/image_book.jpg"; // Adjust path if needed

// src/pages/user/book/types.ts
export interface Room {
  id: number;
  name: string;
  facility: string; // CS1 hoặc CS2
  details: string; // Ví dụ: H6-123, CS2 hoặc B4-205, CS1
  type: string;
  capacity: number; // Vẫn giữ capacity trong data, dù không hiển thị
  available: boolean;
}

interface RoomCardProps {
  room: Room; // room.available sẽ luôn là true ở đây
  onShowDetails: (room: Room) => void;
  onBookRoom: (roomId: number) => void;
}

// --- Style Objects (Copied from original) ---
const cardStyle: React.CSSProperties = {
  // width: "496px", // Remove fixed width for responsiveness
  minWidth: "300px", // Minimum width before wrapping/shrinking
  maxWidth: "496px", // Keep max width
  height: "auto", // Auto height based on content
  border: "1px solid #34394266",
  borderRadius: "20px",
  padding: "20px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 12px rgba(52, 57, 66, 0.08)",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  boxSizing: "border-box",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
};

const cardTitleStyle: React.CSSProperties = {
  color: "#343942",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
  margin: 0,
  flexShrink: 0,
};

// Responsive Content Area using Flexbox
const cardContentStyle: React.CSSProperties = {
  display: "flex",
  gap: "25px",
  alignItems: "center",
  flexGrow: 1,
  overflow: "hidden",
  flexWrap: "wrap", // Allow wrapping on small screens
  justifyContent: "center", // Center items when wrapped
};

const cardImageStyle: React.CSSProperties = {
  width: "170px",
  height: "170px",
  borderRadius: "15px",
  objectFit: "cover",
  flexShrink: 0,
};

const cardDetailsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  flexGrow: 1,
  minWidth: "200px", // Ensure details have some minimum width
  overflow: "hidden",
};

const detailItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  margin: 0,
  fontSize: "16px", // Có thể điều chỉnh font size nếu cần
  color: "#555",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
};
const iconStyle: React.CSSProperties = {
  marginRight: "15px",
  color: "#6c757d",
  flexShrink: 0,
  width: "20px", // Đảm bảo icon có chiều rộng cố định
  textAlign: "center", // Căn giữa icon nếu cần
};

// Responsive Actions Area using Flexbox
const cardActionsStyle: React.CSSProperties = {
  marginTop: "auto", // Pushes to bottom
  display: "flex",
  gap: "15px", // Use gap instead of fixed margin
  alignItems: "center",
  justifyContent: "space-between", // Space out buttons
  flexWrap: "wrap", // Allow buttons to wrap on small screens
};

const baseButtonStyle: React.CSSProperties = {
  padding: "10px 20px", // Adjust padding
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition:
    "background-color 0.2s ease, opacity 0.2s ease, transform 0.1s ease",
  flexGrow: 1, // Allow buttons to grow
  minWidth: "120px", // Minimum button width
  textAlign: "center",
};

const detailsButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  backgroundColor: "#EEF4FE",
  color: "#2563EB",
};

const bookButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  backgroundColor: "#0d6efd",
  color: "#fff",
};
// --- End Style Objects ---

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onShowDetails,
  onBookRoom,
}) => {
  // Helper để lấy tên Cơ sở đầy đủ
  const getFacilityName = (facilityCode: string) => {
    return facilityCode === "CS1" ? "Cơ sở 1" : "Cơ sở 2";
  };

  return (
    <div style={cardStyle} className="room-card">
      <h2 style={cardTitleStyle}>{room.name}</h2>
      <div style={cardContentStyle}>
        <img src={imageBook} alt={room.name} style={cardImageStyle} />
        {/* Thay đổi nội dung hiển thị ở đây */}
        <div style={cardDetailsStyle}>
          {/* Dòng 1: Loại phòng (Giữ nguyên) */}
          <p style={detailItemStyle}>
            <FaUsers size={20} style={iconStyle} /> {room.type}
          </p>
          {/* Dòng 2: Cơ sở (Thay thế số người) */}
          <p style={detailItemStyle}>
            <FaMapMarkerAlt size={20} style={iconStyle} />{" "}
            {getFacilityName(room.facility)}
          </p>
          {/* Dòng 3: Tòa - Phòng (Thay icon) */}
          <p style={detailItemStyle}>
            <FaBuilding size={18} style={iconStyle} /> {/* Icon tòa nhà */}
            {room.details.split(",")[0]} {/* Chỉ hiển thị phần Tòa-Phòng */}
          </p>
        </div>
      </div>
      <div style={cardActionsStyle}>
        <button style={detailsButtonStyle} onClick={() => onShowDetails(room)}>
          Chi tiết
        </button>
        <button style={bookButtonStyle} onClick={() => onBookRoom(room.id)}>
          Đặt phòng
        </button>
      </div>
    </div>
  );
};

export default RoomCard;

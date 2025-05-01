// src/pages/user/book/roomModal.tsx
import React from "react";
// Import Room interface from RoomCard or define again
import { Room } from "./roomCard"; // Or define it here

interface RoomModalProps {
  room: Room | null; // Use the imported/defined interface
  onClose: () => void;
  onBookRoom: (roomId: number) => void;
}

// --- Style Objects (Adapted) ---
const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker overlay
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  padding: "20px", // Padding for smaller screens
  boxSizing: "border-box",
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  padding: "20px 30px", // Adjust padding
  width: "100%", // Responsive width
  maxWidth: "771px", // Max width from original
  maxHeight: "90vh", // Prevent modal from being too tall
  overflowY: "auto", // Allow scrolling if content overflows
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  boxSizing: "border-box",
};

const modalHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #F1F5F9",
  paddingBottom: "10px",
  marginBottom: "20px",
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: "24px", // Slightly smaller title
  fontWeight: "bold",
  margin: 0, // Remove default margin
};

const closeButtonStyle: React.CSSProperties = {
  background: "#F8FAFC",
  border: "1px solid #E2E8F0", // Add subtle border
  borderRadius: "50%", // Make it round
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  cursor: "pointer",
  color: "#64748B",
};

const detailsBoxStyle: React.CSSProperties = {
  border: "1px solid #F1F5F9",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "20px",
};

const detailsHeaderStyle: React.CSSProperties = {
  borderBottom: "1px solid #F1F5F9",
  paddingBottom: "10px",
  marginBottom: "20px",
};

const detailsTitleStyle: React.CSSProperties = {
  fontSize: "18px", // Smaller details title
  fontWeight: "bold",
  margin: 0,
};

// Responsive Grid for Details
const detailsGridStyle: React.CSSProperties = {
  display: "grid",
  // Adjust columns based on screen size (example) - better with media queries
  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
  gap: "15px", // Increase gap
  alignItems: "start", // Align items to the start
  marginBottom: "20px",
  fontSize: "14px", // Base font size for details
};

const detailLabelStyle: React.CSSProperties = {
  fontWeight: "bold",
  color: "#334155", // Darker label color
  marginBottom: "5px", // Space below label
};

const detailValueStyle: React.CSSProperties = {
  wordBreak: "break-word", // Prevent long text overflow
};

const statusStyle = (available: boolean): React.CSSProperties => ({
  fontWeight: "bold",
  color: available ? "#16A34A" : "#DC2626", // Green/Red colors
});

const equipmentListStyle: React.CSSProperties = {
  fontSize: "14px",
  listStyleType: "disc",
  paddingLeft: "20px",
  marginBottom: "10px",
  display: "grid", // Use grid for better layout
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", // Responsive columns
  gap: "5px 20px", // Row and column gap
};

const modalFooterStyle: React.CSSProperties = {
  display: "flex",
  // justifyContent: "space-between", // Keep space-between
  gap: "15px", // Add gap
  alignItems: "center",
  marginTop: "20px",
  flexWrap: "wrap", // Allow buttons to wrap
  justifyContent: "flex-end", // Align buttons right by default
};

const modalButtonStyle: React.CSSProperties = {
  border: "none",
  borderRadius: "8px",
  padding: "12px 25px", // Adjust padding
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px", // Adjust font size
  flexGrow: 1, // Allow buttons to grow on wrap
  minWidth: "120px", // Min width
  textAlign: "center",
};

const cancelButtonStyle: React.CSSProperties = {
  ...modalButtonStyle,
  backgroundColor: "#EEF4FE",
  color: "#2563EB",
  order: 1, // Ensure Cancel is first visually on wrap
};

const bookButtonStyle: React.CSSProperties = {
  ...modalButtonStyle,
  backgroundColor: "#2563EB",
  color: "#fff",
  order: 2, // Ensure Book is second visually on wrap
};

// --- End Style Objects ---

const RoomModal: React.FC<RoomModalProps> = ({ room, onClose, onBookRoom }) => {
  if (!room) {
    return null;
  }

  const handleBookClick = () => {
    onBookRoom(room.id);
    onClose();
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={modalHeaderStyle}>
          <h2 style={modalTitleStyle}>{room.name}</h2>
          <button style={closeButtonStyle} onClick={onClose}>
            ✖
          </button>
        </div>

        {/* Details Box */}
        <div style={detailsBoxStyle}>
          <div style={detailsHeaderStyle}>
            <h3 style={detailsTitleStyle}>Chi tiết phòng</h3>
          </div>
          {/* Details Grid */}
          <div style={detailsGridStyle}>
            <div>
              <div style={detailLabelStyle}>LOẠI PHÒNG</div>
              <div style={detailValueStyle}>{room.type}</div>
            </div>
            <div>
              <div style={detailLabelStyle}>SỐ LƯỢNG</div>
              <div style={detailValueStyle}>{room.capacity} người</div>
            </div>
            <div>
              <div style={detailLabelStyle}>PHÒNG</div>
              <div style={detailValueStyle}>{room.details}</div>
            </div>
            <div>
              <div style={detailLabelStyle}>TRẠNG THÁI</div>
              <div
                style={{ ...detailValueStyle, ...statusStyle(room.available) }}
              >
                {room.available ? "Còn trống" : "Đã đặt"}
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div
            style={{
              ...detailLabelStyle,
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            Thiết bị:
          </div>
          <ul style={equipmentListStyle}>
            <li>Máy Lạnh</li>
            <li>Đèn</li>
            <li>Máy Chiếu</li>
            <li>Ổ cắm</li>
            <li>Màn hình</li>
            <li>Bảng trắng</li>
          </ul>
        </div>

        {/* Footer */}
        <div style={modalFooterStyle}>
          <button onClick={onClose} style={cancelButtonStyle}>
            Hủy
          </button>
          {room.available && (
            <button style={bookButtonStyle} onClick={handleBookClick}>
              Đặt phòng này
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomModal;

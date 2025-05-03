import React from "react";
import { Room } from "./roomCard";

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
  onBookRoom: (roomId: number) => void;
}

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  padding: "20px",
  boxSizing: "border-box",
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  padding: "20px 30px",
  width: "100%",
  maxWidth: "771px",
  maxHeight: "90vh",
  overflowY: "auto",
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
  fontSize: "24px",
  fontWeight: "bold",
  margin: 0,
};

const closeButtonStyle: React.CSSProperties = {
  background: "#F8FAFC",
  border: "1px solid #E2E8F0",
  borderRadius: "50%",
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
  fontSize: "18px",
  fontWeight: "bold",
  margin: 0,
};

const detailsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
  gap: "15px",
  alignItems: "start",
  marginBottom: "20px",
  fontSize: "14px",
};

const detailLabelStyle: React.CSSProperties = {
  fontWeight: "bold",
  color: "#334155",
  marginBottom: "5px",
};

const detailValueStyle: React.CSSProperties = {
  wordBreak: "break-word",
};

const statusStyle = (available: boolean): React.CSSProperties => ({
  fontWeight: "bold",
  color: available ? "#16A34A" : "#DC2626",
});

const equipmentListStyle: React.CSSProperties = {
  fontSize: "14px",
  listStyleType: "disc",
  paddingLeft: "20px",
  marginBottom: "10px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "5px 20px",
};

const modalFooterStyle: React.CSSProperties = {
  display: "flex",
  gap: "15px",
  alignItems: "center",
  marginTop: "20px",
  flexWrap: "wrap",
  justifyContent: "flex-end",
};

const modalButtonStyle: React.CSSProperties = {
  border: "none",
  borderRadius: "8px",
  padding: "12px 25px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
  flexGrow: 1,
  minWidth: "120px",
  textAlign: "center",
};

const cancelButtonStyle: React.CSSProperties = {
  ...modalButtonStyle,
  backgroundColor: "#EEF4FE",
  color: "#2563EB",
  order: 1,
};

const bookButtonStyle: React.CSSProperties = {
  ...modalButtonStyle,
  backgroundColor: "#2563EB",
  color: "#fff",
  order: 2,
};

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
        <div style={modalHeaderStyle}>
          <h2 style={modalTitleStyle}>{room.name}</h2>
          <button style={closeButtonStyle} onClick={onClose}>
            ✖
          </button>
        </div>

        <div style={detailsBoxStyle}>
          <div style={detailsHeaderStyle}>
            <h3 style={detailsTitleStyle}>Chi tiết phòng</h3>
          </div>
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
              <div style={{ ...detailValueStyle, ...statusStyle(room.available) }}>
                {room.available ? "Còn trống" : "Đã đặt"}
              </div>
            </div>
          </div>

          <div style={{ ...detailLabelStyle, marginTop: "20px", marginBottom: "10px" }}>
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
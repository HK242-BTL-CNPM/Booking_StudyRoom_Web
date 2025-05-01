// src/pages/user/book/RoomList.tsx
import React from "react";
import RoomCard, { Room } from "./roomCard";

const ROOMS_PER_PAGE = 4;

interface RoomListProps {
  rooms: Room[];
  currentPage: number;
  onShowDetails: (room: Room) => void;
  onBookRoom: (roomId: number) => void;
  onPageChange: (page: number) => void;
}

// --- Style Objects (Ensure these are correct in your file) ---
const roomGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", // <-- Tăng min lên 500px hoặc hơn nếu cần
  gap: "30px",
  justifyContent: "center",
  maxWidth: "1150px",
  padding: "0 10px",
  margin: "0 auto",
};

const paginationContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "30px",
  gap: "10px",
  flexWrap: "wrap",
};

const paginationButtonStyle: React.CSSProperties = {
  padding: "10px 15px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#fff",
  cursor: "pointer",
  minWidth: "40px",
  textAlign: "center",
  fontSize: "1rem", // Ensure consistency
  lineHeight: "1.5", // Ensure consistency
};

const activePaginationButtonStyle: React.CSSProperties = {
  ...paginationButtonStyle,
  backgroundColor: "#2563EB",
  color: "#fff",
  borderColor: "#2563EB",
  fontWeight: "bold", // Make active button stand out
};

const disabledPaginationButtonStyle: React.CSSProperties = {
  ...paginationButtonStyle,
  backgroundColor: "#f1f1f1",
  cursor: "not-allowed",
  color: "#aaa",
  borderColor: "#ddd", // Slightly different border for disabled
};
// --- End Style Objects ---

const RoomList: React.FC<RoomListProps> = ({
  rooms, // rooms giờ chỉ chứa phòng available
  currentPage,
  onShowDetails,
  onBookRoom,
  onPageChange,
}) => {
  // Logic tính toán totalPages, currentRooms không đổi
  const totalRoomsCount = rooms.length;
  const totalPages = Math.ceil(totalRoomsCount / ROOMS_PER_PAGE);
  const currentRooms = rooms.slice(
    (currentPage - 1) * ROOMS_PER_PAGE,
    currentPage * ROOMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div>
      {/* Room Grid */}
      <div style={roomGridStyle}>
        {totalRoomsCount === 0 ? (
          <p
            style={{
              textAlign: "center",
              gridColumn: "1 / -1",
              color: "#6c757d",
              fontSize: "18px",
              padding: "40px 0",
            }}
          >
            Không tìm thấy phòng trống phù hợp. {/* Sửa text */}
          </p>
        ) : (
          // Map qua danh sách phòng CHỈ CÓ PHÒNG TRỐNG
          currentRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onShowDetails={onShowDetails}
              onBookRoom={onBookRoom} // Nút Đặt phòng sẽ luôn hiển thị vì room.available=true
            />
          ))
        )}
      </div>

      {/* Pagination Controls (giữ nguyên) */}
      {totalPages > 1 && (
        <div style={paginationContainerStyle}>
          {/* ... pagination buttons ... */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={
              currentPage === 1
                ? disabledPaginationButtonStyle
                : paginationButtonStyle
            }
            aria-label="Previous Page"
          >
            {" "}
            {"<"}{" "}
          </button>
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            const isActive = currentPage === pageNumber;
            const buttonStyle = isActive
              ? activePaginationButtonStyle
              : paginationButtonStyle;
            return (
              <button
                key={`page-${pageNumber}`}
                onClick={() => handlePageChange(pageNumber)}
                style={buttonStyle}
                aria-current={isActive ? "page" : undefined}
              >
                {" "}
                {pageNumber}{" "}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={
              currentPage === totalPages
                ? disabledPaginationButtonStyle
                : paginationButtonStyle
            }
            aria-label="Next Page"
          >
            {" "}
            {">"}{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomList;

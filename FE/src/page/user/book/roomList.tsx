import React from "react";
import RoomCard, { Room } from "./roomCard";
import styles from './roomList.module.css';

const ROOMS_PER_PAGE = 4;

interface RoomListProps {
  rooms: Room[];
  currentPage: number;
  onShowDetails: (room: Room) => void;
  onBookRoom: (roomId: number) => void;
  onPageChange: (page: number) => void;
}

const RoomList: React.FC<RoomListProps> = ({
  rooms,
  currentPage,
  onShowDetails,
  onBookRoom,
  onPageChange,
}) => {
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
      <div className={styles.roomGrid}>
        {totalRoomsCount === 0 ? (
          <p className={styles.noRoomsMessage}>
            Không tìm thấy phòng trống phù hợp.
          </p>
        ) : (
          currentRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onShowDetails={onShowDetails}
              onBookRoom={onBookRoom}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${styles.paginationButton} ${
              currentPage === 1 ? styles.disabledPaginationButton : ""
            }`}
            aria-label="Previous Page"
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            const isActive = currentPage === pageNumber;
            return (
              <button
                key={`page-${pageNumber}`}
                onClick={() => handlePageChange(pageNumber)}
                className={`${styles.paginationButton} ${
                  isActive ? styles.activePaginationButton : ""
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${styles.paginationButton} ${
              currentPage === totalPages ? styles.disabledPaginationButton : ""
            }`}
            aria-label="Next Page"
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomList;
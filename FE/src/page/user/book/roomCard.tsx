import React from "react";
import { FaUsers, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import imageBook from "../../../assets/images/image_book.jpg";
import styles from './roomCard.module.css';

export interface Room {
  id: number;
  name: string;
  facility: string;
  details: string;
  type: string;
  capacity: number;
  available: boolean;
}

interface RoomCardProps {
  room: Room;
  onShowDetails: (room: Room) => void;
  onBookRoom: (roomId: number) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onShowDetails,
  onBookRoom,
}) => {
  const getFacilityName = (facilityCode: string) => {
    return facilityCode === "CS 1" ? "Cơ sở 1" : "Cơ sở 2";
  };

  return (
    <div className={styles.roomCard}>
      <h2 className={styles.cardTitle}>{room.name}</h2>
      <div className={styles.cardContent}>
        <img src={imageBook} alt={room.name} className={styles.cardImage} />
        <div className={styles.cardDetails}>
          <p className={styles.detailItem}>
            <FaUsers size={20} className={styles.icon} /> {room.type}
          </p>
          <p className={styles.detailItem}>
            <FaMapMarkerAlt size={20} className={styles.icon} />{" "}
            {getFacilityName(room.facility)}
          </p>
          <p className={styles.detailItem}>
            <FaBuilding size={18} className={styles.icon} />
            {room.details.split(",")[0]}
          </p>
        </div>
      </div>
      <div className={styles.cardActions}>
        <button className={`${styles.baseButton} ${styles.detailsButton}`} onClick={() => onShowDetails(room)}>
          Chi tiết
        </button>
        <button className={`${styles.baseButton} ${styles.bookButton}`} onClick={() => onBookRoom(room.id)}>
          Đặt phòng
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
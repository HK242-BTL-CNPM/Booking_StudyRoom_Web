import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar"; // Điều chỉnh đường dẫn nếu cần
import Header_admin from "../components/header_admin"; // Điều chỉnh đường dẫn nếu cần
import styles from "./notification.module.css"; // Tạo file CSS Module riêng cho trang này
import { mockNotifications, NotificationRowProps } from "./mockNotifications";
import Select from "react-select";

function NotificationRow({
  avatarUrl,
  senderName,
  location,
  message,
  timestamp,
  isNew,
  onClick,
}: NotificationRowProps & { onClick?: () => void }) {
  return (
    <div
      className={`${styles.notificationRow} ${isNew ? styles.new : ""}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.senderInfo}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={senderName} className={styles.avatar} />
        ) : (
          // Placeholder nếu không có avatar
          <div className={styles.avatarPlaceholder}>
            {/* Lấy chữ cái đầu, ví dụ */}
            {senderName.substring(0, 1).toUpperCase()}
          </div>
        )}
        <div className={styles.senderDetails}>
          <span className={styles.senderName}>{senderName}</span>
          <span className={styles.location}>{location}</span>
        </div>
      </div>
      <div className={styles.message}>{message}</div>
      <div className={styles.timestamp}>{timestamp}</div>
      {/* Có thể thêm nút hành động (đánh dấu đã đọc, xóa, ...) */}
    </div>
  );
}

// --- Component Trang Notification ---
function NotificationPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState<NotificationRowProps[]>(
    []
  ); // State chứa danh sách thông báo
  const [isLoading, setIsLoading] = useState(false); // State loading

  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc"); // desc: mới nhất

  const filteredNotifications =
    filter === "all" ? notifications : notifications.filter((n) => n.isNew);

  const parseDate = (timestamp: string) => {
    const [day, month, year] = timestamp.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const handleRead = (index: number) => {
    setNotifications((prev) =>
      prev.map((n, i) => (i === index ? { ...n, isNew: false } : n))
    );
  };
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    const dateA = parseDate(a.timestamp);
    const dateB = parseDate(b.timestamp);
    return sortOrder === "desc"
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });

  // --- Fetch dữ liệu thông báo ---
  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setNotifications(mockNotifications);
      setIsLoading(false);
    };
    fetchNotifications();
  }, []);

  return (
    <div className={styles.notificationPageLayout}>
      {/* Sidebar */}
      <div
        className={styles.sidebarContainer}
        style={{ width: isSidebarOpen ? "16rem" : "0" }}
      >
        {isSidebarOpen && <Sidebar />}
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header (Không cần truyền onBellClick) */}
        <Header_admin onToggleSidebar={handleToggleSidebar} />

        {/* Khu vực nội dung chính của trang */}
        <div className={styles.contentArea}>
          <h1 className={styles.pageTitle}>Notifications</h1>

          {/* Phần Lọc/Sắp xếp (Tùy chọn) */}
          <div className={styles.filters}>
            <Select
              classNamePrefix="selectCustom"
              styles={{
                container: (base) => ({ ...base, width: 144 }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#4780f9"
                    : state.isFocused
                    ? "#fff"
                    : "#fff",
                  color: state.isSelected ? "#fff" : "#111827",
                  fontWeight: state.isSelected ? 600 : 400,
                  cursor: "pointer",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
              value={{
                value: filter,
                label: filter === "all" ? "Tất cả" : "Chưa đọc",
              }}
              onChange={(option) =>
                setFilter(option?.value as "all" | "unread")
              }
              options={[
                { value: "all", label: "Tất cả" },
                { value: "unread", label: "Chưa đọc" },
              ]}
              isSearchable={false}
              placeholder="Tất cả"
            />
            <Select
              classNamePrefix="selectCustom"
              styles={{
                container: (base) => ({ ...base, width: 144 }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#4780f9"
                    : state.isFocused
                    ? "#fff"
                    : "#fff",
                  color: state.isSelected ? "#fff" : "#111827",
                  fontWeight: state.isSelected ? 600 : 400,
                  cursor: "pointer",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
              value={{
                value: sortOrder,
                label: sortOrder === "desc" ? "Mới nhất" : "Cũ nhất",
              }}
              onChange={(option) =>
                setSortOrder(option?.value as "desc" | "asc")
              }
              options={[
                { value: "desc", label: "Mới nhất" },
                { value: "asc", label: "Cũ nhất" },
              ]}
              isSearchable={false}
              placeholder="Mới nhất"
            />
          </div>

          {/* Danh sách thông báo */}
          <div className={styles.notificationListContainer}>
            {isLoading ? (
              <p>Loading notifications...</p>
            ) : sortedNotifications.length > 0 ? (
              sortedNotifications.map((noti, index) => (
                <NotificationRow
                  key={index}
                  {...noti}
                  onClick={() => handleRead(notifications.indexOf(noti))}
                />
              ))
            ) : (
              <p>Không có thông báo nào.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;

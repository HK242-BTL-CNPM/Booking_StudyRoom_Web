export interface NotificationRowProps {
  avatarUrl?: string; // Avatar người gửi (tùy chọn)
  senderName: string;
  location: string;
  message: string;
  timestamp: string; // Ví dụ: "21/02/2025"
  isNew?: boolean; // Đánh dấu thông báo mới (tùy chọn)
  onClick?: () => void;
}

export const mockNotifications: NotificationRowProps[] = [
  {
    senderName: "Trịnh Thị Mỹ Lệ",
    location: "Phòng 12 tầng 4",
    message: "Quạt không hoạt động",
    timestamp: "21/02/2025",
    isNew: true,
  },
  {
    senderName: "Hệ thống",
    location: "Phòng 10 tầng 3",
    message: "Đèn sắp hết hạn",
    timestamp: "20/02/2025",
    isNew: true,
  },
  {
    senderName: "Cảm biến",
    location: "Phòng Server",
    message: "Nhiệt độ cao bất thường",
    timestamp: "20/02/2025",
  },
  {
    senderName: "Trịnh Thị Mỹ Lệ",
    location: "Phòng 15 tầng 5",
    message: "Quạt không hoạt động",
    timestamp: "19/02/2025",
  },
  {
    senderName: "Trịnh Thị Mỹ Lệ",
    location: "Phòng 12 tầng 4",
    message: "Quạt không hoạt động",
    timestamp: "18/02/2025",
  },
  {
    senderName: "Trịnh Thị Mỹ Lệ",
    location: "Phòng 12 tầng 4",
    message: "Quạt không hoạt động",
    timestamp: "17/02/2025",
  },
  {
    senderName: "Trịnh Thị Mỹ Lệ",
    location: "Phòng 12 tầng 4",
    message: "Quạt không hoạt động",
    timestamp: "17/02/2025",
  },
  {
    senderName: "Trịnh Thị Mỹ Lệ",
    location: "Phòng 12 tầng 4",
    message: "Quạt không hoạt động",
    timestamp: "17/02/2025",
  },
  // Thêm nhiều dữ liệu mẫu để test scroll
  ...Array.from({ length: 20 }).map((_, i) => ({
    senderName: "Nguyễn Văn A",
    location: `Phòng ${100 + i} tầng 2`,
    message: `Thông báo test số ${i + 1}`,
    timestamp: `10/02/2025`,
  })),
];

// src/components/chartComponent.tsx
import React, { useEffect, useState } from "react"; // Thêm useState
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Đăng ký các thành phần cần dùng
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

// --- Định nghĩa kiểu Props ---
interface ChartComponentProps {
  timeFrame: "week" | "month"; // Chấp nhận prop timeFrame
}

// --- Component ---
// Sử dụng kiểu props đã định nghĩa
const ChartComponent: React.FC<ChartComponentProps> = ({ timeFrame }) => {
  // --- State để lưu trữ dữ liệu biểu đồ động ---
  // Khởi tạo state để chứa labels và data points
  const [chartData, setChartData] = useState({
    labels: [] as string[], // Khởi tạo mảng string rỗng
    datasets: [
      {
        label: "Số lượng đặt phòng",
        data: [] as number[], // Khởi tạo mảng number rỗng
        borderColor: "#2563EB",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  });

  // --- Effect để fetch/cập nhật dữ liệu khi timeFrame thay đổi ---
  useEffect(() => {
    console.log("ChartComponent: timeFrame changed to", timeFrame);

    // TODO: Thay thế phần này bằng logic fetch dữ liệu thực tế
    // Dựa vào timeFrame ('week' hoặc 'month'), gọi API hoặc lấy dữ liệu tương ứng
    let newLabels: string[] = [];
    let newDataPoints: number[] = [];

    if (timeFrame === "week") {
      // Dữ liệu ví dụ cho tuần
      newLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      newDataPoints = [10, 20, 15, 30, 25, 40, 35]; // Thay bằng dữ liệu thực
    } else {
      // timeFrame === 'month'
      // Dữ liệu ví dụ cho tháng (ví dụ 4 tuần)
      newLabels = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"]; // Hoặc ngày trong tháng
      newDataPoints = [75, 90, 85, 115]; // Thay bằng dữ liệu thực
    }

    // Cập nhật state của biểu đồ
    setChartData({
      labels: newLabels,
      datasets: [
        {
          ...chartData.datasets[0], // Giữ lại các cấu hình khác
          data: newDataPoints, // Cập nhật data points mới
        },
      ],
    });
  }, [timeFrame]); // Dependency array: Chạy lại effect khi timeFrame thay đổi

  // --- Options biểu đồ (có thể giữ nguyên hoặc điều chỉnh) ---
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Để biểu đồ fill theo container height
    plugins: {
      legend: {
        position: "top" as const,
        display: true, // Đảm bảo legend hiển thị
        labels: {
          boxWidth: 10, // Thu nhỏ ô màu legend
          padding: 15, // Khoảng cách legend
        },
      },
      tooltip: {
        // Tùy chỉnh tooltip nếu cần
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        // Tùy chỉnh trục x nếu cần
      },
    },
  };

  // --- Render biểu đồ với dữ liệu từ state ---
  return <Line data={chartData} options={options} />;
};

export default ChartComponent;

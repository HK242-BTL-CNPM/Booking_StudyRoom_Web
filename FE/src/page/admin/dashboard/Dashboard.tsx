import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Header_admin from "../components/header_admin";
import ChartComponent from "./chartComponent";
import { FaBed, FaUserCheck, FaLaptop, FaChevronDown } from "react-icons/fa";

import SummaryCard from "./summaryCard";
import RoomStatusTable from "./roomStatusTable";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chartTimeFrame, setChartTimeFrame] = useState<"week" | "month">(
    "week"
  ); // Mặc định là Tuần

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleTimeFrameChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setChartTimeFrame(event.target.value as "week" | "month");
  };

  return (
    <div className={styles.dashboardLayout}>
      {/* Sidebar */}
      <div
        className={styles.sidebarContainer}
        style={{ width: isSidebarOpen ? "16rem" : "0" }}
      >
        {isSidebarOpen && <Sidebar />}
      </div>
      {/* Main Content */}
      <div className={styles.mainContent}>
        <Header_admin
          onToggleSidebar={handleToggleSidebar}
          // Header giờ đây không cần hiển thị dropdown thông báo nữa,
          // bạn có thể cần sửa lại Header_admin để bỏ chức năng đó nếu không cần
        />
        <div className={styles.contentArea}>
          {/* === Grid Layout Chính (Giờ chỉ có 1 cột) === */}
          <div className={styles.dashboardGrid}>
            {/* Chỉ cần cột chính (trước đây là cột trái) */}
            <div className={styles.leftColumn}>
              {" "}
              {/* Giữ tên class hoặc đổi thành mainColumn */}
              <h1 className={styles.dashboardTitle}>DASHBOARD</h1>
              <div className={styles.summaryCardsGrid}>
                <SummaryCard
                  icon={<FaBed size={20} />}
                  title="Số lượng phòng"
                  value="40"
                  color="blue"
                />
                <SummaryCard
                  icon={<FaUserCheck size={20} />}
                  title="Phòng đã đặt"
                  value="20"
                  color="pink"
                />
                <SummaryCard
                  icon={<FaLaptop size={20} />}
                  title="Thiết bị"
                  value="20"
                  color="green"
                />
              </div>
              <div className={styles.chartSection}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={styles.sectionTitle}>
                    Thống kê số lượng đặt phòng
                  </h2>
                  <div className={styles.timeFrameSelector}>
                    <select
                      value={chartTimeFrame}
                      onChange={handleTimeFrameChange}
                      className={styles.selectInput}
                    >
                      <option value="week">Tuần</option>
                      <option value="month">Tháng</option>
                    </select>
                    <FaChevronDown className={styles.selectIcon} />
                  </div>
                </div>
                <div className={styles.chartCanvasWrapper}>
                  <ChartComponent timeFrame={chartTimeFrame} />
                </div>
              </div>
              <RoomStatusTable />
            </div>{" "}
            {/* Hết Cột Chính */}
            {/* === XÓA BỎ HOÀN TOÀN CỘT PHẢI === */}
            {/* <div className={styles.rightColumn}>
                 ...
            </div> */}
          </div>{" "}
          {/* Hết Dashboard Grid */}
        </div>{" "}
        {/* Hết Content Area */}
      </div>{" "}
      {/* Hết Main Content */}
    </div> // Hết Dashboard Layout
  );
}

export default Dashboard;

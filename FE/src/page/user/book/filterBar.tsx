// // src/pages/user/book/FilterBar.tsx
// import React from "react";
// import { FaSearch } from "react-icons/fa";
// import { Axios } from "axios";

// interface FilterBarProps {
//   selectedFacility: string;
//   buildings: string[];
//   selectedBuilding: string;
//   selectedRoomType: string;
//   startDate: string;
//   startTime: string;
//   endTime: string;
//   onFacilityChange: (value: string) => void;
//   onBuildingChange: (value: string) => void;
//   onRoomTypeChange: (value: string) => void;
//   onStartDateChange: (value: string) => void;
//   onStartTimeChange: (value: string) => void;
//   onEndTimeChange: (value: string) => void;
//   onSearch: () => void;
// }

// // --- Style Objects (Copied from original, consider moving to CSS/SCSS) ---
// const filterContainerStyle: React.CSSProperties = {
//   background: "linear-gradient(90deg, #395799, #5F91FF)",
//   padding: "18px",
//   borderRadius: "10px",
//   marginBottom: "30px",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
// };

// const filterGridStyle: React.CSSProperties = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", // Responsive grid
//   gap: "15px",
//   alignItems: "end", // Align items to bottom for better look with labels
// };

// const filterLabelStyle: React.CSSProperties = {
//   fontSize: "14px", // Slightly smaller for better fit
//   color: "#fff",
//   fontWeight: "bold",
//   marginBottom: "5px", // Add space below label
//   textAlign: "left", // Align labels left
// };

// const filterControlBaseStyle: React.CSSProperties = {
//   padding: "10px",
//   fontSize: "16px",
//   borderRadius: "8px",
//   border: "none",
//   width: "100%", // Make controls fill grid cell
//   height: "40px",
//   boxSizing: "border-box",
// };
// const filterDateInputStyle: React.CSSProperties = {
//   ...filterControlBaseStyle,
//   padding: "8px 10px", // Keep specific padding
// };

// const searchButtonStyle: React.CSSProperties = {
//   padding: "0 20px",
//   backgroundColor: "#17243E",
//   color: "#fff",
//   border: "none",
//   borderRadius: "8px",
//   cursor: "pointer",
//   fontSize: "16px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   height: "40px",
//   width: "100%", // Make button fill grid cell
// };
// // --- End Style Objects ---

// const FilterBar: React.FC<FilterBarProps> = ({
//   selectedFacility,
//   buildings,
//   selectedBuilding,
//   selectedRoomType,
//   startDate,
//   startTime,
//   endTime,
//   onFacilityChange,
//   onBuildingChange,
//   onRoomTypeChange,
//   onStartDateChange,
//   onStartTimeChange,
//   onEndTimeChange,
//   onSearch,
// }) => {
//   const handleStartTimeUpdate = (value: string) => {
//     const hour = parseInt(value.split(":")[0], 10);
//     const formattedTime = `${hour.toString().padStart(2, "0")}:00`;
//     onStartTimeChange(formattedTime);

//     // Logic reset endTime nếu không hợp lệ (giữ nguyên)
//     if (endTime) {
//       const endHour = parseInt(endTime.split(":")[0], 10);
//       if (endHour <= hour) {
//         onEndTimeChange(""); // Reset endTime về rỗng -> "Chọn giờ" sẽ hiện lại
//       }
//     }
//   };

//   const startHourInt = parseInt(startTime.split(":")[0] || "6", 10);

//   const facilities = [
//     { label: "Tất cả", value: "Tất cả" },
//     { label: "Cơ sở 1", value: "CS1" },
//     { label: "Cơ sở 2", value: "CS2" },
//   ];

//   return (
//     <div style={filterContainerStyle}>
//       <div style={filterGridStyle}>
//         {/* Facility Select */}
//         <div>
//           <div style={filterLabelStyle}>Cơ sở</div>
//           <select
//             style={filterControlBaseStyle}
//             value={selectedFacility}
//             onChange={(e) => {
//               onFacilityChange(e.target.value);
//             }}
//           >
//             {facilities.map((f, idx) => (
//               <option key={idx} value={f.value}>
//                 {f.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         {/* Building */}
//         <div>
//           <div style={filterLabelStyle}>Tòa</div>
//           <select
//             style={filterControlBaseStyle}
//             value={selectedBuilding}
//             onChange={(e) => onBuildingChange(e.target.value)}
//           >
//             {buildings.map((b, i) => (
//               <option key={i} value={b}>
//                 {b}
//               </option>
//             ))}
//           </select>
//         </div>
//         {/* Room Type */}
//         <div>
//           <div style={filterLabelStyle}>Loại phòng</div>
//           <select
//             style={filterControlBaseStyle}
//             value={selectedRoomType}
//             onChange={(e) => onRoomTypeChange(e.target.value)}
//           >
//             <option value="Tất cả">Tất cả</option>{" "}
//             <option value="Phòng tự học">Phòng tự học</option>{" "}
//             <option value="Phòng thuyết trình">Phòng thuyết trình</option>{" "}
//             <option value="Phòng họp nhóm">Phòng họp nhóm</option>{" "}
//             <option value="Phòng mentor 1-1">Phòng mentor 1-1</option>
//           </select>
//         </div>
//         {/* Start Time */}
//         <div>
//           <div style={filterLabelStyle}>Bắt đầu</div>
//           <select
//             style={filterControlBaseStyle}
//             value={startTime}
//             onChange={(e) => handleStartTimeUpdate(e.target.value)}
//           >
//             {Array.from({ length: 15 }, (_, i) => {
//               const hour = 6 + i;
//               const hourStr = hour.toString().padStart(2, "0");
//               return (
//                 <option key={hour} value={`${hourStr}:00`}>
//                   {hourStr}:00
//                 </option>
//               );
//             })}
//           </select>
//         </div>
//         {/* End Time */}
//         <div>
//           <div style={filterLabelStyle}>Kết thúc</div>
//           <select
//             style={filterControlBaseStyle}
//             value={endTime} // Vẫn bind value vào state endTime
//             onChange={(e) => onEndTimeChange(e.target.value)}
//             disabled={!startTime} // Vẫn disable nếu chưa chọn start time
//             required // Thêm required để form validation (nếu có)
//           >
//             {/* CHỈ HIỂN THỊ "Chọn giờ" NẾU endTime LÀ RỖNG */}
//             {!endTime && (
//               <option value="" disabled hidden>
//                 {" "}
//                 Chọn giờ
//               </option>
//             )}
//             {/* Render các giờ hợp lệ */}
//             {Array.from({ length: 15 }, (_, i) => {
//               const hour = 7 + i;
//               const hourStr = hour.toString().padStart(2, "0");
//               const isDisabled = hour <= startHourInt;
//               return (
//                 <option
//                   key={`end-${hour}`} // Key rõ ràng hơn
//                   value={`${hourStr}:00`}
//                   disabled={isDisabled}
//                   style={{ color: isDisabled ? "#ccc" : "#000" }}
//                 >
//                   {hourStr}:00
//                 </option>
//               );
//             })}
//           </select>
//         </div>
//         {/* Date */}
//         <div>
//           <div style={filterLabelStyle}>Ngày</div>
//           <input
//             type="date"
//             style={filterDateInputStyle}
//             value={startDate}
//             onChange={(e) => onStartDateChange(e.target.value)}
//             min={new Date().toISOString().split("T")[0]}
//           />
//         </div>
//         {/* Search Button */}
//         <div>
//           <div style={{ ...filterLabelStyle, visibility: "hidden" }}>
//             Search
//           </div>
//           <button
//             style={searchButtonStyle}
//             onClick={onSearch} // Gọi handler khi bấm nút
//             title="Tìm kiếm phòng"
//             // disabled={!startDate || !startTime || !endTime} // Disable nếu chưa chọn ngày hoặc giờ
//           >
//             <FaSearch size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterBar;


import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";

interface FilterBarProps {
  selectedFacility: string;
  buildings: string[];
  selectedBuilding: string;
  selectedRoomType: string;
  startDate: string;
  startTime: string;
  endTime: string;
  onFacilityChange: (value: string) => void;
  onBuildingsChange: (value: string[]) => void;
  onBuildingChange: (value: string) => void;
  onRoomTypeChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onSearch: () => void;
}

// --- Style Objects ---
const filterContainerStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #395799, #5F91FF)",
  padding: "18px",
  borderRadius: "10px",
  marginBottom: "30px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const filterGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: "15px",
  alignItems: "end",
};

const filterLabelStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#fff",
  fontWeight: "bold",
  marginBottom: "5px",
  textAlign: "left",
};

const filterControlBaseStyle: React.CSSProperties = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  width: "100%",
  height: "40px",
  boxSizing: "border-box",
};

const filterDateInputStyle: React.CSSProperties = {
  ...filterControlBaseStyle,
  padding: "8px 10px",
};

const searchButtonStyle: React.CSSProperties = {
  padding: "0 20px",
  backgroundColor: "#17243E",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "40px",
  width: "100%",
};
// --- End Style Objects ---

interface Facility {
  branch_name: string;
  id: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedFacility,
  buildings,
  selectedBuilding,
  selectedRoomType,
  startDate,
  startTime,
  endTime,
  onFacilityChange,
  onBuildingsChange,
  onBuildingChange,
  onRoomTypeChange,
  onStartDateChange,
  onStartTimeChange,
  onEndTimeChange,
  onSearch,
}) => {
  const { user, token, isAuthenticated, facilities } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !token || !isAuthenticated) {
      setLoading(false);
      setError("Vui lòng đăng nhập để xem danh sách cơ sở.");
      navigate("/login");
      return;
    }

    if (facilities.length > 0) {
      setLoading(false);
    } else {
      setLoading(false);
      setError("Không có dữ liệu cơ sở.");
    }
  }, [user, token, isAuthenticated, facilities, navigate]);

  const handleStartTimeUpdate = (value: string) => {
    const hour = parseInt(value.split(":")[0], 10);
    const formattedTime = `${hour.toString().padStart(2, "0")}:00`;
    onStartTimeChange(formattedTime);

    if (endTime) {
      const endHour = parseInt(endTime.split(":")[0], 10);
      if (endHour <= hour) {
        onEndTimeChange("");
      }
    }
  };

  const startHourInt = parseInt(startTime.split(":")[0] || "6", 10);

  return (
    <div style={filterContainerStyle}>
      <div style={filterGridStyle}>
        {/* Facility Select */}
        <div>
          <div style={filterLabelStyle}>Cơ sở</div>
          <select
            style={filterControlBaseStyle}
            value={selectedFacility}
            onChange={(e) => {
              onFacilityChange(e.target.value);
            }}
            disabled={loading || !!error}
          >
            <option value="Tất cả">Tất cả</option>
            {loading ? (
              <option value="" disabled>
                Đang tải...
              </option>
            ) : error ? (
              <option value="" disabled>
                {error}
              </option>
            ) : (
              facilities.map((f) => (
                <option key={f.id} value={f.branch_name}>
                  {f.branch_name}
                </option>
              ))
            )}
          </select>
        </div>
        {/* Building */}
        <div>
          <div style={filterLabelStyle}>Tòa</div>
          <select
            style={filterControlBaseStyle}
            value={selectedBuilding}
            onChange={(e) => onBuildingChange(e.target.value)}
          >
            {buildings.map((b, i) => (
              <option key={i} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        {/* Room Type */}
        <div>
          <div style={filterLabelStyle}>Loại phòng</div>
          <select
            style={filterControlBaseStyle}
            value={selectedRoomType}
            onChange={(e) => onRoomTypeChange(e.target.value)}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Phòng tự học">Phòng tự học</option>
            <option value="Phòng thuyết trình">Phòng thuyết trình</option>
            <option value="Phòng họp nhóm">Phòng họp nhóm</option>
            <option value="Phòng mentor 1-1">Phòng mentor 1-1</option>
          </select>
        </div>
        {/* Start Time */}
        <div>
          <div style={filterLabelStyle}>Bắt đầu</div>
          <select
            style={filterControlBaseStyle}
            value={startTime}
            onChange={(e) => handleStartTimeUpdate(e.target.value)}
          >
            {Array.from({ length: 15 }, (_, i) => {
              const hour = 6 + i;
              const hourStr = hour.toString().padStart(2, "0");
              return (
                <option key={hour} value={`${hourStr}:00`}>
                  {hourStr}:00
                </option>
              );
            })}
          </select>
        </div>
        {/* End Time */}
        <div>
          <div style={filterLabelStyle}>Kết thúc</div>
          <select
            style={filterControlBaseStyle}
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            disabled={!startTime}
            required
          >
            {!endTime && (
              <option value="" disabled hidden>
                Chọn giờ
              </option>
            )}
            {Array.from({ length: 15 }, (_, i) => {
              const hour = 7 + i;
              const hourStr = hour.toString().padStart(2, "0");
              const isDisabled = hour <= startHourInt;
              return (
                <option
                  key={`end-${hour}`}
                  value={`${hourStr}:00`}
                  disabled={isDisabled}
                  style={{ color: isDisabled ? "#ccc" : "#000" }}
                >
                  {hourStr}:00
                </option>
              );
            })}
          </select>
        </div>
        {/* Date */}
        <div>
          <div style={filterLabelStyle}>Ngày</div>
          <input
            type="date"
            style={filterDateInputStyle}
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        {/* Search Button */}
        <div>
          <div style={{ ...filterLabelStyle, visibility: "hidden" }}>
            Search
          </div>
          <button
            style={searchButtonStyle}
            onClick={onSearch}
            title="Tìm kiếm phòng"
          >
            <FaSearch size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;



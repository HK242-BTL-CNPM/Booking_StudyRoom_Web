import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchBuildings, fetchRoomTypes } from "../../../api/apiService";

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

interface Building {
  id: number;
  building_name: string;
  branch_id: number;
}

interface RoomType {
  id: number;
  type_name: string;
  max_capacity: number | null;
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
  const [buildingLoading, setBuildingLoading] = useState<boolean>(false);
  const [buildingError, setBuildingError] = useState<string | null>(null);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [roomTypeLoading, setRoomTypeLoading] = useState<boolean>(false);
  const [roomTypeError, setRoomTypeError] = useState<string | null>(null);

  // Kiểm tra đăng nhập và facilities
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

  // Gọi API để lấy danh sách building khi selectedFacility thay đổi
  useEffect(() => {
    const fetchBuildingData = async () => {
      if (selectedFacility === "Tất cả") {
        onBuildingsChange(["Tất cả"]);
        setBuildingError(null);
        return;
      }

      const selectedBranch = facilities.find((f) => f.branch_name === selectedFacility);
      if (!selectedBranch) {
        onBuildingsChange(["Tất cả"]);
        setBuildingError("Cơ sở không hợp lệ.");
        return;
      }

      setBuildingLoading(true);
      setBuildingError(null);
      try {
        const buildingData = await fetchBuildings(selectedBranch.id);
        const buildingNames = ["Tất cả", ...buildingData.map((b) => b.building_name)];
        onBuildingsChange(buildingNames);
      } catch (error) {
        setBuildingError("Không thể tải danh sách tòa nhà.");
        onBuildingsChange(["Tất cả"]);
      } finally {
        setBuildingLoading(false);
      }
    };

    fetchBuildingData();
  }, [selectedFacility, facilities, onBuildingsChange]);

  // Gọi API để lấy danh sách loại phòng khi component mount
  useEffect(() => {
    const fetchRoomTypeData = async () => {
      setRoomTypeLoading(true);
      setRoomTypeError(null);
      try {
        const roomTypeData = await fetchRoomTypes();
        setRoomTypes(roomTypeData);
      } catch (error) {
        setRoomTypeError("Không thể tải danh sách loại phòng.");
        setRoomTypes([]);
      } finally {
        setRoomTypeLoading(false);
      }
    };

    fetchRoomTypeData();
  }, []);

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
            onChange={(e) => onFacilityChange(e.target.value)}
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
            disabled={buildingLoading || !!buildingError}
          >
            {buildingLoading ? (
              <option value="" disabled>
                Đang tải...
              </option>
            ) : buildingError ? (
              <option value="" disabled>
                {buildingError}
              </option>
            ) : (
              buildings.map((b, i) => (
                <option key={i} value={b}>
                  {b}
                </option>
              ))
            )}
          </select>
        </div>
        {/* Room Type */}
        <div>
          <div style={filterLabelStyle}>Loại phòng</div>
          <select
            style={filterControlBaseStyle}
            value={selectedRoomType}
            onChange={(e) => onRoomTypeChange(e.target.value)}
            disabled={roomTypeLoading || !!roomTypeError}
          >
            <option value="Tất cả">Tất cả</option>
            {roomTypeLoading ? (
              <option value="" disabled>
                Đang tải...
              </option>
            ) : roomTypeError ? (
              <option value="" disabled>
                {roomTypeError}
              </option>
            ) : (
              roomTypes.map((rt) => (
                <option key={rt.id} value={rt.type_name}>
                  {rt.type_name}
                </option>
              ))
            )}
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
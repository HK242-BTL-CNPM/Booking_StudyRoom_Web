import Header from "../component/header";
import Footer from "../component/footer";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaUpload } from "react-icons/fa";

function Report_Issue() {
  const [selectedFacility, setSelectedFacility] = useState("Tất cả");
  const [buildingOptions, setBuildingOptions] = useState<string[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("Tất cả");
  const [deviceName, setDeviceName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFacilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const facility = e.target.value;
    setSelectedFacility(facility);
    setSelectedBuilding("");
    setSelectedRoomType("Tất cả");

    if (facility === "Cơ sở 1") {
      setBuildingOptions(["B1", "B4", "B9", "B10"]);
    } else if (facility === "Cơ sở 2") {
      setBuildingOptions(["H1", "H2", "H3", "H6"]);
    } else {
      setBuildingOptions([]);
    }
  };

  const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBuilding(e.target.value);
    setSelectedRoomType("Tất cả");
  };

  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roomType = e.target.value;
    setSelectedRoomType(roomType);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Tệp đã chọn:", file.name);
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = () => {
    if (
      !selectedFacility ||
      selectedFacility === "Tất cả" ||
      !selectedBuilding ||
      !selectedRoomType ||
      selectedRoomType === "Tất cả" ||
      !deviceName ||
      !description
    ) {
      alert("Vui lòng điền đầy đủ thông tin phòng và sự cố.");
      return;
    }

    console.log("Submitting:", {
      facility: selectedFacility,
      building: selectedBuilding,
      roomType: selectedRoomType,
      device: deviceName,
      description: description,
      file: selectedFile?.name,
    });

    alert("Đã gửi thông báo lên admin!\nCảm ơn bạn đã báo cáo sự cố!😊");
    handleReset();
  };

  const handleReset = () => {
    setSelectedFacility("Tất cả");
    setBuildingOptions([]);
    setSelectedBuilding("");
    setSelectedRoomType("Tất cả");
    setDeviceName("");
    setDescription("");
    setSelectedFile(null);
    const fileInput = document.getElementById(
      "file-upload-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  // --- Responsive Styles ---
  const pagePaddingStyle: React.CSSProperties = {
    padding: "2rem 5%",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
  };

  const mainContainerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "80px",
    marginBottom: "30px",
    alignItems: "flex-start",
    justifyContent: "center",
    flexGrow: 1,
  };

  const columnBaseStyle: React.CSSProperties = {
    backgroundColor: "#EEF4FE",
    padding: "25px",
    borderRadius: "12px",
    border: "1px solid #D1D5DB",
    minWidth: "300px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  };

  const infoColumnStyle: React.CSSProperties = {
    ...columnBaseStyle,
    flexBasis: "490px",
    flexGrow: 0,
  };

  const reportColumnStyle: React.CSSProperties = {
    ...columnBaseStyle,
    flexBasis: "680px",
    flexGrow: 0,
  };

  const columnTitleStyle: React.CSSProperties = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#1F2937",
    flexShrink: 0,
  };

  const formFieldContainerStyle: React.CSSProperties = {
    fontSize: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
  };

  const formRowStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  };

  const formLabelStyle: React.CSSProperties = {
    width: "90px",
    minWidth: "90px",
    fontWeight: "500",
    color: "#374151",
    flexShrink: 0,
    textAlign: "left",
  };

  const formControlStyle: React.CSSProperties = {
    flexGrow: 1,
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    fontSize: "1rem",
    color: "#1F2937",
    backgroundColor: "#FFFFFF",
    boxSizing: "border-box",
    height: "42px",
    width: "auto",
    minWidth: "150px",
  };

  const textAreaStyle: React.CSSProperties = {
    ...formControlStyle,
    height: "auto",
    minHeight: "80px",
    resize: "vertical",
    fontFamily: "inherit",
  };

  const fileUploadAreaStyle: React.CSSProperties = {
    border: "2px dashed #3B82F6",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    color: "#6B7280",
    cursor: "pointer",
    backgroundColor: "#FFFFFF",
    position: "relative",
    marginTop: "5px",
    width: "100%",
    minHeight: "120px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const fileUploadIconStyle: React.CSSProperties = {
    fontSize: "1.8rem",
    color: "#3B82F6",
    marginBottom: "8px",
  };

  const fileInputStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
  };

  const footerButtonsContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
    maxWidth: "1250px",
    width: "100%",
    margin: "0 auto",
    padding: "0 10px",
    boxSizing: "border-box",
  };

  const baseButtonStyle: React.CSSProperties = {
    border: "none",
    borderRadius: "8px",
    padding: "12px 30px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
    minWidth: "120px",
    textAlign: "center",
    transition: "background-color 0.2s ease",
  };

  const cancelButtonStyleResponsive: React.CSSProperties = {
    ...baseButtonStyle,
    backgroundColor: "#E5E7EB",
    color: "#1F2937",
    order: 1,
  };

  const submitButtonStyleResponsive: React.CSSProperties = {
    ...baseButtonStyle,
    backgroundColor: "#2563EB",
    color: "#fff",
    order: 2,
  };

  const reportLabelStyle: React.CSSProperties = {
    width: "150px",
    minWidth: "150px",
    alignSelf: "flex-start",
    paddingTop: "10px",
    flexGrow: 0,
    flexShrink: 0,
    fontWeight: "500",
    color: "#374151",
    textAlign: "left",
  };

  const reportControlContainerStyle: React.CSSProperties = {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: "200px",
  };

  return (
    <>
      <Header />
      <div style={pagePaddingStyle}>
        <div style={mainContainerStyle}>
          <div style={infoColumnStyle}>
            <h2 style={columnTitleStyle}>Thông tin phòng</h2>
            <div style={formFieldContainerStyle}>
              <div style={formRowStyle}>
                <label style={formLabelStyle}>Cơ sở</label>
                <select
                  style={formControlStyle}
                  value={selectedFacility}
                  onChange={handleFacilityChange}
                >
                  <option value="Tất cả">-- Chọn cơ sở --</option>
                  <option value="Cơ sở 1">Cơ sở 1</option>
                  <option value="Cơ sở 2">Cơ sở 2</option>
                </select>
              </div>
              <div style={formRowStyle}>
                <label style={formLabelStyle}>Tòa</label>
                <select
                  style={formControlStyle}
                  value={selectedBuilding}
                  onChange={handleBuildingChange}
                  disabled={!selectedFacility || selectedFacility === "Tất cả"}
                >
                  <option value="">-- Chọn tòa --</option>
                  {buildingOptions.map((building) => (
                    <option key={building} value={building}>
                      {building}
                    </option>
                  ))}
                </select>
              </div>
              <div style={formRowStyle}>
                <label style={formLabelStyle}>Loại phòng</label>
                <select
                  style={formControlStyle}
                  value={selectedRoomType}
                  onChange={handleRoomTypeChange}
                  disabled={!selectedBuilding}
                >
                  <option value="Tất cả">-- Chọn loại phòng --</option>
                  <option value="Phòng tự học">Meeting room (20-40)</option>
                  <option value="Phòng thuyết trình">Mentor 1-1 room</option>
                  <option value="Phòng họp nhóm">Library</option>
                  <option value="Phòng mentor 1-1">Team study [4-10] room</option>
                </select>
              </div>
            </div>
          </div>
          <div style={reportColumnStyle}>
            <h2 style={columnTitleStyle}>Báo cáo sự cố</h2>
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div style={formRowStyle}>
                <label style={reportLabelStyle}>Tên thiết bị hư hỏng</label>
                <div style={reportControlContainerStyle}>
                  <input
                    type="text"
                    placeholder="Nhập tên thiết bị"
                    style={formControlStyle}
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div style={{ ...formRowStyle, alignItems: "flex-start" }}>
                <label style={reportLabelStyle}>Mô tả ngắn gọn</label>
                <div style={reportControlContainerStyle}>
                  <textarea
                    placeholder="Mô tả chi tiết tình trạng..."
                    style={textAreaStyle}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                  />
                </div>
              </div>
              <div style={{ ...formRowStyle, alignItems: "flex-start" }}>
                <label style={reportLabelStyle}>Hình ảnh (nếu có)</label>
                <div style={reportControlContainerStyle}>
                  <div style={fileUploadAreaStyle}>
                    <input
                      id="file-upload-input"
                      type="file"
                      accept="image/*"
                      style={fileInputStyle}
                      onChange={handleFileUpload}
                    />
                    {!selectedFile ? (
                      <>
                        <FaUpload style={fileUploadIconStyle} />
                        <p style={{ margin: 0 }}>
                          Kéo thả hoặc{" "}
                          <span
                            style={{ fontWeight: "bold", color: "#2563EB" }}
                          >
                            Tải ảnh lên
                          </span>
                        </p>
                        <p style={{ fontSize: "0.8rem", marginTop: "5px" }}>
                          Hỗ trợ: JPG, PNG, GIF
                        </p>
                      </>
                    ) : (
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "500",
                          color: "#1F2937",
                        }}
                      >
                        Đã chọn: {selectedFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={footerButtonsContainerStyle}>
          <button style={cancelButtonStyleResponsive} onClick={handleReset}>
            Hủy
          </button>
          <button style={submitButtonStyleResponsive} onClick={handleSubmit}>
            Gửi Báo Cáo
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Report_Issue;
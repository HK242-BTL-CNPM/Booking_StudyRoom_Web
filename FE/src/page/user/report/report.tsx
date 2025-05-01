import Header from "../component/header";
import Footer from "../component/footer";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaUpload } from "react-icons/fa"; // Import icon nếu chưa có

function Report_Issue() {
  const [selectedFacility, setSelectedFacility] = useState("Tất cả");
  const [buildingOptions, setBuildingOptions] = useState<string[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState(""); // State cho tòa đã chọn
  const [selectedRoomType, setSelectedRoomType] = useState("Tất cả");
  const [roomNameOptions, setRoomNameOptions] = useState<string[]>([]);
  const [selectedRoomName, setSelectedRoomName] = useState(""); // State cho phòng đã chọn
  const [deviceName, setDeviceName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State cho file đã chọn

  const handleFacilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const facility = e.target.value;
    setSelectedFacility(facility);
    setSelectedBuilding(""); // Reset tòa khi đổi cơ sở
    setSelectedRoomType("Tất cả"); // Reset loại phòng
    setSelectedRoomName(""); // Reset tên phòng
    setRoomNameOptions([]); // Reset danh sách phòng

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
    // Có thể thêm logic reset phòng tại đây nếu cần
    setSelectedRoomType("Tất cả");
    setSelectedRoomName("");
    setRoomNameOptions([]);
  };

  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roomType = e.target.value;
    setSelectedRoomType(roomType);
    setSelectedRoomName(""); // Reset tên phòng khi đổi loại phòng

    // Ví dụ cập nhật danh sách tên phòng (cần logic thực tế hơn)
    // Logic này nên dựa vào cả facility và building đã chọn nếu cần độ chính xác cao
    if (roomType === "Phòng thuyết trình") {
      setRoomNameOptions(["Phòng PTT-01", "Phòng PTT-02"]);
    } else if (roomType === "Phòng tự học") {
      setRoomNameOptions(["Phòng PTH-A", "Phòng PTH-B"]);
    } else if (roomType === "Phòng họp nhóm") {
      setRoomNameOptions(["Phòng PHN-X", "Phòng PHN-Y"]);
    } else if (roomType === "Phòng mentor 1-1") {
      setRoomNameOptions(["Phòng PM1-Z"]);
    } else {
      setRoomNameOptions([]);
    }
  };

  const handleRoomNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoomName(e.target.value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Tệp đã chọn:", file.name);
      setSelectedFile(file); // Lưu file vào state
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = () => {
    // Thêm kiểm tra dữ liệu cơ bản trước khi gửi
    if (
      !selectedFacility ||
      selectedFacility === "Tất cả" ||
      !selectedBuilding ||
      !selectedRoomType ||
      selectedRoomType === "Tất cả" ||
      !selectedRoomName ||
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
      roomName: selectedRoomName,
      device: deviceName,
      description: description,
      file: selectedFile?.name, // Chỉ gửi tên file ví dụ
    });

    alert("Đã gửi thông báo lên admin!\nCảm ơn bạn đã báo cáo sự cố!😊");
    handleReset();
  };

  const handleReset = () => {
    setSelectedFacility("Tất cả");
    setBuildingOptions([]);
    setSelectedBuilding("");
    setSelectedRoomType("Tất cả");
    setRoomNameOptions([]);
    setSelectedRoomName("");
    setDeviceName("");
    setDescription("");
    setSelectedFile(null);
    // Reset input file (cách này hơi phức tạp, cần key hoặc form reset)
    const fileInput = document.getElementById(
      "file-upload-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };
  // --- Responsive Styles ---
  const pagePaddingStyle: React.CSSProperties = {
    padding: "2rem 5%", // Ví dụ: 2rem trên dưới, 5% trái phải
    fontFamily: "Arial, sans-serif",
    display: "flex", // Thêm display flex cho page container
    flexDirection: "column", // Để main và footer xếp dọc
  };

  const mainContainerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap", // Cho phép các cột xuống dòng trên màn hình hẹp
    gap: "80px", // Khoảng cách hợp lý giữa các cột
    marginBottom: "30px", // Khoảng cách dưới cùng trước nút bấm
    alignItems: "flex-start",
    justifyContent: "center", // Quan trọng: Căn giữa nhóm cột
    flexGrow: 1, // Cho phép main container chiếm không gian
  };

  const columnBaseStyle: React.CSSProperties = {
    backgroundColor: "#EEF4FE",
    padding: "25px", // Tăng padding một chút
    borderRadius: "12px", // Bo góc nhiều hơn
    border: "1px solid #D1D5DB",
    minWidth: "300px", // Chiều rộng tối thiểu trước khi xuống dòng
    boxSizing: "border-box", // Đảm bảo padding nằm trong width/height
    display: "flex", // Thêm display flex cho base
    flexDirection: "column", // Các mục trong cột xếp dọc
  };

  const infoColumnStyle: React.CSSProperties = {
    ...columnBaseStyle,
    flexBasis: "490px", // Chiều rộng cơ sở mong muốn (ưu tiên hơn minWidth nếu đủ chỗ)
    flexGrow: 0,
  };

  const reportColumnStyle: React.CSSProperties = {
    ...columnBaseStyle,
    flexBasis: "680px", // Cột báo cáo rộng hơn một chút
    flexGrow: 0,
  };

  const columnTitleStyle: React.CSSProperties = {
    fontSize: "1.25rem", // Sử dụng rem cho font size
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#1F2937", // Màu tối hơn
    flexShrink: 0, // Ngăn tiêu đề bị co lại
  };

  const formFieldContainerStyle: React.CSSProperties = {
    fontSize: "1rem", // Sử dụng rem
    display: "flex",
    flexDirection: "column",
    gap: "15px", // Khoảng cách giữa các trường
    width: "100%", // Chiếm hết chiều rộng cột info
  };

  const formRowStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "nowrap", // Cho phép label/select xuống dòng nếu cần
    alignItems: "center",
    gap: "10px", // Khoảng cách giữa label và select
    width: "100%", // Chiếm hết chiều rộng container cha
  };

  const formLabelStyle: React.CSSProperties = {
    width: "90px", // Đặt chiều rộng cố định cho label cột info
    minWidth: "90px", // Đảm bảo chiều rộng tối thiểu
    fontWeight: "500",
    color: "#374151",
    flexShrink: 0, // Ngăn label bị co lại
    textAlign: "left",
  };

  const formControlStyle: React.CSSProperties = {
    flexGrow: 1, // Cho control chiếm hết phần còn lại
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    fontSize: "1rem",
    color: "#1F2937",
    backgroundColor: "#FFFFFF",
    boxSizing: "border-box",
    height: "42px", // Chiều cao chuẩn
    width: "auto", // Để flexGrow kiểm soát chiều rộng
    minWidth: "150px", // Chiều rộng tối thiểu cho control
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
    padding: "20px", // Giảm padding một chút
    textAlign: "center", // Sẽ bị ghi đè bởi flex nếu dùng flex
    color: "#6B7280",
    cursor: "pointer",
    backgroundColor: "#FFFFFF",
    position: "relative",
    marginTop: "5px",
    width: "100%", // Chiếm hết container
    minHeight: "120px", // Chiều cao tối thiểu
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const fileUploadIconStyle: React.CSSProperties = {
    fontSize: "1.8rem", // Giảm kích thước icon
    color: "#3B82F6",
    marginBottom: "8px", // Giảm margin
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
    gap: "15px", // Khoảng cách giữa các nút
    maxWidth: "1250px",
    width: "100%",
    margin: "0 auto", // Căn giữa container này
    padding: "0 10px", // Padding nhỏ để nút không sát cạnh (nếu cần)
    boxSizing: "border-box", // Đảm bảo padding nằm trong width
  };

  const baseButtonStyle: React.CSSProperties = {
    border: "none",
    borderRadius: "8px",
    padding: "12px 30px", // Padding cân đối hơn
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
    minWidth: "120px", // Chiều rộng tối thiểu cho nút
    textAlign: "center",
    transition: "background-color 0.2s ease", // Thêm transition
  };

  const cancelButtonStyleResponsive: React.CSSProperties = {
    ...baseButtonStyle,
    backgroundColor: "#E5E7EB", // Màu xám nhạt hơn
    color: "#1F2937", // Màu chữ tối
    order: 1, // Đảm bảo thứ tự khi wrap
  };

  const submitButtonStyleResponsive: React.CSSProperties = {
    ...baseButtonStyle,
    backgroundColor: "#2563EB", // Giữ màu xanh
    color: "#fff",
    order: 2, // Đảm bảo thứ tự khi wrap
  };
  const reportLabelStyle: React.CSSProperties = {
    width: "150px", // Đặt chiều rộng cố định cho label cột report
    minWidth: "150px", // Đảm bảo chiều rộng tối thiểu
    alignSelf: "flex-start",
    paddingTop: "10px",
    flexGrow: 0,
    flexShrink: 0, // Ngăn label bị co lại
    fontWeight: "500",
    color: "#374151",
    textAlign: "left",
  };

  const reportControlContainerStyle: React.CSSProperties = {
    flexGrow: 1, // Cho container control chiếm phần còn lại
    display: "flex",
    flexDirection: "column",
    minWidth: "200px", // Chiều rộng tối thiểu
  };

  return (
    <>
      <Header />
      {/* Sử dụng style mới cho padding trang */}
      <div style={pagePaddingStyle}>
        {/* Sử dụng style mới cho container chính */}
        <div style={mainContainerStyle}>
          {/* Thông tin phòng - Sử dụng style mới */}
          <div style={infoColumnStyle}>
            <h2 style={columnTitleStyle}>Thông tin phòng</h2>
            <div style={formFieldContainerStyle}>
              {/* Cơ sở */}
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

              {/* Tòa */}
              <div style={formRowStyle}>
                <label style={formLabelStyle}>Tòa</label>
                <select
                  style={formControlStyle}
                  value={selectedBuilding}
                  onChange={handleBuildingChange}
                  disabled={!selectedFacility || selectedFacility === "Tất cả"} // Disable nếu chưa chọn cơ sở
                >
                  <option value="">-- Chọn tòa --</option>
                  {buildingOptions.map((building) => (
                    <option key={building} value={building}>
                      {building}
                    </option>
                  ))}
                </select>
              </div>

              {/* Loại phòng */}
              <div style={formRowStyle}>
                <label style={formLabelStyle}>Loại phòng</label>
                <select
                  style={formControlStyle}
                  value={selectedRoomType}
                  onChange={handleRoomTypeChange}
                  disabled={!selectedBuilding} // Disable nếu chưa chọn tòa
                >
                  <option value="Tất cả">-- Chọn loại phòng --</option>
                  <option value="Phòng tự học">Phòng tự học</option>
                  <option value="Phòng thuyết trình">Phòng thuyết trình</option>
                  <option value="Phòng họp nhóm">Phòng họp nhóm</option>
                  <option value="Phòng mentor 1-1">Phòng mentor 1-1</option>
                </select>
              </div>

              {/* Tên phòng */}
              <div style={formRowStyle}>
                <label style={formLabelStyle}>Tên phòng</label>
                <select
                  style={formControlStyle}
                  value={selectedRoomName}
                  onChange={handleRoomNameChange}
                  disabled={!selectedRoomType || selectedRoomType === "Tất cả"} // Disable nếu chưa chọn loại phòng
                >
                  <option value="">-- Chọn phòng --</option>
                  {roomNameOptions.map((roomName) => (
                    <option key={roomName} value={roomName}>
                      {roomName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Báo cáo sự cố - Sử dụng style mới */}
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
                    style={formControlStyle} // Dùng style control chung
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    required
                  />
                </div>
              </div>
              {/* Dòng Mô tả */}
              <div style={{ ...formRowStyle, alignItems: "flex-start" }}>
                <label style={reportLabelStyle}>Mô tả ngắn gọn</label>
                <div style={reportControlContainerStyle}>
                  <textarea
                    placeholder="Mô tả chi tiết tình trạng..."
                    style={textAreaStyle} // Áp dụng style mới cho textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4} // <-- THÊM THUỘC TÍNH ROWS ĐỂ GỢI Ý CHIỀU CAO
                  />
                </div>
              </div>
              {/* Dòng Hình ảnh */}
              <div style={{ ...formRowStyle, alignItems: "flex-start" }}>
                <label style={reportLabelStyle}>Hình ảnh (nếu có)</label>
                <div style={reportControlContainerStyle}>
                  <div style={fileUploadAreaStyle}>
                    {" "}
                    {/* Style cho vùng upload */}
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
            {/* Kết thúc div flex column cho các dòng báo cáo */}
          </div>
          {/* Kết thúc cột báo cáo */}
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

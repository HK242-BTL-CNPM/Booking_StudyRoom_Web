import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContext";

const sidebarLinkStyle = {
  display: "block",
  padding: "10px 20px",
  color: "#333",
  textDecoration: "none",
};

function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <div
        className="w-full top-0 h-[250px] bg-cover bg-no-repeat bg-center relative"
        style={{ backgroundImage: "url('/src/assets/images/image5.png')" }}
      ></div>

<div
  className={`
    p-5 shadow-lg border border-gray-300 bg-white w-[250px] z-50
    absolute top-[670px] left-5 transform-none
    md:absolute md:top-[300px] md:left-8 md:transform-none md:bottom-auto
  `}
>
  <Link
    to="../"
    className="text-[#666B72] font-medium pl-1 flex items-center gap-2"
    style={sidebarLinkStyle}
  >
    <i className="fa-solid fa-house icon"></i> Trang chủ
  </Link>

  <Link
    to="#"
    className="active flex items-center gap-2"
    style={{ ...sidebarLinkStyle, backgroundColor: "#2979ff", color: "white" }}
  >
    <i className="fa-solid fa-user icon"></i> Chi tiết người dùng
  </Link>

  <Link
    to="../login"
    className="text-[#666B72] font-medium pl-1 flex items-center gap-2"
    style={sidebarLinkStyle}
  >
    <i className="fa-solid fa-right-from-bracket icon"></i> Đăng xuất
  </Link>
</div>


      <div className="md:ml-[300px] p-5 md:p-10">
        <div className="bg-white mx-auto mt-[-100px] max-w-[600px] rounded-[16px] shadow-lg p-5 md:p-10 relative z-10">
          <div className="text-center relative">
          <div
  className="w-[130px] h-[130px] rounded-full bg-blue-500 flex items-center justify-center text-white font-bold  text-5xl mx-auto"
>
  {user?.firstname?.charAt(0).toUpperCase()}
</div>
            <div className="mt-4 text-xl font-bold">
              {user ? `${user.lastname} ${user.firstname}` : "Guest"}
            </div>
            <button className="button2">
              Tải ảnh mới
            </button>
          </div>

          <div className="mt-5">
            <label htmlFor="studentId" className="font-bold block mb-1">
              Mã số sinh viên
            </label>
            <div
              id="studentId"
              className="w-full p-3 rounded-md border border-gray-300"
            >
              {user ? user.MSSV : "N/A"}
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="email" className="font-bold block mb-1">
              Địa chỉ thư điện tử
            </label>
            <div
              id="email"
              className="w-full p-3 rounded-md border border-gray-300"
            >
              {user ? user.email : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
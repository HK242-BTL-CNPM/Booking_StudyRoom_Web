import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../AuthContext";
import { IoSettingsOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { CiCircleQuestion } from "react-icons/ci";
import { Link } from "react-router-dom";
function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  if (!user) return null;
  return (
    <div className="relative mx-auto" ref={menuRef}>
      <div
        className="cursor-pointer flex items-center space-x-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col justify-center items-end">
          <div className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base font-medium">
            {user.lastname} {user.firstname}
          </div>
          <div>{user.isAdmin ? "Admin" : "User"}</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
          {user.username.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
          {/* Avatar + name */}
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
              {user.firstname.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3 text-lg font-semibold">{user.lastname} {user.firstname}</div>
          </div>

          <hr className="mb-3" />

          {/* Menu Items */}
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between cursor-pointer hover:text-blue-600">
              <Link to="../profile">
                <div className="flex items-center gap-2">
                  <CiUser />
                  Hồ sơ cá nhân
                </div>
              </Link>
            </li>
            <li className="flex items-center justify-between cursor-pointer hover:text-blue-600">
              <div className="flex items-center gap-2">
                <IoSettingsOutline /> Cài đặt
              </div>
            </li>
            <li className="flex items-center justify-between cursor-pointer hover:text-blue-600">
              <div className="flex items-center gap-2">
                <CiCircleQuestion /> Hỗ trợ
              </div>
            </li>
          </ul>

          {/* Logout */}
          <button
            onClick={logout}
            className="mt-4 w-full text-center text-blue-500 bg-blue-50 py-2 rounded hover:bg-blue-100 font-semibold"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
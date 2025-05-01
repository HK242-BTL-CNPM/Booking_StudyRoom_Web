// src/page/admin/components/header_admin.tsx
import { useState, useRef, useEffect } from "react";
import AdminUserMenu from "./menu_admin";
import { BellIcon, Bars3Icon } from "@heroicons/react/24/outline";
// --- Import Popup Component ---
import NotificationsPopup from "./notificationsPopup";

// --- KHÔNG cần định nghĩa NotificationItem ở đây nữa ---
// function NotificationItem({ ... }) { ... }

interface HeaderAdminProps {
  onToggleSidebar: () => void;
}

function Header_admin({ onToggleSidebar }: HeaderAdminProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null); // Ref cho popup container
  const bellButtonRef = useRef<HTMLButtonElement>(null);

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node) &&
        bellButtonRef.current &&
        !bellButtonRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    }
    if (isNotificationsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationsOpen]);

  return (
    <div className="relative flex justify-between items-center w-full h-20 pl-4 border-b border-gray-200 bg-white z-10">
      {/* --- Left Side --- */}
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="text-gray-600 focus:outline-none mr-4"
        >
          <Bars3Icon className="h-8 w-8" />
        </button>
      </div>
      {/* --- Right Side --- */}
      <div className="flex items-center gap-4 pr-4">
        {/* --- Nút chuông và Dropdown Container --- */}
        <div className="relative">
          <button
            ref={bellButtonRef}
            onClick={toggleNotifications}
            className="text-gray-600 focus:outline-none p-2 rounded-full hover:bg-gray-100"
          >
            <BellIcon className="h-6 w-6" />
          </button>

          {/* --- Render Popup Component có điều kiện --- */}
          {isNotificationsOpen && (
            // Truyền ref vào component con
            <NotificationsPopup forwardedRef={notificationsRef} />
          )}
        </div>
        <AdminUserMenu />
      </div>
    </div>
  );
}
export default Header_admin;

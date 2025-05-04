import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../AuthContext";
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

      
    </div>
  );
}

export default UserMenu;
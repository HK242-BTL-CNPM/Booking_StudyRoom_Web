import AdminUserMenu from "../../admin/components/menu_admin"; // Import component mới
import { BellIcon, Bars3Icon } from "@heroicons/react/24/outline";


function Header_admin({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <>
      <div className="flex justify-between items-center w-full h-20 pl-4">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="text-gray-600 focus:outline-none"
          >
            <Bars3Icon className="h-8 w-8" />
          </button>
        </div>
        
        <div className="flex items-center gap-4 pr-4">
          <button className="text-gray-600 focus:outline-none">
            <BellIcon className="h-8 w-8" />
          </button>
          <button><AdminUserMenu /></button>
        </div>
      </div>
    </>
  );
}
export default Header_admin;
import { useAuth } from "../../../AuthContext";

function AdminUserMenu() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col justify-center items-end">
        <div className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base font-medium">
          {user.name}
        </div>
        <div className="text-xs">{user.role}</div>
      </div>
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
        {user?.name?.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}

export default AdminUserMenu;
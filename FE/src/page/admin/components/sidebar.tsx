import StudySpaceLogo from "../../../assets/images/StudySpace_logo.png";
import {
    ChartBarIcon,
    UsersIcon,
    BuildingOfficeIcon,
    CalendarIcon,
    CalculatorIcon,
    ExclamationTriangleIcon,
    ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'; // Chọn kiểu outline hoặc solid tùy thích
import { useLocation, Link } from 'react-router-dom'; // Import useLocation và Link

function Sidebar() {
    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
        { name: 'Users', href: '/user', icon: UsersIcon },
        { name: 'Rooms', href: '/room', icon: BuildingOfficeIcon },
        { name: 'Booking Schedule', href: '/booking', icon: CalendarIcon },
        { name: 'Device control', href: '/device', icon: CalculatorIcon },
        { name: 'Notification', href: '/notification', icon: ExclamationTriangleIcon },
    ];
    const logoutItem = { name: 'Log Out', href: '/login', icon: ArrowLeftOnRectangleIcon };
    const location = useLocation(); // Lấy thông tin về location hiện tại

    return (
        <>
            <div className="min-h-screen w-64 bg-black_admin text-white_admin font-Roboto flex flex-col justify-between">
                <div className="p-5">
                    <div className="flex items-center">
                        <img
                            src={StudySpaceLogo}
                            alt="StudySpace Logo"
                            className="h-[60px] w-[60px]"
                        />
                        <p className="font-bold text-lg">STUDYSPACE</p>
                    </div>
                    <div className="border-b border-gray-700 my-4"></div>
                    <nav className="space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700 ${
                                    location.pathname === item.href ? 'bg-gray-700 text-white_admin' : ''
                                }`}
                            >
                                <item.icon className="h-5 w-5 mr-3" aria-hidden="true" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="p-5">
                    <div className="border-t border-gray-700 my-4"></div>
                    <Link
                        to={logoutItem.href}
                        className={`flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700 ${
                            location.pathname === logoutItem.href ? 'bg-gray-700 text-white_admin' : ''
                        }`}
                    >
                        <logoutItem.icon className="h-5 w-5 mr-3" aria-hidden="true" />
                        <span>{logoutItem.name}</span>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
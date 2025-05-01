import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import StudySpaceLogo from "../../../assets/images/StudySpace_logo.png";
import { useAuth } from "../../../AuthContext";
import UserMenu from "./userMenu";
import "animate.css";
import { Menu, X } from "lucide-react";

function Header() {
  const { user } = useAuth();
  const [isSticky, setIsSticky] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const activeStyle = {
    fontSize: "19px",
    color: "#000000",
    fontWeight: "bold",
    marginRight: "60px",
  };
  const unactiveStyle = {
    fontSize: "19px",
    color: "#969DA6",
    fontWeight: "bold",
    marginRight: "60px",
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`z-50 bg-white transition-all duration-300 ease-in-out ${
        isSticky
          ? "sticky top-0 animate__animated animate__fadeInDown animate__fast"
          : ""
      } border-b border-gray-300`}
    >
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo + Title */}
        <div className="flex items-center ">
          <Link to="../" className="flex-shrink-0 mr-3">
            <img
              src={StudySpaceLogo}
              alt="StudySpace Logo"
              className="h-[60px] w-[60px]"
            />
          </Link>
          <div>
            <div className="text-gray-800 font-bold text-base">STUDYSPACE</div>
            <div className="text-gray-500 italic text-xs font-medium leading-none">
              “Học tập hoàn hảo”
            </div>
          </div>
        </div>

        {/* Hamburger icon */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Nav menu - Desktop */}
        <div className="hidden lg:flex flex-wrap items-center justify-center lg:gap-x-10 gap-x-2 gap-y-2 w-[70%] mx-auto">
          {[
            { to: "..", label: "Trang chủ" },
            { to: user ? "../book" : "../login", label: "Đặt phòng" },
            {
              to: user ? "../history" : "../login",
              label: "Lịch sử đặt phòng",
            },
            { to: user ? "../status" : "../login", label: "Trạng thái phòng" },
            { to: user ? "../report" : "../login", label: "Báo cáo sự cố" },
            { to: user ? "../checkin" : "../login", label: "Checkin" },

          ].map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `hover:text-blue-600 font-bold transition-colors duration-200 ${
                  isActive ? "text-black" : "text-gray-400"
                } text-sm md:text-sm lg:text-base xl:text-xl`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* User button - Desktop */}
        <div className="hidden lg:block ">
          {user ? (
            <UserMenu />
          ) : (
            <Link to="/login">
              <button className="button4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base">
                Đăng Nhập
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Nav menu - Mobile */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 flex flex-col gap-3 items-center">
          {[
            { to: "..", label: "Trang chủ" },
            { to: user ? "../book" : "../login", label: "Đặt phòng" },
            {
              to: user ? "../history" : "../login",
              label: "Lịch sử đặt phòng",
            },
            { to: user ? "../status" : "../login", label: "Trạng thái phòng" },
            { to: user ? "../report" : "../login", label: "Báo cáo sự cố" },
            { to: user ? "../checkin" : "../login", label: "Checkin" },

          ].map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              onClick={closeMenu}
              className="hover:text-blue-600 text-sm font-medium"
              style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
            >
              {label}
            </NavLink>
          ))}
          <div className="mt-2">
            {user ? (
              <UserMenu />
            ) : (
              <Link to="/login" onClick={closeMenu}>
                <button className="button4 ">Đăng Nhập</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;

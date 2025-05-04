import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { fetchInitialData } from "./api/apiService";

// Định nghĩa cấu trúc User dựa trên API response
interface User {
  id: number;
  username: string;
  password: string;
  MSSV: number;
  lastname: string;
  firstname: string;
  email: string;
  isUser: boolean;
  isAdmin: boolean;
  isActive: boolean;
}

interface Facility {
  branch_name: string;
  id: number;
}

// Định nghĩa cấu trúc của AuthContext
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  facilities: Facility[];
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const LOCAL_STORAGE_KEY = "user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Thêm trạng thái isLoading

  // Kiểm tra user trong localStorage khi ứng dụng khởi động
  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  // Lấy dữ liệu ban đầu từ API khi ứng dụng khởi động
  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const { user, facilities } = await fetchInitialData();
          setUser(user);
          setFacilities(facilities);
          setToken(storedToken);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching initial data:", error);
          logout(); // Xử lý lỗi: gọi logout nếu token hết hạn hoặc API thất bại
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false); // Đánh dấu đã hoàn tất khởi tạo
    };

    fetchData();
  }, []);

  // Hàm login: Lưu user và token
  const login = (userData: User, token: string) => {
    setUser(userData);
    setToken(token);
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
    localStorage.setItem("token", token);
    console.log("Đã lưu token vào localStorage:", token);
  };

  // Hàm logout: Xóa user và token
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setFacilities([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, facilities, login, logout }}>
      {!isLoading && children} {/* Chỉ render children khi đã hoàn tất khởi tạo */}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};


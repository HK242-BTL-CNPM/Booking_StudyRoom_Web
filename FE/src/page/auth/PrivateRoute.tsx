import { Navigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang login
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, hiển thị nội dung
  return children;
}

export default PrivateRoute;

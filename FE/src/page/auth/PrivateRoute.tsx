import { Navigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu là Admin mà cố truy cập route của User thì redirect về trang chính
  if (!user.isUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PrivateRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { token, user } = useAuth();

  if (!token) return <Navigate to="/" replace />;

  const roles = user?.roles || [];
  if (!roles.includes("ADMIN")) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

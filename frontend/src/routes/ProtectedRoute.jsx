import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/ui/Loader";

export default function ProtectedRoute({
  children,
}) {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}
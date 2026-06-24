import DashboardLayout from "./DashboardLayout";
import ProtectedRoute from "../routes/ProtectedRoute";

export default function ProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}

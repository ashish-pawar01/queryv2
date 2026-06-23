import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen">
        <Navbar />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../components/ui/Card";
import ThemeSwitcher from "../../components/ui/ThemeSwitcher";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Theme</h2>

          <ThemeSwitcher />
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">System</h2>

          <p className="opacity-70">Query Master v1.0</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}

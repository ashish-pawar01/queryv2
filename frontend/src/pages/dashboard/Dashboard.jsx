import { FolderKanban, Database, Layers3, FileText } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import { useDashboard } from "../../hooks/useDashboard";
import AnalyticsCards from "../../components/dashboard/AnalyticsCards";
import TopQueriesChart from "../../components/dashboard/TopQueriesChart";

export default function Dashboard() {
  const { data } = useDashboard();
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div
          className="
  relative
  overflow-hidden
  rounded-3xl
  p-10
  bg-gradient-to-r
  from-blue-600
  via-indigo-600
  to-purple-600
  text-white
  "
        >
          <h1 className="text-4xl font-bold">Welcome to Query Master</h1>

          <p className="mt-3 opacity-90">
            Manage Categories, Modules and Query Definitions from one place.
          </p>
        </div>
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>

          <p className="opacity-60 mt-2">Query Management Platform</p>
        </div>

        <div
          className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
          "
        >
          <StatCard
            title="Categories"
            value={data?.totalCategories || 0}
            trend="+2 this month"
            icon={<Layers3 size={24} />}
          />

          <StatCard
            title="Modules"
            value={data?.totalModules || 0}
            trend="+4 this month"
            icon={<FolderKanban size={24} />}
          />

          <StatCard
            title="Queries"
            value={data?.totalQueries || 0}
            trend="+12 this month"
            icon={<Database size={24} />}
          />

          <StatCard
            title="Generated"
            value={data?.totalGenerated || 0}
            trend={`${data?.todayQueries || 0} today`}
            icon={<FileText size={24} />}
          />
        </div>
        <AnalyticsCards
          stats={{
            totalUsers: data?.totalUsers || 0,
            totalCategories: data?.totalCategories || 0,
            totalModules: data?.totalModules || 0,
            totalQueries: data?.totalQueries || 0,
          }}
        />

        <Card>
          <h2 className="text-xl font-bold mb-4">Top Queries</h2>

          <TopQueriesChart data={data?.topQueries || []} />
        </Card>
      </div>
    </DashboardLayout>
  );
}

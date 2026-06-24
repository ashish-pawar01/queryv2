import StatCard from "./StatCard";

import { Users, Database, Layers3, FolderKanban } from "lucide-react";

export default function AnalyticsCards({ stats }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Users" value={stats.totalUsers} icon={<Users />} />

      <StatCard
        title="Categories"
        value={stats.totalCategories}
        icon={<Layers3 />}
      />

      <StatCard
        title="Modules"
        value={stats.totalModules}
        icon={<FolderKanban />}
      />

      <StatCard
        title="Queries"
        value={stats.totalQueries}
        icon={<Database />}
      />
    </div>
  );
}

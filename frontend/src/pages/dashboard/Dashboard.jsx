import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../components/ui/Card";
import PageWrapper from "../../components/layout/PageWrapper";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <PageWrapper>
        <div className="grid grid-cols-4 gap-6">
          <Card>
            <h3>Total Modules</h3>
            <p className="text-3xl mt-2">12</p>
          </Card>

          <Card>
            <h3>Total Queries</h3>
            <p className="text-3xl mt-2">54</p>
          </Card>

          <Card>
            <h3>Active Queries</h3>
            <p className="text-3xl mt-2">47</p>
          </Card>

          <Card>
            <h3>Executions</h3>
            <p className="text-3xl mt-2">320</p>
          </Card>
        </div>
      </PageWrapper>
    </DashboardLayout>
  );
}

import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";

import { useQueryById } from "../../hooks/useQueries";
import { useQueryPreview } from "../../hooks/useQueryPreview";

import { useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function QueryPreview() {
  const { id } = useParams();

  const [sql, setSql] = useState("");

  const { data, isLoading } = useQueryById(id);

  const previewMutation = useQueryPreview();

  const query = data?.data || null;

  const handlePreview = async () => {
    try {
      const response = await previewMutation.mutateAsync({
        id,
        payload: {},
      });

      setSql(response.sql);
    } catch (error) {
      console.error(error);
    }
  };

  const copySQL = () => {
    navigator.clipboard.writeText(sql);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Query Preview</h1>

          <p className="opacity-60">{query?.name}</p>
        </div>

        <Card>
          <div className="flex gap-3">
            <Button onClick={handlePreview}>Generate SQL</Button>

            {sql && (
              <Button variant="secondary" onClick={copySQL}>
                Copy SQL
              </Button>
            )}
          </div>
        </Card>

        {sql && (
          <Card>
            <SyntaxHighlighter language="sql">{sql}</SyntaxHighlighter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

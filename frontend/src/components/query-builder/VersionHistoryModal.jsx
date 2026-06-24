import Modal from "../ui/Modal";
import Button from "../ui/Button";

import { useVersions, useRollbackQuery } from "../../hooks/useQueries";

import toast from "react-hot-toast";

export default function VersionHistoryModal({ open, onClose, queryId }) {
  const { data } = useVersions(queryId);

  const rollbackMutation = useRollbackQuery();

  const versions = data?.data || [];

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6">Version History</h2>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {versions.map((version) => (
          <div
            key={version.versionNumber}
            className="
                border
                border-[var(--border)]
                rounded-xl
                p-4
              "
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Version {version.versionNumber}</p>

                <p className="text-sm opacity-60">
                  {new Date(version.changedAt).toLocaleString()}
                </p>
              </div>

              <Button
                onClick={async () => {
                  try {
                    await rollbackMutation.mutateAsync({
                      id: queryId,
                      versionNumber: version.versionNumber,
                    });

                    toast.success("Rollback Successful");

                    onClose();
                  } catch {
                    toast.error("Rollback Failed");
                  }
                }}
              >
                Rollback
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

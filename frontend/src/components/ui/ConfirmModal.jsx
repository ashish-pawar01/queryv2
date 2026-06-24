import Modal from "./Modal";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) {
  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      <div className="space-y-5">
        <h2 className="text-xl font-semibold">{title}</h2>

        <p>{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
            px-4 py-2
            rounded-lg
            border
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
            px-4 py-2
            rounded-lg
            bg-red-600
            text-white
            "
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

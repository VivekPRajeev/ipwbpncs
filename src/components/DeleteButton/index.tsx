import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "../../fontawesome";

interface DeleteButtonProps {
  confirmationTitle: string;
  confirmationMessage: string;
  deleteHandler: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  confirmationTitle,
  confirmationMessage,
  deleteHandler,
}) => {
  const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setShowDeleteWarning(true)}
        title="Delete"
        aria-label="Delete"
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 ml-2"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <ConfirmationModal
        isOpen={showDeleteWarning}
        onClose={() => setShowDeleteWarning(false)}
        title={confirmationTitle}
        message={confirmationMessage}
        onConfirm={() => {
          deleteHandler();
          setShowDeleteWarning(false);
        }}
      />
    </>
  );
};

export default DeleteButton;

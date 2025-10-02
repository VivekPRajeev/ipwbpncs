import { useEffect, useRef, useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import { DISCARD_COMMENT_CONFIRMATION_MODAL } from "../../constants/labels";

interface AddCommentProps {
  cancelComment?: () => void;
  submitComment: (comment: string) => void;
  submitLabel?: string;
  hasCancelButton?: boolean;
}

const AddComment: React.FC<AddCommentProps> = ({
  cancelComment,
  submitComment,
  hasCancelButton = true,
  submitLabel = "Submit",
}) => {
  const [comment, setComment] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (commentInputRef.current) {
      commentInputRef.current.focus(); // Focus the textarea on mount for WCAG compliance
    }
  }, []);

  const handleCancel = () => {
    if (comment.trim() !== "") {
      setShowWarning(true);
    } else {
      cancelComment && cancelComment();
    }
  };
  const handleSubmit = () => {
    if (comment.trim() !== "") {
      submitComment(comment);
      setComment("");
    }
  };

  return (
    <div className="relative w-full mt-2 mb-2">
      <textarea
        ref={commentInputRef}
        value={comment}
        className="w-full border border-gray-300 rounded-md p-2 pr-32 pb-14 "
        rows={3}
        placeholder="Write a comment..."
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="absolute bottom-2 right-2 flex space-x-2">
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={handleSubmit}
        >
          {submitLabel}
        </button>
        {hasCancelButton && (
          <button
            className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
        <ConfirmationModal
          isOpen={showWarning}
          title={DISCARD_COMMENT_CONFIRMATION_MODAL.title}
          message={DISCARD_COMMENT_CONFIRMATION_MODAL.message}
          onClose={() => {
            setShowWarning(false);
          }}
          onConfirm={() => cancelComment && cancelComment()}
        />
      </div>
    </div>
  );
};

export default AddComment;

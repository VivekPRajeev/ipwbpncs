import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faReply } from "@fortawesome/free-solid-svg-icons";
import { DateView } from "../DateView";
import { useState } from "react";
import AddComment from "../AddComment";

interface CommentProps {
  userName: string;
  text: string;
  createdAt: number;
  deletedAt?: number;
  commentId?: string;
  replies?: (Omit<CommentProps, "addComment"> & { id: string })[];
  addComment: (text: string, commentId: string | undefined) => void;
}
export const Comment: React.FC<CommentProps> = ({
  userName,
  text,
  createdAt,
  replies,
  deletedAt,
  commentId,
  addComment,
}) => {
  const [hideReplies, setHideReplies] = useState(true);
  const [showAddComment, setShowAddComment] = useState(false);

  const submitComment = (comment: string) => {
    addComment(comment, commentId);
    setShowAddComment(false);
  };
  return (
    <div className="flex gap-3 relative">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
        <FontAwesomeIcon icon={faUser} className="text-blue-500 text-sm" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-gray-900">{userName}</span>
          <DateView createdAt={new Date(createdAt)} />
        </div>
        <p className="text-gray-700">
          {deletedAt == null ? text : <i>message deleted by user</i>}
        </p>
        <div className="flex justify-start mt-2">
          {!showAddComment && (
            <button
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600"
              onClick={() => setShowAddComment(!showAddComment)}
            >
              <FontAwesomeIcon icon={faReply} />
              Reply
            </button>
          )}
        </div>
        {showAddComment && (
          <AddComment
            cancelComment={() => setShowAddComment(false)}
            submitComment={(comment: string) => submitComment(comment)}
          />
        )}
        {hideReplies && replies && replies.length > 0 && (
          <button
            onClick={() => setHideReplies(false)}
            className="mt-2 text-sm text-gray-600 hover:text-gray-800"
          >
            View {replies.length} {replies.length > 1 ? "replies" : "reply"}
          </button>
        )}
        {!hideReplies && replies && replies.length > 0 && (
          <div className="mt-4 border-l-2 border-gray-200 pl-4">
            {replies.map((reply, index) => (
              <Comment
                key={index}
                {...reply}
                commentId={reply.id}
                addComment={addComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

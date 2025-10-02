import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faReply, faComment, faEyeSlash } from "../../fontawesome";
import { DateView } from "../DateView";
import { useState } from "react";
import AddComment from "../AddComment";
import DeleteButton from "../DeleteButton";
import { DELETE_COMMENT_CONFIRMATION } from "../../constants/labels";
import { areAllRepliesDeleted } from "../../utils/calc";

export interface CommentProps {
  userName: string;
  text: string;
  createdAt: number;
  deletedAt?: number;
  commentId: string;
  replies?: (Omit<
    CommentProps,
    "addComment" | "deleteComment" | "commentId"
  > & {
    id: string;
  })[];
  addComment: (text: string, commentId: string | undefined) => void;
  deleteComment: (commentId: string) => void;
}
export const Comment: React.FC<CommentProps> = ({
  userName,
  text,
  createdAt,
  replies,
  deletedAt,
  commentId,
  addComment,
  deleteComment,
}) => {
  const [hideReplies, setHideReplies] = useState<boolean>(true);
  const [showAddComment, setShowAddComment] = useState<boolean>(false);

  const submitComment = (comment: string) => {
    addComment(comment, commentId);
    setShowAddComment(false);
  };
  if (deletedAt && areAllRepliesDeleted(replies)) {
    // If the comment is deleted and has no replies, render nothing
    return <></>;
  }
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
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 ml-2"
              onClick={() => setShowAddComment(!showAddComment)}
            >
              <FontAwesomeIcon icon={faReply} />
              Reply
            </button>
          )}
          {hideReplies && replies && replies.length > 0 && (
            <button
              onClick={() => setHideReplies(false)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 ml-2"
            >
              <FontAwesomeIcon icon={faComment} />
              {replies.length} {replies.length > 1 ? "Comments" : "Comment"}
            </button>
          )}
          {!hideReplies && replies && replies.length > 0 && (
            <button
              onClick={() => setHideReplies(true)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 ml-2"
            >
              <FontAwesomeIcon icon={faEyeSlash} />
              Hide Replies
            </button>
          )}
          {deletedAt == null && (
            <DeleteButton
              confirmationTitle={DELETE_COMMENT_CONFIRMATION.title}
              confirmationMessage={DELETE_COMMENT_CONFIRMATION.message}
              deleteHandler={() => deleteComment(commentId)}
            />
          )}
        </div>
        {showAddComment && (
          <AddComment
            cancelComment={() => setShowAddComment(false)}
            submitComment={(comment: string) => submitComment(comment)}
          />
        )}

        {!hideReplies && replies && replies.length > 0 && (
          <div className="mt-4 border-l-2 border-gray-200 pl-4">
            {replies.map((reply, index) => (
              <Comment
                key={index}
                {...reply}
                commentId={reply.id}
                addComment={addComment}
                deleteComment={deleteComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

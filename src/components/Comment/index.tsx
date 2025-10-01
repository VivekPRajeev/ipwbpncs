import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faReply } from "@fortawesome/free-solid-svg-icons";

interface CommentProps {
  userName: string;
  text: string;
  createdAt: Date;
  replies?: CommentProps[]; // For nested comments (replies)
}
export const Comment: React.FC<CommentProps> = ({
  userName,
  text,
  createdAt,
  replies,
}) => {
  return (
    <div className="flex gap-3 relative">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
        <FontAwesomeIcon icon={faUser} className="text-blue-500 text-sm" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-gray-900">{userName}</span>
          <span className="text-sm text-gray-500">
            {createdAt.toDateString()}
          </span>
        </div>
        <p className="text-gray-700">{text}</p>
        <div className="flex justify-start mt-2">
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
            <FontAwesomeIcon icon={faReply} />
            Reply
          </button>
        </div>
        {replies && replies.length > 0 && (
          <div className="mt-4 border-l-2 border-gray-200 pl-4">
            {replies.map((reply, index) => (
              <Comment
                key={index}
                userName={reply.userName}
                text={reply.text}
                createdAt={reply.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

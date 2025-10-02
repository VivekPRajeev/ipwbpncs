import { Comment } from "./components/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUser } from "@fortawesome/free-solid-svg-icons";
import { useComments } from "./hooks/useComments";

function App() {
  const { comments, addComment, deleteComment } = useComments("project1"); //  Using a static projectId for demo purposes

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-4">
        <FontAwesomeIcon icon={faUser} className="text-2xl text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-900">Product Name</h1>
      </div>

      <p className="text-gray-700 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faComment} className="text-xl text-gray-600" />
          <h2 className="text-2xl font-semibold">Comments</h2>
        </div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            userName={comment.userName}
            text={comment.text}
            createdAt={comment.createdAt}
            replies={comment.replies}
            deletedAt={comment.deletedAt ? comment.deletedAt : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

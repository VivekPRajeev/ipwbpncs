import { Comment } from "./components/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUser } from "./fontawesome";
import { useComments } from "./hooks/useComments";
import { Nav } from "./components/Nav";
import { getCurrentUser } from "./utils/session";
import { UserProvider } from "./hooks/useCurrentUser";
import AddComment from "./components/AddComment";
import { useRef } from "react";
import { useDatabase } from "./hooks/useDatabase";
import CommentSkeleton from "./components/CommentSkeleton";

interface AddCommentHandler {
  (text: string, parentCommentId: string | undefined): void;
}

function App() {
  const { loading } = useDatabase();
  console.log("Database loading state:", loading);
  const { comments, addComment, deleteComment } = useComments("project1"); //  Using a static projectId for demo purposes
  const lastCommentRef = useRef<HTMLDivElement | null>(null);
  const addCommentHandler: AddCommentHandler = (text, parentCommentId) => {
    const currentUser = getCurrentUser();
    addComment(text, currentUser.id, currentUser.name, parentCommentId);
  };

  const deleteCommentHandler = (id: string) => {
    deleteComment(id);
  };
  const addCommentAction = (text: string) => {
    addCommentHandler(text, undefined);
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      lastCommentRef.current.focus(); // focus the last comment
    }
  };
  return (
    <>
      <UserProvider>
        <Nav />
        <div className="max-w-3xl mx-auto p-6">
          <div className="flex items-center gap-3 mb-4">
            <FontAwesomeIcon icon={faUser} className="text-2xl text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Product Name</h1>
          </div>

          <p className="text-gray-700 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <div className="mt-10">
            <div className="flex items-center gap-2 mb-4">
              <FontAwesomeIcon
                icon={faComment}
                className="text-xl text-gray-600"
              />
              <h2 className="text-2xl font-semibold">Comments</h2>
            </div>
            <AddComment
              hasCancelButton={false}
              submitComment={(text) => addCommentAction(text)}
            />
            {loading ? (
              <CommentSkeleton />
            ) : (
              comments.map((comment, index) => (
                <div
                  key={comment.id}
                  className="mt-1"
                  ref={index === comments.length - 1 ? lastCommentRef : null} // ref added to  the last comment for scrolling
                >
                  <Comment
                    userId={comment.userId}
                    commentId={comment.id} // Pass the comment id for reply association
                    userName={comment.userName}
                    text={comment.text}
                    createdAt={comment.createdAt}
                    replies={comment.replies}
                    deletedAt={
                      comment.deletedAt ? comment.deletedAt : undefined
                    }
                    addComment={(text, parentCommentId) =>
                      addCommentHandler(text, parentCommentId)
                    }
                    deleteComment={deleteCommentHandler}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </UserProvider>
    </>
  );
}

export default App;

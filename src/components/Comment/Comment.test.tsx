import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Comment } from "./index";

// Mock the hooks
const mockUseCurrentUser = vi.fn();

// Mock the components
vi.mock("../DateView", () => ({
  DateView: ({ createdAt }: { createdAt: Date }) => (
    <span data-testid="date-view">{createdAt.toISOString()}</span>
  ),
}));

// Mock FontAwesome icons
vi.mock("../../fontawesome", () => ({
  faUser: "user-icon",
  faReply: "reply-icon",
  faComment: "comment-icon",
  faEyeSlash: "eye-slash-icon",
}));

// mocked delete button
vi.mock("../DeleteButton", () => ({
  default: ({ deleteHandler }: { deleteHandler: () => void }) => (
    <button data-testid="delete-button" onClick={deleteHandler}>
      Delete
    </button>
  ),
}));
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon, className }: any) => (
    <span data-testid={`icon-${icon}`} className={className} />
  ),
}));

// hooks mocked
vi.mock("../../hooks/useCurrentUser", () => ({
  useCurrentUser: () => mockUseCurrentUser(),
}));

describe("Comment", () => {
  const mockAddComment = vi.fn();
  const mockDeleteComment = vi.fn();

  const defaultProps = {
    userId: "1",
    userName: "John Doe",
    text: "This is a test comment",
    createdAt: Date.now(),
    commentId: "comment-1",
    addComment: mockAddComment,
    deleteComment: mockDeleteComment,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock current user
    mockUseCurrentUser.mockReturnValue({
      currentUser: { id: "1", name: "John Doe" },
    });
  });

  describe("Single Comment with No Replies", () => {
    it("should render comment with no replies", () => {
      render(<Comment {...defaultProps} />);

      expect(screen.getByTestId("icon-user-icon")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("This is a test comment")).toBeInTheDocument();
      expect(screen.getByTestId("date-view")).toBeInTheDocument();
      expect(screen.getByText("Reply")).toBeInTheDocument();
      expect(screen.getByTestId("delete-button")).toBeInTheDocument();
    });
    it("should render comment without delete button  if not the user who posted the comment", () => {
      render(<Comment {...defaultProps} userId="2" />);

      expect(screen.getByTestId("icon-user-icon")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("This is a test comment")).toBeInTheDocument();
      expect(screen.getByTestId("date-view")).toBeInTheDocument();
      expect(screen.getByText("Reply")).toBeInTheDocument();
      expect(screen.queryByTestId("delete-button")).not.toBeInTheDocument();
    });
    it("should render replies if available", async () => {
      render(
        <Comment
          {...defaultProps}
          replies={[
            {
              userId: "2",
              userName: "Jane Smith",
              text: "This is a reply",
              createdAt: Date.now(),
              id: "comment-2",
            },
          ]}
        />
      );
      expect(screen.getByText("1 Comment")).toBeInTheDocument();
      expect(screen.queryByText("This is a reply")).not.toBeInTheDocument(); // reply hidden initially
      // Click to show replies
      screen.getByText("1 Comment").click();
      await screen.findByText("This is a reply"); //wait for async state update
      expect(screen.getByText("This is a reply")).toBeInTheDocument();
    });
  });
});

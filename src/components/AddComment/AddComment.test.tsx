import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddComment from "./index";

// Mock the ConfirmationModal component
vi.mock("../ConfirmationModal", () => ({
  default: ({ isOpen, onClose, onConfirm }: any) =>
    isOpen ? (
      <div data-testid="confirmation-modal">
        <button onClick={onClose} data-testid="modal-close">
          Close
        </button>
        <button onClick={onConfirm} data-testid="modal-confirm">
          Confirm
        </button>
      </div>
    ) : null,
}));

describe("AddComment", () => {
  const mockCancelComment = vi.fn();
  const mockSubmitComment = vi.fn();
  const user = userEvent.setup();

  const defaultProps = {
    cancelComment: mockCancelComment,
    submitComment: mockSubmitComment,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should send typed comment to submit handler when submit button is clicked", async () => {
    render(<AddComment {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Write a comment...");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    const testComment = "This is a test comment";
    await user.type(textarea, testComment);
    expect(textarea).toHaveValue(testComment);
    await user.click(submitButton);
    expect(mockSubmitComment).toHaveBeenCalledWith(testComment);
    expect(mockSubmitComment).toHaveBeenCalledTimes(1);
  });
  it("should open confirmation modal when cancel button is clicked with typed text", async () => {
    render(<AddComment {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Write a comment...");
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    const testComment = "This is a test comment";
    await user.type(textarea, testComment);
    expect(textarea).toHaveValue(testComment);
    await user.click(cancelButton);
    expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();
  });
  it("should call cancel handler when confirming discard in modal", async () => {
    render(<AddComment {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Write a comment...");
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    await user.type(textarea, "This is a test comment");
    await user.click(cancelButton);
    expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();
    const confirmButton = screen.getByTestId("modal-confirm");
    await user.click(confirmButton);
    expect(mockCancelComment).toHaveBeenCalledTimes(1);
  });
});

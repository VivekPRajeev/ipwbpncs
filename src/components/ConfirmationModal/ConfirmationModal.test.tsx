import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ConfirmationModal from "./index";

describe("ConfirmationModal", () => {
  const mockOnConfirm = vi.fn();
  const mockOnClose = vi.fn();

  const defaultProps = {
    isOpen: true,
    title: "Test Title",
    message: "Test message content",
    onConfirm: mockOnConfirm,
    onClose: mockOnClose,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render modal when isOpen is true", () => {
      render(<ConfirmationModal {...defaultProps} />);

      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test message content")).toBeInTheDocument();
    });

    it("should not render modal when isOpen is false", () => {
      render(<ConfirmationModal {...defaultProps} isOpen={false} />);

      expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Test message content")
      ).not.toBeInTheDocument();
    });
    it("should display default button texts", () => {
      render(<ConfirmationModal {...defaultProps} />);
      expect(screen.getByText("Confirm")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });
    it("should render custom button texts", () => {
      render(
        <ConfirmationModal
          {...defaultProps}
          confirmText="custom Confirm text"
          cancelText="custom cancel text"
        />
      );
      expect(screen.getByText("custom Confirm text")).toBeInTheDocument();
      expect(screen.getByText("custom cancel text")).toBeInTheDocument();
    });
    it("should call confirm and cancel functions on button click", async () => {
      render(<ConfirmationModal {...defaultProps} />);
      await screen.getByText("Confirm").click();
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
      await screen.getByText("Cancel").click();
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});

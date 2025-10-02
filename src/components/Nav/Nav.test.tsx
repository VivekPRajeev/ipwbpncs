import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Nav } from "./index";

const mockSetCurrentUserState = vi.fn();
const mockUseCurrentUser = vi.fn();
const mockUseUsers = vi.fn();

const mockSetCurrentUser = vi.fn();
const mockGetCurrentUser = vi.fn();

vi.mock("../../hooks/useUsers", () => ({
  useUsers: () => mockUseUsers(),
}));

vi.mock("../../hooks/useCurrentUser", () => ({
  useCurrentUser: () => mockUseCurrentUser(),
}));

vi.mock("../../utils/session", () => ({
  setCurrentUser: (user: any) => mockSetCurrentUser(user),
  getCurrentUser: () => mockGetCurrentUser(),
}));

describe("Nav", () => {
  const mockUsers = [
    { id: "1", name: "John Doe", email: "john@test.com" },
    { id: "2", name: "Alice Smith", email: "alice@test.com" },
    { id: "3", name: "Kevin baker", email: "kevin@test.com" },
  ];

  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementations
    mockUseUsers.mockReturnValue(mockUsers);
    mockUseCurrentUser.mockReturnValue({
      currentUser: mockUsers[0],
      setCurrentUser: mockSetCurrentUserState,
    });
    mockGetCurrentUser.mockReturnValue(null);
  });

  describe("Rendering", () => {
    it("should render navigation with app title", () => {
      render(<Nav />);

      expect(screen.getByText("App")).toBeInTheDocument();
    });

    it("should render current user name in button", () => {
      render(<Nav />);

      expect(
        screen.getByRole("button", { name: "John Doe" })
      ).toBeInTheDocument();
    });
  });

  describe("Dropdown Functionality", () => {
    it("should not show dropdown initially", () => {
      render(<Nav />);
      expect(screen.queryByText("Alice Smith")).not.toBeInTheDocument();
      expect(screen.queryByText("Kevin baker")).not.toBeInTheDocument();
    });

    it("should show dropdown on mouse enter", async () => {
      render(<Nav />);

      const userContainer = screen.getByRole("button", {
        name: "John Doe",
      }).parentElement;
      await user.hover(userContainer!);

      expect(screen.getByText("Alice Smith")).toBeInTheDocument();
      expect(screen.getByText("Kevin baker")).toBeInTheDocument();
    });

    it("should hide dropdown on mouse leave", async () => {
      render(<Nav />);

      const userContainer = screen.getByRole("button", {
        name: "John Doe",
      }).parentElement;

      await user.hover(userContainer!);
      expect(screen.getByText("Alice Smith")).toBeInTheDocument();

      // Hide dropdown
      await user.unhover(userContainer!);

      await waitFor(() => {
        expect(screen.queryByText("Alice Smith")).not.toBeInTheDocument();
      });
    });
  });

  describe("Initial User Setup", () => {
    it("should use session user if available", () => {
      const sessionUser = { id: "2", name: "Alice Smith" };
      mockGetCurrentUser.mockReturnValue(sessionUser);
      mockUseCurrentUser.mockReturnValue({
        currentUser: null,
        setCurrentUser: mockSetCurrentUserState,
      });

      render(<Nav />);

      expect(mockSetCurrentUserState).toHaveBeenCalledWith(sessionUser);
    });
  });

  describe("Hook Integration", () => {
    it("should call useUsers hook", () => {
      render(<Nav />);

      expect(mockUseUsers).toHaveBeenCalled();
    });

    it("should call useCurrentUser hook", () => {
      render(<Nav />);

      expect(mockUseCurrentUser).toHaveBeenCalled();
    });

    it("should handle useUsers returning empty array", () => {
      mockUseUsers.mockReturnValue([]);
      render(<Nav />);
      expect(screen.getByText("App")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument(); //button will be there but empty
    });
  });
});

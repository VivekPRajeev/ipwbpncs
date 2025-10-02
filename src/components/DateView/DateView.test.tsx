import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { DateView } from "./index";

// Mocking the formatTime function for unittesting
vi.mock("../../utils/calc", () => ({
  formatTime: vi.fn(),
}));

import { formatTime } from "../../utils/calc";
const mockFormatTime = vi.mocked(formatTime);

describe("DateView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the formatted time correctly", () => {
    const testDate = new Date(Date.now() - 2 * 60 * 60 * 1000);
    mockFormatTime.mockReturnValue("2 hours ago");
    render(<DateView createdAt={testDate} />);
    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
    expect(mockFormatTime).toHaveBeenCalledWith(testDate);
  });

  it("should handle recent timestamps", () => {
    const testDate = new Date(Date.now() - 30 * 1000);
    mockFormatTime.mockReturnValue("30 seconds ago");
    render(<DateView createdAt={testDate} />);
    expect(screen.getByText("30 seconds ago")).toBeInTheDocument();
    expect(mockFormatTime).toHaveBeenCalledTimes(1);
  });
});

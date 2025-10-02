import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DateView } from "./index";

describe("DateView Integration Tests", () => {
  it("should render formatted time for seconds", () => {
    const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);
    render(<DateView createdAt={thirtySecondsAgo} />);
    expect(screen.getByText("30 seconds ago")).toBeInTheDocument();
  });
  it("should render formatted time for minutes", () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    render(<DateView createdAt={fiveMinutesAgo} />);
    expect(screen.getByText("5 minutes ago")).toBeInTheDocument();
  });

  it("should render formatted time for hours", () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    render(<DateView createdAt={twoHoursAgo} />);
    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
  });

  it("should render formatted time for days", () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    render(<DateView createdAt={threeDaysAgo} />);
    expect(screen.getByText("3 days ago")).toBeInTheDocument();
  });
  it("should render date format for old dates", () => {
    const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
    render(<DateView createdAt={tenDaysAgo} />);
    const dateText = screen.getByText(/\d+ \w+ \d+/);
    expect(dateText).toBeInTheDocument();
  });
});

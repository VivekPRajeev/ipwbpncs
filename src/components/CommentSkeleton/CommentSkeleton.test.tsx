import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CommentSkeleton } from "./index";

describe("CommentSkeleton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should render the skeleton loader", () => {
    render(<CommentSkeleton />);
    expect(screen.getByTestId("commentLine1")).toBeInTheDocument();
    expect(screen.getByTestId("commentLine2")).toBeInTheDocument();
  });
});

import { describe, it, expect } from "vitest";
import { formatTime, buildCommentTree } from "../utils/calc";
import { Comment } from "../db/schemas";
import commentsMockList from "../mocks/commentsMockList";

describe("formatTime", () => {
  it("should format seconds correctly", () => {
    const date = new Date(Date.now() - 10 * 1000); // testing 10 seconds ago
    const result = formatTime(date);
    expect(result).toBe("10 seconds ago");
  });

  it("should format minutes correctly", () => {
    const date = new Date(Date.now() - 3 * 60 * 1000); // testing 3 minutes ago
    const result = formatTime(date);
    expect(result).toBe("3 minutes ago");
  });

  it("should format hours correctly", () => {
    const date = new Date(Date.now() - 2 * 60 * 60 * 1000); // for 2 hours ago
    const result = formatTime(date);
    expect(result).toBe("2 hours ago");
  });

  it("should format days correctly", () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    const result = formatTime(date);
    expect(result).toBe("2 days ago");
  });

  it("should format old dates as date string", () => {
    const date = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // 10 days ago
    const result = formatTime(date);
    expect(result).toMatch(/\d+ \w+ \d+/); // for more than 7 days should be  in format like "DD MMM YYYY" (eg : 22 Sept 2025)
  });

  it("should handle singular forms", () => {
    const dateSecond = new Date(Date.now() - 1 * 1000); // 1 second ago
    const dateMinute = new Date(Date.now() - 1 * 60 * 1000); // 1 minute ago
    const dateHour = new Date(Date.now() - 1 * 60 * 60 * 1000); // 1 hour ago
    const dateDay = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000); // 1 day ago

    expect(formatTime(dateSecond)).toBe("1 second ago");
    expect(formatTime(dateMinute)).toBe("1 minute ago");
    expect(formatTime(dateHour)).toBe("1 hour ago");
    expect(formatTime(dateDay)).toBe("1 day ago");
  });
});

describe("buildCommentTree", () => {
  it("should build a proper comment tree", () => {
    const tree = buildCommentTree(commentsMockList);
    //check if there are two main  comments on the response
    expect(tree).toHaveLength(2);
    expect(tree[0].id).toBe("1");
    expect(tree[1].id).toBe("3");

    // Check nested structure for first root comment
    expect(tree[0].replies).toHaveLength(1); // Comment 1 has one reply
    expect(tree[0].replies[0].id).toBe("2"); // Reply is comment 2
    expect(tree[0].replies[0].replies).toHaveLength(1); // Comment 2 has one reply
    expect(tree[0].replies[0].replies[0].id).toBe("4"); // Nested reply is comment 4

    // Second root comment should have no replies
    expect(tree[1].replies).toHaveLength(0);
  });

  it("should handle empty comment array", () => {
    const tree = buildCommentTree([]);
    expect(tree).toHaveLength(0);
  });

  it("should handle comments with missing parent - edge case", () => {
    const comments: Comment[] = [
      {
        id: "1",
        text: "The comment does not have  a parent",
        userId: "user1",
        userName: "User 1",
        projectId: "project1",
        parentId: "unknownParentId",
        isSynced: false,
        createdAt: Date.now(),
      },
    ];

    const tree = buildCommentTree(comments);
    expect(tree).toHaveLength(1); // Should be treated as root
    expect(tree[0].id).toBe("1");
  });
});

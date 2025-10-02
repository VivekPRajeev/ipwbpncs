import { Comment } from "../db/schemas";

export const formatTime = (createdAt: Date) => {
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;

  // fallback to date string if older than a week
  return createdAt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export type NestedComment = Comment & { replies: NestedComment[] };

export const buildCommentTree = (comments: Comment[]): NestedComment[] => {
  const map = new Map<string, NestedComment>();

  // first pass → create all nodes
  comments.forEach((comment) => {
    map.set(comment.id, { ...comment, replies: [] });
  });

  const roots: NestedComment[] = [];

  // second pass → assign children to parents
  map.forEach((comment) => {
    if (comment.parentId) {
      const parent = map.get(comment.parentId);
      if (parent) {
        parent.replies.push(comment);
      } else {
        // if parent missing (edge case), treat as root
        roots.push(comment);
      }
    } else {
      roots.push(comment);
    }
  });

  return roots;
};

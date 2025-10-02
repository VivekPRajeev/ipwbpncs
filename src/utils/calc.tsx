import { Comment } from "../db/schemas";
export type NestedComment = Comment & { replies: NestedComment[] };

// Format time difference as "x minutes/hours/days ago"
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

// Build a tree structure from flat comment list
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

export interface CommentProps {
  userName: string;
  text: string;
  createdAt: number;
  deletedAt?: number;
  commentId: string;
  replies?: (Omit<
    CommentProps,
    "addComment" | "deleteComment" | "commentId"
  > & {
    id: string;
  })[];
}

/**
 * Returns true if all replies and nested replies have deletedAt set and non-zero
 */
export const areAllRepliesDeleted = (
  comments: Pick<CommentProps, "deletedAt" | "replies">[] = []
): boolean => {
  if (!comments || comments.length === 0) return true; // no replies → considered deleted

  return comments.every((comment) => {
    const isDeleted = !!comment.deletedAt && comment.deletedAt !== 0;
    const childrenDeleted = areAllRepliesDeleted(comment.replies || []);
    return isDeleted && childrenDeleted;
  });
};

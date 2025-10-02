import { Comment } from "../db/schemas";

export const commentsMockList: Comment[] = [
  {
    id: "1",
    userName: "Alice",
    userId: "al0121",
    text: "Root comment 1 - This is the first top-level comment",
    projectId: "project1",
    parentId: undefined,
    isSynced: false,
    createdAt: Date.now() - 3600000, // 1 hour ago
  },
  {
    id: "2",
    text: "Reply to comment 1 - This is a reply to Alice's comment",
    userId: "b12scv1",
    userName: "Bob",
    projectId: "project1",
    parentId: "1",
    isSynced: false,
    createdAt: Date.now() - 3000000, // 50 minutes ago
  },
  {
    id: "3",
    text: "Root comment 2 - This is the second top-level comment",
    userId: "user3",
    userName: "Charlie",
    projectId: "project1",
    parentId: undefined,
    isSynced: false,
    createdAt: Date.now() - 2400000, // 40 minutes ago
  },
  {
    id: "4",
    text: "Reply to reply - This is a nested reply to Bob's comment",
    userId: "user4",
    userName: "Diana",
    projectId: "project1",
    parentId: "2",
    isSynced: false,
    createdAt: Date.now() - 1800000, // 30 minutes ago
  },
];

export default commentsMockList;

import type { RxCollection, RxJsonSchema } from "rxdb";

export interface User {
  id: string;
  name: string;
  email: string;
  isSynced: boolean;
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  userName: string;
  projectId: string;
  parentId?: string;
  isSynced: boolean;
  createdAt: number;
  deletedAt?: number;
}

export interface DatabaseType {
  comments: RxCollection<Comment>;
  users: RxCollection<User>;
}

// User schema
export const userSchema: RxJsonSchema<User> = {
  title: "user schema",
  version: 0,
  type: "object",
  primaryKey: "id",
  properties: {
    id: { type: "string", maxLength: 100 },
    name: { type: "string" },
    email: { type: "string" },
    isSynced: { type: "boolean", default: false },
  },
  required: ["id", "name", "email"],
};

// Comment schema
export const commentSchema: RxJsonSchema<Comment> = {
  title: "comment schema",
  version: 0,
  type: "object",
  primaryKey: "id",
  properties: {
    id: { type: "string", maxLength: 100 },
    text: { type: "string" },
    userId: { type: "string" },
    userName: { type: "string" },
    projectId: { type: "string" },
    parentId: { type: "string" },
    createdAt: { type: "number" },
    deletedAt: { type: "number" },
    isSynced: { type: "boolean", default: false },
  },
  required: ["id", "text", "userId", "projectId", "createdAt"],
};

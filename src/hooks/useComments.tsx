import { useEffect, useState, useCallback } from "react";
import { Comment } from "../db/schemas";
import { buildCommentTree, NestedComment } from "../utils/calc";
import { useDatabase } from "./useDatabase";
import { RxDocument } from "rxdb";
import { Subscription } from "rxjs";

export function useComments(projectId: string) {
  const { db } = useDatabase();
  const [comments, setComments] = useState<NestedComment[]>([]);

  useEffect(() => {
    if (!db) return;
    let sub: Subscription;
    sub = db.comments
      .find({ selector: { projectId }, sort: [{ createdAt: "asc" }] })
      .$.subscribe((docs: RxDocument<Comment>[]) => {
        const flatComments: Comment[] = docs.map((doc) => ({
          ...doc.toJSON(),
          text: doc.deletedAt ? "message deleted by user" : doc.text,
        }));

        const threadedComments = buildCommentTree(flatComments); // restructure linear comments into a tree structure
        setComments(threadedComments);
      });

    return () => {
      if (sub) sub.unsubscribe();
    };
  }, [db, projectId]);

  // Add a new comment
  const addComment = useCallback(
    async (
      text: string,
      userId: string,
      userName: string,
      parentId?: string
    ) => {
      if (!db) return;
      await db.comments.insert({
        id: crypto.randomUUID(),
        userName,
        userId,
        text,
        projectId,
        parentId,
        createdAt: Date.now(),
        deletedAt: undefined,
        isSynced: false,
      });
    },
    [db, projectId]
  );

  // Soft delete
  const deleteComment = useCallback(
    async (id: string) => {
      if (!db) return;

      const doc = await db.comments.findOne({ selector: { id } }).exec();
      if (doc) {
        await doc.patch({ deletedAt: Date.now() });
      }
    },
    [db]
  );

  return {
    comments,
    addComment,
    deleteComment,
  };
}

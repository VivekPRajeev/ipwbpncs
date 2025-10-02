import { useEffect, useState, useCallback } from "react";
import { initDB } from "../db/db";
import { populateDefaults } from "../db/seed";
import { Comment } from "../db/schemas";
import { buildCommentTree, NestedComment } from "../utils/calc";

export function useComments(projectId: string) {
  const [comments, setComments] = useState<NestedComment[]>([]);
  const [db, setDb] = useState<any>(null);

  // Setup DB + subscription
  useEffect(() => {
    let sub: any;
    const setup = async () => {
      await populateDefaults();
      const database = await initDB();
      setDb(database);
      sub = database.comments
        .find({ selector: { projectId }, sort: [{ createdAt: "asc" }] })
        .$.subscribe((docs: any[]) => {
          const flatComments: Comment[] = docs.map((doc) => ({
            ...doc.toJSON(),
            text: doc.deletedAt ? "message deleted by user" : doc.text,
          }));

          const threadedComments = buildCommentTree(flatComments); // restructure linear comments into a tree structure
          setComments(threadedComments);
        });
    };
    setup();

    return () => {
      if (sub) sub.unsubscribe();
    };
  }, [projectId]);

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

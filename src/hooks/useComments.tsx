import { useEffect, useState, useCallback } from "react";
import { initDB } from "../db/db";
import { populateDefaults } from "../db/seed";

interface Comment {
  id: string;
  userName: string;
  text: string;
  createdAt: Date;
  replies?: Comment[];
  deletedAt?: Date;
  parentId?: string | null;
  projectId: string;
}

export function useProjectComments(projectId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [db, setDb] = useState<any>(null);

  // Setup DB + subscription
  useEffect(() => {
    let sub: any;
    const setup = async () => {
      await populateDefaults();
      const database = await initDB();
      setDb(database);

      sub = database.comments
        .find({ selector: { projectId } })
        .$.subscribe((docs: any[]) =>
          setComments(
            docs.map((doc) => ({
              ...doc.toJSON(),
              text: doc.deletedAt ? "message deleted by user" : doc.text,
              createdAt: new Date(doc.createdAt),
              deletedAt: doc.deletedAt ? new Date(doc.deletedAt) : undefined,
            }))
          )
        );
    };

    setup();

    return () => {
      if (sub) sub.unsubscribe();
    };
  }, [projectId]);

  // Add a new comment
  const addComment = useCallback(
    async (userName: string, text: string, parentId?: string) => {
      if (!db) return;

      await db.comments.insert({
        id: crypto.randomUUID(),
        userName,
        userId: crypto.randomUUID(),
        text,
        projectId,
        parentId,
        createdAt: Date.now(),
        deletedAt: null,
        isSynced: false,
      });
    },
    [db, projectId]
  );

  // Soft delete (mark deletedAt)
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

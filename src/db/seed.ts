import { initDB } from "./db";

const defaultUsers = [
  { id: "u1", name: "Alice", email: "alice@example.com" },
  { id: "u2", name: "Bob", email: "bob@example.com" },
  { id: "u3", name: "Charlie", email: "charlie@example.com" },
  { id: "u4", name: "Diana", email: "diana@example.com" },
  { id: "u5", name: "Eve", email: "eve@example.com" },
];

const defaultCommentsText = [
  "First comment",
  "Another comment",
  "Hello world",
  "Nice project!",
  "RxDB is cool",
];

export const populateDefaults = async () => {
  const db = await initDB();

  // Insert users if they don't exist
  for (const user of defaultUsers) {
    try {
      const existingUser = await db.users.findOne(user.id).exec();
      if (!existingUser) {
        await db.users.insert({ ...user, isSynced: false });
      }
    } catch (error) {
      // User doesn't exist
      try {
        await db.users.insert({ ...user, isSynced: false });
      } catch (insertError) {
        // Ignore duplicate errors,  if already exists
        console.log(`User ${user.id} already exists, skipping...`);
      }
    }
  }

  // Insert 5 comments per user if they don't exist
  for (let userIndex = 0; userIndex < defaultUsers.length; userIndex++) {
    const user = defaultUsers[userIndex];
    for (
      let textIndex = 0;
      textIndex < defaultCommentsText.length;
      textIndex++
    ) {
      const text = defaultCommentsText[textIndex];
      const commentId = `c${userIndex + 1}_${textIndex + 1}`;

      try {
        const existingComment = await db.comments.findOne(commentId).exec();
        if (!existingComment) {
          const shouldHaveParent = Math.random() < 0.5;
          const parentId = shouldHaveParent
            ? `c${userIndex + 1}_${
                Math.floor(Math.random() * defaultCommentsText.length) + 1
              }`
            : null;
          await db.comments.insert({
            id: commentId,
            text,
            userId: user.id,
            userName: user.name,
            parentId: parentId || undefined,
            projectId: "project1",
            createdAt: Date.now(),
            isSynced: false,
          });
        }
      } catch (error) {
        // Comment doesn't exist, insert it
        try {
          await db.comments.insert({
            id: commentId,
            text,
            userId: user.id,
            userName: user.name,
            projectId: "project1",
            createdAt: Date.now(),
            isSynced: false,
          });
        } catch (insertError) {
          // Ignore duplicate errors
          console.log(`Comment ${commentId} already exists, skipping...`);
        }
      }
    }
  }
};

import {
  createRxDatabase,
  addRxPlugin,
  type RxDatabase,
  type RxCollection,
} from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { userSchema, commentSchema, type User, type Comment } from "./schemas";

addRxPlugin(RxDBDevModePlugin); // Dev mode plugin

export type AppCollections = {
  users: RxCollection<User>;
  comments: RxCollection<Comment>;
};

let dbInstance: RxDatabase<AppCollections> | null = null;

export const initDB = async () => {
  if (dbInstance) return dbInstance;

  const db = await createRxDatabase<AppCollections>({
    name: "autarccomments",
    storage: wrappedValidateAjvStorage({
      storage: getRxStorageDexie(),
    }),
    multiInstance: true,
    eventReduce: true,
    ignoreDuplicate: true, // For React hot reload
  });

  await db.addCollections({
    users: { schema: userSchema },
    comments: { schema: commentSchema },
  });

  dbInstance = db;
  return db;
};

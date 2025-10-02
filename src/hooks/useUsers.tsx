import { useEffect, useState } from "react";
import { useDatabase } from "./useDatabase";
import { User } from "../db/schemas";
import { Subscription } from "rxjs";
import { RxDocument } from "rxdb";

export const useUsers = () => {
  const { db } = useDatabase();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!db) return;
    let sub: Subscription;
    sub = db.users.find().$.subscribe((docs: RxDocument<User>[]) => {
      const userList = docs.map((doc) => doc.toJSON());
      setUsers(userList);
    });

    return () => {
      if (sub) sub.unsubscribe();
    };
  }, [db]);
  return users;
};

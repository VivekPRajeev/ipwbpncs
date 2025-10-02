import { useEffect, useState } from "react";
import { initDB } from "../db/db";
import { populateDefaults } from "../db/seed";
import { RxDatabase } from "rxdb";
import { DatabaseType } from "../db/schemas";

export function useDatabase() {
  const [db, setDb] = useState<RxDatabase<DatabaseType> | null>(null);

  useEffect(() => {
    const setupDB = async () => {
      await populateDefaults();
      const database = await initDB();
      setDb(database);
    };

    setupDB();
  }, []);

  return db;
}

import { useEffect, useState } from "react";
import { initDB } from "../db/db";
import { populateDefaults } from "../db/seed";
import { RxDatabase } from "rxdb";
import { DatabaseType } from "../db/schemas";

export function useDatabase() {
  const [db, setDb] = useState<RxDatabase<DatabaseType> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    let isMounted = true;
    const setupDB = async () => {
      try {
        await populateDefaults();
        const database = await initDB();
        if (isMounted) {
          setDb(database);
        }
      } catch (err) {
        console.error("Failed to initialize DB", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    setupDB();
    return () => {
      isMounted = false;
    };
  }, []);

  return { db, loading };
}

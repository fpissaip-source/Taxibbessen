import path from "node:path";
import { fileURLToPath } from "node:url";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "@workspace/db";
import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const migrationsFolder = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../lib/db/migrations",
);

const MIGRATION_MAX_ATTEMPTS = 30;
const MIGRATION_RETRY_DELAY_MS = 2000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function runMigrations() {
  for (let attempt = 1; attempt <= MIGRATION_MAX_ATTEMPTS; attempt++) {
    try {
      await migrate(db, { migrationsFolder });
      logger.info({ attempt }, "Database migrations applied");
      return;
    } catch (err) {
      if (attempt === MIGRATION_MAX_ATTEMPTS) {
        throw err;
      }
      logger.warn(
        { err, attempt, maxAttempts: MIGRATION_MAX_ATTEMPTS },
        "Database migration attempt failed (DB may not be reachable yet), retrying…",
      );
      await sleep(MIGRATION_RETRY_DELAY_MS);
    }
  }
}

async function start() {
  try {
    await runMigrations();
  } catch (err) {
    logger.error({ err }, "Failed to apply database migrations");
    process.exit(1);
  }

  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });
}

start();

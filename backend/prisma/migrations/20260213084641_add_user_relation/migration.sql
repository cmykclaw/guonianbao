-- AlterTable
ALTER TABLE "users" ADD COLUMN "password" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_gift_records" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    CONSTRAINT "gift_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_gift_records" ("amount", "createdAt", "date", "id", "name", "notes", "type", "updatedAt") SELECT "amount", "createdAt", "date", "id", "name", "notes", "type", "updatedAt" FROM "gift_records";
DROP TABLE "gift_records";
ALTER TABLE "new_gift_records" RENAME TO "gift_records";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

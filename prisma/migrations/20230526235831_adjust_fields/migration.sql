/*
  Warnings:

  - Changed the type of `cost` on the `project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "project_cost_key";

-- AlterTable
ALTER TABLE "project" DROP COLUMN "cost",
ADD COLUMN     "cost" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "done" SET DEFAULT false;

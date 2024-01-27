/*
  Warnings:

  - The `MidSubmissionStart` column on the `PS` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PS" ALTER COLUMN "FinalDeadline" DROP NOT NULL,
ALTER COLUMN "FinalDeadline" DROP DEFAULT,
ALTER COLUMN "FinalSudmissionStart" DROP NOT NULL,
ALTER COLUMN "FinalSudmissionStart" DROP DEFAULT,
ALTER COLUMN "MidDeadline" DROP NOT NULL,
ALTER COLUMN "MidDeadline" DROP DEFAULT,
DROP COLUMN "MidSubmissionStart",
ADD COLUMN     "MidSubmissionStart" TIMESTAMP(3);

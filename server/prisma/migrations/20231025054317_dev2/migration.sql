/*
  Warnings:

  - You are about to drop the column `deadline` on the `PS` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PS" DROP COLUMN "deadline",
ADD COLUMN     "FinalDeadline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "FinalSudmissionStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "MidDeadline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "MidSubmissionStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

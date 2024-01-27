/*
  Warnings:

  - Changed the type of `submissionType` on the `Submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SubmissionType" AS ENUM ('MID', 'FINAL');

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "submissionType",
ADD COLUMN     "submissionType" "SubmissionType" NOT NULL;

-- DropEnum
DROP TYPE "Type";

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('MID', 'FINAL');

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "pSTeamId" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submissionType" "Type" NOT NULL,
    "submissionURL" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_pSTeamId_fkey" FOREIGN KEY ("pSTeamId") REFERENCES "PSTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

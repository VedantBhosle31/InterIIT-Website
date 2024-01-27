-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PARTICIPANT', 'ADMIN');

-- CreateEnum
CREATE TYPE "PSType" AS ENUM ('HIGH', 'MID', 'LOW', 'NO');

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "idCardUrl" TEXT NOT NULL,
    "tshirt" TEXT NOT NULL,
    "foodPref" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leader" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "idCardUrl" TEXT NOT NULL,
    "tshirt" TEXT NOT NULL,
    "foodPref" TEXT NOT NULL,

    CONSTRAINT "Leader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PSTeam" (
    "id" TEXT NOT NULL,
    "ps_id" TEXT NOT NULL,
    "iit_id" TEXT NOT NULL,

    CONSTRAINT "PSTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IIT" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'PARTICIPANT',
    "iitNumber" INTEGER NOT NULL DEFAULT 0,
    "contingentLeaderId" TEXT NOT NULL,
    "deputyContingentLeaderId" TEXT NOT NULL,
    "deputyContingentLeaderId2" TEXT,
    "coCasId" TEXT NOT NULL,
    "feeApproved" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "feeToBePaid" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "IIT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PS" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "psType" "PSType" NOT NULL,

    CONSTRAINT "PS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IIT_name_key" ON "IIT"("name");

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "PSTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PSTeam" ADD CONSTRAINT "PSTeam_iit_id_fkey" FOREIGN KEY ("iit_id") REFERENCES "IIT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

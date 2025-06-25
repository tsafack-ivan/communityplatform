-- CreateEnum
CREATE TYPE "OpportunityStatus" AS ENUM ('OPEN', 'FILLED', 'CANCELLED', 'COMPLETED');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'VOLUNTEER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT;

-- CreateTable
CREATE TABLE "VolunteerOpportunity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "requiredSkills" TEXT[],
    "status" "OpportunityStatus" NOT NULL DEFAULT 'OPEN',
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VolunteerOpportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToVolunteerOpportunity" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToVolunteerOpportunity_AB_unique" ON "_UserToVolunteerOpportunity"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToVolunteerOpportunity_B_index" ON "_UserToVolunteerOpportunity"("B");

-- AddForeignKey
ALTER TABLE "VolunteerOpportunity" ADD CONSTRAINT "VolunteerOpportunity_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVolunteerOpportunity" ADD CONSTRAINT "_UserToVolunteerOpportunity_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVolunteerOpportunity" ADD CONSTRAINT "_UserToVolunteerOpportunity_B_fkey" FOREIGN KEY ("B") REFERENCES "VolunteerOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

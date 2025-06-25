-- CreateEnum
CREATE TYPE "OrganizationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "status" "OrganizationStatus" NOT NULL DEFAULT 'PENDING';

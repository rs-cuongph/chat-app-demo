-- CreateEnum
CREATE TYPE "Role_T" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role_T" NOT NULL DEFAULT 'MEMBER';

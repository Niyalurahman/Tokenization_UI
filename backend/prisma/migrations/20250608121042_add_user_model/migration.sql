/*
  Warnings:

  - You are about to drop the column `userId` on the `KYCSubmission` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `registeredAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `totalEarnings` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `totalInvested` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `KYCSubmission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `KYCSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `KYCSubmission` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `KYCSubmission` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('INVESTOR', 'LANDOWNER', 'COMPLIANCE', 'ADMIN');

-- DropForeignKey
ALTER TABLE "KYCSubmission" DROP CONSTRAINT "KYCSubmission_userId_fkey";

-- AlterTable
ALTER TABLE "KYCSubmission" DROP COLUMN "userId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "active",
DROP COLUMN "lastLogin",
DROP COLUMN "registeredAt",
DROP COLUMN "totalEarnings",
DROP COLUMN "totalInvested",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "KYCSubmission_email_key" ON "KYCSubmission"("email");

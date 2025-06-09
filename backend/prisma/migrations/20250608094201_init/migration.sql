/*
  Warnings:

  - You are about to drop the column `email` on the `KYCSubmission` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "KYCSubmission" DROP CONSTRAINT "KYCSubmission_userId_fkey";

-- AlterTable
ALTER TABLE "KYCSubmission" DROP COLUMN "email";

-- DropTable
DROP TABLE "User";

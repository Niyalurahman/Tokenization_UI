/*
  Warnings:

  - You are about to drop the `KYCSubmission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertyHolding` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertySubmission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PropertyHolding" DROP CONSTRAINT "PropertyHolding_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyHolding" DROP CONSTRAINT "PropertyHolding_userId_fkey";

-- DropTable
DROP TABLE "KYCSubmission";

-- DropTable
DROP TABLE "PropertyHolding";

-- DropTable
DROP TABLE "PropertySubmission";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";

-- AlterTable
ALTER TABLE "PropertySubmission" ADD COLUMN     "tokenized" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "totalTokens" INTEGER NOT NULL DEFAULT 100;

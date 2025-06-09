-- CreateTable
CREATE TABLE "KYCSubmission" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    "reviewer" TEXT,
    "comments" TEXT,

    CONSTRAINT "KYCSubmission_pkey" PRIMARY KEY ("id")
);

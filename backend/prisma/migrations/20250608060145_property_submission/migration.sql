-- CreateTable
CREATE TABLE "PropertySubmission" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "location" TEXT NOT NULL,
    "documentsUrl" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    "reviewer" TEXT,
    "rejectionReason" TEXT,

    CONSTRAINT "PropertySubmission_pkey" PRIMARY KEY ("id")
);

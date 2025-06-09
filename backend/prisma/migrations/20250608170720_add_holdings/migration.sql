-- CreateTable
CREATE TABLE "PropertyHolding" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "tokens" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropertyHolding_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PropertyHolding" ADD CONSTRAINT "PropertyHolding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyHolding" ADD CONSTRAINT "PropertyHolding_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "PropertySubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "contractId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "instrumentId" TEXT NOT NULL,
    "totalSupply" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "issuer" TEXT NOT NULL,
    "investor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Asset_contractId_key" ON "Asset"("contractId");

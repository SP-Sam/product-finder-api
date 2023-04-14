-- CreateTable
CREATE TABLE "Search" (
    "id" SERIAL NOT NULL,
    "search" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Search_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "searchId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Search_search_key" ON "Search"("search");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "Search"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

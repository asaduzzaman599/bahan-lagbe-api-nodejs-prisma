/*
  Warnings:

  - You are about to drop the column `pricePerHour` on the `vehicles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "pricePerHour",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

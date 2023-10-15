/*
  Warnings:

  - The values [pending,confirmed,cancelled,completed] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [large,medium,small] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[bookingId]` on the table `reviewAndRatings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookingStatus_new" AS ENUM ('PENDING', 'BOOKED', 'CANCELLED', 'REJECT', 'COMPLETED');
ALTER TABLE "bookings" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "bookings" ALTER COLUMN "status" TYPE "BookingStatus_new" USING ("status"::text::"BookingStatus_new");
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "BookingStatus_old";
ALTER TABLE "bookings" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('LARGE', 'MEDIUM', 'SMALL');
ALTER TABLE "vehicles" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "vehicles" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
ALTER TABLE "vehicles" ALTER COLUMN "type" SET DEFAULT 'SMALL';
COMMIT;

-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "vehicles" ALTER COLUMN "type" SET DEFAULT 'SMALL';

-- CreateIndex
CREATE UNIQUE INDEX "reviewAndRatings_bookingId_key" ON "reviewAndRatings"("bookingId");

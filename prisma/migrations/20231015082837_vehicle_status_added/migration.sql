-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('AVAILABLE', 'BOOKED', 'NOTAVAILABLE');

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "status" "VehicleStatus" NOT NULL DEFAULT 'AVAILABLE';

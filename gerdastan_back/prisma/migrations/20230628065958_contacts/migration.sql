/*
  Warnings:

  - You are about to drop the column `contactId` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Phone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_contactId_fkey";

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "contactId",
ADD COLUMN     "address" TEXT[],
ADD COLUMN     "phone" TEXT[],
ADD COLUMN     "soctialNetworks" TEXT[];

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "Phone";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_contactId_fkey";

-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "contactId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Attachment" ALTER COLUMN "attachment_link" DROP NOT NULL,
ALTER COLUMN "attachment_link" SET DATA TYPE TEXT;

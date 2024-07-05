-- AlterTable
ALTER TABLE "Photo" ALTER COLUMN "photo_image" DROP NOT NULL,
ALTER COLUMN "photo_image" SET DATA TYPE TEXT;

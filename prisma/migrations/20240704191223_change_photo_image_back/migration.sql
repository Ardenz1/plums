/*
  Warnings:

  - The `photo_image` column on the `Photo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "photo_image",
ADD COLUMN     "photo_image" BYTEA;

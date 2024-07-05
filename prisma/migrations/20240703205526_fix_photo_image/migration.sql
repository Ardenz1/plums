/*
  Warnings:

  - Added the required column `photo_image` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "photo_image",
ADD COLUMN     "photo_image" BYTEA NOT NULL;

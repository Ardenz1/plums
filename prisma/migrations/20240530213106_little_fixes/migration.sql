/*
  Warnings:

  - You are about to drop the column `Topic_Detail_amount` on the `Topic_Detail` table. All the data in the column will be lost.
  - You are about to drop the column `Topic_Detail_created_at` on the `Topic_Detail` table. All the data in the column will be lost.
  - You are about to drop the column `Topic_Detail_title` on the `Topic_Detail` table. All the data in the column will be lost.
  - You are about to drop the column `Topic_Detail_updated_at` on the `Topic_Detail` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `topic_detail_amount` to the `Topic_Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic_detail_title` to the `Topic_Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic_detail_updated_at` to the `Topic_Detail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Topic_Detail" DROP COLUMN "Topic_Detail_amount",
DROP COLUMN "Topic_Detail_created_at",
DROP COLUMN "Topic_Detail_title",
DROP COLUMN "Topic_Detail_updated_at",
ADD COLUMN     "topic_detail_amount" INTEGER NOT NULL,
ADD COLUMN     "topic_detail_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "topic_detail_title" TEXT NOT NULL,
ADD COLUMN     "topic_detail_updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

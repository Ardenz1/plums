-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "photo_image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Topic_Detail" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Tag" (
    "tag_id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "Topic_Tag" (
    "topic_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "Topic_Tag_pkey" PRIMARY KEY ("topic_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "Topic_Tag" ADD CONSTRAINT "fk_topic" FOREIGN KEY ("topic_id") REFERENCES "Topic"("topic_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Topic_Tag" ADD CONSTRAINT "fk_tag" FOREIGN KEY ("tag_id") REFERENCES "Tag"("tag_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

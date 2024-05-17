-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "topic_id" SERIAL NOT NULL,
    "topic_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("topic_id")
);

-- CreateTable
CREATE TABLE "Topic_Detail" (
    "topic_detail_id" SERIAL NOT NULL,
    "Topic_Detail_title" TEXT NOT NULL,
    "Topic_Detail_amount" INTEGER NOT NULL,
    "Topic_Detail_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Topic_Detail_updated_at" TIMESTAMP(3) NOT NULL,
    "topic_id" INTEGER NOT NULL,

    CONSTRAINT "Topic_Detail_pkey" PRIMARY KEY ("topic_detail_id")
);

-- CreateTable
CREATE TABLE "Note" (
    "note_id" SERIAL NOT NULL,
    "note_header" TEXT NOT NULL,
    "note_description" TEXT,
    "note_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note_updated_at" TIMESTAMP(3) NOT NULL,
    "topic_detail_id" INTEGER NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("note_id")
);

-- CreateTable
CREATE TABLE "Link" (
    "link_id" SERIAL NOT NULL,
    "link_header" TEXT NOT NULL,
    "link_description" TEXT,
    "link_hyperlink" TEXT NOT NULL,
    "link_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "link_updated_at" TIMESTAMP(3) NOT NULL,
    "topic_detail_id" INTEGER NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("link_id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "photo_id" SERIAL NOT NULL,
    "photo_header" TEXT NOT NULL,
    "photo_description" TEXT,
    "photo_image" BYTEA NOT NULL,
    "photo_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "photo_updated_at" TIMESTAMP(3) NOT NULL,
    "topic_detail_id" INTEGER NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "attachment_id" SERIAL NOT NULL,
    "attachment_header" TEXT NOT NULL,
    "attachment_description" TEXT,
    "attachment_link" BYTEA NOT NULL,
    "attachment_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attachment_updated_at" TIMESTAMP(3) NOT NULL,
    "topic_detail_id" INTEGER NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("attachment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic_Detail" ADD CONSTRAINT "Topic_Detail_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("topic_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_topic_detail_id_fkey" FOREIGN KEY ("topic_detail_id") REFERENCES "Topic_Detail"("topic_detail_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_topic_detail_id_fkey" FOREIGN KEY ("topic_detail_id") REFERENCES "Topic_Detail"("topic_detail_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_topic_detail_id_fkey" FOREIGN KEY ("topic_detail_id") REFERENCES "Topic_Detail"("topic_detail_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_topic_detail_id_fkey" FOREIGN KEY ("topic_detail_id") REFERENCES "Topic_Detail"("topic_detail_id") ON DELETE RESTRICT ON UPDATE CASCADE;

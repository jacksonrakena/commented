-- CreateEnum
CREATE TYPE "ObjectType" AS ENUM ('Playlist', 'Track', 'Album', 'Artist', 'Genre', 'Year');

-- CreateEnum
CREATE TYPE "ObjectSource" AS ENUM ('Spotify', 'AppleMusic', 'Discogs', 'YouTubeMusic', 'YouTube', 'Original');

-- CreateTable
CREATE TABLE "ObjectCommentary" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "label" TEXT,
    "text" TEXT,
    "rating" INTEGER,
    "objectRecordId" UUID NOT NULL,

    CONSTRAINT "ObjectCommentary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjectRecord" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "objectType" "ObjectType" NOT NULL,
    "objectSource" "ObjectSource" NOT NULL,
    "objectSourceId" TEXT NOT NULL,
    "collectionId" UUID NOT NULL,

    CONSTRAINT "ObjectRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjectCollection" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "objectType" "ObjectType" NOT NULL,
    "objectSource" "ObjectSource" NOT NULL,
    "objectSourceId" TEXT,

    CONSTRAINT "ObjectCollection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ObjectCollection_objectSourceId_idx" ON "ObjectCollection"("objectSourceId");

-- AddForeignKey
ALTER TABLE "ObjectCommentary" ADD CONSTRAINT "ObjectCommentary_objectRecordId_fkey" FOREIGN KEY ("objectRecordId") REFERENCES "ObjectRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjectRecord" ADD CONSTRAINT "ObjectRecord_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "ObjectCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

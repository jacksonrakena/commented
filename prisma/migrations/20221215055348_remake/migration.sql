-- CreateTable
CREATE TABLE "TrackCommentary" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "TrackCommentary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlbumCollection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AlbumCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlbumCollectionEntry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "spotifyAlbumId" TEXT NOT NULL,
    "albumCollectionId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "AlbumCollectionEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlbumCommentary" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "albumCollectionEntryId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "AlbumCommentary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TrackCommentary_playlistId_idx" ON "TrackCommentary"("playlistId");

-- CreateIndex
CREATE INDEX "AlbumCollection_authorId_idx" ON "AlbumCollection"("authorId");

-- CreateIndex
CREATE INDEX "AlbumCollectionEntry_albumCollectionId_idx" ON "AlbumCollectionEntry"("albumCollectionId");

-- CreateIndex
CREATE INDEX "AlbumCommentary_albumCollectionEntryId_idx" ON "AlbumCommentary"("albumCollectionEntryId");

-- AddForeignKey
ALTER TABLE "AlbumCollectionEntry" ADD CONSTRAINT "AlbumCollectionEntry_albumCollectionId_fkey" FOREIGN KEY ("albumCollectionId") REFERENCES "AlbumCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumCommentary" ADD CONSTRAINT "AlbumCommentary_albumCollectionEntryId_fkey" FOREIGN KEY ("albumCollectionEntryId") REFERENCES "AlbumCollectionEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

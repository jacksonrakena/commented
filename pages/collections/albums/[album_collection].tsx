import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AlbumCollection as AlbumCollectionComponent } from "../../../components/albums/AlbumCollection";

export default function AlbumCollectionPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const auth = useSession();
  const [downloadedAlbums, setDownloadedAlbums] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      if (auth.status === "authenticated") {
        const albums = [];
        for (const entry of props.album.entries) {
          const album = await fetch(
            `https://api.spotify.com/v1/albums/${entry.albumId}`,
            {
              headers: {
                Authorization: "Bearer " + auth.data.token,
              },
            }
          ).then((d) => d.json());
          console.log("received", album);
          albums.push(album);
        }
        setDownloadedAlbums(albums);
      }
      if (auth.status === "unauthenticated") {
        signIn("spotify");
      }
    })();
  }, [auth.status]);
  if (downloadedAlbums.length !== props.album.entries.length) {
    return <>Loading</>;
  }
  return (
    <AlbumCollectionComponent
      albums={downloadedAlbums.map((downloadedAlbum) => {
        return {
          name: downloadedAlbum.name,
          artist: downloadedAlbum.artists[0].name,
          commentaries: props.album.entries.filter(
            (e) => e.albumId === downloadedAlbum.id
          )[0].commentaries,
          image: downloadedAlbum.images[0].url,
          number: props.album.entries
            .filter((e) => e.albumId === downloadedAlbum.id)[0]
            .order.toString(),
        };
      })}
      author={{ name: props.album.author.substring(0, 5), image: "" }}
      description={props.album.description}
      name={props.album.name}
      image="https://d.lu.je/avatar/255950165200994307"
      href=""
    />
  );
}
const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps<{
  album: {
    name: string;
    author: string;
    description: string;
    entries: {
      albumId: string;
      order: number;
      commentaries: {
        label: string;
        text: string;
      }[];
    }[];
  };
}> = async (context) => {
  var album = await prisma.albumCollection.findFirst({
    where: { id: context?.params?.album_collection?.toString() },
    include: {
      entries: {
        include: { commentaries: true },
      },
    },
  });
  return {
    props: {
      album: {
        name: album?.name!,
        author: album?.authorId!,
        description: album?.description!,
        entries: album?.entries.map((entry) => {
          return {
            albumId: entry.spotifyAlbumId,
            order: entry.order,
            commentaries: entry.commentaries.map((commentary) => {
              return {
                label: commentary.label,
                text: commentary.text,
              };
            })!,
          };
        })!,
      },
    },
  };
};

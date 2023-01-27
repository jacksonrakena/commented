import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PlaylistWithCommentary } from "../../components/commentaries/PlaylistWithCommentary";

export default function Commentary({
  playlist,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const auth = useSession();
  const { commentary } = router.query;
  const commentaryId = commentary?.toString();
  const [downloadedPlaylist, setPlaylist] = useState<any>(null);

  useEffect(() => {
    if (auth.status === "authenticated") {
      fetch(`https://api.spotify.com/v1/playlists/${commentaryId}`, {
        headers: {
          Authorization: "Bearer " + auth.data.token,
        },
      })
        .then((d) => d.json())
        .then((json) => {
          console.log("playlist", json);
          setPlaylist(json);
        });
    }
    if (auth.status === "unauthenticated") {
      signIn("spotify");
    }
  }, [auth.status]);
  console.log(
    downloadedPlaylist?.tracks.items.map((downloadedTrack) => {
      return downloadedTrack.track;
    })
  );
  return (
    <PlaylistWithCommentary
      author={{ name: downloadedPlaylist?.owner.display_name, image: "" }}
      image={downloadedPlaylist?.images[0].url}
      name={downloadedPlaylist?.name}
      description={downloadedPlaylist?.description}
      href={downloadedPlaylist?.external_urls.spotify}
      tracks={downloadedPlaylist?.tracks?.items?.map((downloadedTrack, i) => {
        return {
          number: (i + 1).toString(),
          track: downloadedTrack.track,
          commentaries: playlist.tracks.filter(
            (e) => e.id === downloadedTrack.track.id
          )[0]?.commentaries,
        };
      })}
    />
  );
}

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps<{
  playlist: {
    tracks: {
      id: string;
      commentaries: { name: string; text: string }[];
    }[];
  };
}> = async (context) => {
  var tracks = await prisma.commentary.findMany({
    where: {
      playlistId: context.params?.commentary?.toString(),
    },
  });
  return {
    props: {
      playlist: {
        tracks: tracks.map((t) => {
          return {
            id: t.trackId,
            commentaries: [
              {
                name: t.label,
                text: t.text,
              },
            ],
          };
        }),
        // tracks: [
        //   {
        //     id: "1toNKayLMeCcVlsLGXJl7n",
        //     commentaries: [
        //       {
        //         name: "MisaN says",
        //         text: "This song is my favourite song. I am the world's biggest 100 Gecs fan.",
        //       },
        //     ],
        //   },
        //   {
        //     id: "1AbLS4CyyaCmrYCeYM5mTQ",
        //     commentaries: [
        //       {
        //         name: "Jackson says",
        //         text: "har har, har har, har har, har har",
        //       },
        //     ],
        //   },
        //   {
        //     id: "0dqJjKKxuKD5Dt3QH2n4CG",
        //     commentaries: [
        //       {
        //         name: "Favourite line",
        //         text: '"well, I look up to you, because you look after me" - I died',
        //       },
        //     ],
        //   },
        //   {
        //     id: "2PfnAaQIMwHPvmda8MG5jm",
        //     commentaries: [
        //       {
        //         name: "Favourite line",
        //         text: '"And it holds me, and it [never] lets me go"',
        //       },
        //     ],
        //   },
        //   {
        //     id: "4Z9zfa5ydgKrgWoRDDQ9AI",
        //     commentaries: [
        //       {
        //         name: "Jackson says",
        //         text: "This song is a auditory masterpiece. This very song embodies the best of The 1975 and rock music today. The lyrics are masterfully written and the backing track amplifies the message. I love this song so much.",
        //       },
        //       {
        //         name: "Favourite line",
        //         text: "This is a test. This is only a test. If this were an actual emergency, you would have been instructed to evacuate the building. Please remain calm. This is a test. This is only a test. If this were an actual emergency, you would have been instructed to evacuate the building. Please remain calm. This is a test. This is only a test. If this were an actual emergency, you would have been instructed to evacuate the building. Please remain calm.",
        //       },
        //     ],
        //   },
        //   {
        //     id: "0jAmfPp5OsWLwJXlRM4L9o",
        //     commentaries: [
        //       {
        //         name: "Jackson says",
        //         text: "The guitar solo at 1:50 gets me every time. Perfection",
        //       },
        //     ],
        //   },
        // ],
      },
    },
  };
};

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

  console.log(auth);
  useEffect(() => {
    if (auth.status === "authenticated") {
      fetch(`https://api.spotify.com/v1/playlists/${commentaryId}`, {
        headers: {
          Authorization: "Bearer " + auth.data.accounts[0].access_token,
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

//const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps<{
  playlist: {
    tracks: {
      id: string;
      commentaries: { name: string; text: string }[];
    }[];
  };
}> = async (context) => {
  // var tracks = await prisma.objectCommentary.findMany({
  //   where: {
  //     objectRecord: {
  //       collectionId: context.params?.id,
  //     },
  //   },
  // });
  return {
    props: {
      playlist: {
        // tracks: tracks.map((t) => {
        //   return {
        //     id: t.objectRecordId,
        //     commentaries: [
        //       {
        //         name: t.label,
        //         text: t.text,
        //       },
        //     ],
        //   };
        // }),
        tracks: [
          {
            id: "7FjZU7XFs7P9jHI9Z0yRhK",
            commentaries: [
              {
                name: "Jackson's take",
                text: "A upbeat and driving dance-pop jam that explores the struggle of commitment from both sides of the coin. Number one on the U.S. Billboard Dance Club.",
              },
            ],
          },
          {
            id: "1GjbTNFImFrjFsNdleDe78",
            commentaries: [
              {
                name: "Critical Analysis",
                text: "This power ballad has it all - an epic display of grandiosity, heart-twisting lyrics, and dramatic pauses to mark each phase. Possibly the sweetest song in the entire INXS line-up - this much-beloved hit was played at lead singer Michael Hutchence's funeral.",
              },
            ],
          },
          {
            id: "7EsSVPxaYoAZjQwhspJBs2",
            commentaries: [
              {
                name: "Critical Analysis",
                text: '"Slave owners rapping 🔥🔥" - Rosh',
              },
            ],
          },
          {
            id: "73W9I0EIOcw8IW8zEIiyN4",
            commentaries: [
              {
                name: "Reflection",
                text: "My favourite duo deconstructs house-club sound, mixing just enough experimentation while keeping it safe enough for the clubs. Long-time collaborator Ku showcases yet another great performance.",
              },
            ],
          },
          {
            id: "4J7CKHCF3mdL4diUsmW8lq",
            commentaries: [
              {
                name: "Reflection",
                text: "House and electronic dance music continues its domination in my music taste with another early 2010s classic.",
              },
            ],
          },
          {
            id: "7D49Iig0avHre9RFSUMkd2",
            commentaries: [
              {
                name: "Favourite line",
                text: '"Hope when you take that jump // You don\'t fear the fall"',
              },
              {
                name: "Reflection",
                text: "This song, for me, feels like a reminder to be grateful for the experiences you have lived in your life, and to be prepared that the best is yet to come. A reminder that even the worst moments in life have meaning.",
              },
            ],
          },
          {
            id: "1AbLS4CyyaCmrYCeYM5mTQ",
            commentaries: [
              {
                name: "Favourite line",
                text: "",
              },
            ],
          },
          {
            id: "0dqJjKKxuKD5Dt3QH2n4CG",
            commentaries: [
              {
                name: "Favourite line",
                text: '"I\'d spend my whole life // tied in ways to have you"',
              },
            ],
          },
          {
            id: "2PfnAaQIMwHPvmda8MG5jm",
            commentaries: [
              {
                name: "Critical Analysis",
                text: "Typically, Of Monsters and Men aren't exactly known for their lyricism. This song seemingly proves an exception - while the lyrics stay cryptic, coded, and vague enough for any interpretation, they still seem to deliver enough raw emotional power to merit a further reading. \"I know // That time won't let me // Show what I want to show\"",
              },
            ],
          },
          {
            id: "4Z9zfa5ydgKrgWoRDDQ9AI",
            commentaries: [
              {
                name: "Jackson says",
                text: "This song is a auditory masterpiece. This very song embodies the best of The 1975 and rock music today. The lyrics are masterfully written and the backing track amplifies the message. I love this song so much.",
              },
              {
                name: "Favourite line",
                text: "This is a test. This is only a test. If this were an actual emergency, you would have been instructed to evacuate the building. Please remain calm. This is a test. This is only a test. If this were an actual emergency, you would have been instructed to evacuate the building. Please remain calm. This is a test. This is only a test. If this were an actual emergency, you would have been instructed to evacuate the building. Please remain calm.",
              },
            ],
          },
          {
            id: "19kHhX6f6EfLU7rcO3RqjO",
            commentaries: [
              {
                name: "Reflection",
                text: "I get sick of this song easily, but nobody can deny the craftsmanship that created this experimental breakdown of modern electronica.",
              },
            ],
          },
          {
            id: "46lFttIf5hnUZMGvjK0Wxo",
            commentaries: [
              {
                name: "Jackson says",
                text: "This is one of the oldest songs I can remember listening to. My gateway drug to electronic music - this song remains an absolute thumper of power and energy.",
              },
            ],
          },
          {
            id: "0jAmfPp5OsWLwJXlRM4L9o",
            commentaries: [
              {
                name: "Jackson says",
                text: "The guitar solo at 1:50 gets me every time. Perfection",
              },
            ],
          },
        ],
      },
    },
  };
};

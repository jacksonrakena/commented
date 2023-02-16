import {
  Box,
  Center,
  Heading,
  ListItem,
  Spinner,
  UnorderedList,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const SpotifyPlaylistProvider = () => {
  const session = useSession();
  const spotifyAccount = session.data?.accounts.find(
    (e) => e.provider === "spotify"
  );
  if (!spotifyAccount) return <></>;

  const [playlists, setPlaylists] = useState<any>();
  const [collections, setCollections] = useState<any>();

  useEffect(() => {
    fetch(
      `https://api.spotify.com/v1/users/${spotifyAccount.providerAccountId}/playlists`,
      {
        headers: {
          Authorization: "Bearer " + spotifyAccount.access_token,
        },
      }
    )
      .then((d) => d.json())
      .then((json) => {
        console.log("me", json);
        setPlaylists(json.items);

        fetch("/api/collections/spotify", {
          method: "POST",
          body: JSON.stringify({ ids: json.items.map((e) => e.id) }),
        })
          .then((d) => d.json())
          .then((collection) => {
            setCollections(collection);
          });
      });
  }, [spotifyAccount.providerAccountId]);

  return (
    <Box border={"2px solid #1DB954"} borderRadius={10} padding={"15px"}>
      <Heading size="sm" color={"#1DB954"}>
        Your Spotify playlists
      </Heading>
      {playlists && (
        <UnorderedList>
          {playlists.map((playlist: any) => (
            <ListItem>{playlist.name}</ListItem>
          ))}
        </UnorderedList>
      )}
      {!playlists && (
        <Center>
          <Spinner />
        </Center>
      )}
    </Box>
  );
};

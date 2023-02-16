import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const SpotifyPlaylistProvider = () => {
  const session = useSession();
  const spotifyAccount = session.data?.accounts.find(
    (e) => e.provider === "spotify"
  );
  if (!spotifyAccount) return <></>;

  const [playlists, setPlaylists] = useState<any>();

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
      });
  }, [spotifyAccount.providerAccountId]);

  return (
    <Box>
      <Heading size="sm">Your Spotify playlists</Heading>
      <UnorderedList>
        {playlists.slice(0, 3).map((playlist: any) => (
          <ListItem>{playlist.name}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

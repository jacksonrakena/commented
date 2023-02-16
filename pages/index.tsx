import {
  Box,
  Button,
  Container,
  Heading,
  ListItem,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { SpotifyPlaylistProvider } from "./providers/spotify";
declare module "next-auth" {
  interface Session {
    id: string;
    token: string;
  }
}

export default function Home() {
  const auth = useSession();
  // console.log(auth);
  // const [state, setState] = useState<
  //   "unauthenticated" | "loading_spotify" | "loading_casanova" | "ready"
  // >("unauthenticated");
  // const [me, setMe] = useState<any>(null);
  // const [profile, setProfile] = useState<any>(null);
  // const [commentaries, setCommentaries] = useState<any>(null);
  // useEffect(() => {
  //   if (auth.status === "authenticated") {
  //     setState("loading_spotify");
  //     fetch(`https://api.spotify.com/v1/users/${auth.data.id}/playlists`, {
  //       headers: {
  //         Authorization: "Bearer " + auth.data.token,
  //       },
  //     })
  //       .then((d) => d.json())
  //       .then((json) => {
  //         console.log("me", json);
  //         setMe(json);
  //       });
  //     fetch(`https://api.spotify.com/v1/users/${auth.data.id}`, {
  //       headers: {
  //         Authorization: "Bearer " + auth.data.token,
  //       },
  //     })
  //       .then((d) => d.json())
  //       .then((json) => {
  //         console.log("profile", json);
  //         setProfile(json);
  //       });
  //   }
  //   if (auth.status === "unauthenticated") {
  //     signIn("spotify");
  //   }
  // }, [auth.status]);
  // useEffect(() => {
  //   if (me && profile) {
  //     setState("loading_casanova");
  //     fetch("/api/commentaries", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         commentaries: me!.items.slice(0, 10).map((d) => d.id),
  //       }),
  //     })
  //       .then((d) => d.json())
  //       .then((e) => {
  //         setCommentaries(e);
  //         setState("ready");
  //       });
  //   }
  // }, [me, profile]);
  return (
    <Container mt={"20px"}>
      {auth.status === "unauthenticated" && (
        <Box>
          <Button onClick={() => signIn()}>Sign in</Button>
        </Box>
      )}
      {auth.status === "loading" && <Box>Authenticating...</Box>}
      {auth.status === "authenticated" && (
        <VStack spacing={4} alignItems="start">
          <Heading>Welcome, {auth.data?.user?.name}</Heading>
          <Box>
            <Heading size="md">
              You're signed in on {auth.data.accounts.length} account
              {auth.data.accounts.length == 1 ? "" : "s"}:
            </Heading>
            <UnorderedList>
              {auth.data.accounts.map((account) => (
                <ListItem>
                  {account.provider} ({account.providerAccountId})
                </ListItem>
              ))}
            </UnorderedList>
          </Box>

          {auth.data.accounts.find((d) => d.provider === "spotify") && (
            <Box>
              <SpotifyPlaylistProvider />
            </Box>
          )}

          <Box>
            <Button onClick={() => signOut()}>Sign out</Button>
          </Box>
        </VStack>
      )}

      {/* {state === "loading_spotify" && <Box>Loading Spotify</Box>}
      {state === "loading_casanova" && <Box>Loading your commentaries</Box>}
      {state === "ready" && (
        <>
          <Heading>{profile?.display_name}</Heading>
          {me?.items?.slice(0, 10).map((playlist) => {
            return (
              <LinkBox
                as="article"
                py="3"
                px="5"
                mb="3"
                borderWidth="1px"
                rounded="md"
              >
                <Heading size="md" my="2">
                  <Link href={`/commentaries/${playlist.id}`} passHref>
                    <LinkOverlay>{playlist.name}</LinkOverlay>
                  </Link>
                </Heading>
                {commentaries[playlist.id]?.length == 0 && (
                  <>
                    <Box>
                      Start a commentary on this playlist{" "}
                      <Icon w="2" as={ArrowRightIcon} />
                    </Box>
                  </>
                )}
                {commentaries[playlist.id].length > 0 && (
                  <>
                    <Box>{commentaries[playlist.id].length} commentaries</Box>
                  </>
                )}
              </LinkBox>
            );
          })}
        </>
      )} */}
    </Container>
  );
}

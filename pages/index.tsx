import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
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
          <HStack>
            <Avatar
              src={auth.data.user?.image ?? undefined}
              name={auth.data.user?.name ?? ""}
            />
            <Heading>Welcome, {auth.data?.user?.name}</Heading>
          </HStack>
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
            <Button onClick={() => signIn()}>Add another account</Button>{" "}
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

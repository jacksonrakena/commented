import { ArrowRightIcon, Icon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Heading,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
declare module "next-auth" {
  interface Session {
    id: string;
    token: string;
  }
}

export default function Home() {
  const auth = useSession();
  console.log(auth);
  const [state, setState] = useState<
    "unauthenticated" | "loading_spotify" | "loading_casanova" | "ready"
  >("unauthenticated");
  const [me, setMe] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [commentaries, setCommentaries] = useState<any>(null);
  useEffect(() => {
    if (auth.status === "authenticated") {
      setState("loading_spotify");
      fetch(`https://api.spotify.com/v1/users/${auth.data.id}/playlists`, {
        headers: {
          Authorization: "Bearer " + auth.data.token,
        },
      })
        .then((d) => d.json())
        .then((json) => {
          console.log("me", json);
          setMe(json);
        });
      fetch(`https://api.spotify.com/v1/users/${auth.data.id}`, {
        headers: {
          Authorization: "Bearer " + auth.data.token,
        },
      })
        .then((d) => d.json())
        .then((json) => {
          console.log("profile", json);
          setProfile(json);
        });
    }
    if (auth.status === "unauthenticated") {
      signIn("spotify");
    }
  }, [auth.status]);
  useEffect(() => {
    if (me && profile) {
      setState("loading_casanova");
      fetch("/api/commentaries", {
        method: "POST",
        body: JSON.stringify({
          commentaries: me!.items.slice(0, 10).map((d) => d.id),
        }),
      })
        .then((d) => d.json())
        .then((e) => {
          setCommentaries(e);
          setState("ready");
        });
    }
  }, [me, profile]);
  return (
    <Container mt={"20px"}>
      {state === "loading_spotify" && <Box>Loading Spotify</Box>}
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
      )}
    </Container>
  );
}

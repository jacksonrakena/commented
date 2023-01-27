import { Box } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const auth = useSession();
  console.log(auth);
  const [me, setMe] = useState<any>(null);
  useEffect(() => {
    if (auth.status === "authenticated") {
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
    }
    if (auth.status === "unauthenticated") {
      signIn("spotify");
    }
  }, [auth.status]);
  return (
    <Box padding={"20px"}>
      {me?.items?.map((playlist) => {
        return (
          <div>
            <Link href={`/commentaries/${playlist.id}`}>{playlist.name}</Link>
          </div>
        );
      })}
    </Box>
  );
}

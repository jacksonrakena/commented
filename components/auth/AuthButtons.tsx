import { Button, HStack, useColorMode } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthButtons = () => {
  const data = useSession();
  console.log(data.data);
  const colorMode = useColorMode();
  return (
    <>
      <HStack spacing={2}>
        {data.status === "unauthenticated" && (
          <Button onClick={() => signIn("spotify")} colorScheme={"green"}>
            Sign in with Spotify
          </Button>
        )}
        {data.status === "authenticated" && (
          <Button onClick={() => signOut()} colorScheme={"red"}>
            Sign out
          </Button>
        )}
        <Button onClick={colorMode.toggleColorMode} colorScheme={"blue"}>
          {colorMode.colorMode}
        </Button>
      </HStack>
    </>
  );
};
export default AuthButtons;

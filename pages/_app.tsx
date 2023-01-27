import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/ibm-plex-sans";
import "@fontsource/open-sans";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { theme } from "./_document";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        {" "}
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

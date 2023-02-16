import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/ibm-plex-sans";
import "@fontsource/montserrat";
import "@fontsource/open-sans";
import "@fontsource/raleway";
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

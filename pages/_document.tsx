// pages/_document.js
import { ColorModeScript, extendTheme } from "@chakra-ui/react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";

export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {},
});
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode={"dark"} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

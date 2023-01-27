import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  DarkMode,
  Flex,
  Heading,
  HStack,
  Img,
  Link,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { AlbumWithCommentary } from "./AlbumWithCommentary";

const AuthButtons = dynamic(() => import("../auth/AuthButtons"), {
  ssr: false,
});

export interface AlbumCollectionFrontend {
  image: string;
  name: string;
  number: string;
  artist: string;
  commentaries: {
    label: string;
    text: string;
  }[];
}

export const AlbumCollection = (props: {
  name: string;
  image: string;
  description: string;
  href: string;
  author: {
    name: string;
    image: string;
  };
  albums: AlbumCollectionFrontend[];
}) => {
  return (
    <Flex gap="15px" wrap={"wrap"} style={{ height: "100%", padding: "10px" }}>
      <DarkMode>
        <div
          style={{
            //borderColor: "rgb(55,65,81)",
            borderRadius: "8px",
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            maxWidth: "400px",
          }}
        >
          <div>
            <VStack alignItems={"start"} spacing={"4"}>
              <Img
                w="100%"
                src={props.image}
                style={{ borderRadius: "25px" }}
              />
              <VStack alignItems={"start"} spacing={"0"}>
                <Heading
                  size="xs"
                  color={"GrayText"}
                  textTransform={"uppercase"}
                >
                  album collection
                </Heading>
                <Heading size="md">
                  <SkeletonText isLoaded={!!props.name}>
                    {props.name}
                  </SkeletonText>
                </Heading>
              </VStack>
              <HStack>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Avatar
                    size="xs"
                    marginRight={"5px"}
                    src={props.author.image}
                  />
                  <SkeletonText isLoaded={!!props.author?.name}>
                    <Text fontWeight={"bold"}>{props.author.name}</Text>
                  </SkeletonText>
                </Flex>
                <div>
                  <SkeletonText isLoaded={!!props.albums}>
                    {props.albums?.length} albums
                  </SkeletonText>
                </div>
                <div>36 minutes</div>
              </HStack>
              <SkeletonText isLoaded={!!props.description}>
                <Text maxWidth={"500px"}>{props.description}</Text>
              </SkeletonText>
            </VStack>

            <VStack alignItems={"start"} spacing={"2"} marginTop="15px">
              <Link color="blue.700" fontWeight={"semibold"} href={props.href}>
                <ArrowBackIcon /> View this playlist on Spotify
              </Link>
              <Link
                color="green.900"
                fontWeight={"semibold"}
                href="https://commented.com"
              >
                View {props.author.name}'s Spotify profile
              </Link>
            </VStack>
          </div>
          <Box marginTop={"20px"}>
            <AuthButtons />
            <Text marginTop={"20px"} fontSize="sm">
              Copyright &copy; 2022 Commented
            </Text>
          </Box>
        </div>
      </DarkMode>
      <Box flexGrow={1}>
        <Heading margin="15px" size="lg">
          {props.author.name}'s commentary
        </Heading>
        <Box overflowY={{ lg: "scroll" }} maxH={{ lg: "900px" }}>
          <table style={{ tableLayout: "fixed" }}>
            <tbody>
              {props.albums.map((album, i) => (
                <AlbumWithCommentary
                  album={album}
                  number={(i + 1).toString()}
                  commentaries={album.commentaries}
                />
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Flex>
  );
};

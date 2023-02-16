import {
  Avatar,
  Box,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Img,
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
  albums: AlbumCollectionFrontend[] | null;
}) => {
  return (
    <Container maxW="xl">
      <div
        style={{
          //borderColor: "rgb(55,65,81)",
          borderRadius: "8px",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <HStack spacing={"4"} marginBottom={8}>
          <Img maxW="100%" src={props.image} style={{ borderRadius: "25px" }} />
          <VStack alignItems={"start"}>
            <VStack alignItems={"start"} spacing={"0"}>
              <Heading size="xs" color={"GrayText"} textTransform={"uppercase"}>
                album collection
              </Heading>
              <Heading size="md">
                <SkeletonText isLoaded={!!props.name}>
                  {props.name}
                </SkeletonText>
              </Heading>
            </VStack>
            <HStack>
              <Text>Commentary by </Text>
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Avatar
                  size="xs"
                  marginRight={"5px"}
                  src={"https://d.lu.je/avatar/255950165200994307"}
                />
                <SkeletonText isLoaded={!!props.author?.name}>
                  <Text fontWeight={"bold"}>Jackson</Text>
                </SkeletonText>
              </Flex>
            </HStack>
            {/* <div>
                <SkeletonText isLoaded={!!props.albums}>
                  {props.albums?.length} albums &bull; 36 minutes
                </SkeletonText>
              </div> */}
          </VStack>
        </HStack>
        <Box>{props.description}</Box>
      </div>
      <Box flexGrow={1}>
        <Box maxH={{ lg: "900px" }}>
          {!props.albums && <Center>Loading albums...</Center>}
          {props.albums && (
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
          )}
        </Box>
      </Box>
    </Container>
  );
};

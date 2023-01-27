import { HStack, Img, Text, VStack } from "@chakra-ui/react";
import { AlbumCollectionFrontend } from "./AlbumCollection";

export const AlbumWithCommentary = (props: {
  number: string;
  album: AlbumCollectionFrontend;
  commentaries: {
    label: string;
    text: string;
  }[];
}) => {
  return (
    <>
      <tr>
        <td
          style={{
            width: "10%",
            maxWidth: "50px",
            borderWidth: "0px",
            fontWeight: "bold",
            textAlign: "center",
            verticalAlign: "center",
          }}
        >
          {props.number}
        </td>

        <td
          style={{
            borderWidth: "0px",
            width: "90%",
          }}
        >
          <HStack alignItems={"center"} spacing={4}>
            <div>
              <Img maxW={"65px"} src={props.album.image} />
            </div>
            <VStack alignItems="start" spacing={1}>
              <Text fontWeight={"bold"}>{props.album.name}</Text>
              <Text>{props.album.artist}</Text>
            </VStack>
          </HStack>
        </td>
      </tr>
      {props.commentaries && (
        <tr>
          <td></td>
          <td
            style={{
              whiteSpace: "normal",
              maxWidth: "750px",
            }}
          >
            {props.commentaries.map((commentary) => (
              <VStack
                key={commentary.label}
                paddingTop="15px"
                paddingBottom={"15px"}
                spacing={0}
                alignItems={"start"}
              >
                <Text
                  fontWeight={"bold"}
                  textColor={"GrayText"}
                  fontSize={"xs"}
                  textTransform={"uppercase"}
                >
                  {commentary.label}
                </Text>
                <Text>{commentary.text}</Text>
              </VStack>
            ))}
          </td>
        </tr>
      )}
    </>
  );
};

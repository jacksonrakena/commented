import { HStack, Img, Text, VStack } from "@chakra-ui/react";

export const TrackWithCommentary = (props: {
  number: string;
  track: {
    id: string;
    artists: { name: string }[];
    name: string;
    album: { name: string; images: { url: string }[] };
  };
  commentaries: {
    name: string;
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
              <Img
                maxW={"75px"}
                src={(props.track.album?.images ?? [])[0]?.url}
              />
            </div>
            <VStack alignItems="start" spacing={1}>
              <Text fontWeight={"bold"}>{props.track.name}</Text>
              <Text>{props.track.artists[0].name}</Text>
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
                key={commentary.name}
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
                  {commentary.name}
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

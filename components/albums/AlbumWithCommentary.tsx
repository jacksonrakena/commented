import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AlbumCollectionFrontend } from "./AlbumCollection";

export const AlbumWithCommentary = (props: {
  number: string;
  album: AlbumCollectionFrontend;
  commentaries: {
    label: string;
    text: string;
  }[];
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add commentary to {props.album.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Commentary name</FormLabel>
              <Input type="text"></Input>
              <FormHelperText>The name of this commentary.</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Commentary text</FormLabel>
              <Textarea placeholder="I like this album." />
              <FormHelperText>
                A descriptive commentary on this album.
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue">Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
              <HStack>
                <Text fontWeight={"bold"} fontStyle={"italic"}>
                  {props.album.name}
                </Text>{" "}
                <Text>({props.album.raw.release_date.substring(0, 4)})</Text>
              </HStack>
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
            <Button
              variant="outline"
              colorScheme={"teal"}
              size="sm"
              marginY="10px"
              leftIcon={<AddIcon />}
              onClick={() => {
                onOpen();
              }}
            >
              {" "}
              Add commentary
            </Button>
          </td>
        </tr>
      )}
    </>
  );
};

import { VStack, Image, Text, useColorModeValue } from "@chakra-ui/react";

const DigitalCard: React.FC<{
  recipient: string;
  sender: string;
  message: string;
  image: string | undefined;
}> = ({ recipient, sender, message, image }) => {
  return (
    <VStack
      bg={useColorModeValue("white", "gray.900")}
      borderRadius="xl"
      boxShadow="2xl"
      w={{ base: "90vw", md: "450px" }}
      alignItems="left"
      p={5}
      px={6}>
      <VStack mx={-6} mt={-5} mb={2} position="relative">
        <Image borderTopRadius="xl" src={image} alt="Image" />
      </VStack>
      <Text>Dear {recipient},</Text>
      <Text py={4}>{message}</Text>
      <Text>Lots of love,</Text>
      <Text>{sender} ♡</Text>
    </VStack>
  );
};

export default DigitalCard;

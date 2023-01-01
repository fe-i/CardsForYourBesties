import { Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";

const Card: React.FC<{
	recipient: string;
	sender: string;
	message: string;
	image: string;
}> = ({ recipient, sender, message, image }) => {
	return (
		<Flex
			flexDir="column"
			bg={useColorModeValue("white", "gray.900")}
			borderRadius="xl"
			boxShadow="2xl"
			w={{ base: "90vw", md: "450px" }}
			px={6}
			py={6}>
			<Flex mx={-6} mt={-6} mb={4}>
				<Image borderTopRadius="xl" src={image} fallbackSrc="/image.png" alt="Image" />
			</Flex>
			<Flex flexDir="column">
				<Text>Dear {recipient},</Text>
				<Text py={4} whiteSpace="pre-wrap">
					{message}
				</Text>
				<Text>Lots of love,</Text>
				<Text>{sender} ♡</Text>
			</Flex>
		</Flex>
	);
};

export default Card;

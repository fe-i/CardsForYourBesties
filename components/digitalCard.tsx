import { VStack, Image, Text, useColorModeValue } from "@chakra-ui/react";

const DigitalCard: React.FC<{
	recipient: string;
	sender: string;
	message: string;
	image: string | undefined;
}> = ({ recipient, sender, message, image }) => {
	return (
		<VStack
			maxW="445px"
			bg={useColorModeValue("white", "gray.900")}
			boxShadow="2xl"
			borderRadius="xl"
			overflow="hidden"
			p={6}>
			<VStack mt={-6} mx={-6} mb={6} pos="relative">
				<Image src={image} alt="Image" />
			</VStack>
			<VStack alignItems="left" py={4} spacing={0}>
				<Text>Dear {recipient},</Text>
				<Text py={4}>{message}</Text>
				<Text>Lots of love,</Text>
				<Text>{sender} ♡</Text>
			</VStack>
		</VStack>
	);
};

export default DigitalCard;

import { Card, CardBody, CardFooter, Image, Text, VStack } from "@chakra-ui/react";

const DigitalCard: React.FC<{
	recipient: string;
	sender: string;
	message: string;
	image: string | undefined;
}> = ({ recipient, sender, message, image }) => {
	return (
		<Card borderRadius="xl" bgColor="white" maxW="lg">
			<CardBody justifyItems="center" pt={image ?? 0}>
				{image !== "" ? (
					<Image src={image} alt="Image" borderRadius="lg" fit="scale-down" maxW="md" />
				) : null}
				<VStack alignItems="left" mt={3} spacing={0}>
					<Text>Dear {recipient},</Text>
					<Text py={3} overflowWrap="anywhere">
						{message}
					</Text>
					<Text>Lots of love,</Text>
					<Text>{sender} ♡</Text>
				</VStack>
			</CardBody>
			<CardFooter p={0} />
		</Card>
	);
};

export default DigitalCard;

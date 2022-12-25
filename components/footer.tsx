import { Flex, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
	return (
		<Flex py={5} flexDir="column" justifyContent="space-between">
			<Text fontWeight="semibold">© 2022 Cards For Your Besties. All rights reserved.</Text>
		</Flex>
	);
};

export default Footer;

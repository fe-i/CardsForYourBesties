import { Flex, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
	return (
		<Flex flexDir="column" align="center" mt="auto">
			<Text fontWeight="semibold">© 2022 Cards For Your Besties. All rights reserved.</Text>
		</Flex>
	);
};

export default Footer;

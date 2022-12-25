import { Flex, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
	return (
		<Flex
			maxW={"6xl"}
			py={4}
			direction={{ base: "column", md: "row" }}
			justify={{ base: "center", md: "space-between" }}
			align={{ base: "center", md: "center" }}>
			<Text fontWeight="semibold">© 2022 Cards For Your Besties. All rights reserved.</Text>
		</Flex>
	);
};

export default Footer;

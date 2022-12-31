import { Flex, Link, Text, Icon } from "@chakra-ui/react";
import { IoLogoGithub } from "react-icons/io5";

const Footer: React.FC = () => {
	return (
		<Flex flexDir="column" align="center" m="auto" pb={4}>
			<Link href="/">
				<Icon h="20px" w="20px" as={IoLogoGithub} />
			</Link>
			<Text textAlign="center">&copy; Cards For Your Besties. All rights reserved.</Text>
		</Flex>
	);
};

export default Footer;

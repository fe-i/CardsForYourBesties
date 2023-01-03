import { Flex, Text, Icon } from "@chakra-ui/react";
import { IoLogoGithub } from "react-icons/io5";
import Link from "next/link";

const Footer: React.FC = () => {
	return (
		<Flex flexDir="column" align="center" m="auto" pb={4}>
			<Link href="https://github.com/fe-i/CardsForYourBesties/" title="Github">
				<Icon h="20px" w="20px" as={IoLogoGithub} />
			</Link>
			<Text textAlign="center">&copy; Cards For Your Besties. All rights reserved.</Text>
		</Flex>
	);
};

export default Footer;

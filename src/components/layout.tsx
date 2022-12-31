import { Box, Flex, VStack } from "@chakra-ui/react";
import Metadata from "./metadata";
import Footer from "./footer";
import NavigationBar from "./navigationBar";

const Layout: React.FC<React.PropsWithChildren<{ title?: string }>> = ({ title, children }) => {
	return (
		<Box w="100vw" h="100vh" overflowX="hidden" overflowY="scroll">
			<Metadata title={title} />
			<NavigationBar />
			<Flex flexDir="column">{children}</Flex>
			<Footer />
		</Box>
	);
};

export default Layout;

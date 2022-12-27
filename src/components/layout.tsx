import { Flex, VStack } from "@chakra-ui/react";
import Metadata from "./metadata";
import Footer from "./footer";

const Layout: React.FC<React.PropsWithChildren<{ title?: string }>> = ({ title, children }) => {
	return (
		<Flex
			flexDir="column"
			bgColor="#fff8e8"
			w="100vw"
			h="100vh"
			overflowX="hidden"
			overflowY="scroll"
			p={6}>
			<Metadata title={title} />
			{children}
			<Footer />
		</Flex>
	);
};

export default Layout;

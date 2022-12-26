import { VStack } from "@chakra-ui/react";
import Metadata from "./metadata";
import Footer from "./footer";

const Layout: React.FC<React.PropsWithChildren<{ title?: string }>> = ({ title, children }) => {
	return (
		<VStack
			bgColor="#fff8e8"
			w="100vw"
			h="100vh"
			maxW="100vw"
			overflowX="hidden"
			overflowY="scroll"
			p={6}>
			<VStack py="18vh" />
			<Metadata title={title} />
			{children}
			<Footer />
		</VStack>
	);
};

export default Layout;

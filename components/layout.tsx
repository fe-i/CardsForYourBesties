import { VStack } from "@chakra-ui/react";
import Metadata from "./metadata";
import Footer from "./footer";

const Layout: React.FC<React.PropsWithChildren<{ title?: string }>> = ({ title, children }) => {
	return (
		<VStack bgColor="#fff8e8" h="100vh">
			<Metadata title={title} />
			{children}
			<Footer />
		</VStack>
	);
};

export default Layout;

import { Flex } from "@chakra-ui/react";
import Metadata from "./metadata";
import NavigationBar from "./navigationBar";
import Footer from "./footer";

const Layout: React.FC<React.PropsWithChildren<{ title?: string }>> = ({ title, children }) => {
	return (
		<Flex flexDir="column" overflowX="hidden" overflowY="auto">
			<Metadata title={title} />
			<NavigationBar />
			{children}
			<Footer />
		</Flex>
	);
};

export default Layout;

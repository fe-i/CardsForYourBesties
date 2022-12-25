import { VStack } from "@chakra-ui/react";
import Metadata from "./metadata";
import Footer from "./footer";

const Layout: React.FC<React.PropsWithChildren<{ title?: string; recipient?: string }>> = ({
	title,
	recipient,
	children
}) => {
	return (
		<VStack bgColor="#fff8e8">
			<Metadata title={title} recipient={recipient} />
			{children}
			<Footer />
		</VStack>
	);
};

export default Layout;

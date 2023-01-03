import {
	Flex,
	Heading,
	Image,
	Text,
	Button,
	Avatar,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider
} from "@chakra-ui/react";
import Link from "next/link";

const NavigationBar: React.FC = () => {
	return (
		<Flex alignItems="center" justifyContent="space-between" p={5} shadow="md">
			<Link href="/" title="Home">
				<Flex gap={2} alignItems="center">
					<Image w={12} alt="Logo" src="/mail.png" />
					<Heading
						display="inline-block"
						bgGradient="linear(to-r, green.300, green.400)"
						backgroundClip="text">
						CFYB
					</Heading>
				</Flex>
			</Link>
			<Menu>
				<MenuButton as={Button} rounded="full" variant="link">
					<Avatar
						size="sm"
						src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
					/>
				</MenuButton>
				<MenuList alignItems="center" textAlign="center">
					<Avatar
						size="2xl"
						src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
					/>
					<Text my={4}>Username</Text>
					<MenuDivider />
					<MenuItem>Your Cards</MenuItem>
					<MenuItem>Manage Account</MenuItem>
					<MenuItem>Logout</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
};

export default NavigationBar;

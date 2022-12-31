import {
	Flex,
	HStack,
	Heading,
	Image,
	Text,
	Link,
	Button,
	Avatar,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider
} from "@chakra-ui/react";

const NavigationBar: React.FC = () => {
	return (
		<Flex alignItems="center" justifyContent="space-between" p={5} shadow="md">
			<Link href="/" title="Home">
				<HStack spacing={2} alignItems="center">
					<Image w={12} alt="Logo" src="/mail.png" />
					<Heading
						display="inline-block"
						bgGradient="linear(to-r, cyan.400, cyan.600)"
						backgroundClip="text">
						CFYB
					</Heading>
				</HStack>
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
					<Text>Username</Text>
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

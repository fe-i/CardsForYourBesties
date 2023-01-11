import {
	Flex,
	Heading,
	Image,
	Text,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
	MdOutlineAccountCircle,
	MdOutlineArticle,
	MdOutlineLogin,
	MdOutlineLogout,
	MdOutlineSettings
} from "react-icons/md";
import Link from "next/link";
import useFirebase from "../hooks/useFirebase";
import useAuth from "../hooks/useAuth";

const NavigationBar: React.FC = () => {
	const { push } = useRouter();
	const { signIn, signOut, signUp, resetPassword, deleteAccount } = useFirebase();
	const { user, setUser } = useAuth();

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
			{user === null ? (
				<Flex>
					<Button
						rounded="full"
						variant="ghost"
						onClick={async () => {
							const data = await signIn("ll@11.com", "123454");
							setUser(data);
							//push("/signin");
						}}>
						<MdOutlineLogin size="2rem" />
					</Button>
					<Button
						onClick={async () => {
							const data = await signUp("bob", "ll@11.com", "123454");
							setUser(data);
							//push("/signup")
						}}>
						signup (test)
					</Button>
				</Flex>
			) : (
				<Menu>
					<MenuButton as={Button} rounded="full" variant="ghost">
						<MdOutlineAccountCircle size="2rem" />
					</MenuButton>
					<MenuList
						flexDir="column"
						alignItems="center"
						justifyContent="center"
						textAlign="center">
						<MenuItem onClick={() => push("/account#cards")} gap={1}>
							<MdOutlineArticle size={20} />
							<Text>Your Cards</Text>
						</MenuItem>
						<MenuItem onClick={() => push("/account#manage")} gap={1}>
							<MdOutlineSettings size={20} />
							<Text>Manage Account</Text>
						</MenuItem>
						<MenuItem
							onClick={() => {
								const res = signOut();
								setUser(res);
								push("/");
							}}
							gap={1}>
							<MdOutlineLogout size={20} />
							<Text>Sign Out</Text>
						</MenuItem>
						<Button
							onClick={async () => {
								const data = await deleteAccount();
								setUser(data);
							}}>
							delete acc (test)
						</Button>
					</MenuList>
				</Menu>
			)}
		</Flex>
	);
};

export default NavigationBar;

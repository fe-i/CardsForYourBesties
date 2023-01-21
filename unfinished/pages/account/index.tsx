/*import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import Layout from "../../src/components/layout";
import useAuth from "../../src/hooks/useAuth";
import useFirebase from "../../src/hooks/useFirebase";

const Account: NextPage = () => {
	const { deleteAccount } = useFirebase();
	const { user } = useAuth();

	if (user === null)
		return (
			<Layout title="Access Denied">
				<Flex
					flexDir="column"
					align="center"
					justify="center"
					textAlign="center"
					gap={6}
					px={8}
					py="32vh">
					<Heading
						fontFamily="mono"
						fontWeight={600}
						fontSize={{ base: "4xl", md: "6xl" }}
						lineHeight="110%">
						Access Denied
					</Heading>
					<Text color="gray.500" fontSize="lg">
						You must be signed in to view this page.
					</Text>
					<Flex flexDir="row" gap={2}>
						<Button
							as={Link}
							href="/signin"
							title="Sign In"
							borderRadius={10}
							size="lg">
							Sign In
						</Button>{" "}
						<Button
							as={Link}
							href="/signup"
							title="Sign Up"
							borderRadius={10}
							size="lg">
							Sign Up
						</Button>
					</Flex>
				</Flex>
			</Layout>
		);

	return (
		<Layout title="Account">
			<Flex flexDir="column" align="center" justify="center" p={6} gap={10}>
				<Text>Welcome {user?.name}!</Text>
				<Flex>
					account management stuff (name, email pfp etc) #manage
					<br />
					cards gallery here too using tab menu or smth #cards
					<br />
					add delete, copy link, edit to each card
				</Flex>
				<Button onClick={async () => await deleteAccount()}>delete account</Button>
			</Flex>
		</Layout>
	);
};

export default Account;

//TODO: make better looking page
*/

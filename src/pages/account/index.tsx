import { Button, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import Layout from "../../components/layout";
import useFirebase from "../../hooks/useFirebase";

const Account: NextPage = () => {
	const { deleteAccount } = useFirebase();

	return (
		<Layout title="Account">
			<Flex flexDir="column" align="center" justify="center" p={6} gap={10}>
				<Flex>
					account management stuff (name, email pfp etc) #manage
					<br />
					^^ autofill sender name on CardCreateForm && maybe show avatar or something
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

//TODO: push to signin if user doesnt exist

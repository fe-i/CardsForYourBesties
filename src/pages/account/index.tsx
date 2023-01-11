import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { NextPage } from "next";
import Layout from "../../components/layout";

const Account: NextPage = () => {
	return (
		<Layout title="Account">
			<Flex align="center" justify="center" p={6}>
				<Flex flexDir="row" flexWrap="wrap" fontSize="lg" gap={10}>
					account management stuff (name, email pfp etc) #manage
					<br />
					^^ autofill sender name on CardCreateForm && maybe show avatar or something
					<br />
					cards gallery here too using tab menu or smth #cards
					<br />
					add delete, copy link, edit to each card
				</Flex>
			</Flex>
		</Layout>
	);
};

export default Account;

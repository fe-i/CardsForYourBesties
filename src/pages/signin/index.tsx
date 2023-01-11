import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { NextPage } from "next";
import Layout from "../../components/layout";

const SignIn: NextPage = () => {
	return (
		<Layout title="Sign In">
			<Flex align="center" justify="center" p={6}>
				<Flex flexDir="row" flexWrap="wrap" fontSize="lg" gap={10}>
					signin form goes here
				</Flex>
			</Flex>
		</Layout>
	);
};

export default SignIn;

import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import Layout from "../../components/layout";
import SignInForm from "../../components/forms/signInForm";

const SignIn: NextPage = () => {
	return (
		<Layout title="Sign In">
			<Flex flexDir="column" align="center" justify="center" px={6} py="20vh">
				<SignInForm />
			</Flex>
		</Layout>
	);
};

export default SignIn;

//TODO: check login stats and push, adjust padding after removing test button

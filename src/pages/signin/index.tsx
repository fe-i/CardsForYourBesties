import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import Layout from "../../components/layout";
import SignInForm from "../../components/forms/signInForm";

const SignIn: NextPage = () => {
	return (
		<Layout title="Sign In">
			<Flex
				flexDir="row"
				flexWrap="wrap"
				align="center"
				justify="center"
				textAlign="center"
				fontSize="lg"
				px={6}
				py="20vh">
				<SignInForm />
			</Flex>
		</Layout>
	);
};

export default SignIn;

//TODO: link with sign up form, add password reset, check login stats and push

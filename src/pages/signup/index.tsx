import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import Layout from "../../components/layout";
import SignUpForm from "../../components/forms/signUpForm";

const SignUp: NextPage = () => {
	return (
		<Layout title="Sign Up">
			<Flex flexDir="column" align="center" justify="center" px={6} py="14vh">
				<SignUpForm />
			</Flex>
		</Layout>
	);
};

export default SignUp;

//TODO: check login stats and push, adjust padding after removing test button

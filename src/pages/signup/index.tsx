import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import Layout from "../../components/layout";
import SignUpForm from "../../components/forms/signUpForm";

const SignUp: NextPage = () => {
	return (
		<Layout title="Sign Up">
			<Flex
				flexDir="row"
				flexWrap="wrap"
				align="center"
				justify="center"
				textAlign="center"
				fontSize="lg"
				px={6}
				py="14vh">
				<SignUpForm />
			</Flex>
		</Layout>
	);
};

export default SignUp;

//TODO: link with login form, check login stats and push

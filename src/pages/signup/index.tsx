import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import Layout from "../../components/layout";
import SignUpForm from "../../components/forms/signUpForm";

const SignUp: NextPage = () => {
	return (
		<Layout title="Sign Up">
			<Flex align="center" justify="center" p={6}>
				<Flex flexDir="row" flexWrap="wrap" fontSize="lg" gap={10}>
					<SignUpForm />
				</Flex>
			</Flex>
		</Layout>
	);
};

export default SignUp;

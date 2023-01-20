import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import SignUpForm from "../../components/forms/signUpForm";
import useAuth from "../../hooks/useAuth";

const SignUp: NextPage = () => {
	const { push } = useRouter();
	const { user } = useAuth();

	if (user !== null) push("/account");

	return (
		<Layout title="Sign Up">
			<Flex flexDir="column" align="center" justify="center" px={6} py="16vh">
				<SignUpForm />
			</Flex>
		</Layout>
	);
};

export default SignUp;

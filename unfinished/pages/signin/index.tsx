/*import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../../src/components/layout";
import SignInForm from "../../../src/components/forms/signInForm";
import useAuth from "../../hooks/useAuth";

const SignIn: NextPage = () => {
	const { push } = useRouter();
	const { user } = useAuth();

	if (user !== null) push("/account");

	return (
		<Layout title="Sign In">
			<Flex flexDir="column" align="center" justify="center" px={6} py="20vh">
				<SignInForm />
			</Flex>
		</Layout>
	);
};

export default SignIn;
*/

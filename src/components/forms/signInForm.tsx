import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	useColorModeValue
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { MdOutlineRemoveRedEye, MdOutlineLogin } from "react-icons/md";
import useFirebase from "../../hooks/useFirebase";
import useAuth from "../../hooks/useAuth";

const SignInForm: React.FC = () => {
	const { push } = useRouter();
	const { signIn } = useFirebase();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleClick = () => setShow(!show);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		await signIn(e.target[0].value, e.target[1].value);
		push("/account");
		setLoading(false);
	};

	return (
		<Flex
			flexDir="column"
			bg={useColorModeValue("white", "gray.900")}
			borderRadius="xl"
			boxShadow="2xl"
			w={{ base: "90vw", md: "470px" }}
			gap={2}
			px={6}
			py={6}>
			<form onSubmit={handleSubmit}>
				<Flex flexDir="column" gap={2}>
					<FormControl isInvalid={!email} isRequired>
						<FormLabel>Email</FormLabel>
						<Input
							type="email"
							placeholder="email"
							maxLength={100}
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						<FormErrorMessage>Enter a valid email address.</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={!password} isRequired>
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<Input
								type={show ? "text" : "password"}
								placeholder="password"
								minLength={8}
								maxLength={50}
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
							<InputRightElement width="4.5rem">
								<Button rounded="full" variant="ghost" onClick={handleClick}>
									<MdOutlineRemoveRedEye size={20} />
								</Button>
							</InputRightElement>
						</InputGroup>
						<FormErrorMessage>Enter a valid password.</FormErrorMessage>
					</FormControl>
					<Button
						type="submit"
						leftIcon={<MdOutlineLogin size={20} />}
						isLoading={loading}
						loadingText="Loading"
						spinnerPlacement="start"
						mt={4}
						w="full">
						Sign In
					</Button>
				</Flex>
			</form>
			<Button
				onClick={async () => {
					await signIn("ll@11.com", "123454");
					push("/account");
				}}>
				signin with random details
			</Button>
		</Flex>
	);
};

export default SignInForm;

//TODO: remove test button

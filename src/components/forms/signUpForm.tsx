import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useColorModeValue
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { MdOutlineVisibility, MdOutlineVisibilityOff, MdOutlinePersonAdd } from "react-icons/md";
import Link from "next/link";
import useFirebase from "../../hooks/useFirebase";
import useAuth from "../../hooks/useAuth";

const SignUpForm: React.FC = () => {
	const { push } = useRouter();
	const { signUp } = useFirebase();
	const [name, setName] = useState<string | undefined>(undefined);
	const [email, setEmail] = useState<string | undefined>(undefined);
	const [password, setPassword] = useState<string | undefined>(undefined);
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleClick = () => setShow(!show);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		await signUp(e.target[0].value, e.target[1].value, e.target[2].value).then((res) => {
			if (res !== null) {
				push("/account");
			}
			setLoading(false);
		});
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
			<Heading fontSize="4xl" textDecor="underline" pb={2}>
				Sign Up
			</Heading>
			<form onSubmit={handleSubmit}>
				<Flex flexDir="column" gap={2}>
					<FormControl isInvalid={name === ""} isRequired>
						<FormLabel>Name</FormLabel>
						<Input
							placeholder="name"
							maxLength={50}
							onChange={(e) => setName(e.target.value)}
							value={name ?? ""}
						/>
						<FormErrorMessage>Enter a valid name.</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={email === ""} isRequired>
						<FormLabel>Email</FormLabel>
						<Input
							type="email"
							placeholder="email"
							maxLength={100}
							onChange={(e) => setEmail(e.target.value)}
							value={email ?? ""}
						/>
						<FormErrorMessage>Enter a valid email address.</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={password === ""} isRequired>
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<Input
								type={show ? "text" : "password"}
								placeholder="password"
								minLength={8}
								maxLength={50}
								onChange={(e) => setPassword(e.target.value)}
								value={password ?? ""}
							/>
							<InputRightElement>
								<Button rounded="md" variant="ghost" p={0} onClick={handleClick}>
									{show ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
								</Button>
							</InputRightElement>
						</InputGroup>
						<FormErrorMessage>Enter a valid password.</FormErrorMessage>
					</FormControl>
					<Button
						type="submit"
						leftIcon={<MdOutlinePersonAdd size={20} />}
						isLoading={loading}
						loadingText="Loading"
						spinnerPlacement="start"
						mt={4}
						w="full">
						Create Account
					</Button>
				</Flex>
			</form>
			<Text fontSize="sm">
				Already have an account?{" "}
				<Link href="/signin" title="Sign In">
					<Text as="span" textColor="blue.600">
						Sign In
					</Text>
				</Link>
			</Text>
			<Button
				onClick={async () => {
					await signUp("bob", "ll@11.com", "123454").then((res) => {
						if (res !== null) {
							push("/account");
						}
					});
				}}>
				signup with random details
			</Button>
		</Flex>
	);
};

export default SignUpForm;

//TODO: remove test button
